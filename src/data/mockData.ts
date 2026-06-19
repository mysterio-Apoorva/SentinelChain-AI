import { Supplier, RiskAlert, ShippingRoute, NodeTwin, TeamMember, AWSConfig } from '../types';

export const mockSuppliers: Supplier[] = [
  // Primary Suppliers
  {
    id: 'sup-001',
    name: 'NeoTek Microelectronics',
    category: 'Sensors & Integrated Circuits',
    location: 'Hsinchu, Taiwan',
    lat: 24.78,
    lng: 120.99,
    reliabilityScore: 92,
    sustainabilityScore: 85,
    costIndex: 4,
    deliveryLeadTime: 14,
    riskLevel: 'High', // due to Typhoon
    contactPerson: 'Lin Min-Chen',
    email: 'mc.lin@neotek.com.tw'
  },
  {
    id: 'sup-002',
    name: 'Atlas Heavy Castings',
    category: 'Structural Alloys & Chassis',
    location: 'Stuttgart, Germany',
    lat: 48.77,
    lng: 9.18,
    reliabilityScore: 96,
    sustainabilityScore: 78,
    costIndex: 5,
    deliveryLeadTime: 21,
    riskLevel: 'Low',
    contactPerson: 'Hans Mueller',
    email: 'h.mueller@atlascastings.de'
  },
  {
    id: 'sup-003',
    name: 'PolymerX Compound Inc.',
    category: 'Advanced Polymers & Insulators',
    location: 'Houston, USA',
    lat: 29.76,
    lng: -95.36,
    reliabilityScore: 84,
    sustainabilityScore: 68,
    costIndex: 2,
    deliveryLeadTime: 7,
    riskLevel: 'Medium', // due to Gulf storms
    contactPerson: 'Sarah Jenkins',
    email: 's.jenkins@polymerx.com'
  },
  {
    id: 'sup-004',
    name: 'Apex Lithium Battery Corp',
    category: 'Energy Storage Cells',
    location: 'Incheon, South Korea',
    lat: 37.45,
    lng: 126.70,
    reliabilityScore: 95,
    sustainabilityScore: 90,
    costIndex: 4,
    deliveryLeadTime: 18,
    riskLevel: 'Low',
    contactPerson: 'Kim Ji-Won',
    email: 'jw.kim@apexbattery.co.kr'
  },
  {
    id: 'sup-005',
    name: 'Pacific Optoelectronics',
    category: 'Lenses & Optic Assemblies',
    location: 'Yokohama, Japan',
    lat: 35.44,
    lng: 139.63,
    reliabilityScore: 98,
    sustainabilityScore: 88,
    costIndex: 5,
    deliveryLeadTime: 10,
    riskLevel: 'Medium',
    contactPerson: 'Kenji Tanaka',
    email: 'tanaka.k@pacific-opto.jp'
  },

  // Alternative Suppliers (for recommendation simulations)
  {
    id: 'sup-alt-001a',
    name: 'Evergreen Semis Ltd',
    category: 'Sensors & Integrated Circuits',
    location: 'Austin, Texas, USA',
    lat: 30.26,
    lng: -97.74,
    reliabilityScore: 89,
    sustainabilityScore: 92,
    costIndex: 4, // similar cost
    deliveryLeadTime: 4, // 10 days faster! (domestic)
    riskLevel: 'Low',
    contactPerson: 'Robert Chen',
    email: 'r.chen@evergreensemi.com'
  },
  {
    id: 'sup-alt-001b',
    name: 'Nordic Silicon Foundry',
    category: 'Sensors & Integrated Circuits',
    location: 'Oslo, Norway',
    lat: 59.91,
    lng: 10.75,
    reliabilityScore: 94,
    sustainabilityScore: 96,
    costIndex: 5, // more expensive
    deliveryLeadTime: 8,
    riskLevel: 'Low',
    contactPerson: 'Ingrid Larsen',
    email: 'larsen@nordicsilicon.no'
  },
  {
    id: 'sup-alt-003a',
    name: 'Saber Polymers Europe',
    category: 'Advanced Polymers & Insulators',
    location: 'Rotterdam, Netherlands',
    lat: 51.92,
    lng: 4.47,
    reliabilityScore: 90,
    sustainabilityScore: 82,
    costIndex: 3,
    deliveryLeadTime: 4,
    riskLevel: 'Low',
    contactPerson: 'Dirk van der Berg',
    email: 'dvanderberg@saberpolymers.nl'
  },
  {
    id: 'sup-alt-005a',
    name: 'Bavaria Optic Group',
    category: 'Lenses & Optic Assemblies',
    location: 'Munich, Germany',
    lat: 48.13,
    lng: 11.58,
    reliabilityScore: 95,
    sustainabilityScore: 84,
    costIndex: 4, // Cheaper than Yokohama, but different shipping
    deliveryLeadTime: 6,
    riskLevel: 'Low',
    contactPerson: 'Greta Fischer',
    email: 'g.fischer@bavariaoptic.de'
  }
];

