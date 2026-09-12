// Comprehensive travel data repository for world destinations + Dynamic destination synthesizer

export const POPULAR_DESTINATIONS = [
  {
    id: 'tokyo',
    name: 'Tokyo, Japan',
    shortName: 'Tokyo',
    country: 'Japan',
    coords: [35.6762, 139.6503],
    currency: 'JPY',
    heroImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Futuristic Metropolises, Ancient Shrines & Michelin Delicacies',
    weather: { temp: '18°C / 64°F', condition: 'Mild & Sunny', packing: ['Comfortable walking shoes', 'Suica transit card / Pass', 'Light layer jacket', 'Coin pouch', 'Universal power adapter'] },
    neighborhoods: [
      { name: 'Shibuya / Shinjuku', vibe: 'Vibrant nightlife, shopping & neon lights', safety: 9.8 },
      { name: 'Asakusa / Ueno', vibe: 'Historic temples, traditional crafts & street food', safety: 9.9 },
      { name: 'Ginza / Chiyoda', vibe: 'Luxury boutiques, serene Imperial Palace gardens', safety: 9.9 }
    ],
    flights: [
      { airline: 'All Nippon Airways (ANA)', code: 'NH108', flightType: 'Direct', duration: '11h 45m', basePrice: 950, carbonKg: 620, departureTime: '10:30', arrivalTime: '14:15 (+1)' },
      { airline: 'Japan Airlines (JAL)', code: 'JL005', flightType: 'Direct', duration: '11h 30m', basePrice: 980, carbonKg: 610, departureTime: '12:00', arrivalTime: '15:30 (+1)' },
      { airline: 'United Airlines', code: 'UA79', flightType: '1-Stop via SFO', duration: '14h 20m', basePrice: 720, carbonKg: 710, departureTime: '06:45', arrivalTime: '16:05 (+1)' },
      { airline: 'Zipair Tokyo', code: 'ZG023', flightType: 'Direct (Budget Carrier)', duration: '11h 50m', basePrice: 510, carbonKg: 580, departureTime: '09:15', arrivalTime: '13:05 (+1)' }
    ],
    accommodations: [
      { id: 'tokyo-hotel-1', name: 'Park Hotel Tokyo (Shiodome)', tier: 'luxury', pricePerNight: 280, rating: 4.8, location: 'Minato / Shiodome', coords: [35.6628, 139.7594], amenities: ['Skyscraper City Views', 'Artist Rooms', 'Spa', 'Subway Direct Access', 'Free High-Speed Wi-Fi'] },
      { id: 'tokyo-hotel-2', name: 'Trunk Hotel Cat Street', tier: 'boutique', pricePerNight: 210, rating: 4.7, location: 'Shibuya / Harajuku', coords: [35.6653, 139.7042], amenities: ['Eco-friendly design', 'Lounge & Bar', 'Terrace', 'Art Gallery', 'Free Wi-Fi'] },
      { id: 'tokyo-hotel-3', name: 'The Gate Hotel Asakusa Kaminarimon', tier: 'moderate', pricePerNight: 140, rating: 4.6, location: 'Asakusa', coords: [35.7118, 139.7964], amenities: ['Rooftop View of Senso-ji', 'French-Japanese Bistro', 'Near Subway', 'Concierge'] },
      { id: 'tokyo-hotel-4', name: 'Nui. Hostel & Bar Lounge', tier: 'budget', pricePerNight: 55, rating: 4.5, location: 'Kuramae / Riverside', coords: [35.7032, 139.7925], amenities: ['Craft Cafe', 'Community Lounge', 'River Views', 'Private & Shared Pods'] }
    ],
    attractions: [
      { id: 't-act-1', title: 'Senso-ji Temple & Nakamise Dori Street', category: 'Culture', duration: '2.5 hrs', cost: 0, timeOfDay: 'morning', coords: [35.7147, 139.7967], description: 'Tokyo’s oldest Buddhist temple with towering Thunder Gate and stalls serving freshly made ningyo-yaki sweets.', tips: 'Arrive early before 9:00 AM to beat tour crowds.' },
      { id: 't-act-2', title: 'teamLab Planets Digital Art Immersive Exhibition', category: 'Art', duration: '2.5 hrs', cost: 32, timeOfDay: 'afternoon', coords: [35.6496, 139.7900], description: 'Walk through crystalline water and boundless floating orchid gardens in a multisensory digital playground.', tips: 'Book tickets 2-3 weeks in advance; wear shorts or roll-up pants.' },
      { id: 't-act-3', title: 'Shibuya Crossing & Shibuya Sky Observation Deck', category: 'Sightseeing', duration: '2.0 hrs', cost: 20, timeOfDay: 'evening', coords: [35.6595, 139.7005], description: 'Experience the world’s busiest pedestrian scramble, then gaze 230 meters high over Tokyo’s neon skyline.', tips: 'Sunset slot gives breathtaking transitions from twilight to neon glow.' },
      { id: 't-act-4', title: 'Meiji Jingu Shrine & Harajuku Takeshita Street', category: 'Culture', duration: '3.0 hrs', cost: 0, timeOfDay: 'morning', coords: [35.6764, 139.6993], description: 'Tranquil 170-acre evergreen forest shrine dedicated to Emperor Meiji, leading directly into youth fashion capital.', tips: 'Look for traditional wedding processions on weekend mornings.' },
      { id: 't-act-5', title: 'Akihabara Electric Town & Retro Arcade Tour', category: 'Entertainment', duration: '2.5 hrs', cost: 15, timeOfDay: 'afternoon', coords: [35.6983, 139.7731], description: 'Mecca for anime, tech gadgets, retro gaming collectibles, and multi-floor game centers.', tips: 'Visit Super Potato for classic Nintendo & Sega relics.' },
      { id: 't-act-6', title: 'Shinjuku Golden Gai & Omoide Yokocho Food Alleys', category: 'Nightlife', duration: '2.5 hrs', cost: 35, timeOfDay: 'evening', coords: [35.6942, 139.7042], description: 'Maze of 200+ miniature lantern-lit yakitori bars packed into 6 narrow post-war alleyways.', tips: 'Small cover fees of 500-1000 yen apply at many tiny 6-seat bars.' },
      { id: 't-act-7', title: 'Tsukiji Outer Market Culinary Exploration', category: 'Foodie', duration: '2.0 hrs', cost: 25, timeOfDay: 'morning', coords: [35.6655, 139.7708], description: 'Sample fresh A5 Wagyu skewers, tamagoyaki omelettes, uni sea urchin bowls, and matcha soft serve.', tips: 'Cash is king here; stalls wind down by 1:30 PM.' },
      { id: 't-act-8', title: 'Ghibli Museum / Mitaka Forest Walk', category: 'Art', duration: '3.0 hrs', cost: 12, timeOfDay: 'afternoon', coords: [35.6963, 139.5704], description: 'Magical interactive museum celebrating Hayao Miyazaki masterpieces with rooftop Robot Soldier.', tips: 'Tickets require lottery reservations on the 10th of prior month.' }
    ],
    dining: [
      { name: 'Afuri Ramen (Ebisu / Harajuku)', meal: 'dinner', cuisine: 'Yuzu Shio Ramen', cost: 16, tags: ['Vegan Option', 'Gluten-Free Option'], location: 'Ebisu', specialty: 'Signature citrusy Yuzu Shio broth with char-broiled chashu.' },
      { name: 'Katsukura Tonkatsu Shinjuku Takashimaya', meal: 'lunch', cuisine: 'Kyoto-style Tonkatsu', cost: 22, tags: ['Local Classic'], location: 'Shinjuku', specialty: 'Golden panko pork cutlets with freshly ground sesame sauce.' },
      { name: 'Ain Soph. Journey', meal: 'lunch', cuisine: 'Organic Plant-Based / Japanese Fusion', cost: 20, tags: ['Vegan', 'Vegetarian'], location: 'Shinjuku', specialty: 'Fluffy heavenly vegan pancakes and seasonal bento boxes.' },
      { name: 'Halal Wagyu Yakiniku Panga', meal: 'dinner', cuisine: 'Certified Halal Wagyu Beef', cost: 55, tags: ['Halal', 'Foodie'], location: 'Taito / Okachimachi', specialty: 'Melt-in-mouth A5 Kuroge Wagyu grilled table-side.' },
      { name: 'Fuglen Tokyo', meal: 'breakfast', cuisine: 'Artisan Coffee & Norwegian Pastries', cost: 10, tags: ['Cafe', 'Vegetarian'], location: 'Yoyogi Koen', specialty: 'Single-origin pour-overs in a mid-century Scandinavian setting.' }
    ]
  },
  {
    id: 'paris',
    name: 'Paris, France',
    shortName: 'Paris',
    country: 'France',
    coords: [48.8566, 2.3522],
    currency: 'EUR',
    heroImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Haussmann Boulevards, Iconic Art & Haute Cuisine',
    weather: { temp: '16°C / 61°F', condition: 'Pleasant & Crisp', packing: ['Stylish comfortable walking shoes', 'Trench coat or light jacket', 'Compact umbrella', 'Crossbody anti-theft bag', 'Museum Pass'] },
    neighborhoods: [
      { name: 'Le Marais (3rd/4th Arr.)', vibe: 'Historic cobblestones, hip boutiques, art cafes', safety: 9.6 },
      { name: 'Saint-Germain-des-Prés (6th Arr.)', vibe: 'Literary cafes, jazz bars & Left Bank charm', safety: 9.7 },
      { name: 'Montmartre (18th Arr.)', vibe: 'Bohemian artists, Sacré-Cœur hill & panoramic views', safety: 8.9 }
    ],
    flights: [
      { airline: 'Air France', code: 'AF022', flightType: 'Direct', duration: '8h 15m', basePrice: 890, carbonKg: 590, departureTime: '18:20', arrivalTime: '07:35 (+1)' },
      { airline: 'Delta Air Lines', code: 'DL264', flightType: 'Direct', duration: '8h 30m', basePrice: 850, carbonKg: 610, departureTime: '19:40', arrivalTime: '09:10 (+1)' },
      { airline: 'Lufthansa', code: 'LH411', flightType: '1-Stop via FRA', duration: '10h 40m', basePrice: 660, carbonKg: 680, departureTime: '15:10', arrivalTime: '08:50 (+1)' },
      { airline: 'French Bee', code: 'BF731', flightType: 'Direct (Budget Economy)', duration: '8h 20m', basePrice: 480, carbonKg: 550, departureTime: '22:30', arrivalTime: '12:00 (+1)' }
    ],
    accommodations: [
      { id: 'paris-hotel-1', name: 'Le Pavillon de la Reine & Spa', tier: 'luxury', pricePerNight: 390, rating: 4.9, location: 'Place des Vosges, Le Marais', coords: [48.8556, 2.3662], amenities: ['Private Courtyard Garden', 'Carita Spa & Hammam', 'Valet', 'Historic Elegance'] },
      { id: 'paris-hotel-2', name: 'Hôtel Fabric', tier: 'boutique', pricePerNight: 230, rating: 4.8, location: 'Oberkampf / 11th Arr.', coords: [48.8624, 2.3736], amenities: ['Converted Textile Factory', 'Cocktail Honesty Bar', 'Fitness & Sauna', 'Boutique Decor'] },
      { id: 'paris-hotel-3', name: 'Hôtel Saint-Louis en l’Isle', tier: 'moderate', pricePerNight: 160, rating: 4.6, location: 'Île Saint-Louis / Seine', coords: [48.8521, 2.3559], amenities: ['Historic Island Location', 'Exposed Oak Beams', 'Walk to Notre-Dame'] },
      { id: 'paris-hotel-4', name: 'The People Hostel - Paris Belleville', tier: 'budget', pricePerNight: 60, rating: 4.5, location: 'Belleville', coords: [48.8715, 2.3789], amenities: ['Rooftop Bar with Eiffel Tower View', 'Modern Privacy Pods', 'Lively Cafe'] }
    ],
    attractions: [
      { id: 'p-act-1', title: 'Louvre Museum Masterpiece Trail (Mona Lisa & Venus de Milo)', category: 'Art', duration: '3.5 hrs', cost: 22, timeOfDay: 'morning', coords: [48.8606, 2.3376], description: 'The world’s largest art museum in a former royal palace holding 35,000 timeless treasures.', tips: 'Enter via Carrousel du Louvre underground mall to skip main pyramid queues.' },
      { id: 'p-act-2', title: 'Eiffel Tower Summit & Champ de Mars Picnic', category: 'Sightseeing', duration: '2.5 hrs', cost: 35, timeOfDay: 'afternoon', coords: [48.8584, 2.2945], description: 'Ascend Gustave Eiffel’s 330m iron lady for 360-degree vistas, then unwind on grassy lawns.', tips: 'Book summit elevator slots 60 days in advance.' },
      { id: 'p-act-3', title: 'Seine River Sunset Cruise (Bateaux-Mouches)', category: 'Sightseeing', duration: '1.5 hrs', cost: 18, timeOfDay: 'evening', coords: [48.8637, 2.3023], description: 'Glide past floodlit bridges, Notre-Dame cathedral, and the glittering illuminated monuments.', tips: 'Depart 30 minutes before sunset for golden hour photo perfection.' },
      { id: 'p-act-4', title: 'Musée d’Orsay Impressionist Haven', category: 'Art', duration: '2.5 hrs', cost: 16, timeOfDay: 'morning', coords: [48.8599, 2.3265], description: 'Converted Beaux-Arts railway station featuring Monet, Van Gogh, Renoir, and Degas.', tips: 'Head straight to 5th floor clock face gallery for view of Montmartre.' },
      { id: 'p-act-5', title: 'Montmartre Sacré-Cœur & Place du Tertre Artists', category: 'Culture', duration: '3.0 hrs', cost: 0, timeOfDay: 'afternoon', coords: [48.8867, 2.3431], description: 'Whitestone basilica perched atop Paris with portrait painters and hidden vineyards.', tips: 'Take funicular if you want to avoid 222 steps.' },
      { id: 'p-act-6', title: 'Sainte-Chapelle Stained Glass Jewel Box', category: 'History', duration: '1.5 hrs', cost: 13, timeOfDay: 'afternoon', coords: [48.8554, 2.3450], description: '13th-century Gothic royal chapel with 1,113 brilliant biblical stained-glass panels.', tips: 'Visit on a sunny day between 11 AM and 3 PM for peak light illumination.' }
    ],
    dining: [
      { name: 'Bouillon Chartier (Grands Boulevards)', meal: 'dinner', cuisine: 'Classic French Bistro', cost: 22, tags: ['Historic', 'Budget-Friendly'], location: '9th Arr.', specialty: 'Escargots, Duck Confit, and homemade chocolate mousse under Belle Époque ceilings.' },
      { name: 'L’As du Fallafel', meal: 'lunch', cuisine: 'Middle Eastern / Falafel', cost: 12, tags: ['Vegetarian', 'Vegan Option', 'Kosher'], location: 'Rue des Rosiers, Le Marais', specialty: 'Famous pita filled with crispy spiced falafel, fried eggplant, and tahini.' },
      { name: 'Breizh Café Le Marais', meal: 'lunch', cuisine: 'Artisan Breton Crêpes & Cider', cost: 24, tags: ['Gluten-Free Option', 'Foodie'], location: 'Le Marais', specialty: 'Organic buckwheat galettes with smoked duck breast and Bordier butter.' },
      { name: 'Le Relais de l’Entrecôte', meal: 'dinner', cuisine: 'Steak Frites', cost: 38, tags: ['French Classic'], location: 'Saint-Germain', specialty: 'Sirloin steak served with secret herb-butter sauce and golden matchstick fries in two rounds.' },
      { name: 'Café de Flore', meal: 'breakfast', cuisine: 'Iconic Literary Cafe', cost: 18, tags: ['Historic Landmark'], location: 'Boulevard Saint-Germain', specialty: 'Chocolat chaud à l’ancienne and buttery croissants.' }
    ]
  },
  {
    id: 'rome',
    name: 'Rome, Italy',
    shortName: 'Rome',
    country: 'Italy',
    coords: [41.9028, 12.4964],
    currency: 'EUR',
    heroImage: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Ancient Colosseum, Baroque Plazas & Renaissance Splendor',
    weather: { temp: '21°C / 70°F', condition: 'Warm & Sunny', packing: ['Breathable cotton clothing', 'Comfortable cobblestone walking shoes', 'Modest attire for Vatican / Churches (knees and shoulders covered)', 'Reusable water bottle for "Nasoni" fountains'] },
    neighborhoods: [
      { name: 'Trastevere', vibe: 'Bohemian cobblestones, ivy-draped trattorias & nightlife', safety: 9.5 },
      { name: 'Centro Storico / Pantheon', vibe: 'Renaissance palazzos, piazza fountains & lively cafes', safety: 9.7 },
      { name: 'Monti', vibe: 'Artisan boutiques, trendy wine bars, close to Colosseum', safety: 9.6 }
    ],
    flights: [
      { airline: 'ITA Airways', code: 'AZ609', flightType: 'Direct', duration: '8h 40m', basePrice: 860, carbonKg: 610, departureTime: '16:00', arrivalTime: '06:50 (+1)' },
      { airline: 'Delta Air Lines', code: 'DL182', flightType: 'Direct', duration: '8h 50m', basePrice: 890, carbonKg: 630, departureTime: '17:30', arrivalTime: '08:25 (+1)' },
      { airline: 'Swiss International', code: 'LX17', flightType: '1-Stop via ZRH', duration: '10h 30m', basePrice: 630, carbonKg: 690, departureTime: '18:15', arrivalTime: '09:40 (+1)' }
    ],
    accommodations: [
      { id: 'rome-hotel-1', name: 'Hotel de Russie (Rocco Forte)', tier: 'luxury', pricePerNight: 450, rating: 4.9, location: 'Piazza del Popolo', coords: [41.9103, 12.4776], amenities: ['Secret Terraced Gardens', 'Stravinskij Cocktail Bar', 'Luxury Wellness Spa'] },
      { id: 'rome-hotel-2', name: 'Donna Camilla Savelli - VRetreats', tier: 'boutique', pricePerNight: 240, rating: 4.8, location: 'Trastevere', coords: [41.8893, 12.4674], amenities: ['17th-Century Baroque Monastery', 'Rooftop Terrace', 'Internal Cloister Garden'] },
      { id: 'rome-hotel-3', name: 'Navona 49 Boutique Suites', tier: 'moderate', pricePerNight: 165, rating: 4.7, location: 'Piazza Navona', coords: [41.8992, 12.4731], amenities: ['Direct Piazza Navona Views', 'Soundproof Rooms', 'Complimentary Espresso'] },
      { id: 'rome-hotel-4', name: 'The YellowSquare Rome', tier: 'budget', pricePerNight: 50, rating: 4.5, location: 'Castro Pretorio', coords: [41.9056, 12.5028], amenities: ['Co-working space', 'Cooking Classes', 'Lively Bar & Arcade'] }
    ],
    attractions: [
      { id: 'r-act-1', title: 'Colosseum, Roman Forum & Palatine Hill Underground Pass', category: 'History', duration: '3.5 hrs', cost: 26, timeOfDay: 'morning', coords: [41.8902, 12.4922], description: 'Walk where gladiators clashed and stand at the epicenter of the mighty Roman Empire.', tips: 'Book official CoopCulture tickets exactly 30 days ahead.' },
      { id: 'r-act-2', title: 'Vatican Museums, Sistine Chapel & St. Peter’s Basilica', category: 'Art & History', duration: '4.0 hrs', cost: 28, timeOfDay: 'morning', coords: [41.9065, 12.4536], description: 'Michelangelo’s legendary Sistine ceiling and Raphael’s School of Athens in the papal palaces.', tips: 'Strict dress code: shoulders and knees must be fully covered.' },
      { id: 'r-act-3', title: 'Pantheon & Piazza Navona Fountains Stroll', category: 'Sightseeing', duration: '2.0 hrs', cost: 5, timeOfDay: 'afternoon', coords: [41.8986, 12.4769], description: 'Marvel at the 2,000-year-old unreinforced concrete dome with open oculus and Bernini’s Fountain of Four Rivers.', tips: 'Grab gelato at Frigidarium nearby.' },
      { id: 'r-act-4', title: 'Trevi Fountain Coin Toss & Spanish Steps at Sunset', category: 'Sightseeing', duration: '2.0 hrs', cost: 0, timeOfDay: 'evening', coords: [41.9009, 12.4833], description: 'Toss a coin over your left shoulder to ensure your return to the Eternal City.', tips: 'Trevi is magical late at night (after 10:30 PM) when crowds disperse.' },
      { id: 'r-act-5', title: 'Trastevere Sunset Food & Wine Walking Exploration', category: 'Foodie', duration: '3.0 hrs', cost: 40, timeOfDay: 'evening', coords: [41.8887, 12.4695], description: 'Wander medieval cobblestones savoring supplì rice balls, pecorino cheese, prosciutto, and Chianti.', tips: 'Cross Ponte Sisto bridge on foot for sunset river buskers.' }
    ],
    dining: [
      { name: 'Tonnarello (Trastevere)', meal: 'dinner', cuisine: 'Roman Pasta Classics', cost: 22, tags: ['Local Classic', 'Foodie'], location: 'Trastevere', specialty: 'Fresh handmade Cacio e Pepe and Carbonara served in vintage iron skillets.' },
      { name: 'Roscioli Salumeria con Cucina', meal: 'lunch', cuisine: 'Gourmet Deli & Wine Bar', cost: 38, tags: ['Michelin Listed', 'Foodie'], location: 'Campo de’ Fiori', specialty: 'Legendary Carbonara crafted with aged Guanciale and 36-month Parmigiano.' },
      { name: 'Supplizio', meal: 'lunch', cuisine: 'Artisan Street Food', cost: 12, tags: ['Budget-Friendly', 'Quick Bite'], location: 'Via dei Banchi Vecchi', specialty: 'Crispy deep-fried supplì with melted mozzarella core and beef ragù.' },
      { name: 'Buddy Veggy Restaurant Café', meal: 'dinner', cuisine: 'Italian 100% Plant-Based', cost: 24, tags: ['Vegan', 'Vegetarian'], location: 'Corso Vittorio Emanuele II', specialty: 'Vegan Roman pizzas, plant-based amatriciana, and cashew tiramisu.' },
      { name: 'Sant’Eustachio Il Caffè', meal: 'breakfast', cuisine: 'Historic Coffee Roaster', cost: 6, tags: ['Historic Cafe'], location: 'Near Pantheon', specialty: 'Gran Caffè with dense, silky golden crema.' }
    ]
  },
  {
    id: 'bali',
    name: 'Bali, Indonesia',
    shortName: 'Bali',
    country: 'Indonesia',
    coords: [-8.4095, 115.1889],
    currency: 'IDR',
    heroImage: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Emerald Rice Terraces, Spiritual Temples & Ocean Sunsets',
    weather: { temp: '28°C / 82°F', condition: 'Tropical & Balmy', packing: ['Reef-safe sunscreen', 'Swimwear & rashguard', 'Sarong for temple entry', 'Mosquito repellent', 'Light cotton clothing'] },
    neighborhoods: [
      { name: 'Ubud', vibe: 'Jungle waterfalls, yoga retreats, art galleries & wellness cafes', safety: 9.8 },
      { name: 'Canggu / Seminyak', vibe: 'Surfing waves, sunset beach clubs, boutique shopping', safety: 9.4 },
      { name: 'Uluwatu (The Bukit)', vibe: 'Clifftop ocean views, world-class surf, Kecak fire dance', safety: 9.7 }
    ],
    flights: [
      { airline: 'Singapore Airlines', code: 'SQ948', flightType: '1-Stop via SIN', duration: '19h 30m', basePrice: 940, carbonKg: 780, departureTime: '23:15', arrivalTime: '09:35 (+2)' },
      { airline: 'Qatar Airways', code: 'QR962', flightType: '1-Stop via DOH', duration: '20h 45m', basePrice: 890, carbonKg: 810, departureTime: '21:00', arrivalTime: '17:30 (+1)' },
      { airline: 'Emirates', code: 'EK398', flightType: '1-Stop via DXB', duration: '21h 10m', basePrice: 920, carbonKg: 820, departureTime: '22:20', arrivalTime: '16:35 (+1)' }
    ],
    accommodations: [
      { id: 'bali-hotel-1', name: 'Four Seasons Resort Bali at Sayan', tier: 'luxury', pricePerNight: 550, rating: 4.9, location: 'Ubud River Valley', coords: [-8.4988, 115.2443], amenities: ['Lotus Pond Suspension Bridge', 'Ayung River Villas', 'Sacred River Spa', 'Infinity Pools'] },
      { id: 'bali-hotel-2', name: 'The Kayon Jungle Resort', tier: 'boutique', pricePerNight: 280, rating: 4.8, location: 'Tegallalang, Ubud', coords: [-8.4312, 115.2813], amenities: ['Three-Tier Terraced Pool', 'Jungle Valley Pavilion', 'Complimentary Yoga'] },
      { id: 'bali-hotel-3', name: 'Desa Hay Canggu Eco-Villa', tier: 'moderate', pricePerNight: 130, rating: 4.7, location: 'Canggu', coords: [-8.6385, 115.1432], amenities: ['Private Plunge Pool', 'Lush Tropical Garden', 'Free Scooter Rental'] },
      { id: 'bali-hotel-4', name: 'Arya Wellness Retreat & Hostel', tier: 'budget', pricePerNight: 35, rating: 4.6, location: 'Ubud Central', coords: [-8.5115, 115.2635], amenities: ['Daily Yoga Classes', 'Plant-Based Breakfast', 'Curated Pod Cabins', 'Pool'] }
    ],
    attractions: [
      { id: 'b-act-1', title: 'Tegallalang Rice Terraces & Jungle Swing', category: 'Nature', duration: '3.0 hrs', cost: 18, timeOfDay: 'morning', coords: [-8.4335, 115.2798], description: 'UNESCO-heritage subak irrigation ravines with dramatic giant swings over the green jungle canopy.', tips: 'Reach before 8:00 AM to see morning sun rays piercing the palms.' },
      { id: 'b-act-2', title: 'Sacred Monkey Forest Sanctuary (Ubud)', category: 'Nature & Culture', duration: '2.0 hrs', cost: 6, timeOfDay: 'afternoon', coords: [-8.5188, 115.2586], description: 'Lush 12-hectare forest inhabited by over 1,000 Balinese long-tailed macaques and ancient temples.', tips: 'Secure sunglasses, loose jewelry, and water bottles in zipped bags.' },
      { id: 'b-act-3', title: 'Uluwatu Clifftop Temple & Kecak Sunset Fire Dance', category: 'Culture', duration: '3.0 hrs', cost: 15, timeOfDay: 'evening', coords: [-8.8291, 115.0849], description: 'Watch 70+ hypnotic chanting performers dramatize the Ramayana as the orange sun sinks into the Indian Ocean.', tips: 'Buy dance amphitheater tickets by 4:30 PM for good front-row views.' },
      { id: 'b-act-4', title: 'Tegenungan & Kanto Lampo Cascading Waterfalls Tour', category: 'Adventure', duration: '3.5 hrs', cost: 10, timeOfDay: 'morning', coords: [-8.5302, 115.3314], description: 'Swim in natural rock pools surrounded by sheer tropical cliffs and step-cascades.', tips: 'Wear water shoes or grippy sandals for slippery rocks.' },
      { id: 'b-act-5', title: 'Nusa Penida Day Trip (Kelingking T-Rex Beach & Angel’s Billabong)', category: 'Adventure', duration: '8.0 hrs', cost: 55, timeOfDay: 'morning', coords: [-8.7516, 115.4748], description: 'Fast boat crossing to dramatic dinosaur-shaped limestone cliffs towering above turquoise lagoons.', tips: 'Bring Dramamine if prone to sea motion on speedboats.' }
    ],
    dining: [
      { name: 'Moksa Plant-based Cuisine & Permaculture Garden', meal: 'lunch', cuisine: 'Farm-to-Table Vegan', cost: 18, tags: ['Vegan', 'Vegetarian', 'Gluten-Free'], location: 'Sayan, Ubud', specialty: 'Raw vegan lasagna, jackfruit curry, and artisanal coconut kefir.' },
      { name: 'Warung Babi Guling Ibu Oka 3', meal: 'lunch', cuisine: 'Authentic Balinese Feast', cost: 8, tags: ['Local Heritage', 'Budget-Friendly'], location: 'Ubud Central', specialty: 'Crispy crackling roast suckling pig with spiced lawar and fragrant rice.' },
      { name: 'La Brisa Bali Sunset Beach Club', meal: 'dinner', cuisine: 'Seafood & Spanish Tapas', cost: 35, tags: ['Ocean View', 'Cocktails'], location: 'Echo Beach, Canggu', specialty: 'Grilled octopus, tuna ceviche, and passionfruit sunset cocktails.' },
      { name: 'Nusantara by Locavore', meal: 'dinner', cuisine: 'Indonesian Archipelago Fine Dining', cost: 45, tags: ['Michelin Quality', 'Foodie'], location: 'Ubud', specialty: 'Rare regional dishes gathered from across 17,000 Indonesian islands.' },
      { name: 'Clear Cafe Ubud', meal: 'breakfast', cuisine: 'Organic Wellness & Fresh Smoothies', cost: 12, tags: ['Healthy', 'Vegetarian Option'], location: 'Ubud', specialty: 'Dragonfruit smoothie bowls and cashew matcha lattes.' }
    ]
  },
  {
    id: 'swiss-alps',
    name: 'Interlaken & Swiss Alps, Switzerland',
    shortName: 'Swiss Alps',
    country: 'Switzerland',
    coords: [46.6863, 7.8632],
    currency: 'CHF',
    heroImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Snowcapped Glaciers, Turquoise Alpine Lakes & Mountain Cogwheels',
    weather: { temp: '14°C / 57°F', condition: 'Crisp Mountain Breeze', packing: ['Layered fleece & waterproof windbreaker', 'Sturdy hiking boots', 'Sunglasses & alpine UV sunscreen', 'Swiss Travel Pass', 'Reusable insulated thermos'] },
    neighborhoods: [
      { name: 'Lauterbrunnen Valley', vibe: '72 roaring waterfalls, wooden chalets, sheer limestone walls', safety: 10.0 },
      { name: 'Grindelwald First', vibe: 'Glacier peaks, cliff walks, zip lines & alpine hiking trails', safety: 9.9 },
      { name: 'Interlaken Town', vibe: 'Basecamp nestled between Lake Thun and Lake Brienz', safety: 9.9 }
    ],
    flights: [
      { airline: 'Swiss International Air Lines', code: 'LX19', flightType: 'Direct to ZRH + Train', duration: '9h 15m', basePrice: 990, carbonKg: 640, departureTime: '17:50', arrivalTime: '07:45 (+1)' },
      { airline: 'United Airlines', code: 'UA134', flightType: 'Direct to GVA + Train', duration: '9h 40m', basePrice: 940, carbonKg: 660, departureTime: '18:30', arrivalTime: '08:20 (+1)' },
      { airline: 'Lufthansa', code: 'LH401', flightType: '1-Stop via FRA', duration: '11h 20m', basePrice: 710, carbonKg: 720, departureTime: '15:45', arrivalTime: '09:10 (+1)' }
    ],
    accommodations: [
      { id: 'swiss-hotel-1', name: 'Victoria-Jungfrau Grand Hotel & Spa', tier: 'luxury', pricePerNight: 520, rating: 4.9, location: 'Interlaken', coords: [46.6874, 7.8596], amenities: ['Spa Nescens 5500sqm', 'Jungfrau Mountain Views', 'Fine Dining Gourmet Kitchen'] },
      { id: 'swiss-hotel-2', name: 'Hotel Silberhorn Lauterbrunnen', tier: 'boutique', pricePerNight: 240, rating: 4.7, location: 'Lauterbrunnen Valley', coords: [46.5975, 7.9084], amenities: ['Direct Staubbach Falls View', 'Traditional Alpine Wood Balconies', 'Sauna'] },
      { id: 'swiss-hotel-3', name: 'Derby Hotel Grindelwald', tier: 'moderate', pricePerNight: 175, rating: 4.6, location: 'Grindelwald Train Station', coords: [46.6247, 8.0345], amenities: ['Alpine Panorama', 'Right at Train Station', 'Fondue Stübli'] },
      { id: 'swiss-hotel-4', name: 'Balmers Hostel & Tents', tier: 'budget', pricePerNight: 55, rating: 4.5, location: 'Interlaken Matten', coords: [46.6806, 7.8687], amenities: ['Oldest Swiss Private Hostel', 'Outdoor Hot Tub', 'Games Room', 'Biergarten'] }
    ],
    attractions: [
      { id: 's-act-1', title: 'Jungfraujoch - Top of Europe Cogwheel Train', category: 'Adventure & Nature', duration: '5.0 hrs', cost: 95, timeOfDay: 'morning', coords: [46.5475, 7.9822], description: 'Ride the highest railway station in Europe at 3,454m into the Aletsch Glacier Ice Palace.', tips: 'Check webcams early morning for cloud-free mountain clearance.' },
      { id: 's-act-2', title: 'Grindelwald First Cliff Walk & First Glider', category: 'Adventure', duration: '3.5 hrs', cost: 42, timeOfDay: 'afternoon', coords: [46.6601, 8.0531], description: 'Suspension bridge walk cantilevered 45 meters out over the dizzying alpine abyss.', tips: 'Combine with the hike to pristine alpine Lake Bachalpsee (1.5h return).' },
      { id: 's-act-3', title: 'Lauterbrunnen Valley Staubbach & Trümmelbach Falls', category: 'Nature', duration: '3.0 hrs', cost: 14, timeOfDay: 'morning', coords: [46.5702, 7.9131], description: 'Wander Tolkien-inspired valley and witness ten glacier waterfalls inside a subterranean mountain cavern.', tips: 'Bring a waterproof jacket inside the roaring Trümmelbach cave lifts.' },
      { id: 's-act-4', title: 'Lake Brienz Turquoise Steamboat Cruise to Giessbach Falls', category: 'Sightseeing', duration: '2.5 hrs', cost: 28, timeOfDay: 'afternoon', coords: [46.7352, 8.0211], description: 'Cruise on glacial turquoise waters stopping at the historic 1879 Grandhotel Giessbach waterfalls.', tips: 'Sit on upper deck for 360-degree fjord-like mountain views.' }
    ],
    dining: [
      { name: 'Restaurant Taverne at Hotel Interlaken', meal: 'dinner', cuisine: 'Modern Swiss & Fondue', cost: 42, tags: ['Traditional Swiss', 'Foodie'], location: 'Interlaken', specialty: 'Half-and-half Gruyère & Vacherin cheese fondue with crusty bread and cornichons.' },
      { name: 'Barry’s Restaurant & Bar (Grindelwald)', meal: 'dinner', cuisine: 'Alpine Chalet Grill', cost: 38, tags: ['Chalet Vibe'], location: 'Grindelwald', specialty: 'Sizzling table-top raclette and Swiss rösti potato cakes with smoked bacon.' },
      { name: 'Restaurant Weidstübli Lauterbrunnen', meal: 'lunch', cuisine: 'Rustic Alpine Fare', cost: 24, tags: ['Local Heritage'], location: 'Lauterbrunnen', specialty: 'Homemade alpine macaroni with caramelized onions, applesauce, and melted cheese.' },
      { name: 'The Greenhouse Cafe Interlaken', meal: 'lunch', cuisine: 'Organic Vegan & Smoothies', cost: 16, tags: ['Vegan', 'Vegetarian'], location: 'Interlaken', specialty: 'Avocado toast on sourdough, quinoa power bowls, and oat lattes.' },
      { name: 'Velo Cafe Interlaken', meal: 'breakfast', cuisine: 'Artisan Bakery & Specialty Coffee', cost: 12, tags: ['Cafe'], location: 'Interlaken Central', specialty: 'Freshly baked Swiss croissants, bircher muesli, and flat whites.' }
    ]
  },
  {
    id: 'new-york',
    name: 'New York City, USA',
    shortName: 'New York',
    country: 'USA',
    coords: [40.7128, -74.0060],
    currency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?auto=format&fit=crop&w=1200&q=80',
    tagline: 'Broadway Lights, Iconic Skyscraper Horizons & Global Flavors',
    weather: { temp: '20°C / 68°F', condition: 'Breezy & Bright', packing: ['Very durable walking sneakers', 'MetroCard / OMNY contactless card', 'Light layers', 'Broadway show smart-casual outfit'] },
    neighborhoods: [
      { name: 'Greenwich Village / SoHo', vibe: 'Historic brownstones, indie boutiques, jazz clubs', safety: 9.6 },
      { name: 'Midtown Manhattan', vibe: 'Times Square, Broadway theaters, Central Park edge', safety: 9.4 },
      { name: 'DUMBO / Brooklyn Bridge', vibe: 'Cobblestone streets, skyline river views, hip cafes', safety: 9.7 }
    ],
    flights: [
      { airline: 'Delta Air Lines', code: 'DL415', flightType: 'Direct', duration: '5h 45m', basePrice: 380, carbonKg: 390, departureTime: '08:00', arrivalTime: '16:45' },
      { airline: 'JetBlue Airways', code: 'B6214', flightType: 'Direct', duration: '5h 30m', basePrice: 340, carbonKg: 370, departureTime: '11:15', arrivalTime: '19:45' },
      { airline: 'American Airlines', code: 'AA18', flightType: 'Direct', duration: '5h 40m', basePrice: 360, carbonKg: 380, departureTime: '14:30', arrivalTime: '23:10' }
    ],
    accommodations: [
      { id: 'nyc-hotel-1', name: 'The Beekman, A Thompson Hotel', tier: 'luxury', pricePerNight: 420, rating: 4.8, location: 'Financial District', coords: [40.7113, -74.0064], amenities: ['Nine-Story Victorian Atrium', 'Tom Colicchio Restaurant', 'Vintage Bar'] },
      { id: 'nyc-hotel-2', name: 'Arlo SoHo', tier: 'boutique', pricePerNight: 240, rating: 4.7, location: 'SoHo / Hudson Square', coords: [40.7247, -74.0094], amenities: ['Rooftop Hudson River Views', 'Courtyard Patio', 'Free Priority Bicycles'] },
      { id: 'nyc-hotel-3', name: 'Pod Times Square', tier: 'moderate', pricePerNight: 150, rating: 4.5, location: 'Hell’s Kitchen / Midtown', coords: [40.7580, -73.9926], amenities: ['Efficient Micro-Rooms', 'Tiki Lounge Bar', 'Walking Distance to Broadway'] },
      { id: 'nyc-hotel-4', name: 'HI New York City Hostel', tier: 'budget', pricePerNight: 65, rating: 4.4, location: 'Upper West Side', coords: [40.7995, -73.9678], amenities: ['Historic Victorian Building', 'Massive Courtyard Patio', 'Free Walking Tours'] }
    ],
    attractions: [
      { id: 'ny-act-1', title: 'Summit One Vanderbilt Immersive Glass Observation', category: 'Sightseeing', duration: '2.5 hrs', cost: 42, timeOfDay: 'morning', coords: [40.7529, -73.9789], description: 'Multi-sensory mirror rooms and floating silver spheres towering 1,000 feet above Grand Central.', tips: 'Sunglasses are provided and essential due to reflection brightness.' },
      { id: 'ny-act-2', title: 'The High Line Elevated Park & Chelsea Market', category: 'Culture & Nature', duration: '2.5 hrs', cost: 0, timeOfDay: 'afternoon', coords: [40.7480, -74.0048], description: 'Stroll a 1.45-mile public park built on a historic freight rail line above the Meatpacking District.', tips: 'Grab lobster rolls or artisan tacos inside Chelsea Market midway.' },
      { id: 'ny-act-3', title: 'Broadway Musical Evening (Wicked / Lion King / Hamilton)', category: 'Entertainment', duration: '3.0 hrs', cost: 95, timeOfDay: 'evening', coords: [40.7590, -73.9845], description: 'World-renowned theatrical performances in the beating heart of the Theater District.', tips: 'Visit TKTS booth in Times Square for up to 50% discount same-day tickets.' },
      { id: 'ny-act-4', title: 'Brooklyn Bridge Walk & DUMBO Jane’s Carousel', category: 'Sightseeing', duration: '2.5 hrs', cost: 0, timeOfDay: 'morning', coords: [40.7061, -73.9969], description: 'Cross the iconic 1883 suspension bridge with spectacular views of lower Manhattan skyline.', tips: 'Walk from Brooklyn toward Manhattan for the most dramatic skyline perspective.' },
      { id: 'ny-act-5', title: 'Central Park Rowboat & Bethesda Terrace', category: 'Nature', duration: '3.0 hrs', cost: 25, timeOfDay: 'afternoon', coords: [40.7738, -73.9708], description: 'Rent a classic rowboat at Loeb Boathouse and explore Bow Bridge and Strawberry Fields.', tips: 'Cash deposit required for boat rentals.' }
    ],
    dining: [
      { name: 'Joe’s Pizza (Greenwich Village)', meal: 'lunch', cuisine: 'Classic NYC Slice', cost: 10, tags: ['Iconic Street Food', 'Budget-Friendly'], location: 'Carmine St', specialty: 'Crispy, thin-crust cheese slice with sweet tomato sauce since 1975.' },
      { name: 'Katz’s Delicatessen', meal: 'lunch', cuisine: 'Legendary Jewish Deli', cost: 28, tags: ['Historic Landmark', 'Foodie'], location: 'Lower East Side', specialty: 'Towering warm pastrami on rye with sour pickles.' },
      { name: 'Gramercy Tavern', meal: 'dinner', cuisine: 'Contemporary American Fine Dining', cost: 65, tags: ['Michelin Listed', 'Foodie'], location: 'Gramercy', specialty: 'Wood-fired seasonal tasting menu with warm hospitality.' },
      { name: 'Dirt Candy', meal: 'dinner', cuisine: 'Innovative Vegetable Haute Cuisine', cost: 50, tags: ['Michelin Star', 'Vegetarian', 'Vegan Option'], location: 'Lower East Side', specialty: 'Tasting menu purely celebrating the alchemy of vegetables.' },
      { name: 'Russ & Daughters Cafe', meal: 'breakfast', cuisine: 'Appetizing Bakery & Smoked Fish', cost: 22, tags: ['Historic Classic'], location: 'Lower East Side', specialty: 'Nova smoked salmon on toasted everything bagel with scallion cream cheese.' }
    ]
  }
];

