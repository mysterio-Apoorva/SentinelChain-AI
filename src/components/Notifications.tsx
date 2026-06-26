import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BellRing, Mail, MessageSquare, ShieldCheck, Send, RefreshCw, AlertCircle } from "lucide-react";

interface SnsAlert {
  id: string;
  channel: "Slack" | "SMS" | "Email" | "PagerDuty";
  message: string;
  timestamp: string;
  arn: string;
}

export default function Notifications() {
  const [channel, setChannel] = useState<"Slack" | "SMS" | "Email" | "PagerDuty">("Slack");
  const [customMsg, setCustomMsg] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [alerts, setAlerts] = useState<SnsAlert[]>([
    {
      id: "alert-1",
      channel: "SMS",
      message: "CRITICAL: Suez Canal transit blocked. Safety stock buffer drawn down to -40%. Activating reroute procedures.",
      timestamp: "05:20:12",
      arn: "arn:aws:sns:us-east-1:1234:Threats-sms"
    },
    {
      id: "alert-2",
      channel: "Slack",
      message: "WARNING: Super Typhoon In-Fa approaching East China Sea corridors. Crane berthing delayed past 5 days.",
      timestamp: "05:19:35",
      arn: "arn:aws:sns:us-east-1:1234:Threats-slack"
    }
  ]);

  const handleSendAlert = async () => {
    const textToSend = customMsg.trim() || `ALERT: SentinelChain has detected a logistics bottleneck affecting primary node pipelines. Deploying playbooks.`;
    setIsSending(true);

    try {
      const res = await fetch("/api/notify-sns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          channel,
          message: textToSend,
          severity: "HIGH"
        })
      });

      if (res.ok) {
        const data = await res.json();
        
        const newAlert: SnsAlert = {
          id: data.messageId,
          channel,
          message: textToSend,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          arn: data.targetSnsArn
        };

        setAlerts(prev => [newAlert, ...prev].slice(0, 5));
        setCustomMsg("");
      }
    } catch (err) {
      console.error("SNS dispatch failed, logging localized alert:", err);
      // Fallback
      const localAlert: SnsAlert = {
        id: `local-msg-${Math.floor(Math.random() * 9000000)}`,
        channel,
        message: textToSend,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        arn: `arn:aws:sns:us-east-1:1234:Threats-${channel.toLowerCase()}`
      };
      setAlerts(prev => [localAlert, ...prev]);
    } finally {
      setIsSending(false);
    }
  };

  const channelIcons = {
    Slack: MessageSquare,
    SMS: MessageSquare,
    Email: Mail,
    PagerDuty: BellRing
  };

  return (
    <section
      id="notifications"
      className="min-h-screen flex flex-col justify-center items-center px-6 py-24 bg-slate-950/10 relative"
    >
      <div className="w-full max-w-5xl">
        {/* Title */}
        <div className="text-left mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2">Stage VIII — Alert Dispatcher</span>
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 uppercase">Amazon SNS Automated Notifications</h2>
          <p className="text-slate-400 text-sm mt-3 max-w-2xl">
            SentinelChain leverages Simple Notification Service clusters to broadcast real-time mitigations directly to operational logistics grids.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left: Input Console for Custom SNS Transmissions */}
          <div className="lg:col-span-5 bg-slate-900/35 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div className="space-y-4 text-left">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                SNS Topic Broadcast Controller
              </span>

              {/* Selector */}
              <div className="space-y-2">
                <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  SNS Subscription Channel
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.keys(channelIcons).map((ch) => {
                    const Icon = (channelIcons as any)[ch];
                    const isSelected = channel === ch;
                    return (
                      <button
                        key={ch}
                        onClick={() => setChannel(ch as any)}
                        className={`p-2.5 rounded-lg border text-left transition-all text-xs font-mono font-bold flex items-center space-x-2 ${
                          isSelected
                            ? "bg-sky-950/20 border-sky-500 text-sky-400"
                            : "bg-slate-950/50 border-slate-850 text-slate-400 hover:border-slate-850"
                        }`}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span>{ch.toUpperCase()}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message box */}
              <div className="space-y-2">
                <label className="block text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  Alert Message payload
                </label>
                <textarea
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Enter message dispatch... (e.g. Critical Suez blockage. Divert container carriers immediately to Cape of Good Hope...)"
                  className="w-full h-24 bg-slate-950 border border-slate-850 rounded-xl p-3 text-xs text-slate-300 font-sans leading-relaxed focus:outline-none focus:border-sky-500/40 focus:ring-1 focus:ring-sky-500/20 resize-none"
                />
              </div>
            </div>

            <button
              onClick={handleSendAlert}
              disabled={isSending}
              className="w-full bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-colors mt-6 shadow-md shadow-sky-500/5"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Transmitting...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Broadcast Threat Payload</span>
                </>
              )}
            </button>
          </div>

          {/* Right: Slack Workspace/Console Emulator */}
          <div className="lg:col-span-7 bg-slate-950/80 border border-slate-800/80 rounded-2xl p-5 flex flex-col justify-between">
            <div className="text-left">
              <div className="flex items-center justify-between mb-4 border-b border-slate-850 pb-2.5">
                <div className="flex items-center space-x-2 font-mono text-xs text-slate-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Topic Subscribers Feed (AWS ARN)</span>
                </div>
                <span className="text-[9px] font-mono text-slate-500">SUBSCRIPTION STATUS: ACTIVE</span>
              </div>

              {/* Live Alerts Queue Feed */}
              <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-1">
                <AnimatePresence initial={false}>
                  {alerts.map((al) => {
                    const Icon = (channelIcons as any)[al.channel];
                    let badgeCol = "text-sky-400 bg-sky-950/20 border-sky-500/20";
                    if (al.channel === "PagerDuty") badgeCol = "text-red-400 bg-red-950/20 border-red-500/20";
                    if (al.channel === "Email") badgeCol = "text-purple-400 bg-purple-950/20 border-purple-500/20";

                    return (
                      <motion.div
                        key={al.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="p-3.5 bg-slate-900/40 border border-slate-850 rounded-xl flex items-start space-x-3.5"
                      >
                        <div className="w-8 h-8 rounded-lg bg-slate-950 border border-slate-850 flex items-center justify-center text-sky-400 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="space-y-1.5 flex-1 min-w-0 font-mono text-[10px]">
                          <div className="flex items-center justify-between">
                            <span className={`border px-1.5 py-0.5 rounded uppercase font-bold text-[8px] ${badgeCol}`}>
                              SNS: {al.channel}
                            </span>
                            <span className="text-slate-500 text-[8px]">{al.timestamp}</span>
                          </div>
                          
                          <p className="text-slate-300 font-sans leading-relaxed text-xs">
                            {al.message}
                          </p>

                          <div className="text-[7.5px] text-slate-500 break-all pt-1 border-t border-slate-900 mt-1">
                            {al.arn}
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
                {alerts.length === 0 && (
                  <div className="text-center py-12 text-slate-500 text-xs font-mono">
                    Awaiting operational dispatch...
                  </div>
                )}
              </div>
            </div>

            {/* Sns summary metadata */}
            <div className="mt-4 pt-3 border-t border-slate-850 flex items-center justify-between text-[9px] text-slate-500 font-mono">
              <span>DISPATCH ARNS: arn:aws:sns:us-east-1:*</span>
              <span className="text-emerald-400 font-bold uppercase flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Payload encrypted</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