export const mockAlerts: RiskAlert[] = [
  {
    id: 'alt-101',
    event: 'Port of Rotterdam General Strike',
    type: 'port',
    severity: 'Critical',
    region: 'Western Europe',
    confidence: 96,
    impactScope: 'Disruption of all Western ocean freight imports, specifically affecting structural castings.',
    financialExposure: 480000,
    delayDays: 12,
    description: 'A surprise 72-hour general dockworkers strike has completely paralyzed terminal handling at Europe’s largest seaport. Over 45 container vessels are currently anchored in the North Sea awaiting berth slots.',
    status: 'Active',
    timestamp: '2026-06-19T08:30:00Z',
    code: 'SC-PR-96',
    affectedSuppliers: ['sup-002'],
    mitigationStrategy: 'Reroute incoming castings via Le Havre, France or convert high-priority batches to air cargo ex-Frankfurt.'
  },
  {
    id: 'alt-102',
    event: 'Typhoon Gaemi Impact Warning',
    type: 'storm',
    severity: 'High',
    region: 'East Asia',
    confidence: 88,
    impactScope: 'Severe delay in component exports, flooding of semiconductor assembly facilities.',
    financialExposure: 720000,
    delayDays: 8,
    description: 'Category 4 typhoon with sustained winds of 145mph is projected to make landfall directly near Hsinchu Science Park within 36 hours. Power grid operators warn of dynamic load shedding and high risk of flash flooding.',
    status: 'Active',
    timestamp: '2026-06-19T06:15:00Z',
    code: 'SC-TY-88',
    affectedSuppliers: ['sup-001'],
    mitigationStrategy: 'Activate evergreen alternative supplier Evergreen Semis in Austin, Texas. Authorize split production load to avoid a single point of failure in key automotive sensor assembly.'
  },
  {
    id: 'alt-103',
    event: 'Gulf Coast Industrial Chemical Explosions',
    type: 'factory',
    severity: 'Medium',
    region: 'North America',
    confidence: 99,
    impactScope: 'Supply chain interruption of feedstocks used in specialized polymer insulations.',
    financialExposure: 185000,
    delayDays: 5,
    description: 'A chemical blast at a neighboring petrochemical processing plant has triggered safety lockdowns, rolling blackouts, and air quality containment corridors near Houston’s industrial polymer sector.',
    status: 'Mitigating',
    timestamp: '2026-06-18T14:40:00Z',
    code: 'SC-FE-99',
    affectedSuppliers: ['sup-003'],
    mitigationStrategy: 'Sourcing backup stock from Saber Polymers Rotterdam. Delivery times might be identical due to air-bridge logistics but cost is expected to spike by 15%.'
  },
  {
    id: 'alt-104',
    event: 'Red Sea Geo-Political Blockage Transit Advisory',
    type: 'political',
    severity: 'High',
    region: 'Middle East',
    confidence: 91,
    impactScope: '14-day reroute delays around the Cape of Good Hope for all shipments originating from Yokohama.',
    financialExposure: 320000,
    delayDays: 14,
    description: 'Increased asymmetric aerial threats in the Bab-el-Mandeb strait have forced global ocean liners (including Maersk and MSC) to divert all cargo vessels around South Africa, escalating fuel surcharges and container turnaround times.',
    status: 'Active',
    timestamp: '2026-06-17T11:00:00Z',
    code: 'SC-GP-91',
    affectedSuppliers: ['sup-005'],
    mitigationStrategy: 'Transition to air cargo routes for optics assemblies or use alternative supplier Bavaria Optic Group to avoid Red Sea / ocean cargo transit fully.'
  },
  {
    id: 'alt-105',
    event: 'Customs Union Server Cyberattack Outage',
    type: 'delay',
    severity: 'Low',
    region: 'East Asia / Korea',
    confidence: 74,
    impactScope: 'Temporary processing delays on export manifests for battery cells.',
    financialExposure: 40000,
    delayDays: 2,
    description: 'A ransomware assault on South Korea’s customs API servers has crippled digital manifest clearances at Incheon Port, triggering manual paperwork backlogs.',
    status: 'Resolved',
    timestamp: '2026-06-16T18:22:00Z',
    code: 'SC-CH-74',
    affectedSuppliers: ['sup-004'],
    mitigationStrategy: 'Manual manifests have been verified. Shipments released for maritime cargo load. No alternative sourcing required.'
  }
];

