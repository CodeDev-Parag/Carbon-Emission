import { Search, Zap, BatteryCharging, Sun, Activity } from 'lucide-react';
import CountUp from 'react-countup';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip as ChartTooltip, Filler, Legend } from 'chart.js';
import { Line as ChartLine } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartTooltip, Filler, Legend);

const energyData = [
    { value: 920 }, { value: 890 }, { value: 980 }, { value: 820 }, { value: 760 }, { value: 880 }, { value: 950 }
];

export default function Energy() {
    return (
        <div className="w-full h-full flex flex-col animate-fade-in">
            {/* Title Row */}
            <div className="flex justify-between items-center mb-8 px-1">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Search className="w-5 h-5" />
                    </div>
                    <h1 className="text-[32px] font-semibold text-[#1a1a1c] tracking-tight">Energy Hub</h1>
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-6">

                {/* Electricity Card */}
                <div className="bg-[#212123] rounded-[2rem] p-7 text-white shadow-xl flex flex-col relative overflow-hidden group border border-gray-700/30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-yellow-500/10 transition-colors duration-500"></div>
                    <div className="flex justify-between items-center mb-6 z-10">
                        <div className="flex gap-3 items-center">
                            <div className="p-2 bg-yellow-500/20 rounded-full text-yellow-500"><Zap className="w-5 h-5" /></div>
                            <h3 className="text-gray-300 font-medium text-base tracking-wide">Electricity Consumption</h3>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-8 z-10">
                        <span className="text-4xl font-light">
                            <CountUp start={0} end={45.2} duration={2} decimals={1} />M
                        </span>
                        <span className="text-gray-500 text-sm">kWh</span>
                    </div>

                    <div className="h-24 w-full relative z-10 mt-auto">
                        <ChartLine
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false }, tooltip: { enabled: false } },
                                scales: { x: { display: false }, y: { display: false, min: 0 } },
                                elements: { point: { radius: 0 } },
                                layout: { padding: 0 }
                            }}
                            data={{
                                labels: energyData.map((_, i) => i),
                                datasets: [{
                                    fill: true,
                                    data: energyData.map(d => d.value),
                                    borderColor: '#eab308',
                                    borderWidth: 2,
                                    backgroundColor: (context) => {
                                        const chart = context.chart;
                                        const { ctx, chartArea } = chart;
                                        if (!chartArea) return 'rgba(234, 179, 8, 0.3)';
                                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                                        gradient.addColorStop(0, 'rgba(234, 179, 8, 0.3)');
                                        gradient.addColorStop(1, 'rgba(234, 179, 8, 0)');
                                        return gradient;
                                    },
                                    tension: 0.4
                                }]
                            }}
                        />
                    </div>
                </div>

                {/* Solar Generation Card */}
                <div className="bg-[#212123] rounded-[2rem] p-7 text-white shadow-xl flex flex-col relative overflow-hidden group border border-gray-700/30">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/10 transition-colors duration-500"></div>
                    <div className="flex justify-between items-center mb-6 z-10">
                        <div className="flex gap-3 items-center">
                            <div className="p-2 bg-green-500/20 rounded-full text-green-500"><Sun className="w-5 h-5" /></div>
                            <h3 className="text-gray-300 font-medium text-base tracking-wide">Solar Generation</h3>
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2 mb-8 z-10">
                        <span className="text-4xl font-light">
                            <CountUp start={0} end={12.8} duration={2} decimals={1} />M
                        </span>
                        <span className="text-gray-500 text-sm">kWh</span>
                    </div>

                    <div className="flex justify-between items-center mt-auto border-t border-gray-700/50 pt-4 z-10">
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-[10px] uppercase">Active Panels</span>
                            <span className="text-lg font-medium">
                                <CountUp start={0} end={1204} duration={2} separator="," />
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-gray-500 text-[10px] uppercase">Efficiency</span>
                            <span className="text-lg font-medium text-green-400">94%</span>
                        </div>
                        <Activity className="text-gray-600 w-8 h-8" />
                    </div>
                </div>

            </div>

            <div className="flex-1 bg-gradient-to-br from-white/40 to-white/10 rounded-[2rem] border border-white/40 shadow-sm flex items-center justify-center overflow-hidden relative">
                <div className="text-center z-10">
                    <BatteryCharging className="w-16 h-16 text-[#F43F5E] mx-auto mb-4 opacity-80" />
                    <h2 className="text-2xl font-semibold text-gray-800 mb-2">Smart Grid Active</h2>
                    <p className="text-gray-600 max-w-sm mx-auto">Campus microgrid is optimally balancing loads between main utility line and renewable solar generation.</p>
                </div>
            </div>
        </div>
    );
}
