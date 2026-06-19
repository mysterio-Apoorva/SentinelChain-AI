import React, { createContext, useContext, useState, useEffect } from 'react';
import { Supplier, RiskAlert, ShippingRoute, NodeTwin, TeamMember, AWSConfig } from '../types';
import {
  mockSuppliers,
  mockAlerts,
  mockRoutes,
  mockDigitalTwinNodes,
  mockTeam,
  initialAWSConfig
} from '../data/mockData';

interface SentinelStateContextType {
  suppliers: Supplier[];
  alerts: RiskAlert[];
  routes: ShippingRoute[];
  digitalTwin: NodeTwin[];
  team: TeamMember[];
  awsConfig: AWSConfig;
  activeVoiceBriefing: string | null;
  isPlayingVoice: boolean;
  activeTheme: 'dark'; // Dark/Enterprise only
  resolveAlert: (alertId: string) => void;
  mitigateAlert: (alertId: string, updatedAlertFields?: Partial<RiskAlert>) => void;
  addAlert: (alert: RiskAlert) => void;
  updateAWSConfig: (config: Partial<AWSConfig>) => void;
  startVoiceBriefing: (text: string) => void;
  stopVoiceBriefing: () => void;
  selectAltSupplier: (primaryId: string, altId: string) => void;
}

const SentinelStateContext = createContext<SentinelStateContextType | undefined>(undefined);

export const SentinelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [alerts, setAlerts] = useState<RiskAlert[]>(mockAlerts);
  const [routes, setRoutes] = useState<ShippingRoute[]>(mockRoutes);
  const [digitalTwin, setDigitalTwin] = useState<NodeTwin[]>(mockDigitalTwinNodes);
  const [team, setTeam] = useState<TeamMember[]>(mockTeam);
  const [awsConfig, setAwsConfig] = useState<AWSConfig>(initialAWSConfig);
  const [activeVoiceBriefing, setActiveVoiceBriefing] = useState<string | null>(null);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);

  // Play audio simulation
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlayingVoice) {
      timer = setTimeout(() => {
        setIsPlayingVoice(false);
        setActiveVoiceBriefing(null);
      }, 15000); // 15s mock duration
    }
    return () => clearTimeout(timer);
  }, [isPlayingVoice]);

  const resolveAlert = (alertId: string) => {
    setAlerts(prev =>
      prev.map(a => {
        if (a.id === alertId) {
          // Also set affected suppliers riskLevel back to Low
          setSuppliers(sups =>
            sups.map(s => {
              if (a.affectedSuppliers.includes(s.id)) {
                return { ...s, riskLevel: 'Low' };
              }
              return s;
            })
          );
          // Set twin node back to operational
          setDigitalTwin(nodes => 
            nodes.map(n => {
              // rough approximation
              if (n.status === 'disrupted' || n.status === 'warning') {
                return { ...n, status: 'operational' };
              }
              return n;
            })
          );
          // Set route status back to Normal
          setRoutes(currRoutes => 
            currRoutes.map(r => r.status !== 'Normal' ? { ...r, status: 'Normal', delayDays: 0 } : r)
          );
          return { ...a, status: 'Resolved' };
        }
        return a;
      })
    );
  };

  const mitigateAlert = (alertId: string, updatedAlertFields?: Partial<RiskAlert>) => {
    setAlerts(prev =>
      prev.map(a => (a.id === alertId ? { ...a, status: 'Mitigating', ...updatedAlertFields } : a))
    );
  };

  const addAlert = (alert: RiskAlert) => {
    setAlerts(prev => [alert, ...prev]);
  };

  const updateAWSConfig = (updated: Partial<AWSConfig>) => {
    setAwsConfig(prev => ({ ...prev, ...updated }));
  };

  const startVoiceBriefing = (text: string) => {
    setActiveVoiceBriefing(text);
    setIsPlayingVoice(true);
  };

  const stopVoiceBriefing = () => {
    setActiveVoiceBriefing(null);
    setIsPlayingVoice(false);
  };

  const selectAltSupplier = (primaryId: string, altId: string) => {
    const primary = suppliers.find(s => s.id === primaryId);
    const alt = suppliers.find(s => s.id === altId);

    if (primary && alt) {
      // Logic simulation: Replace primary supplier's target values or swap them,
      // and update the associated alerts to indicate it has been mitigated
      setSuppliers(prev =>
        prev.map(s => {
          if (s.id === primaryId) {
            // Mitigate primary supplier risk status visually
            return { ...s, riskLevel: 'Low', name: `${primary.name} [Rerouted to ${alt.name}]`, deliveryLeadTime: alt.deliveryLeadTime };
          }
          return s;
        })
      );

      // Transition any active alerts affecting this supplier to 'Mitigating'
      setAlerts(prev =>
        prev.map(a => {
          if (a.affectedSuppliers.includes(primaryId) && a.status === 'Active') {
            return {
              ...a,
              status: 'Mitigating',
              description: `${a.description} | MITIGATING ACTION TAKEN: Swapped out supplier for ${alt.name} (${alt.location}) reducing delivery lead times to ${alt.deliveryLeadTime} days.`
            };
          }
          return a;
        })
      );
    }
  };

  return (
    <SentinelStateContext.Provider
      value={{
        suppliers,
        alerts,
        routes,
        digitalTwin,
        team,
        awsConfig,
        activeVoiceBriefing,
        isPlayingVoice,
        activeTheme: 'dark',
        resolveAlert,
        mitigateAlert,
        addAlert,
        updateAWSConfig,
        startVoiceBriefing,
        stopVoiceBriefing,
        selectAltSupplier
      }}
    >
      {children}
    </SentinelStateContext.Provider>
  );
};

export const useSentinel = () => {
  const context = useContext(SentinelStateContext);
  if (!context) {
    throw new Error('useSentinel must be used within a SentinelProvider');
  }
  return context;
};