export const mockRoutes: ShippingRoute[] = [
  {
    id: 'rt-001',
    name: 'Taiwan Strait Electronic Corridor',
    origin: 'Hsinchu, Taiwan',
    destination: 'San Jose, California, USA',
    originCoords: [24.78, 120.99],
    destCoords: [37.33, -121.88],
    status: 'Blocked',
    delayDays: 8,
    type: 'Ocean',
    vesselName: 'Ever Spirit / V-422A'
  },
  {
    id: 'rt-002',
    name: 'Northern Sea Trans-European Network',
    origin: 'Rotterdam, Netherlands',
    destination: 'Hamburg, Germany',
    originCoords: [51.92, 4.47],
    destCoords: [53.55, 9.99],
    status: 'Delayed',
    delayDays: 12,
    type: 'Ocean',
    vesselName: 'MSC Isabella / V-891L'
  },
  {
    id: 'rt-003',
    name: 'Suez-Gibraltar Asia-Europe Highway',
    origin: 'Yokohama, Japan',
    destination: 'Genoa, Italy',
    originCoords: [35.44, 139.63],
    destCoords: [44.40, 8.94],
    status: 'Delayed',
    delayDays: 14,
    type: 'Ocean',
    vesselName: 'Cosco Glory / V-098K'
  },
  {
    id: 'rt-004',
    name: 'NAFTA Polymer Rail Transit',
    origin: 'Houston, USA',
    destination: 'Lexington, Kentucky, USA',
    originCoords: [29.76, -95.36],
    destCoords: [37.98, -84.47],
    status: 'Normal',
    delayDays: 0,
    type: 'Rail'
  }
];

export const mockDigitalTwinNodes: NodeTwin[] = [
  {
    id: 'node-sup-taiwan',
    name: 'NeoTek Manufacturing HQ',
    type: 'supplier',
    location: 'Hsinchu, Taiwan',
    status: 'disrupted',
    capacity: '8.5M Units/Month',
    inventoryLevel: 32,
    lat: 24.78,
    lng: 120.99,
    connections: ['node-wh-pacific']
  },
  {
    id: 'node-wh-pacific',
    name: 'Pacific Consolidation Hub',
    type: 'warehouse',
    location: 'Incheon, South Korea',
    status: 'warning',
    capacity: '150k SqFt Storage',
    inventoryLevel: 65,
    lat: 37.45,
    lng: 126.70,
    connections: ['node-fac-kentucky', 'node-fac-bavaria']
  },
  {
    id: 'node-fac-kentucky',
    name: 'Giga-Assemble Factory North America',
    type: 'factory',
    location: 'Lexington, Kentucky, USA',
    status: 'warning',
    capacity: '120k EV Chassis/Year',
    inventoryLevel: 45,
    lat: 37.98,
    lng: -84.47,
    connections: ['node-dist-chicago', 'node-dist-dallas']
  },
  {
    id: 'node-fac-bavaria',
    name: 'Munich Precision Assembly Lab',
    type: 'factory',
    location: 'Munich, Germany',
    status: 'operational',
    capacity: '50k Sensors/Week',
    inventoryLevel: 82,
    lat: 48.13,
    lng: 11.58,
    connections: ['node-dist-frankfurt']
  },
  {
    id: 'node-dist-chicago',
    name: 'Midwest Distribution Grid',
    type: 'distribution',
    location: 'Chicago, Illinois, USA',
    status: 'operational',
    capacity: '1.2M Shipments/Month',
    inventoryLevel: 78,
    lat: 41.87,
    lng: -87.62,
    connections: []
  },
  {
    id: 'node-dist-frankfurt',
    name: 'Euro-Zone Distribution Axis',
    type: 'distribution',
    location: 'Frankfurt, Germany',
    status: 'warning',
    capacity: '2.5M Shipments/Month',
    inventoryLevel: 51,
    lat: 50.11,
    lng: 8.68,
    connections: []
  }
];

