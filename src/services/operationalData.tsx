import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { apiRequest } from './api';
const Context = createContext<{ data: Record<string, unknown>; error: string; loading: boolean }>({ data: {}, error: '', loading: true });
export function OperationalDataProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState({ data: {} as Record<string, unknown>, error: '', loading: true });
  useEffect(() => {
    let active = true;
    const refresh = async () => {
      try {
        const data = await apiRequest('data');
        if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid operational data response.');
        if (active) setState({ data, error: '', loading: false });
      } catch (error) { if (active) setState({ data: {}, error: error instanceof Error ? error.message : 'Data unavailable.', loading: false }); }
    };
    window.addEventListener('sentinel:data-changed', refresh);
    refresh(); const timer = setInterval(refresh, 60000);
    return () => { active = false; clearInterval(timer); window.removeEventListener('sentinel:data-changed', refresh); };
  }, []);
  return <Context.Provider value={state}>{children}</Context.Provider>;
}
export function useOperationalRows<T extends object>(key: string, example: T[]): T[] {
  const { data } = useContext(Context);
  const value = data[key];
  if (!Array.isArray(value)) return [];
  const schema = example[0];
  const matches = (actual: any, expected: any): boolean => {
    if (expected && typeof expected === 'object') return actual != null && typeof actual === 'object' && Object.entries(expected).every(([k,v]) => matches(actual[k],v));
    return typeof actual === typeof expected && (typeof actual !== 'number' || Number.isFinite(actual));
  };
  return value.filter(row => row && typeof row === 'object' && (!schema || matches(row,schema))) as T[];
}
export function useDataReady(key: string) { return Array.isArray(useContext(Context).data[key]); }
export function useDemoMode() { return useContext(Context).data.mode === 'demo'; }
export function DataStatus() {
  const { data, error, loading } = useContext(Context);
  if (!error && !loading && data.mode === 'demo') return <div role="status" className="w-full max-w-5xl mx-auto mb-5 px-4 py-3 rounded-xl border border-sky-500/20 bg-slate-900/40 text-xs text-sky-400">Demo workspace: Synthetic supply-chain data saved in AWS. Changes persist here; no real carrier orders are placed.</div>;
  if (!error && !loading) return null;
  return <div role="status" className="w-full max-w-5xl mx-auto mb-5 px-4 py-3 rounded-xl border border-amber-500/20 bg-slate-900/40 text-xs text-amber-400">{loading ? 'Connecting operational data...' : `${error} Live data panels remain empty until connected. Scenario templates are available in Active Disruptions.`}</div>;
}
