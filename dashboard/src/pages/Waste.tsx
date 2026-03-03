import { Search, Recycle, Trash2, Leaf } from 'lucide-react';
import CountUp from 'react-countup';

export default function Waste() {
    return (
        <div className="w-full h-full flex flex-col animate-fade-in">
            <div className="flex justify-between items-center mb-8 px-1">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Search className="w-5 h-5" />
                    </div>
                    <h1 className="text-[32px] font-semibold text-[#1a1a1c] tracking-tight">Waste & Resource Recovery</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-[#212123] rounded-[2rem] p-7 text-white shadow-xl flex items-center gap-6 relative overflow-hidden group border border-gray-700/30">
                    <div className="w-16 h-16 rounded-2xl bg-green-500/20 text-green-500 flex items-center justify-center shrink-0">
                        <Recycle className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-gray-400 font-medium mb-1">Recycled/Composted</h3>
                        <p className="text-3xl font-light">
                            <CountUp start={0} end={6120} duration={2} separator="," /> <span className="text-sm">kg</span>
                        </p>
                    </div>
                </div>

                <div className="bg-[#212123] rounded-[2rem] p-7 text-white shadow-xl flex items-center gap-6 relative overflow-hidden group border border-gray-700/30">
                    <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-500 flex items-center justify-center shrink-0">
                        <Trash2 className="w-8 h-8" />
                    </div>
                    <div>
                        <h3 className="text-gray-400 font-medium mb-1">Landfill Waste</h3>
                        <p className="text-3xl font-light">
                            <CountUp start={0} end={5975} duration={2} separator="," /> <span className="text-sm">kg</span>
                        </p>
                    </div>
                </div>
            </div>

            {/* Glassmorphism panel */}
            <div className="flex-1 bg-gradient-to-r from-green-500/10 to-teal-500/10 backdrop-blur-xl rounded-[2rem] border border-white/60 shadow-lg p-8 flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 text-green-500/10">
                    <Leaf className="w-64 h-64" />
                </div>
                <h2 className="text-3xl font-semibold text-gray-800 mb-4 z-10">Zero Waste Goal 2030</h2>
                <p className="text-gray-600 max-w-lg mb-8 z-10">We are actively expanding our campus composting program and reducing single-use plastics to divert 90% of waste from landfills by 2030.</p>
                <button className="bg-white/80 backdrop-blur text-green-700 border border-green-200 px-6 py-2.5 rounded-full font-medium hover:bg-white transition-all shadow-sm z-10">View Recovery Strategy</button>
            </div>
        </div>
    );
}