export const mockTeam: TeamMember[] = [
  {
    id: 'tm-101',
    name: 'Marcus Vance',
    role: 'Global VP of Logistics & Supply Chain',
    email: 'm.vance@sentinelchain.ai',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=120',
    status: 'active'
  },
  {
    id: 'tm-102',
    name: 'Evelyn Zhao',
    role: 'Director of Strategic Sourcing',
    email: 'e.zhao@sentinelchain.ai',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=120',
    status: 'active'
  },
  {
    id: 'tm-103',
    name: 'Klaus Reinhardt',
    role: 'Operations Lead - EMEA Hub',
    email: 'k.reinhardt@sentinelchain.ai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120',
    status: 'active'
  },
  {
    id: 'tm-104',
    name: 'Amisha Patel',
    role: 'Senior Inventory Risk Architect',
    email: 'a.patel@sentinelchain.ai',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=120',
    status: 'active'
  }
];

export const initialAWSConfig: AWSConfig = {
  s3Status: 'connected',
  bedrockStatus: 'connected',
  sonicStatus: 'connected',
  knowledgeBaseId: 'kb-802n81-sentinel',
  modelId: 'amazon.nova-pro-v1:0',
  snsTopicArn: 'arn:aws:sns:us-east-1:507915167153:SentinelChain-Critical-Alerts',
  lambdaFunctionName: 'SentinelChain-RiskTriggerEngine',
  schedulerCron: '0 */4 * * *',
};

// Analytics Datasets
export const mockAnalyticsRiskTrends = [
  { date: '06-13', activeRisks: 2, criticalAlerts: 0, financialExposure: 180 },
  { date: '06-14', activeRisks: 3, criticalAlerts: 1, financialExposure: 220 },
  { date: '06-15', activeRisks: 4, criticalAlerts: 1, financialExposure: 400 },
  { date: '06-16', activeRisks: 3, criticalAlerts: 0, financialExposure: 310 },
  { date: '06-17', activeRisks: 4, criticalAlerts: 1, financialExposure: 540 },
  { date: '06-18', activeRisks: 5, criticalAlerts: 2, financialExposure: 820 },
  { date: '06-19', activeRisks: 5, criticalAlerts: 2, financialExposure: 1705 }, // current day (Rotterdam + Typhoon)
];

export const mockAnalyticsDelays = [
  { month: 'Jan', Ocean: 4.2, Air: 0.8, Rail: 1.5 },
  { month: 'Feb', Ocean: 5.1, Air: 1.2, Rail: 2.1 },
  { month: 'Mar', Ocean: 3.8, Air: 0.5, Rail: 1.1 },
  { month: 'Apr', Ocean: 4.9, Air: 0.9, Rail: 1.8 },
  { month: 'May', Ocean: 6.8, Air: 1.4, Rail: 2.5 },
  { month: 'Jun', Ocean: 10.5, Air: 2.3, Rail: 3.1 }, // Massive spike
];

export const mockAnalyticsSupplierPerformance = [
  { name: 'NeoTek Micro', onTimeRate: 78, qualityScore: 94, compliance: 90 },
  { name: 'Atlas Heavy', onTimeRate: 95, qualityScore: 98, compliance: 96 },
  { name: 'PolymerX Compound', onTimeRate: 85, qualityScore: 91, compliance: 88 },
  { name: 'Apex Lithium', onTimeRate: 98, qualityScore: 96, compliance: 95 },
  { name: 'Pacific Opto', onTimeRate: 74, qualityScore: 97, compliance: 94 },
];

export const mockAnalyticsInventoryExposure = [
  { category: 'Integrated Circuits', onHand: 45, unsafeExposure: 55 },
  { category: 'Structural Chassis', onHand: 80, unsafeExposure: 20 },
  { category: 'Polymer Synthetics', onHand: 62, unsafeExposure: 38 },
  { category: 'Battery Arrays', onHand: 88, unsafeExposure: 12 },
  { category: 'High-End Optics', onHand: 50, unsafeExposure: 50 },
];

export const mockAnalyticsCostComparison = [
  { supplierName: 'NeoTek Micro (Current)', baseCost: 100, freightCost: 20, insuranceCost: 5 },
  { supplierName: 'Evergreen Semis (Alt)', baseCost: 105, freightCost: 8, insuranceCost: 3 },
  { supplierName: 'Nordic Silicon (Alt)', baseCost: 120, freightCost: 12, insuranceCost: 4 },
];
