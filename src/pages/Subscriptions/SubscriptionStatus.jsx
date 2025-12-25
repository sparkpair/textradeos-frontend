import { useEffect, useState } from "react";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Calendar, 
  Zap, 
  ArrowRight, 
  ShieldCheck, 
  CreditCard 
} from "lucide-react";
import axiosClient from "../../api/axiosClient";
import { formatDateWithDay } from "../../utils/index";
import { useToast } from "../../context/ToastContext";

export default function SubscriptionStatus() {
  const [statusData, setStatusData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  useEffect(() => {
    document.title = "Subscription | TexTradeOS";
    fetchCurrentStatus();
  }, []);

  const fetchCurrentStatus = async () => {
    try {
      setLoading(true);
      const { data } = await axiosClient.get("/subscriptions/my-status");
      setStatusData(data);
    } catch (error) {
      addToast("Failed to load subscription status", "error");
    } finally {
      setLoading(false);
    }
  };

  // --- Dynamic Calculation Logic ---
  const calculateProgress = () => {
    if (!statusData?.startDate || !statusData?.endDate) return 0;
    
    const start = new Date(statusData.startDate).getTime();
    const end = new Date(statusData.endDate).getTime();
    const now = new Date().getTime();

    const totalDuration = end - start;
    const elapsed = now - start;
    
    // Kitne percent time guzar gaya (elapsed / total)
    // Hamein 'Remaining' dikhana hai to: 100 - elapsedPercentage
    const consumed = (elapsed / totalDuration) * 100;
    const remaining = 100 - consumed;

    return Math.min(Math.max(remaining, 0), 100);
  };

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center text-slate-400 font-medium animate-pulse">
        Syncing Plan...
      </div>
    );
  }

  if (!statusData) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-slate-500">
        <AlertTriangle className="mb-2 text-amber-500" /> 
        No active plan found.
      </div>
    );
  }

  const isExpired = new Date(statusData.endDate) < new Date();
  
  // Progress Constants
  const progressPercent = calculateProgress();
  const radius = 58;
  const circumference = 2 * Math.PI * radius; // Approx 364.4
  const strokeDashoffset = circumference - (progressPercent / 100) * circumference;

  const getDaysLeft = () => {
    if (isExpired || !statusData?.endDate) return 0;
    const end = new Date(statusData.endDate).getTime();
    const now = new Date().getTime();
    
    const diffInMs = end - now;
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const daysLeft = getDaysLeft();

  return (
    <div className="max-w-5xl mx-auto space-y-6 pt-5 px-4">
      
      {/* Header Section */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            Subscription Management
          </h1>
          <p className="text-slate-500 text-sm font-medium flex items-center gap-2 mt-1">
            <ShieldCheck size={16} className="text-[#127475]" /> 
            TexTradeOS
          </p>
        </div>
        <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold border tracking-[0.1em] ${
          !isExpired ? 'bg-emerald-100/50 text-emerald-600 border-emerald-200' : 'bg-rose-50 text-rose-600 border-rose-100'
        }`}>
          {!isExpired ? '● SYSTEM ACTIVE' : '● EXPIRED'}
        </div>
      </header>

      {/* Main Hero Card */}
      <div className="relative overflow-hidden rounded-2xl bg-white border border-slate-200 p-10">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center">
          <div className="space-y-3">
            <span className="inline-block px-2.5 py-1 rounded-lg bg-[#127475] text-white text-[9px] font-bold uppercase tracking-wider">
              Current Plan
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-slate-900 capitalize">
              {statusData.type}
            </h2>
            <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
              <p className="flex items-center gap-1.5"><CreditCard size={14}/> Monthly Billing</p>
              <p className="flex items-center gap-1.5 font-semibold text-[#0c5f60]">
                <Clock size={14}/> 
                {isExpired ? (
                  "Plan Ended"
                ) : daysLeft === 0 ? (
                  "Ends Today"
                ) : (
                  `${daysLeft} ${daysLeft === 1 ? 'Day' : 'Days'} Left`
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 mt-4 md:mt-0 px-4">
            <div className="text-4xl font-bold text-slate-900 tracking-tighter">
              Rs.{statusData.price?.toLocaleString() || "0"}
            </div>
            <p className="text-slate-400 text-[10px] font-medium tracking-widest uppercase">ID: {statusData._id?.slice(-6).toUpperCase()}</p>
          </div>
        </div>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        <div className="md:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <LightDetailCard 
              icon={<Calendar className="text-[#127475]" />}
              label="Plan Activated"
              value={formatDateWithDay(statusData.startDate)}
            />
            <LightDetailCard 
              icon={<Clock className="text-[#127475]" />}
              label="Renewal Date"
              value={formatDateWithDay(statusData.endDate)}
            />
          </div>

          {/* Business Info Bar */}
          <div className="bg-white border border-slate-200 p-5 rounded-2xl flex items-center justify-between">
              <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 text-[#127475]">
                    <CheckCircle size={20} />
                  </div>
                  <div>
                    <p className="text-slate-400 text-[9px] font-bold tracking-widest uppercase">Verified Entity</p>
                    <p className="text-base font-semibold text-slate-800">{statusData.businessId?.name}</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Expiry Progress Card - FULLY DYNAMIC */}
          <div className="md:col-span-4 bg-white border border-slate-200 rounded-2xl p-8 flex flex-col items-center text-center">
            <div className="relative mb-6">
              <svg className="w-32 h-32 transform -rotate-90">
                {/* Background Circle */}
                <circle cx="64" cy="64" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-slate-100" />
                {/* Dynamic Progress Circle */}
                <circle 
                  cx="64" 
                  cy="64" 
                  r={radius} 
                  stroke="currentColor" 
                  strokeWidth="6" 
                  fill="transparent" 
                  strokeDasharray={circumference} 
                  strokeDashoffset={isExpired ? circumference : strokeDashoffset}
                  className={`${isExpired ? 'text-rose-500' : 'text-[#127475]'} transition-all duration-1000 ease-out`} 
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-[9px] font-bold text-slate-400 tracking-widest uppercase">Remaining</p>
                <p className="text-lg font-bold text-slate-900 leading-none mt-1">
                  {isExpired ? '0%' : `${Math.round(progressPercent)}%`}
                </p>
              </div>
            </div>

            <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.1em] leading-tight">
              {isExpired ? 'Expired on' : 'Terminating on'} <br/>
              <span className="text-slate-900 font-bold">{formatDateWithDay(statusData.endDate).split(',')[0]}</span>
            </h4>
          </div>
        </div>
      </div>
  );
}

function LightDetailCard({ icon, label, value }) {
  return (
    <div className="bg-white border border-slate-200 p-6 rounded-2xl">
      <div className="w-11 h-11 rounded-lg bg-slate-100 flex items-center justify-center mb-4 border border-slate-100">
        {icon}
      </div>
      <p className="text-slate-400 text-[9px] font-bold tracking-widest uppercase mb-1 px-1">{label}</p>
      <h4 className="text-lg font-bold text-slate-900 tracking-tight px-1">{value}</h4>
    </div>
  );
}