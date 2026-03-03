import { Search, CarFront, Bus, MapPin, Gauge } from 'lucide-react';
import CountUp from 'react-countup';

export default function Transport() {
    return (
        <div className="w-full h-full flex flex-col animate-fade-in">
            <div className="flex justify-between items-center mb-8 px-1">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Search className="w-5 h-5" />
                    </div>
                    <h1 className="text-[32px] font-semibold text-[#1a1a1c] tracking-tight">Mobility & Transport</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                {/* Fleet Card */}
                <div className="bg-[#212123] rounded-[2rem] p-7 text-white shadow-xl flex flex-col relative overflow-hidden group border border-gray-700/30 col-span-1 border-b-4 border-b-blue-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-blue-500/20 rounded-xl text-blue-500"><CarFront className="w-6 h-6" /></div>
                        <h3 className="text-gray-300 font-medium">Campus Fleet</h3>
                    </div>
                    <span className="text-3xl font-light mb-1">
                        <CountUp start={0} end={2450} duration={2} separator="," /> <span className="text-sm text-gray-500">kg CO₂e</span>
                    </span>
                    <p className="text-xs text-blue-400 mt-2">12 Active Vehicles</p>
                </div>

                {/* Commute Card */}
                <div className="bg-[#212123] rounded-[2rem] p-7 text-white shadow-xl flex flex-col relative overflow-hidden group border border-gray-700/30 col-span-1 border-b-4 border-b-emerald-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-emerald-500/20 rounded-xl text-emerald-500"><Bus className="w-6 h-6" /></div>
                        <h3 className="text-gray-300 font-medium">Student Commute</h3>
                    </div>
                    <span className="text-3xl font-light mb-1">
                        <CountUp start={0} end={11800} duration={2} separator="," /> <span className="text-sm text-gray-500">kg CO₂e</span>
                    </span>
                    <p className="text-xs text-emerald-400 mt-2">15% Public Transit Adoption</p>
                </div>

                {/* Logistics */}
                <div className="bg-[#212123] rounded-[2rem] p-7 text-white shadow-xl flex flex-col relative overflow-hidden group border border-gray-700/30 col-span-1 border-b-4 border-b-purple-500">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="p-2.5 bg-purple-500/20 rounded-xl text-purple-500"><MapPin className="w-6 h-6" /></div>
                        <h3 className="text-gray-300 font-medium">Logistics & Supply</h3>
                    </div>
                    <span className="text-3xl font-light mb-1">
                        <CountUp start={0} end={890} duration={2} separator="," /> <span className="text-sm text-gray-500">kg CO₂e</span>
                    </span>
                    <p className="text-xs text-purple-400 mt-2">45 Deliveries this week</p>
                </div>
            </div>

            <div className="flex-1 bg-white/50 backdrop-blur-md rounded-[2rem] border border-white/60 shadow-lg p-8 flex items-center justify-center">
                <div className="text-center">
                    <Gauge className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-medium text-gray-700 mb-2">Detailed mapping unavailable</h2>
                    <p className="text-gray-500 text-sm">Connect your fleet tracking API to visualize live campus vehicle locations.</p>
                </div>
            </div>
        </div>
    );
}
