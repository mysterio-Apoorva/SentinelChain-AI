import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Activity, Newspaper, CloudRain, Anchor, ShieldCheck, Database, RefreshCw } from "lucide-react";

interface StreamItem {
  id: string;
  source: "News" | "Weather" | "Port" | "Supplier";
  message: string;
  timestamp: string;
  status: "queued" | "ingested" | "failed";
}

export default function GlobalMonitoring() {
  const [selectedSource, setSelectedSource] = useState<"All" | "News" | "Weather" | "Port" | "Supplier">("All");
  const [streams, setStreams] = useState<StreamItem[]>([
    { id: "1", source: "News", message: "Reuters: UN commission warns on maritime congestion spikes", timestamp: "05:18:12", status: "ingested" },
    { id: "2", source: "Weather", message: "NOAA: Category-4 Typhoon 'In-Fa' forming in East China Sea", timestamp: "05:19:04", status: "ingested" },
    { id: "3", source: "Port", message: "AIS Marine: LA Terminal dwell time increases to 11.2 days", timestamp: "05:19:45", status: "queued" },
    { id: "4", source: "Supplier", message: "ERP: Tier-1 microchip supplier announces wafer limitations", timestamp: "05:20:11", status: "queued" },
    { id: "5", source: "Port", message: "Suez Canal Authority: Containership blocking maritime route", timestamp: "05:20:30", status: "queued" }
  ]);

  // Periodic simulated signal ingestion trigger
  useEffect(() => {
    const interval = setInterval(() => {
      const newsOptions = [
        "Bloomberg: Fuel price surcharges climb by 4.2% on shipping routes",
        "AP News: Dockworker contract negotiations stall indefinitely",
        "Lloyds List: Rotterdam port logs record-high container dwell times",
        "Kyodo: Tokyo freight rails suspended due to minor electrical grid failure"
      ];
      const weatherOptions = [
        "METAR: Heavy coastal fog limits Shanghai container vessel berthing",
        "NOAA: Gale warning issued for North Atlantic transit corridors",
        "WMO: Flood alerts in lower Mississippi valley slow barge traffic"
      ];
      const portOptions = [
        "AIS Transponder: Suez queues increase to 42 bulk cargo vessels",
        "Port Authority: Los Angeles gates declare staging space capacity limits",
        "Singapore Terminal: Crane crane calibration maintenance completed"
      ];
      const supplierOptions = [
        "Supplier ERP: Direct lithium battery shipments flagged for hazardous check",
        "SAP Ledger: Lead-times on micro-controllers delayed by 18 days",
        "Logistics Webhook: Secondary packaging plant declares operational restart"
      ];

      const categories: ("News" | "Weather" | "Port" | "Supplier")[] = ["News", "Weather", "Port", "Supplier"];
      const chosenCat = categories[Math.floor(Math.random() * categories.length)];
      let msg = "";

      if (chosenCat === "News") msg = newsOptions[Math.floor(Math.random() * newsOptions.length)];
      if (chosenCat === "Weather") msg = weatherOptions[Math.floor(Math.random() * weatherOptions.length)];
      if (chosenCat === "Port") msg = portOptions[Math.floor(Math.random() * portOptions.length)];
      if (chosenCat === "Supplier") msg = supplierOptions[Math.floor(Math.random() * supplierOptions.length)];

      const newItem: StreamItem = {
        id: Date.now().toString(),
        source: chosenCat,
        message: msg,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        status: "queued"
      };

      setStreams((prev) => {
        // Queue the first, mark others ingested
        const updated = prev.map(s => s.status === "queued" ? { ...s, status: "ingested" as const } : s);
        return [newItem, ...updated].slice(0, 8);
      });
    }, 4500);

    return () => clearInterval(interval);
  }, []);

  const sources = [
    { name: "News", icon: Newspaper, desc: "Global RSS feeds, specialized maritime registers, news crawls.", color: "text-sky-400 border-sky-500/20 bg-sky-950/10" },
    { name: "Weather", icon: CloudRain, desc: "National Hurricane Center, WMO gale alerts, severe marine swell charts.", color: "text-amber-400 border-amber-500/20 bg-amber-950/10" },
    { name: "Port", icon: Anchor, desc: "AIS transponder registers, dwell metrics, berthing backlogs.", color: "text-emerald-400 border-emerald-500/20 bg-emerald-950/10" },
    { name: "Supplier", icon: ShieldCheck, desc: "Tier-1 component webhooks, SAP ledgers, logistics notifications.", color: "text-purple-400 border-purple-500/20 bg-purple-950/10" }
  ];

  const filteredStreams = streams.filter(s => selectedSource === "All" || s.source === selectedSource);

  return (
    <section
      id="global-monitoring"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-slate-950/10 relative"
    >
      <div className="w-full max-w-5xl">
        {/* Section Title */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">Stage II — Ingest Engine</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 uppercase">Global Monitoring & Signal Collection</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            Our ingestion framework pulls raw, unstructured data from external logistics telemetry feeds, centralizing all events into Amazon S3 storage buckets.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Data Sources */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">Select Ingestion Feed</span>
              
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSelectedSource("All")}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    selectedSource === "All"
                      ? "bg-sky-500/10 border-sky-500 text-sky-400"
                      : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                  }`}
                >
                  <span className="text-xs font-bold block">ALL STREAMS</span>
                  <span className="text-[10px] text-slate-500 font-mono mt-1 block">Unified aggregation</span>
                </button>

                {sources.map((src) => {
                  const Icon = src.icon;
                  const isSelected = selectedSource === src.name;
                  return (
                    <button
                      key={src.name}
                      onClick={() => setSelectedSource(src.name as any)}
                      className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? "bg-slate-900 border-sky-500 text-sky-400 shadow"
                          : "bg-slate-900/40 border-slate-800 text-slate-400 hover:border-slate-700"
                      }`}
                    >
                      <Icon className="w-4 h-4 mb-2" />
                      <div>
                        <span className="text-xs font-bold block uppercase">{src.name}</span>
                        <span className="text-[9px] text-slate-500 font-mono block">Ingest online</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Source Details Panel */}
            <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-5">
              <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">FEED ARCHITECTURE</span>
              {selectedSource === "All" ? (
                <div className="mt-3 text-xs text-slate-400 leading-relaxed">
                  SentinelChain coordinates multithreaded workers executing hourly cron jobs. RSS and weather models are fetched with fallback retry pools, preventing signal loss.
                </div>
              ) : (
                <div className="mt-3">
                  <span className="text-xs font-bold text-slate-200 block uppercase mb-1">{selectedSource} Stream</span>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {sources.find(s => s.name === selectedSource)?.desc}
                  </p>
                  <div className="mt-4 bg-slate-950/60 p-2.5 rounded border border-slate-800 font-mono text-[9px] text-slate-500 space-y-1">
                    <div>ENDPOINT: <span className="text-sky-400">api.sentinelchain.ai/v2/ingest/{selectedSource.toLowerCase()}</span></div>
                    <div>FORMAT: <span className="text-amber-500">JSON_UNSTRUCTURED_DATA</span></div>
                    <div>SECURE: <span className="text-emerald-400">HTTPS_TLS_1.3</span></div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Center: Animated Signal Pipeline */}
          <div className="lg:col-span-2 hidden lg:flex flex-col items-center justify-center relative">
            {/* Visual connecting bars */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-sky-500/20 via-sky-500/60 to-orange-500/20" />
            
            <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-sky-400 shadow z-10 animate-pulse">
              <Activity className="w-5 h-5" />
            </div>
            
            <span className="text-[9px] text-slate-500 font-mono mt-3 uppercase tracking-widest whitespace-nowrap">
              S3 BUFFER INGEST
            </span>

            {/* Glowing signal beads */}
            <div className="absolute left-2 w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping" />
            <div className="absolute right-2 w-2.5 h-2.5 rounded-full bg-orange-400 animate-ping" style={{ animationDelay: "1.5s" }} />
          </div>

          {/* Right Column: Ingested queue (S3 Bucket visualization) */}
          <div className="lg:col-span-5 bg-slate-900/30 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-2.5">
                <div className="flex items-center space-x-2">
                  <Database className="w-4 h-4 text-orange-500" />
                  <span className="text-xs font-bold uppercase text-slate-200 tracking-wider">
                    Amazon S3 Ingest Queue
                  </span>
                </div>
                <div className="flex items-center space-x-1.5 font-mono text-[9px] text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>S3::RawDataStore</span>
                </div>
              </div>

              {/* Queue Items */}
              <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {filteredStreams.map((item) => {
                    let catColor = "text-sky-400 bg-sky-950/20 border-sky-500/20";
                    if (item.source === "Weather") catColor = "text-amber-400 bg-amber-950/20 border-amber-500/20";
                    if (item.source === "Port") catColor = "text-emerald-400 bg-emerald-950/20 border-emerald-500/20";
                    if (item.source === "Supplier") catColor = "text-purple-400 bg-purple-950/20 border-purple-500/20";

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="p-3 bg-slate-950/50 border border-slate-800/60 rounded-xl flex items-start justify-between"
                      >
                        <div className="space-y-1.5 flex-1 min-w-0 pr-2">
                          <div className="flex items-center space-x-2">
                            <span className={`text-[8px] font-mono border px-1.5 py-0.5 rounded uppercase ${catColor}`}>
                              {item.source}
                            </span>
                            <span className="text-[8px] font-mono text-slate-500">{item.timestamp}</span>
                          </div>
                          <p className="text-[11px] font-medium text-slate-300 truncate">{item.message}</p>
                        </div>
                        
                        <div className="flex items-center">
                          {item.status === "queued" ? (
                            <span className="text-[8px] font-mono text-amber-500 bg-amber-950/15 border border-amber-500/25 px-1.5 py-0.5 rounded animate-pulse">
                              BUFFERING
                            </span>
                          ) : (
                            <span className="text-[8px] font-mono text-emerald-400 bg-emerald-950/15 border border-emerald-500/25 px-1.5 py-0.5 rounded">
                              INGESTED
                            </span>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Ingress status footer */}
            <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[9px] text-slate-500 font-mono">
              <span>ACTIVE STORAGE TYPE: S3 STANDARD-IA</span>
              <span className="flex items-center space-x-1">
                <RefreshCw className="w-3 h-3 text-sky-400 animate-spin" />
                <span>POLLING</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
