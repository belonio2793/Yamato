export interface SceneHotspot {
  id: string;
  type: 'navigation' | 'info';
  yaw: number; // in degrees: -180 to 180
  pitch: number; // in degrees: -90 to 90
  targetSceneId?: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface TourScene {
  id: string;
  name: string;
  subtitle: string;
  type: 'equirectangular';
  imageUrl: string;
  initialYaw: number;
  initialPitch: number;
  initialFov: number;
  hotspots: SceneHotspot[];
  floorplanCoords: { x: number; y: number }; // percentage on 2D map
}

export interface RoomItem {
  id: string;
  name: string;
  category: 'suite' | 'dormitory';
  pricePHP: number;
  capacity: string;
  bedType: string;
  bathroom: string;
  size: string;
  imageUrl: string;
  galleryImages: string[];
  sceneId?: string;
  features: string[];
  description: string;
}

export interface ListingPhoto {
  url: string;
  title: string;
  category: 'all' | 'rooms' | 'lounge' | 'details' | 'atmosphere';
}

export const LISTING_INFO = {
  name: 'Yamato Hostel',
  japaneseMeaning: 'Great Harmony (大和)',
  tagline: 'A Serene Japanese Retreat in the Bustling Heart of Pasay City',
  address: 'Pasay, Metro Manila, 1302, Philippines',
  tripComUrl: 'https://ph.trip.com/hotels/detail/?cityEnName=Pasay&cityId=121853&hotelId=122411049',
  virtualTourRef: 'wYXvBKNxXV',
  rating: 4.9,
  reviewCount: 148,
  checkIn: '14:00',
  checkOut: '12:00',
  highlights: [
    { label: 'NAIA Airport', value: '3.6 km (10-15 mins)' },
    { label: 'SM Mall of Asia', value: '2.8 km (10 mins)' },
    { label: 'Manila Bay Sunset', value: '2.5 km' },
    { label: 'Train Station (LRT)', value: '1.4 km' },
    { label: 'Medical Care', value: 'Adjacent Hospital' },
    { label: 'Connectivity', value: 'Ultra-Fast Fiber Wi-Fi' },
  ],
  description: `Discover Yamato Hostel, your serene retreat in the bustling heart of Pasay City. The name Yamato means "great harmony" in Japanese, perfectly capturing the tranquil and cozy experience we offer, just minutes from the city's main attractions.

Ideally located, Yamato Hostel is only 10 minutes from major malls and popular tourist spots such as Manila Bay, Mall of Asia, and Luneta Park. The nearest airport, Ninoy Aquino International Airport, is just 3.6 km away, and the nearest train station is 1.4 km away, making our hostel easily accessible for travelers.

Our hostel features spacious rooms with 4-person bunk beds and private rooms, all equipped with air conditioning. We also offer female-only dormitories to ensure privacy and security for our female guests. Designed for comfort and convenience, our private rooms include a private toilet and bath, a desk, and a Smart TV. Bed linen and towels are provided in every room to ensure a pleasant stay.`,
};

export const TOUR_SCENES: TourScene[] = [
  {
    id: 'lounge',
    name: 'Zen Lounge & Main Hall',
    subtitle: 'Great Harmony Living & Workstation Hub',
    type: 'equirectangular',
    imageUrl: 'https://storage.virtualtoureasy.com/orgs/9875/tours/a3fbae4c-08bd-489c-b8c0-7e5226c356cb/ai-scenes/22c88cef-5dff-4328-9cad-964f01fa0696-pano-me6e.jpg',
    initialYaw: 15,
    initialPitch: -2,
    initialFov: 75,
    floorplanCoords: { x: 50, y: 55 },
    hotspots: [
      {
        id: 'hs-lounge-to-suite',
        type: 'navigation',
        yaw: -45,
        pitch: -4,
        targetSceneId: 'deluxe-suite',
        title: 'Enter Deluxe Queen Suite',
        description: 'Private sanctuary with en-suite bath and Netflix TV',
      },
      {
        id: 'hs-lounge-to-dorm',
        type: 'navigation',
        yaw: 130,
        pitch: -3,
        targetSceneId: 'dormitory',
        title: 'Enter Minimalist Dormitory',
        description: '4-bed Japanese pod bunks with privacy curtains',
      },
      {
        id: 'hs-lounge-design',
        type: 'info',
        yaw: 20,
        pitch: -15,
        title: 'Architectural Digest Aesthetics',
        description: 'Clean organic timber joinery, diffused ambient light fixtures, and natural acoustic calm designed for restful contemplation.',
        imageUrl: 'https://ak-d.tripcdn.com/images/1mc7112000kenir1oD34B_Z_1280_853_R50_Q90.jpg',
      },
      {
        id: 'hs-lounge-wifi',
        type: 'info',
        yaw: -110,
        pitch: -10,
        title: 'Fiber Wi-Fi & Workstation',
        description: 'Dedicated co-working desks with universal USB fast-charging hubs and high-speed Wi-Fi throughout the entire property.',
        imageUrl: 'https://ak-d.tripcdn.com/images/0581012000jpls70d41BF_Z_1280_853_R50_Q90.jpg',
      },
    ],
  },
  {
    id: 'deluxe-suite',
    name: 'Deluxe Queen Suite',
    subtitle: 'Private En-Suite Room with Smart TV',
    type: 'equirectangular',
    imageUrl: 'https://storage.virtualtoureasy.com/orgs/9875/tours/a3fbae4c-08bd-489c-b8c0-7e5226c356cb/ai-scenes/585815f7-a407-4251-bc3f-5c1d8e6f808d-pano-me6e.jpg',
    initialYaw: -30,
    initialPitch: 0,
    initialFov: 75,
    floorplanCoords: { x: 25, y: 35 },
    hotspots: [
      {
        id: 'hs-suite-to-lounge',
        type: 'navigation',
        yaw: 165,
        pitch: -2,
        targetSceneId: 'lounge',
        title: 'Return to Main Lounge',
        description: 'Walk back to the central living and co-working area',
      },
      {
        id: 'hs-suite-bed',
        type: 'info',
        yaw: -15,
        pitch: -14,
        title: 'Deluxe Queen Bed',
        description: 'Plush high-density orthopedic mattress draped with premium white cotton linens and dual micro-fiber pillows.',
        imageUrl: 'https://ak-d.tripcdn.com/images/1mc6e12000p7emjhoC4C0_Z_1280_853_R50_Q90.jpg',
      },
      {
        id: 'hs-suite-bath',
        type: 'info',
        yaw: -85,
        pitch: -8,
        title: 'Private En-Suite Bath',
        description: 'Dedicated modern bathroom featuring rain shower, fresh towels, white tea botanical toiletries, and vanity mirror.',
        imageUrl: 'https://ak-d.tripcdn.com/images/0221412000l7eecro1978_Z_1280_853_R50_Q90.jpg',
      },
      {
        id: 'hs-suite-entertainment',
        type: 'info',
        yaw: 70,
        pitch: 2,
        title: 'Netflix Smart TV & Inverter AC',
        description: 'Wall-mounted flat-screen TV with preloaded Netflix, quiet climate-controlled air conditioning, and bedside USB ports.',
      },
    ],
  },
  {
    id: 'dormitory',
    name: 'Minimalist Pod Dormitory',
    subtitle: '4-Bed Bunk Sanctuary with Privacy Drapes',
    type: 'equirectangular',
    imageUrl: 'https://storage.virtualtoureasy.com/orgs/9875/tours/a3fbae4c-08bd-489c-b8c0-7e5226c356cb/ai-scenes/974a5615-1fcb-4b3e-b929-d472b32a07b4-pano-me6e.jpg',
    initialYaw: 50,
    initialPitch: -5,
    initialFov: 75,
    floorplanCoords: { x: 75, y: 35 },
    hotspots: [
      {
        id: 'hs-dorm-to-lounge',
        type: 'navigation',
        yaw: -140,
        pitch: -3,
        targetSceneId: 'lounge',
        title: 'Return to Main Lounge',
        description: 'Walk back to the central living and co-working area',
      },
      {
        id: 'hs-dorm-bunk',
        type: 'info',
        yaw: 35,
        pitch: -12,
        title: 'Japanese Pod Bunks',
        description: 'Custom-built solid timber 4-person bunks. Includes blackout privacy curtain, warm reading lamp, and individual power socket.',
        imageUrl: 'https://ak-d.tripcdn.com/images/1mc5312000kemx5wtCF13_Z_1280_853_R50_Q90.jpg',
      },
      {
        id: 'hs-dorm-lockers',
        type: 'info',
        yaw: -60,
        pitch: -18,
        title: 'Personal Keycard Lockers',
        description: 'Spacious steel security lockers beneath each bunk for safe storage of backpacks, laptops, and travel gear.',
      },
    ],
  },
];

export const ROOMS: RoomItem[] = [
  {
    id: 'deluxe-queen-suite',
    name: 'Deluxe Queen Suite',
    category: 'suite',
    pricePHP: 2892,
    capacity: '2 Guests',
    bedType: '1 Queen Bed',
    bathroom: 'Private En-Suite',
    size: '24 m²',
    imageUrl: 'https://ak-d.tripcdn.com/images/1mc6e12000p7emjhoC4C0_Z_1280_853_R50_Q90.jpg',
    galleryImages: [
      'https://ak-d.tripcdn.com/images/1mc6e12000p7emjhoC4C0_Z_1280_853_R50_Q90.jpg',
      'https://ak-d.tripcdn.com/images/0221412000l7eecro1978_Z_1280_853_R50_Q90.jpg',
      'https://ak-d.tripcdn.com/images/1mc1x12000p7eisum818A_Z_1280_853_R50_Q90.png',
    ],
    sceneId: 'deluxe-suite',
    features: [
      'Private En-Suite Bathroom',
      'Flat-Screen Smart TV with Netflix',
      'Quiet Window Climate AC',
      'Dedicated Work Desk & Chair',
      'Bedside USB & Universal Plugs',
      'Complimentary Towels & Botanical Toiletries',
    ],
    description: 'A tranquil private sanctuary designed in understated Japanese harmony. Features a queen-sized plush bed, spotless private bath, and wall-mounted Netflix entertainment for a restful evening after exploring Manila.',
  },
  {
    id: 'deluxe-queen-room',
    name: 'Deluxe Queen Room',
    category: 'suite',
    pricePHP: 2450,
    capacity: '2 Guests',
    bedType: '1 Queen Bed',
    bathroom: 'Private Bath',
    size: '20 m²',
    imageUrl: 'https://ak-d.tripcdn.com/images/02334424x9at6pf0qDD8A_W_1280_853_R5_Q70.jpg',
    galleryImages: [
      'https://ak-d.tripcdn.com/images/02334424x9at6pf0qDD8A_W_1280_853_R5_Q70.jpg',
      'https://ak-d.tripcdn.com/images/0221412000l7eecro1978_Z_1280_853_R50_Q90.jpg',
      'https://ak-d.tripcdn.com/images/1mc7112000kenir1oD34B_Z_1280_853_R50_Q90.jpg',
    ],
    sceneId: 'deluxe-suite',
    features: [
      'Private Bathroom with Hot Shower',
      'High-Speed Fiber Wi-Fi',
      'Silent Air Conditioning',
      'Fresh Bed Linens & Towels',
      'Luggage Storage Space',
    ],
    description: 'Intimate queen room crafted with warm minimalist tones. Ideal for solo travelers or couples seeking hotel-grade comfort with the calm, relaxed atmosphere of a boutique hostel.',
  },
  {
    id: 'bunk-female-dorm',
    name: 'Bunk 4-Bed Dormitory (Female Only)',
    category: 'dormitory',
    pricePHP: 588,
    capacity: '1 Guest per Pod',
    bedType: '1 Single Pod Bunk',
    bathroom: 'Shared Female Bath',
    size: '28 m²',
    imageUrl: 'https://ak-d.tripcdn.com/images/1mc5312000kemx5wtCF13_Z_1280_853_R50_Q90.jpg',
    galleryImages: [
      'https://ak-d.tripcdn.com/images/1mc5312000kemx5wtCF13_Z_1280_853_R50_Q90.jpg',
      'https://ak-d.tripcdn.com/images/0230o424x9at5lke48BDD_W_1280_853_R5_Q70.jpg',
      'https://ak-d.tripcdn.com/images/0581012000jpls70d41BF_Z_1280_853_R50_Q90.jpg',
    ],
    sceneId: 'dormitory',
    features: [
      'Female-Only Dedicated Floor & Room',
      'Full-Coverage Privacy Curtain',
      'Personal Reading Light & Power Outlet',
      'Under-Bed Secure Storage Locker',
      'Air Conditioning & Fresh Linen Provided',
      'Access to Modern Shared Bathrooms',
    ],
    description: 'Exclusively for female travelers seeking safe, comfortable, and tranquil accommodation. Pod bunks provide complete visual privacy with thick blackout drapes and personal bedside lighting.',
  },
  {
    id: 'bunk-mixed-dorm',
    name: 'Bunk 4-Bed Dormitory (Mixed Gender)',
    category: 'dormitory',
    pricePHP: 588,
    capacity: '1 Guest per Pod',
    bedType: '1 Single Pod Bunk',
    bathroom: 'Shared Bathrooms',
    size: '28 m²',
    imageUrl: 'https://ak-d.tripcdn.com/images/0230o424x9at5lke48BDD_W_1280_853_R5_Q70.jpg',
    galleryImages: [
      'https://ak-d.tripcdn.com/images/0230o424x9at5lke48BDD_W_1280_853_R5_Q70.jpg',
      'https://ak-d.tripcdn.com/images/1mc5312000kemx5wtCF13_Z_1280_853_R50_Q90.jpg',
      'https://ak-d.tripcdn.com/images/1mc7112000kenir1oD34B_Z_1280_853_R50_Q90.jpg',
    ],
    sceneId: 'dormitory',
    features: [
      'Japanese Pod Privacy Design',
      'High-Density Mattress with White Linen',
      'Keycard Accessible Secure Lockers',
      'Individual USB Port & Universal Socket',
      'Full Air Conditioning',
    ],
    description: 'Shared 4-bed room combining affordability with thoughtful Japanese pod architecture. Each bunk functions as a private cozy cubicle with blackout drapes, quiet environment, and individual power.',
  },
  {
    id: 'bunk-male-dorm',
    name: 'Bunk 4-Bed Male Dormitory (Male Only)',
    category: 'dormitory',
    pricePHP: 588,
    capacity: '1 Guest per Pod',
    bedType: '1 Single Pod Bunk',
    bathroom: 'Shared Male Bath',
    size: '28 m²',
    imageUrl: 'https://ak-d.tripcdn.com/images/1mc7112000kenir1oD34B_Z_1280_853_R50_Q90.jpg',
    galleryImages: [
      'https://ak-d.tripcdn.com/images/1mc7112000kenir1oD34B_Z_1280_853_R50_Q90.jpg',
      'https://ak-d.tripcdn.com/images/1mc5312000kemx5wtCF13_Z_1280_853_R50_Q90.jpg',
      'https://ak-d.tripcdn.com/images/0581012000jpls70d41BF_Z_1280_853_R50_Q90.jpg',
    ],
    sceneId: 'dormitory',
    features: [
      'Male-Only Dedicated Room',
      'Private Bunk Curtains',
      'Personal Reading Light & Outlet',
      'Spacious Lockers for Luggage',
      'High-Speed Wi-Fi & AC',
    ],
    description: 'Spacious and quiet male dormitory featuring sturdy, noise-insulated wooden bunks. Clean, orderly, and comfortable base for backpackers and airport transit passengers.',
  },
];

export const GALLERY_PHOTOS: ListingPhoto[] = [
  {
    url: 'https://ak-d.tripcdn.com/images/1mc1x12000p7eisum818A_Z_1280_853_R50_Q90.png',
    title: 'Yamato Hostel Architectural Facade & Welcome',
    category: 'atmosphere',
  },
  {
    url: 'https://ak-d.tripcdn.com/images/0581012000jpls70d41BF_Z_1280_853_R50_Q90.jpg',
    title: 'Central Zen Living & Co-Working Lounge',
    category: 'lounge',
  },
  {
    url: 'https://ak-d.tripcdn.com/images/1mc6e12000p7emjhoC4C0_Z_1280_853_R50_Q90.jpg',
    title: 'Deluxe Queen Bedroom & Architectural Detailing',
    category: 'rooms',
  },
  {
    url: 'https://ak-d.tripcdn.com/images/1mc5312000kemx5wtCF13_Z_1280_853_R50_Q90.jpg',
    title: 'Japanese Harmony 4-Person Pod Bunk Dorms',
    category: 'rooms',
  },
  {
    url: 'https://ak-d.tripcdn.com/images/1mc7112000kenir1oD34B_Z_1280_853_R50_Q90.jpg',
    title: 'Minimalist Interior Corridor & Wood Joinery',
    category: 'details',
  },
  {
    url: 'https://ak-d.tripcdn.com/images/0221412000l7eecro1978_Z_1280_853_R50_Q90.jpg',
    title: 'Private En-Suite Bathroom & Rain Shower',
    category: 'rooms',
  },
  {
    url: 'https://ak-d.tripcdn.com/images/0222l12000l7ee2072A53_Z_1280_853_R50_Q90.jpg',
    title: 'Quiet Seating Nook & Reading Space',
    category: 'lounge',
  },
  {
    url: 'https://ak-d.tripcdn.com/images/02334424x9at6pf0qDD8A_W_1280_853_R5_Q70.jpg',
    title: 'Queen Suite Light Ingress & Linen Detailing',
    category: 'rooms',
  },
  {
    url: 'https://ak-d.tripcdn.com/images/0230o424x9at5lke48BDD_W_1280_853_R5_Q70.jpg',
    title: 'Tatami Wood Accents & Ambient Illumination',
    category: 'details',
  },
];

export const GUEST_REVIEWS = [
  {
    author: 'Solo Explorer & Architecture Enthusiast',
    origin: 'Stayed in Private Queen Suite',
    rating: '10/10 Exceptional',
    quote:
      'I stayed in a private room, so it honestly didn’t feel like a hostel to me—the interior design is straight out of Architectural Digest, and the Japanese harmony aesthetics pleased and calmed me. USB charging ports on the wall and Netflix TV made the evening wonderfully relaxing.',
    date: 'Recent Guest Review · Trip.com Verified',
  },
  {
    author: 'Transit Traveler via NAIA',
    origin: 'Stayed in Pod Dormitory',
    rating: '5.0 / 5.0 Great Stay',
    quote:
      'Only 10 minutes from NAIA airport and Mall of Asia. The Japanese bunk pods with privacy drapes give you your own private room feel inside a dorm. Spotlessly clean, super fast fiber Wi-Fi, and very gentle English-speaking staff.',
    date: 'Recent Guest Review · Trip.com Verified',
  },
  {
    author: 'Digital Nomad',
    origin: 'Stayed 5 Nights in Deluxe Suite',
    rating: '10/10 Perfect Calm',
    quote:
      'True to its name Yamato (great harmony). In the middle of bustling Pasay, you step inside and the city noise melts away. Great desk to work remotely and high-speed Wi-Fi.',
    date: 'Recent Guest Review · Trip.com Verified',
  },
];

export const NEIGHBORHOOD_DESTINATIONS = [
  {
    name: 'SM Mall of Asia (MOA)',
    category: 'Shopping & Dining',
    distance: '2.8 km',
    time: '10 mins drive',
    description: 'One of the world’s largest lifestyle and shopping complexes, featuring seaside boardwalk dining and concert arena.',
  },
  {
    name: 'Manila Bay Sunset Promenade',
    category: 'Sightseeing',
    distance: '2.5 km',
    time: '8 mins drive',
    description: 'Famous golden hour horizon over Manila Bay, seaside cafes, and breezy walking boulevard.',
  },
  {
    name: 'Ninoy Aquino Int’l Airport (NAIA)',
    category: 'Transit',
    distance: '3.6 km',
    time: '12-15 mins drive',
    description: 'Quick expressway connection to all international and domestic flight terminals.',
  },
  {
    name: 'LRT-1 Baclaran & EDSA Station',
    category: 'Public Metro',
    distance: '1.4 km',
    time: '5 mins ride',
    description: 'Direct metro train connection to Makati, Intramuros, Ermita, and Quezon City.',
  },
  {
    name: 'Pasay General Hospital',
    category: 'Healthcare',
    distance: 'Adjacent (50 m)',
    time: '1 min walk',
    description: 'Right beside the property for total safety and medical peace of mind.',
  },
];
