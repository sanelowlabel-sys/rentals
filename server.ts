import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { INITIAL_EQUIPMENT, GAUTENG_SUBURBS, GAUTENG_HUBS } from './src/data/equipmentData.ts';
import { Equipment, RentalOrder, RentalStatus, TrackingStep, User } from './src/types.ts';

// In-Memory persistent data store
interface DataStore {
  users: User[];
  equipment: Equipment[];
  wishlists: { userId: string; equipmentId: string; addedAt: string }[];
  rentals: RentalOrder[];
}

const store: DataStore = {
  users: [
    {
      id: 'usr-sanelow',
      email: 'SanelowLabel@gmail.com',
      fullName: 'Sanelo Mhlongo',
      phoneNumber: '+27 82 555 1842',
      suburb: 'Rosebank',
      city: 'Johannesburg',
      postalCode: '2196',
      streetAddress: '42 Oxford Road, Rosebank Studio Complex',
      rewardCredits: 350.0,
      role: 'USER'
    },
    {
      id: 'usr-producer-demo',
      email: 'producer@gautengsound.co.za',
      fullName: 'Kagiso Lekota',
      phoneNumber: '+27 73 992 4110',
      suburb: 'Centurion',
      city: 'Pretoria',
      postalCode: '0157',
      streetAddress: '12 Von Willich Avenue',
      rewardCredits: 180.0,
      role: 'USER'
    }
  ],
  equipment: [...INITIAL_EQUIPMENT],
  wishlists: [
    {
      userId: 'usr-sanelow',
      equipmentId: 'eq-korg-kaossilator',
      addedAt: new Date(Date.now() - 3600000 * 24).toISOString()
    },
    {
      userId: 'usr-sanelow',
      equipmentId: 'eq-yamaha-hs8',
      addedAt: new Date(Date.now() - 3600000 * 48).toISOString()
    }
  ],
  rentals: [
    {
      id: 'ord-gp-8921',
      orderNumber: 'GP-2026-8921',
      userId: 'usr-sanelow',
      userName: 'Sanelo Mhlongo',
      userEmail: 'SanelowLabel@gmail.com',
      userPhone: '+27 82 555 1842',
      status: 'OUT_FOR_DELIVERY',
      deliveryType: 'DELIVERY',
      startDate: new Date(Date.now() - 86400000).toISOString().split('T')[0],
      endDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      durationDays: 4,
      dailySubtotalZar: 260 + 280, // Korg KP3 + Yamaha HS8
      deliveryFeeZar: 120,
      discountZar: 50,
      depositTotalZar: 1650,
      totalZar: (540 * 4) + 120 - 50 + 1650,
      paymentMethod: 'PAYFAST',
      paymentStatus: 'PAID',
      paymentReference: 'PF-GT-90823412',
      deliveryAddress: '42 Oxford Road, Rosebank Studio Complex, Unit 4B',
      deliverySuburb: 'Rosebank',
      deliveryCity: 'Johannesburg',
      deliveryPostalCode: '2196',
      deliveryInstructions: 'Studio buzzer #402. Call on arrival if security gate is down.',
      hubLocation: 'Midrand Logistics & Calibration Hub',
      courierName: 'Gauteng Studio Courier Express',
      driverName: 'Sipho Mthembu',
      driverPhone: '+27 82 459 2911',
      vehiclePlate: 'GP 44 XK',
      currentLocationLat: -26.1458,
      currentLocationLng: 28.0416,
      estimatedDeliveryTime: 'Today at 15:45 (Estimated 22 mins remaining)',
      items: [
        {
          equipmentId: 'eq-korg-kp3',
          equipment: INITIAL_EQUIPMENT.find(e => e.id === 'eq-korg-kp3')!,
          quantity: 1,
          dailyPriceZar: 260,
          totalPriceZar: 260 * 4
        },
        {
          equipmentId: 'eq-yamaha-hs8',
          equipment: INITIAL_EQUIPMENT.find(e => e.id === 'eq-yamaha-hs8')!,
          quantity: 1,
          dailyPriceZar: 280,
          totalPriceZar: 280 * 4
        }
      ],
      currentStageIndex: 2,
      timeline: [
        {
          stage: 'CONFIRMED',
          title: 'Rental Booking Confirmed',
          description: 'Payment secured via PayFast South Africa. Equipment reserved at Midrand Hub.',
          location: 'Gauteng Central Cloud',
          timestamp: new Date(Date.now() - 3600000 * 4).toISOString(),
          completed: true,
          active: false
        },
        {
          stage: 'PREPARING',
          title: 'Preparing & Quality Testing in Gauteng Hub',
          description: 'Acoustic calibration, circuit tests, and cable packing completed by Studio Technician Tshepo.',
          location: 'Midrand Logistics & Calibration Hub',
          timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
          completed: true,
          active: false
        },
        {
          stage: 'OUT_FOR_DELIVERY',
          title: 'Out for Delivery across M1 Gauteng Corridor',
          description: 'Driver Sipho Mthembu en route via M1 South in temperature-controlled equipment van (GP 44 XK).',
          location: 'En route towards Rosebank / Oxford Rd',
          timestamp: new Date(Date.now() - 3600000 * 0.5).toISOString(),
          completed: false,
          active: true
        },
        {
          stage: 'DELIVERED',
          title: 'Handover & Studio Inspection Sign-Off',
          description: 'Scheduled handover and on-site functional test checklist verification.',
          location: 'Rosebank Studio Complex, Unit 4B',
          timestamp: new Date(Date.now() + 3600000 * 1).toISOString(),
          completed: false,
          active: false
        }
      ],
      createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
      updatedAt: new Date(Date.now() - 3600000 * 0.5).toISOString()
    }
  ]
};

