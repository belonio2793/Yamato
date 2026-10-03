import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import {
  Compass,
  Maximize2,
  Minimize2,
  RotateCw,
  Volume2,
  VolumeX,
  Camera,
  MapPin,
  Ruler,
  Info,
  ChevronRight,
  Eye,
  Sparkles,
  Layers,
  ArrowRight,
  X,
  ZoomIn,
  ZoomOut,
} from 'lucide-react';
import { TourScene, TOUR_SCENES, SceneHotspot } from '../data/listingData';

interface PanoramaViewerProps {
  initialSceneId?: string;
  isCinematicFullScreen?: boolean;
  onCloseCinematic?: () => void;
  onBookNow?: () => void;
}

export const PanoramaViewer: React.FC<PanoramaViewerProps> = ({
  initialSceneId = 'lounge',
  isCinematicFullScreen = false,
  onCloseCinematic,
  onBookNow,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Active scene state
  const [currentSceneId, setCurrentSceneId] = useState<string>(initialSceneId);
  const currentScene = TOUR_SCENES.find((s) => s.id === currentSceneId) || TOUR_SCENES[0];

  // Viewer state
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingProgress, setLoadingProgress] = useState<number>(10);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [currentYaw, setCurrentYaw] = useState<number>(currentScene.initialYaw);
  const [currentPitch, setCurrentPitch] = useState<number>(currentScene.initialPitch);
  const [currentFov, setCurrentFov] = useState<number>(currentScene.initialFov);
  const [showFloorplan, setShowFloorplan] = useState<boolean>(false);
  const [showInfoPanel, setShowInfoPanel] = useState<boolean>(false);
  const [activeInfoHotspot, setActiveInfoHotspot] = useState<SceneHotspot | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isRulerActive, setIsRulerActive] = useState<boolean>(false);
  const [rulerPoints, setRulerPoints] = useState<Array<{ x: number; y: number }>>([]);
  const [screenshotFlash, setScreenshotFlash] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Projected 2D hotspot positions
  const [projectedHotspots, setProjectedHotspots] = useState<
    Array<{ hotspot: SceneHotspot; x: number; y: number; visible: boolean }>
  >([]);

  // Three.js instances ref
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sphereMeshRef = useRef<THREE.Mesh | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);

  // Interaction refs
  const isUserInteractingRef = useRef<boolean>(false);
  const onPointerDownPointerXRef = useRef<number>(0);
  const onPointerDownPointerYRef = useRef<number>(0);
  const onPointerDownLonRef = useRef<number>(0);
  const onPointerDownLatRef = useRef<number>(0);
  const lonRef = useRef<number>(currentScene.initialYaw);
  const latRef = useRef<number>(currentScene.initialPitch);
  const fovRef = useRef<number>(currentScene.initialFov);
  const autoRotateRef = useRef<boolean>(autoRotate);
  const pinchDistanceRef = useRef<number | null>(null);

  // Web Audio Context for Zen Ambient Sound
  const audioCtxRef = useRef<AudioContext | null>(null);
  const audioGainRef = useRef<GainNode | null>(null);
  const oscillatorRefs = useRef<OscillatorNode[]>([]);

  // Keep refs in sync with state
  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Sync external initialSceneId change
  useEffect(() => {
    if (initialSceneId && initialSceneId !== currentSceneId) {
      switchScene(initialSceneId);
    }
  }, [initialSceneId]);

  // Ambient sound synthesis (Peaceful Japanese Zen garden frequency chords)
  const toggleAmbientSound = () => {
    if (isAudioMuted) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = audioCtxRef.current || new AudioCtx();
        audioCtxRef.current = ctx;

        if (ctx.state === 'suspended') {
          ctx.resume();
        }

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 2);
        masterGain.connect(ctx.destination);
        audioGainRef.current = masterGain;

        // Frequencies tuned to Japanese Insen / Hirajoshi scale (peaceful meditation chords)
        const notes = [146.83, 220.0, 261.63, 293.66, 440.0];
        const oscs: OscillatorNode[] = [];

        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const oscGain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          // Subtle LFO vibrato
          const lfo = ctx.createOscillator();
          const lfoGain = ctx.createGain();
          lfo.frequency.value = 0.15 + idx * 0.05;
          lfoGain.gain.value = 1.2;
          lfo.connect(osc.frequency);
          lfo.start();

          oscGain.gain.value = 0.15 / (idx + 1);
          osc.connect(oscGain);
          oscGain.connect(masterGain);
          osc.start();
          oscs.push(osc);
        });

        oscillatorRefs.current = oscs;
        setIsAudioMuted(false);
      } catch {
        setIsAudioMuted(true);
      }
    } else {
      if (audioGainRef.current && audioCtxRef.current) {
        audioGainRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
        setTimeout(() => {
          oscillatorRefs.current.forEach((osc) => {
            try {
              osc.stop();
            } catch {
              // Ignore
            }
          });
          oscillatorRefs.current = [];
          setIsAudioMuted(true);
        }, 800);
      } else {
        setIsAudioMuted(true);
      }
    }
  };

  // Clean up audio on unmount
  useEffect(() => {
    return () => {
      oscillatorRefs.current.forEach((osc) => {
        try {
          osc.stop();
        } catch {
          // ignore
        }
      });
      if (audioCtxRef.current && audioCtxRef.current.state !== 'closed') {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  // Initialize Three.js scene
  useEffect(() => {
    if (!containerRef.current || !canvasRef.current) return;

    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(currentScene.initialFov, width / height, 1, 1100);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    // 4. Sphere geometry for equirectangular projection
    const geometry = new THREE.SphereGeometry(500, 64, 40);
    geometry.scale(-1, 1, 1); // Invert normals so texture is on the inside

    const textureLoader = new THREE.TextureLoader();
    setIsLoading(true);
    setLoadingProgress(25);

    const texture = textureLoader.load(
      currentScene.imageUrl,
      () => {
        setIsLoading(false);
        setLoadingProgress(100);
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          setLoadingProgress(percent);
        }
      },
      () => {
        setIsLoading(false);
      }
    );
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;

    const material = new THREE.MeshBasicMaterial({ map: texture });
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);
    sphereMeshRef.current = sphereMesh;

    // Initialize lon/lat
    lonRef.current = currentScene.initialYaw;
    latRef.current = currentScene.initialPitch;
    fovRef.current = currentScene.initialFov;

    // 5. Render loop
    let isSubscribed = true;
    const animate = () => {
      if (!isSubscribed) return;

      // Handle auto-rotate if user is not dragging
      if (autoRotateRef.current && !isUserInteractingRef.current) {
        lonRef.current += 0.08;
      }

      // Clamp lat
      latRef.current = Math.max(-85, Math.min(85, latRef.current));

      // Calculate camera target vector
      const phi = THREE.MathUtils.degToRad(90 - latRef.current);
      const theta = THREE.MathUtils.degToRad(lonRef.current);

      const targetX = 500 * Math.sin(phi) * Math.cos(theta);
      const targetY = 500 * Math.cos(phi);
      const targetZ = 500 * Math.sin(phi) * Math.sin(theta);

      camera.lookAt(targetX, targetY, targetZ);
      renderer.render(scene, camera);

      // Project hotspots to 2D screen coordinates
      if (containerRef.current && currentScene.hotspots.length > 0) {
        const cWidth = containerRef.current.clientWidth;
        const cHeight = containerRef.current.clientHeight;
        const projected = currentScene.hotspots.map((hp) => {
          const hpPhi = THREE.MathUtils.degToRad(90 - hp.pitch);
          const hpTheta = THREE.MathUtils.degToRad(hp.yaw);

          const hpVec = new THREE.Vector3(
            500 * Math.sin(hpPhi) * Math.cos(hpTheta),
            500 * Math.cos(hpPhi),
            500 * Math.sin(hpPhi) * Math.sin(hpTheta)
          );

          // Project to NDC
          hpVec.project(camera);

          // Visible only if in front of camera
          const isVisible = hpVec.z < 1;
          const x = (hpVec.x * 0.5 + 0.5) * cWidth;
          const y = (-(hpVec.y * 0.5) + 0.5) * cHeight;

          return { hotspot: hp, x, y, visible: isVisible };
        });
        setProjectedHotspots(projected);
      }

      // Update orientation state periodically for HUD
      setCurrentYaw(Math.round(((lonRef.current % 360) + 360) % 360));
      setCurrentPitch(Math.round(latRef.current));
      setCurrentFov(Math.round(camera.fov));

      animationFrameIdRef.current = requestAnimationFrame(animate);
    };

    animationFrameIdRef.current = requestAnimationFrame(animate);

    // 6. Resize handler
    const handleResize = () => {
      if (!containerRef.current || !renderer || !camera) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      isSubscribed = false;
      window.removeEventListener('resize', handleResize);
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      geometry.dispose();
      material.dispose();
      texture.dispose();
      renderer.dispose();
    };
  }, []);

  // Smooth scene switcher with cinematic zoom and texture transition
  const switchScene = useCallback(
    (targetSceneId: string) => {
      const targetScene = TOUR_SCENES.find((s) => s.id === targetSceneId);
      if (!targetScene || !sphereMeshRef.current || !cameraRef.current) return;

      setIsTransitioning(true);
      setIsLoading(true);
      setActiveInfoHotspot(null);

      // Preload next texture
      const loader = new THREE.TextureLoader();
      loader.load(
        targetScene.imageUrl,
        (newTexture) => {
          newTexture.colorSpace = THREE.SRGBColorSpace;
          newTexture.minFilter = THREE.LinearFilter;
          newTexture.magFilter = THREE.LinearFilter;

          if (sphereMeshRef.current) {
            const mat = sphereMeshRef.current.material as THREE.MeshBasicMaterial;
            if (mat.map) mat.map.dispose();
            mat.map = newTexture;
            mat.needsUpdate = true;
          }

          setCurrentSceneId(targetScene.id);
          lonRef.current = targetScene.initialYaw;
          latRef.current = targetScene.initialPitch;

          if (cameraRef.current) {
            cameraRef.current.fov = targetScene.initialFov;
            cameraRef.current.updateProjectionMatrix();
          }

          setTimeout(() => {
            setIsTransitioning(false);
            setIsLoading(false);
          }, 350);
        },
        undefined,
        () => {
          setIsTransitioning(false);
          setIsLoading(false);
        }
      );
    },
    [currentSceneId]
  );

  // Mouse / Touch interaction handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isUserInteractingRef.current = true;
    onPointerDownPointerXRef.current = e.clientX;
    onPointerDownPointerYRef.current = e.clientY;
    onPointerDownLonRef.current = lonRef.current;
    onPointerDownLatRef.current = latRef.current;

    // Ruler tool logic
    if (isRulerActive && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setRulerPoints((prev) => (prev.length >= 2 ? [{ x, y }] : [...prev, { x, y }]));
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isUserInteractingRef.current || isRulerActive) return;

    const deltaX = (onPointerDownPointerXRef.current - e.clientX) * 0.16;
    const deltaY = (e.clientY - onPointerDownPointerYRef.current) * 0.16;

    lonRef.current = onPointerDownLonRef.current + deltaX;
    latRef.current = onPointerDownLatRef.current + deltaY;
  };

  const handlePointerUp = () => {
    isUserInteractingRef.current = false;
    pinchDistanceRef.current = null;
  };

  // Pinch zoom on touch devices
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length === 2 && cameraRef.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (pinchDistanceRef.current !== null) {
        const pinchDelta = (pinchDistanceRef.current - distance) * 0.15;
        const newFov = Math.max(30, Math.min(95, cameraRef.current.fov + pinchDelta));
        cameraRef.current.fov = newFov;
        cameraRef.current.updateProjectionMatrix();
        fovRef.current = newFov;
      }
      pinchDistanceRef.current = distance;
    }
  };

  // Wheel zoom
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!cameraRef.current) return;
    e.preventDefault();

    const zoomSpeed = 0.05;
    const newFov = Math.max(30, Math.min(95, cameraRef.current.fov + e.deltaY * zoomSpeed));
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
    fovRef.current = newFov;
  };

  // Zoom buttons
  const handleZoom = (direction: 'in' | 'out') => {
    if (!cameraRef.current) return;
    const delta = direction === 'in' ? -8 : 8;
    const newFov = Math.max(30, Math.min(95, cameraRef.current.fov + delta));
    cameraRef.current.fov = newFov;
    cameraRef.current.updateProjectionMatrix();
    fovRef.current = newFov;
  };

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Snapshot / Screenshot capture
  const takeScreenshot = () => {
    if (!rendererRef.current) return;
    setScreenshotFlash(true);
    setTimeout(() => setScreenshotFlash(false), 250);

    try {
      const dataUrl = rendererRef.current.domElement.toDataURL('image/jpeg', 0.95);
      const link = document.createElement('a');
      link.download = `Yamato_Hostel_360_${currentScene.name.replace(/\s+/g, '_')}.jpg`;
      link.href = dataUrl;
      link.click();
    } catch {
      // ignore
    }
  };

  // Compass direction label
  const getCompassHeading = (deg: number): string => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const index = Math.round(deg / 45) % 8;
    return directions[index];
  };

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onTouchMove={handleTouchMove}
      onWheel={handleWheel}
      className={`relative w-full overflow-hidden select-none bg-[#0a0a0d] ${
        isCinematicFullScreen ? 'fixed inset-0 z-50 h-screen w-screen' : 'h-[620px] lg:h-[720px] rounded-2xl border border-stone-800/80 shadow-2xl'
      }`}
    >
      {/* 3D WebGL Canvas */}
      <canvas ref={canvasRef} className="w-full h-full cursor-grab active:cursor-grabbing touch-none block" />

      {/* Screenshot Flash Effect */}
      {screenshotFlash && (
        <div className="absolute inset-0 bg-white/60 pointer-events-none z-40 transition-opacity duration-200" />
      )}

      {/* Cinematic Transition Overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md pointer-events-none z-30 transition-opacity duration-300" />
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-[#0d0e12]/85 backdrop-blur-sm pointer-events-none">
          <div className="relative w-16 h-16 flex items-center justify-center mb-4">
            <div className="w-16 h-16 border-2 border-[#c5a880]/30 border-t-[#c5a880] rounded-full animate-spin" />
            <Sparkles className="w-6 h-6 text-[#c5a880] absolute animate-pulse" />
          </div>
          <p className="font-display tracking-widest text-xs uppercase text-stone-300">
            Rendering 360° Equirectangular Sphere
          </p>
          <div className="w-48 h-1 bg-stone-800 rounded-full mt-3 overflow-hidden">
            <div
              className="h-full bg-[#c5a880] transition-all duration-300"
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Dynamic 3D Projected Hotspots */}
      {!isLoading &&
        projectedHotspots.map(({ hotspot, x, y, visible }) => {
          if (!visible) return null;
          return (
            <div
              key={hotspot.id}
              style={{
                transform: `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`,
              }}
              className="absolute top-0 left-0 pointer-events-auto z-20 transition-transform duration-75 ease-out"
            >
              {hotspot.type === 'navigation' ? (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (hotspot.targetSceneId) {
                      switchScene(hotspot.targetSceneId);
                    }
                  }}
                  className="group relative flex items-center justify-center focus:outline-none"
                  aria-label={hotspot.title}
                >
                  <span className="absolute -inset-3 rounded-full bg-[#c5a880]/20 animate-ping" />
                  <div className="relative w-11 h-11 rounded-full bg-stone-900/90 border border-[#c5a880] shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c5a880] transition-all duration-200">
                    <ArrowRight className="w-5 h-5 text-[#c5a880] group-hover:text-stone-950 transition-colors" />
                  </div>
                  {/* Tooltip on Hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-12 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-stone-950/95 border border-stone-700/80 px-3 py-1.5 rounded-lg shadow-xl text-xs text-stone-100">
                    <p className="font-semibold text-[#c5a880]">{hotspot.title}</p>
                    {hotspot.description && (
                      <p className="text-[11px] text-stone-400 max-w-[200px] truncate">{hotspot.description}</p>
                    )}
                  </div>
                </button>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveInfoHotspot(hotspot);
                  }}
                  className="group relative flex items-center justify-center focus:outline-none"
                  aria-label={hotspot.title}
                >
                  <span className="absolute -inset-2 rounded-full bg-amber-500/20 animate-pulse" />
                  <div className="relative w-9 h-9 rounded-full bg-stone-900/90 border border-amber-400/80 shadow-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-amber-400 transition-all duration-200">
                    <Info className="w-4 h-4 text-amber-300 group-hover:text-stone-950 transition-colors" />
                  </div>
                  {/* Tooltip on Hover */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-11 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap bg-stone-950/95 border border-stone-700/80 px-3 py-1.5 rounded-lg shadow-xl text-xs text-stone-100">
                    <p className="font-semibold text-amber-300">{hotspot.title}</p>
                    <p className="text-[10px] text-stone-400">Click to view details</p>
                  </div>
                </button>
              )}
            </div>
          );
        })}

      {/* Hotspot Info Modal / Popover */}
      {activeInfoHotspot && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute z-35 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-stone-950/95 backdrop-blur-xl border border-stone-700/80 rounded-2xl p-5 shadow-2xl text-stone-100 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="flex items-start justify-between mb-3 border-b border-stone-800/80 pb-3">
            <div>
              <span className="text-[11px] font-mono tracking-wider uppercase text-[#c5a880]">
                Architectural Highlight
              </span>
              <h4 className="text-base font-display font-semibold text-white mt-0.5">
                {activeInfoHotspot.title}
              </h4>
            </div>
            <button
              onClick={() => setActiveInfoHotspot(null)}
              className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {activeInfoHotspot.imageUrl && (
            <div className="mb-3 rounded-xl overflow-hidden aspect-video bg-stone-900 border border-stone-800">
              <img
                src={activeInfoHotspot.imageUrl}
                alt={activeInfoHotspot.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          )}

          <p className="text-xs text-stone-300 leading-relaxed">
            {activeInfoHotspot.description}
          </p>

          <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between text-xs text-stone-400">
            <span>Yamato Pasay · 360° Perspective</span>
            <button
              onClick={() => setActiveInfoHotspot(null)}
              className="px-3 py-1.5 rounded-lg bg-[#c5a880] text-stone-950 font-medium hover:bg-[#d8bc94] transition-colors"
            >
              Got it
            </button>
          </div>
        </div>
      )}

      {/* Top HUD: Title, Scene Name, Close (if fullscreen), Compass */}
      <div className="absolute top-0 inset-x-0 p-4 flex items-start justify-between pointer-events-none z-30">
        <div className="flex items-center gap-3">
          <div className="px-3 py-2 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800 pointer-events-auto">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <p className="text-xs font-semibold text-white tracking-wide">{currentScene.name}</p>
            </div>
            <p className="text-[10px] text-stone-400 mt-0.5">{currentScene.subtitle}</p>
          </div>

          {/* Compass Widget */}
          <div className="px-2.5 py-2 rounded-xl bg-stone-950/80 backdrop-blur-md border border-stone-800 flex items-center gap-2 pointer-events-auto text-xs">
            <Compass
              className="w-4 h-4 text-[#c5a880] transition-transform duration-100"
              style={{ transform: `rotate(${-currentYaw}deg)` }}
            />
            <span className="font-mono tabular-nums text-stone-200">
              {currentYaw}° {getCompassHeading(currentYaw)}
            </span>
          </div>
        </div>

        {/* Right Top Actions */}
        <div className="flex items-center gap-2 pointer-events-auto">
          {/* Zen Ambient Sound */}
          <button
            onClick={toggleAmbientSound}
            title={isAudioMuted ? 'Play Japanese Zen Ambiance' : 'Mute Sound'}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-all ${
              !isAudioMuted
                ? 'bg-[#c5a880] border-[#c5a880] text-stone-950 shadow-lg shadow-[#c5a880]/20'
                : 'bg-stone-950/80 border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
            }`}
          >
            {!isAudioMuted ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Screenshot Camera */}
          <button
            onClick={takeScreenshot}
            title="Capture 360° Photo"
            className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 backdrop-blur-md text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
          >
            <Camera className="w-4 h-4" />
          </button>

          {/* Auto Rotate Toggle */}
          <button
            onClick={() => setAutoRotate(!autoRotate)}
            title={autoRotate ? 'Pause Auto Rotation' : 'Start Auto Rotation'}
            className={`p-2.5 rounded-xl border backdrop-blur-md transition-colors ${
              autoRotate
                ? 'bg-stone-800/90 border-[#c5a880]/50 text-[#c5a880]'
                : 'bg-stone-950/80 border-stone-800 text-stone-400 hover:text-stone-200'
            }`}
          >
            <RotateCw className={`w-4 h-4 ${autoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '8s' }} />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={toggleFullscreen}
            title="Toggle Fullscreen"
            className="p-2.5 rounded-xl bg-stone-950/80 border border-stone-800 backdrop-blur-md text-stone-300 hover:text-white hover:border-stone-700 transition-colors hidden sm:flex"
          >
            {document.fullscreenElement ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          {/* Close button if in cinematic fullscreen mode */}
          {isCinematicFullScreen && onCloseCinematic && (
            <button
              onClick={onCloseCinematic}
              className="p-2.5 rounded-xl bg-rose-950/80 border border-rose-800/80 backdrop-blur-md text-rose-200 hover:bg-rose-900 transition-colors"
              title="Exit 360° Mode"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Floating Right HUD Controls: Zoom, Ruler, Floorplan Toggle */}
      <div className="absolute right-4 top-20 flex flex-col gap-2 pointer-events-auto z-30">
        <button
          onClick={() => handleZoom('in')}
          title="Zoom In"
          className="p-2 rounded-xl bg-stone-950/80 border border-stone-800 backdrop-blur-md text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          title="Zoom Out"
          className="p-2 rounded-xl bg-stone-950/80 border border-stone-800 backdrop-blur-md text-stone-300 hover:text-white hover:border-stone-700 transition-colors"
        >
          <ZoomOut className="w-4 h-4" />
        </button>

        <button
          onClick={() => setShowFloorplan(!showFloorplan)}
          title="2D Floorplan & Minimap"
          className={`p-2 rounded-xl border backdrop-blur-md transition-colors ${
            showFloorplan
              ? 'bg-[#c5a880] border-[#c5a880] text-stone-950 shadow-md'
              : 'bg-stone-950/80 border-stone-800 text-stone-300 hover:text-white hover:border-stone-700'
          }`}
        >
          <Layers className="w-4 h-4" />
        </button>

        <button
          onClick={() => {
            setIsRulerActive(!isRulerActive);
            setRulerPoints([]);
          }}
          title={isRulerActive ? 'Disable Virtual Ruler' : 'Measure Distance (Matterport Tool)'}
          className={`p-2 rounded-xl border backdrop-blur-md transition-colors ${
            isRulerActive
              ? 'bg-amber-500 border-amber-500 text-stone-950 font-bold'
              : 'bg-stone-950/80 border-stone-800 text-stone-400 hover:text-stone-200'
          }`}
        >
          <Ruler className="w-4 h-4" />
        </button>
      </div>

      {/* Ruler tool instruction overlay */}
      {isRulerActive && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 bg-amber-500/90 text-stone-950 text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg pointer-events-none z-30">
          {rulerPoints.length === 0 && 'Click first point to measure'}
          {rulerPoints.length === 1 && 'Click second point to measure distance'}
          {rulerPoints.length >= 2 && 'Estimated span: ~2.85 meters'}
        </div>
      )}

      {/* 2D Interactive Floorplan / Minimap Overlay */}
      {showFloorplan && (
        <div
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-28 left-4 z-30 w-72 bg-stone-950/95 backdrop-blur-xl border border-stone-800 rounded-2xl p-4 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          <div className="flex items-center justify-between mb-3 border-b border-stone-800 pb-2">
            <span className="text-xs font-semibold text-stone-200 flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#c5a880]" /> Yamato Pasay Floorplan
            </span>
            <button
              onClick={() => setShowFloorplan(false)}
              className="text-stone-400 hover:text-white p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Minimap Visual Canvas */}
          <div className="relative w-full h-44 rounded-xl bg-stone-900 border border-stone-800/80 overflow-hidden p-2">
            {/* Architectural room outlines */}
            <div className="absolute top-2 left-2 w-28 h-18 border border-stone-700/60 rounded bg-stone-800/40 flex items-center justify-center text-[10px] text-stone-400">
              Deluxe Suite
            </div>
            <div className="absolute top-2 right-2 w-28 h-18 border border-stone-700/60 rounded bg-stone-800/40 flex items-center justify-center text-[10px] text-stone-400">
              Pod Dorms
            </div>
            <div className="absolute bottom-2 inset-x-2 h-18 border border-stone-700/60 rounded bg-stone-800/40 flex items-center justify-center text-[10px] text-stone-400">
              Main Zen Lounge & Co-Work
            </div>

            {/* Room pins with viewing cone */}
            {TOUR_SCENES.map((scene) => {
              const isActive = scene.id === currentSceneId;
              return (
                <button
                  key={scene.id}
                  onClick={() => switchScene(scene.id)}
                  style={{
                    left: `${scene.floorplanCoords.x}%`,
                    top: `${scene.floorplanCoords.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group focus:outline-none"
                  title={`Jump to ${scene.name}`}
                >
                  {/* Radar viewing cone for active scene */}
                  {isActive && (
                    <div
                      className="absolute -inset-6 pointer-events-none opacity-40"
                      style={{
                        transform: `rotate(${currentYaw}deg)`,
                      }}
                    >
                      <div className="w-12 h-12 bg-gradient-to-t from-transparent via-[#c5a880]/30 to-[#c5a880]/60 clip-radar" />
                    </div>
                  )}

                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center transition-transform ${
                      isActive
                        ? 'bg-[#c5a880] ring-4 ring-[#c5a880]/30 scale-125'
                        : 'bg-stone-600 hover:bg-stone-400 hover:scale-110'
                    }`}
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-950" />
                  </div>
                </button>
              );
            })}
          </div>

          <p className="text-[10px] text-stone-400 mt-2 text-center">
            Click pins to teleport · Cone syncs with look direction
          </p>
        </div>
      )}

      {/* Bottom Scene Thumbnail Carousel Dock */}
      <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-stone-950 via-stone-950/70 to-transparent pointer-events-none z-30">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 max-w-5xl mx-auto">
          {/* Scene Carousel */}
          <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-stone-950/85 backdrop-blur-xl border border-stone-800/80 pointer-events-auto max-w-full">
            {TOUR_SCENES.map((scene, idx) => {
              const isActive = scene.id === currentSceneId;
              return (
                <button
                  key={scene.id}
                  onClick={() => switchScene(scene.id)}
                  className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl transition-all whitespace-nowrap text-left ${
                    isActive
                      ? 'bg-[#c5a880] text-stone-950 shadow-md font-semibold'
                      : 'hover:bg-stone-800/60 text-stone-300 hover:text-white'
                  }`}
                >
                  <div className="relative w-7 h-7 rounded-lg overflow-hidden shrink-0 border border-black/20">
                    <img
                      src={scene.imageUrl}
                      alt={scene.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <p className="text-xs leading-none">
                      {idx + 1}. {scene.name}
                    </p>
                    <p
                      className={`text-[10px] mt-0.5 leading-none ${
                        isActive ? 'text-stone-900/80' : 'text-stone-400'
                      }`}
                    >
                      {scene.hotspots.length} interactive points
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Quick CTA button */}
          {onBookNow && (
            <button
              onClick={onBookNow}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#c5a880] to-[#b3956d] text-stone-950 font-medium text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all pointer-events-auto whitespace-nowrap hidden md:flex items-center gap-1.5"
            >
              <span>Reserve Room</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
