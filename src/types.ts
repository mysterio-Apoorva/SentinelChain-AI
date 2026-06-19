/**
 * SentinelChain AI Types Definition
 */

export interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  lat: number;
  lng: number;
  reliabilityScore: number; // 0-100
  sustainabilityScore: number; // 0-100
  costIndex: number; // 1-5 where 5 is expensive
  deliveryLeadTime: number; // days
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  contactPerson: string;
  email: string;
}

export type RiskAlertSeverity = 'Critical' | 'High' | 'Medium' | 'Low';
export type RiskAlertType = 'port' | 'storm' | 'factory' | 'political' | 'delay';
export type RiskAlertStatus = 'Active' | 'Mitigating' | 'Resolved';

export interface RiskAlert {
  id: string;
  event: string;
  type: RiskAlertType;
  severity: RiskAlertSeverity;
  region: string;
  confidence: number; // Out of 100
  impactScope: string;
  financialExposure: number; // in USD
  delayDays: number;
  description: string;
  status: RiskAlertStatus;
  timestamp: string;
  code: string;
  affectedSuppliers: string[]; // Supplier IDs
  mitigationStrategy: string;
}

export interface ShippingRoute {
  id: string;
  name: string;
  origin: string;
  destination: string;
  originCoords: [number, number];
  destCoords: [number, number];
  status: 'Normal' | 'Delayed' | 'Blocked';
  delayDays: number;
  type: 'Ocean' | 'Air' | 'Rail' | 'Road';
  vesselName?: string;
}

export interface NodeTwin {
  id: string;
  name: string;
  type: 'supplier' | 'factory' | 'warehouse' | 'distribution' | 'retailer';
  location: string;
  status: 'operational' | 'disrupted' | 'warning';
  capacity: string;
  inventoryLevel: number; // Percentage
  lat: number;
  lng: number;
  connections: string[]; // IDs of nodes it connects to
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  avatar: string;
  status: 'active' | 'inactive';
}

export interface AWSConfig {
  s3Status: 'connected' | 'error' | 'disconnected';
  bedrockStatus: 'connected' | 'error' | 'disconnected';
  sonicStatus: 'connected' | 'error' | 'disconnected';
  knowledgeBaseId: string;
  modelId: string;
  snsTopicArn: string;
  lambdaFunctionName: string;
  schedulerCron: string;
}
