import { Search, Wand2, TrendingDown } from 'lucide-react';

export default function Scenarios() {
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-between items-center mb-8 px-1">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Search className="w-5 h-5" />
                    </div>
                    <h1 className="text-[32px] font-semibold text-[#1a1a1c] tracking-tight">Predictive Scenarios</h1>
                </div>
            </div>

            <div className="flex-1 bg-[#1A1A1D] rounded-[2rem] border border-gray-800 shadow-2xl p-10 flex flex-col items-center justify-center text-center relative overflow-hidden text-white">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 blur-[100px] rounded-full pointer-events-none"></div>

                <Wand2 className="w-16 h-16 text-indigo-400 mb-6 relative z-10" />
                <h2 className="text-4xl font-light mb-4 tracking-tight relative z-10">AI-Powered Forecasting</h2>
                <p className="text-gray-400 max-w-xl text-lg mb-8 relative z-10 font-light">
                    Model future campus layouts, test alternative energy transitions, and instantly see the financial and environmental impact of net-zero strategies.
                </p>

                <div className="flex gap-4 relative z-10 transform hover:scale-105 transition-transform cursor-pointer">
                    <div className="bg-gradient-to-br from-indigo-600 to-purple-700 p-[1px] rounded-full">
                        <button className="bg-[#111] hover:bg-transparent transition-colors px-8 py-3 rounded-full font-medium flex items-center gap-2">
                            <TrendingDown className="w-5 h-5" /> Execute Simulation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