// Fallback dynamic generator for any custom destination typed by user
export function generateSyntheticDestinationData(destinationName) {
  const cleanName = destinationName.trim();
  const slug = cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  return {
    id: slug,
    name: cleanName,
    shortName: cleanName.split(',')[0],
    country: 'International Destination',
    coords: [30.0 + (Math.random() * 20 - 10), 10.0 + (Math.random() * 40 - 20)],
    currency: 'USD',
    heroImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80',
    tagline: `Uncover the wonders, historic landmarks and vibrant culture of ${cleanName}`,
    weather: { temp: '22°C / 72°F', condition: 'Pleasant & Mild', packing: ['Comfortable walking shoes', 'Daypack', 'Camera / Smartphone', 'Layered clothing', 'Universal travel adapter'] },
    neighborhoods: [
      { name: `${cleanName} Historic Old Town`, vibe: 'Cobblestone streets, landmarks & cafes', safety: 9.6 },
      { name: `${cleanName} Downtown / Central`, vibe: 'Shopping, dining, culture & nightlife', safety: 9.5 },
      { name: `${cleanName} Waterfront / Arts District`, vibe: 'Scenic walks, museums & modern galleries', safety: 9.7 }
    ],
    flights: [
      { airline: 'Global Airways Direct', code: 'GA-101', flightType: 'Direct', duration: '7h 30m', basePrice: 650, carbonKg: 520, departureTime: '09:00', arrivalTime: '17:30' },
      { airline: 'SkyConnect Express', code: 'SC-880', flightType: '1-Stop', duration: '9h 45m', basePrice: 480, carbonKg: 590, departureTime: '11:30', arrivalTime: '22:15' },
      { airline: 'TransWorld Premium', code: 'TW-402', flightType: 'Direct (Business/Flex)', duration: '7h 20m', basePrice: 1100, carbonKg: 540, departureTime: '16:00', arrivalTime: '00:20 (+1)' }
    ],
    accommodations: [
      { id: `${slug}-hotel-1`, name: `The Grand ${cleanName} Palace`, tier: 'luxury', pricePerNight: 350, rating: 4.9, location: `Central ${cleanName}`, coords: [30.1, 10.1], amenities: ['Spa & Wellness', 'Concierge Service', 'Panoramic Rooftop', 'Fine Dining'] },
      { id: `${slug}-hotel-2`, name: `${cleanName} Heritage Boutique House`, tier: 'boutique', pricePerNight: 190, rating: 4.8, location: `Old Town ${cleanName}`, coords: [30.08, 10.05], amenities: ['Courtyard Garden', 'Artisanal Breakfast', 'High-Speed Wi-Fi', 'Library Lounge'] },
      { id: `${slug}-hotel-3`, name: `Urban Central Hotel ${cleanName}`, tier: 'moderate', pricePerNight: 120, rating: 4.6, location: `Downtown ${cleanName}`, coords: [30.05, 10.08], amenities: ['Modern Design', 'Fitness Center', 'Near Metro Station'] },
      { id: `${slug}-hotel-4`, name: `Nomad Social Hub & Hostel`, tier: 'budget', pricePerNight: 45, rating: 4.5, location: `Arts District`, coords: [30.02, 10.12], amenities: ['Co-working Space', 'Cafe & Bar', 'Social Events', 'Pod Beds'] }
    ],
    attractions: [
      { id: `${slug}-act-1`, title: `${cleanName} Historic Old Quarter Walking Discovery`, category: 'History', duration: '2.5 hrs', cost: 0, timeOfDay: 'morning', coords: [30.08, 10.05], description: `Explore centuries of architecture, cobblestone avenues, and local craft artisan shops in ${cleanName}.`, tips: 'Wear comfortable walking shoes.' },
      { id: `${slug}-act-2`, title: `${cleanName} Central Museum of Art & Culture`, category: 'Art', duration: '2.5 hrs', cost: 18, timeOfDay: 'afternoon', coords: [30.09, 10.06], description: `Renowned exhibitions housing premier regional masterpieces, sculpture gardens, and historic artifacts.`, tips: 'Guided audio tours are included.' },
      { id: `${slug}-act-3`, title: `Panoramic City Sunset Viewpoint & River Promenade`, category: 'Sightseeing', duration: '2.0 hrs', cost: 0, timeOfDay: 'evening', coords: [30.07, 10.04], description: `Catch golden hour sunset vistas overlooking the skyline followed by a lantern-lit promenade walk.`, tips: 'Great spot for evening photography.' },
      { id: `${slug}-act-4`, title: `${cleanName} Botanical Sanctuary & Royal Gardens`, category: 'Nature', duration: '2.0 hrs', cost: 12, timeOfDay: 'morning', coords: [30.12, 10.09], description: `Lush exotic flora, historic greenhouses, and tranquil fountains perfect for a morning stroll.`, tips: 'Morning light offers peaceful ambience.' },
      { id: `${slug}-act-5`, title: `${cleanName} Local Food & Market Hall Expedition`, category: 'Foodie', duration: '2.5 hrs', cost: 25, timeOfDay: 'afternoon', coords: [30.06, 10.07], description: `Taste regional delicacies, artisan cheeses, freshly baked breads, and local specialties.`, tips: 'Come hungry!' },
      { id: `${slug}-act-6`, title: `Cultural Performance & Evening Illumination Tour`, category: 'Culture', duration: '2.5 hrs', cost: 30, timeOfDay: 'evening', coords: [30.1, 10.08], description: `Experience vibrant traditional music and folklore performance followed by floodlit monument tours.`, tips: 'Dress smart-casual.' }
    ],
    dining: [
      { name: `La Maison ${cleanName}`, meal: 'dinner', cuisine: 'Regional Gastronomy', cost: 35, tags: ['Local Heritage', 'Foodie'], location: 'Old Town', specialty: `Chef’s tasting signature plate highlighting fresh regional ingredients.` },
      { name: `Green Garden Cafe`, meal: 'lunch', cuisine: 'Organic Plant-Based', cost: 16, tags: ['Vegan', 'Vegetarian', 'Gluten-Free Option'], location: 'Arts District', specialty: `Fresh seasonal harvest bowls and cold-pressed juices.` },
      { name: `The Heritage Grill & Terrace`, meal: 'dinner', cuisine: 'Local Specialties & Steaks', cost: 42, tags: ['Fine Dining'], location: 'Downtown', specialty: `Wood-fired steaks and regional wine pairings.` },
      { name: `Street Food Central`, meal: 'lunch', cuisine: 'Authentic Street Food', cost: 10, tags: ['Budget-Friendly', 'Quick Bite'], location: 'Market Quarter', specialty: `Handmade savory pastries and regional skewers.` },
      { name: `Artisan Coffee Roasters`, meal: 'breakfast', cuisine: 'Specialty Coffee & Pastries', cost: 9, tags: ['Cafe'], location: 'Central Avenue', specialty: 'Pour-over coffee and fresh morning pastries.' }
    ]
  };
}

export function findDestination(query) {
  if (!query) return POPULAR_DESTINATIONS[0];
  const q = query.toLowerCase().trim();
  const matched = POPULAR_DESTINATIONS.find(d => 
    d.id.toLowerCase() === q || 
    d.name.toLowerCase().includes(q) || 
    d.shortName.toLowerCase().includes(q) ||
    d.country.toLowerCase().includes(q)
  );
  if (matched) return matched;
  return generateSyntheticDestinationData(query);
}