// Helper: generate order number
function generateOrderNumber(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `GP-2026-${randomSuffix}`;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- API ROUTES ---

  // Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', service: 'Gauteng Studio Gear Rentals API', region: 'Gauteng, South Africa' });
  });

  // Auth: Current session / user
  app.get('/api/auth/me', (req, res) => {
    const authHeader = req.headers.authorization;
    let user = store.users[0]; // Default to Sanelo Mhlongo for seamless experience
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const email = authHeader.replace('Bearer ', '').trim();
      const found = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (found) user = found;
    }
    res.json({ user });
  });

  // Auth: Login
  app.post('/api/auth/login', (req, res) => {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: 'Email is required' });
    }
    let user = store.users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!user) {
      // Auto-register demo account for smooth onboarding
      user = {
        id: `usr-${Date.now()}`,
        email: email.trim(),
        fullName: email.split('@')[0].replace('.', ' ').toUpperCase(),
        phoneNumber: '+27 82 000 0000',
        suburb: 'Johannesburg',
        city: 'Johannesburg',
        postalCode: '2001',
        rewardCredits: 100.0,
        role: 'USER'
      };
      store.users.push(user);
    }
    res.json({ user, token: user.email });
  });

  // Auth: Register
  app.post('/api/auth/register', (req, res) => {
    const { email, fullName, phoneNumber, suburb, city, postalCode, streetAddress } = req.body;
    if (!email || !fullName) {
      return res.status(400).json({ error: 'Email and Full Name are required' });
    }
    
    // Check if postal code is within Gauteng
    const gautengCheck = GAUTENG_SUBURBS.some(s => s.postalCode === postalCode) || 
      ['2000', '2001', '2196', '2194', '2055', '1685', '0157', '0181', '1619', '1459', '1804'].includes(postalCode);

    const newUser: User = {
      id: `usr-${Date.now()}`,
      email: email.trim(),
      fullName: fullName.trim(),
      phoneNumber: phoneNumber || '+27 82 123 4567',
      suburb: suburb || 'Sandton',
      city: city || 'Johannesburg',
      postalCode: postalCode || '2196',
      streetAddress: streetAddress || 'Gauteng Address',
      rewardCredits: 150.0, // Welcome bonus of R150 in SoundCoins
      role: 'USER'
    };

    store.users.push(newUser);
    res.status(201).json({ user: newUser, token: newUser.email, gautengVerified: gautengCheck });
  });

  // Inventory: List all equipment with search & category filters
  app.get('/api/equipment', (req, res) => {
    const { category, search, availableOnly } = req.query;
    let items = [...store.equipment];

    if (category && typeof category === 'string' && category !== 'All') {
      items = items.filter(item => item.category.toLowerCase() === category.toLowerCase());
    }

    if (search && typeof search === 'string' && search.trim()) {
      const q = search.toLowerCase().trim();
      items = items.filter(item => 
        item.name.toLowerCase().includes(q) ||
        item.brand.toLowerCase().includes(q) ||
        item.model.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    if (availableOnly === 'true') {
      items = items.filter(item => item.availableQuantity > 0);
    }

    res.json({ equipment: items, total: items.length });
  });

  // Inventory: Single equipment details
  app.get('/api/equipment/:id', (req, res) => {
    const item = store.equipment.find(e => e.id === req.params.id || e.slug === req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Equipment not found' });
    }
    res.json({ equipment: item });
  });

  // Wishlist: Get user's wishlist
  app.get('/api/wishlist', (req, res) => {
    const authEmail = (req.headers.authorization || '').replace('Bearer ', '').trim();
    const user = store.users.find(u => u.email.toLowerCase() === authEmail.toLowerCase()) || store.users[0];
    
    const userWishlistEntries = store.wishlists.filter(w => w.userId === user.id);
    const wishlistEquipment = userWishlistEntries
      .map(entry => store.equipment.find(e => e.id === entry.equipmentId))
      .filter((e): e is Equipment => Boolean(e));

    res.json({ wishlist: wishlistEquipment, count: wishlistEquipment.length });
  });

  // Wishlist: Toggle equipment
  app.post('/api/wishlist/toggle', (req, res) => {
    const { equipmentId } = req.body;
    if (!equipmentId) {
      return res.status(400).json({ error: 'equipmentId is required' });
    }

    const authEmail = (req.headers.authorization || '').replace('Bearer ', '').trim();
    const user = store.users.find(u => u.email.toLowerCase() === authEmail.toLowerCase()) || store.users[0];

    const index = store.wishlists.findIndex(w => w.userId === user.id && w.equipmentId === equipmentId);
    let isSaved = false;

    if (index >= 0) {
      store.wishlists.splice(index, 1);
      isSaved = false;
    } else {
      store.wishlists.push({
        userId: user.id,
        equipmentId,
        addedAt: new Date().toISOString()
      });
      isSaved = true;
    }

    const totalCount = store.wishlists.filter(w => w.userId === user.id).length;
    res.json({ saved: isSaved, totalCount });
  });

  // Address & Regional Gauteng Validation
  app.post('/api/rentals/validate-address', (req, res) => {
    const { suburb, postalCode, city } = req.body;

    const normalizedSub = (suburb || '').toLowerCase().trim();
    const matched = GAUTENG_SUBURBS.find(s => 
      s.postalCode === (postalCode || '').trim() ||
      s.name.toLowerCase().includes(normalizedSub) ||
      normalizedSub.includes(s.name.toLowerCase())
    );

    // List of known non-Gauteng provinces to warn if entered
    const isOutsideGauteng = ['8001', '8000', '4001', '4000', '9301', '6001'].includes((postalCode || '').trim()) ||
      ['cape town', 'durban', 'bloemfontein', 'gqeberha', 'port elizabeth', 'stellenbosch', 'polokwane'].some(c => 
        (city || '').toLowerCase().includes(c) || normalizedSub.includes(c)
      );

    if (isOutsideGauteng) {
      return res.json({
        valid: false,
        message: 'Delivery restriction notice: Gauteng Studio Gear Rentals exclusively operates and delivers within Gauteng Province (Johannesburg, Pretoria, Midrand, Centurion & surrounding East/West Rand hubs). Deliveries outside Gauteng cannot be fulfilled to guarantee our 2-hour equipment calibration, road transit insurance, and emergency technician support.',
        allowedRegions: ['Johannesburg', 'Pretoria', 'Midrand', 'Centurion', 'Ekurhuleni / East Rand', 'West Rand']
      });
    }

    if (matched) {
      return res.json({
        valid: true,
        suburb: matched.name,
        city: matched.city,
        postalCode: matched.postalCode,
        deliveryFeeZar: matched.deliveryFee,
        estimatedTransitTime: matched.transitTime,
        hubSource: matched.hub,
        message: `Verified Gauteng Delivery Zone: Served directly from our ${matched.hub}.`
      });
    }

    // Default Gauteng response if postal code looks like standard Gauteng range (0001 - 2199)
    const codeNum = parseInt(postalCode || '0', 10);
    const isGautengRange = (codeNum >= 1 && codeNum <= 299) || (codeNum >= 1400 && codeNum <= 2199);

    if (isGautengRange) {
      return res.json({
        valid: true,
        suburb: suburb || 'Gauteng Suburb',
        city: city || 'Johannesburg',
        postalCode: postalCode || '2001',
        deliveryFeeZar: 140,
        estimatedTransitTime: '45-60 mins',
        hubSource: 'Midrand Logistics & Calibration Hub',
        message: 'Verified Gauteng delivery location within standard transit radius.'
      });
    }

    res.json({
      valid: false,
      message: 'This address or postal code appears to be outside of our supported Gauteng service network. Please provide a Johannesburg, Pretoria, Midrand, or Centurion delivery address, or select Hub Collection.',
      allowedRegions: ['Johannesburg', 'Pretoria', 'Midrand', 'Centurion', 'Ekurhuleni']
    });
  });

  // Checkout & Rental Creation
  app.post('/api/rentals/checkout', (req, res) => {
    const {
      items, // array of { equipmentId, quantity, days }
      startDate,
      endDate,
      durationDays,
      deliveryType,
      deliveryAddress,
      deliverySuburb,
      deliveryCity,
      deliveryPostalCode,
      deliveryInstructions,
      hubLocation,
      paymentMethod,
      applyRewards
    } = req.body;

    const authEmail = (req.headers.authorization || '').replace('Bearer ', '').trim();
    const user = store.users.find(u => u.email.toLowerCase() === authEmail.toLowerCase()) || store.users[0];

    if (!items || !items.length) {
      return res.status(400).json({ error: 'Rental cart items are required' });
    }

    let dailySubtotal = 0;
    let depositTotal = 0;
    const orderItems = [];

    for (const item of items) {
      const eq = store.equipment.find(e => e.id === item.equipmentId);
      if (!eq) continue;
      
      const qty = item.quantity || 1;
      const days = durationDays || 3;
      const lineDaily = eq.dailyPriceZar * qty;
      const lineTotal = lineDaily * days;

      dailySubtotal += lineDaily;
      depositTotal += eq.depositZar * qty;

      // Update available inventory
      eq.availableQuantity = Math.max(0, eq.availableQuantity - qty);

      orderItems.push({
        equipmentId: eq.id,
        equipment: eq,
        quantity: qty,
        dailyPriceZar: eq.dailyPriceZar,
        totalPriceZar: lineTotal
      });
    }

    const days = durationDays || 3;
    const subtotal = dailySubtotal * days;
    const deliveryFee = deliveryType === 'HUB_COLLECTION' ? 0 : 130;
    let discount = 0;

    if (applyRewards && user.rewardCredits > 0) {
      discount = Math.min(user.rewardCredits, 150); // Max R150 redeemable per order
      user.rewardCredits -= discount;
    }

    const totalZar = subtotal + deliveryFee - discount + depositTotal;
    const orderNum = generateOrderNumber();

    const now = new Date();
    const timeline: TrackingStep[] = [
      {
        stage: 'CONFIRMED',
        title: 'Rental Booking Confirmed',
        description: `Payment secured via South African Gateway (${paymentMethod || 'PayFast'}). Reference: PF-GT-${Math.floor(100000 + Math.random() * 900000)}.`,
        location: 'Gauteng Central Cloud Hub',
        timestamp: now.toISOString(),
        completed: true,
        active: false
      },
      {
        stage: 'PREPARING',
        title: 'Preparing & Testing in Gauteng Hub',
        description: `Hardware serials scanned and calibrated at ${hubLocation || 'Midrand Logistics & Calibration Hub'}. Safe transit cases sealed.`,
        location: hubLocation || 'Midrand Logistics & Calibration Hub',
        timestamp: new Date(now.getTime() + 1800000).toISOString(),
        completed: false,
        active: true
      },
      {
        stage: 'OUT_FOR_DELIVERY',
        title: 'Dispatched with Gauteng Studio Courier',
        description: `Transit to ${deliverySuburb || 'Johannesburg'} via Gauteng highway network in climate-safe equipment van.`,
        location: 'En route from Hub',
        timestamp: new Date(now.getTime() + 7200000).toISOString(),
        completed: false,
        active: false
      },
      {
        stage: 'DELIVERED',
        title: 'Delivered & Studio Inspection Sign-Off',
        description: `Handover at ${deliveryAddress || 'Client Studio'} with digital gear checklist verification.`,
        location: deliveryAddress || 'Client Studio',
        timestamp: new Date(now.getTime() + 10800000).toISOString(),
        completed: false,
        active: false
      }
    ];

    const newOrder: RentalOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: orderNum,
      userId: user.id,
      userName: user.fullName,
      userEmail: user.email,
      userPhone: user.phoneNumber || '+27 82 555 1842',
      status: 'CONFIRMED',
      deliveryType: deliveryType || 'DELIVERY',
      startDate: startDate || now.toISOString().split('T')[0],
      endDate: endDate || new Date(now.getTime() + days * 86400000).toISOString().split('T')[0],
      durationDays: days,
      dailySubtotalZar: dailySubtotal,
      deliveryFeeZar: deliveryFee,
      discountZar: discount,
      depositTotalZar: depositTotal,
      totalZar,
      paymentMethod: paymentMethod || 'PAYFAST',
      paymentStatus: 'PAID',
      paymentReference: `PF-GT-${Math.floor(100000 + Math.random() * 900000)}`,
      deliveryAddress: deliveryAddress || 'Sandton Studio',
      deliverySuburb: deliverySuburb || 'Sandton',
      deliveryCity: deliveryCity || 'Johannesburg',
      deliveryPostalCode: deliveryPostalCode || '2196',
      deliveryInstructions,
      hubLocation: hubLocation || 'Midrand Logistics & Calibration Hub',
      courierName: 'Gauteng Studio Courier Express',
      driverName: 'Sipho Mthembu',
      driverPhone: '+27 82 459 2911',
      vehiclePlate: 'GP 44 XK',
      currentLocationLat: -26.0125,
      currentLocationLng: 28.1283,
      estimatedDeliveryTime: 'Today at 16:30 (Gauteng Standard Time)',
      items: orderItems,
      timeline,
      currentStageIndex: 0,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };

    store.rentals.unshift(newOrder);

    // Award loyalty reward credits (+5% of subtotal as SoundCoins)
    user.rewardCredits += Math.round(subtotal * 0.05);

    res.status(201).json({ order: newOrder, success: true });
  });

  // Rentals: Get user's rental history
  app.get('/api/rentals', (req, res) => {
    const authEmail = (req.headers.authorization || '').replace('Bearer ', '').trim();
    const user = store.users.find(u => u.email.toLowerCase() === authEmail.toLowerCase()) || store.users[0];

    const userRentals = store.rentals.filter(r => r.userId === user.id || r.userEmail.toLowerCase() === user.email.toLowerCase());
    res.json({ rentals: userRentals, total: userRentals.length });
  });

  // Rentals: Get single order by orderNumber
  app.get('/api/rentals/:orderNumber', (req, res) => {
    const order = store.rentals.find(r => r.orderNumber.toUpperCase() === req.params.orderNumber.toUpperCase());
    if (!order) {
      return res.status(404).json({ error: 'Rental order not found' });
    }
    res.json({ order });
  });

  // Rentals: Advance Tracking Stage (Simulate real-time progression in Gauteng)
  app.post('/api/rentals/:orderNumber/advance-stage', (req, res) => {
    const order = store.rentals.find(r => r.orderNumber.toUpperCase() === req.params.orderNumber.toUpperCase());
    if (!order) {
      return res.status(404).json({ error: 'Rental order not found' });
    }

    const stages: RentalStatus[] = ['CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY', 'DELIVERED'];
    const currentIdx = stages.indexOf(order.status);

    if (currentIdx < stages.length - 1) {
      const nextIdx = currentIdx + 1;
      const nextStage = stages[nextIdx];
      order.status = nextStage;
      order.currentStageIndex = nextIdx;
      order.updatedAt = new Date().toISOString();

      // Update timeline flags
      order.timeline.forEach((step, idx) => {
        if (idx < nextIdx) {
          step.completed = true;
          step.active = false;
        } else if (idx === nextIdx) {
          step.completed = false;
          step.active = true;
        } else {
          step.completed = false;
          step.active = false;
        }
      });

      if (nextStage === 'DELIVERED') {
        order.timeline[nextIdx].completed = true;
        order.timeline[nextIdx].active = false;
        order.estimatedDeliveryTime = 'Delivered & Handed Over';
      } else if (nextStage === 'OUT_FOR_DELIVERY') {
        order.estimatedDeliveryTime = 'Out for Delivery (18 mins remaining)';
      }
    }

    res.json({ order, success: true });
  });

  // Dashboard Metrics
  app.get('/api/dashboard/stats', (req, res) => {
    const authEmail = (req.headers.authorization || '').replace('Bearer ', '').trim();
    const user = store.users.find(u => u.email.toLowerCase() === authEmail.toLowerCase()) || store.users[0];

    const userRentals = store.rentals.filter(r => r.userId === user.id || r.userEmail.toLowerCase() === user.email.toLowerCase());
    const activeRentals = userRentals.filter(r => ['CONFIRMED', 'PREPARING', 'OUT_FOR_DELIVERY'].includes(r.status));
    const userWishlists = store.wishlists.filter(w => w.userId === user.id);

    const activeDeliveries = activeRentals.filter(r => r.status === 'OUT_FOR_DELIVERY');

    res.json({
      activeRentalsCount: activeRentals.length,
      totalRentalsCount: userRentals.length,
      rewardCreditsZar: user.rewardCredits,
      wishlistCount: userWishlists.length,
      activeDeliveriesCount: activeDeliveries.length,
      nextScheduledReturn: userRentals[0]?.endDate || 'No upcoming returns',
      user
    });
  });

  // --- VITE MIDDLEWARE & STATIC SERVING ---
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gauteng Studio Gear Rentals server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch(err => {
  console.error('Failed to start server:', err);
});
