import {
    Search,
    RefreshCw,
    Upload,
    Share2,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal
} from 'lucide-react';
import CountUp from 'react-countup';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip as ChartTooltip, Filler, Legend } from 'chart.js';
import { Line as ChartLine, Chart } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, ChartTooltip, Filler, Legend);

const trendData1 = [{ value: 100 }, { value: 120 }, { value: 105 }, { value: 130 }, { value: 90 }, { value: 115 }, { value: 140 }];
const trendData2 = [{ value: 150 }, { value: 130 }, { value: 160 }, { value: 140 }, { value: 170 }, { value: 150 }, { value: 200 }];

const categoryTableData = [
    { category: 'Electricity (Scope 2)', spend: '16,810 kg', transactions: '1023', suppliers: '83 (7.1%)', cycle: '11 days', cycleColor: 'bg-red-500' },
    { category: 'DG Sets (Scope 1)', spend: '15,032 kg', transactions: '1019', suppliers: '21 (2.7%)', cycle: '8 days', cycleColor: 'bg-orange-500' },
    { category: 'Vehicles (Scope 1)', spend: '15,012 kg', transactions: '820', suppliers: '28 (2.6%)', cycle: '2 days', cycleColor: 'bg-green-500' },
    { category: 'Commute (Scope 3)', spend: '13,235 kg', transactions: '735', suppliers: '112 (9.4%)', cycle: '11 days', cycleColor: 'bg-red-500' },
    { category: 'Waste (Scope 3)', spend: '12,095 kg', transactions: '624', suppliers: '16 (1.8%)', cycle: '7 days', cycleColor: 'bg-green-500' },
];

const monthlyData = [
    { name: 'Jan', val: 30 }, { name: 'Feb', val: 180 }, { name: 'Mar', val: 80 }, { name: 'Apr', val: 120 },
    { name: 'May', val: 60 }, { name: 'Jun', val: 240 }, { name: 'Jul', val: 110 }, { name: 'Aug', val: 90 }
];


export default function Overview() {
    return (
        <div className="w-full flex flex-col animate-fade-in">
            {/* Title Row */}
            <div className="flex justify-between items-center mb-8 px-1">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Search className="w-5 h-5" />
                    </div>
                    <h1 className="text-[32px] font-semibold text-[#1a1a1c] tracking-tight">Overview Dashboard</h1>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 bg-[#111] text-white px-5 py-2.5 rounded-full text-[13px] font-medium hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        Refresh <RefreshCw className="w-3.5 h-3.5" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-[#111] text-white rounded-full hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Upload className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-[#111] text-white rounded-full hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Share2 className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Main Dashboard Layout */}
            {/* Top Section */}
            <div className="flex flex-col xl:flex-row gap-6 mb-6">
                {/* Left Metrics column */}
                <div className="flex flex-col gap-4 w-full xl:w-[480px] shrink-0 animate-fade-in-up">
                    {/* Box 1: Overview */}
                    <div className="bg-[#212123] rounded-[2rem] p-7 text-white shadow-xl flex flex-col justify-between border border-gray-700/30 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-white/10 transition-colors duration-500"></div>
                        <h3 className="text-gray-400 font-medium mb-8 text-[13px] uppercase tracking-wider">Overview</h3>
                        <div className="flex flex-wrap justify-between items-end gap-4 sm:gap-2">
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-light">
                                        <CountUp start={0} end={14.2} duration={2} decimals={1} />K
                                    </span>
                                    <span className="text-[#16A34A] text-xs flex items-center font-medium bg-[#16A34A]/20 px-1 py-0.5 rounded">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> 6.2%
                                    </span>
                                </div>
                                <div className="text-gray-500 text-xs mt-1">Total CO₂e</div>
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-light">
                                        <CountUp start={0} end={9.6} duration={2} decimals={1} />K
                                    </span>
                                    <span className="text-[#16A34A] text-xs flex items-center font-medium bg-[#16A34A]/20 px-1 py-0.5 rounded">
                                        <ArrowUpRight className="w-3 h-3 mr-0.5" /> 4.8%
                                    </span>
                                </div>
                                <div className="text-gray-500 text-xs mt-1">Energy CO₂e</div>
                            </div>
                            <div>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-3xl font-light">
                                        <CountUp start={0} end={3.2} duration={2} decimals={1} />K
                                    </span>
                                    <span className="text-red-400 text-xs flex items-center font-medium bg-red-400/20 px-1 py-0.5 rounded">
                                        <ArrowDownRight className="w-3 h-3 mr-0.5" /> 0.2%
                                    </span>
                                </div>
                                <div className="text-gray-500 text-xs mt-1">Transport</div>
                            </div>
                        </div>
                    </div>

                    {/* Smaller Box Row */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="bg-[#212123] flex-1 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden border border-gray-700/30 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 group">
                            <div className="flex justify-between items-start z-10 relative">
                                <h3 className="text-gray-400 font-medium text-sm">Waste CO₂e</h3>
                                <div className="bg-[#333] p-1.5 rounded-full group-hover:bg-[#444] transition-colors"><ArrowUpRight className="w-3.5 h-3.5 text-gray-300" /></div>
                            </div>
                            <div className="flex items-baseline gap-2 mt-2 z-10 relative">
                                <span className="text-2xl font-light tracking-wide">
                                    <CountUp start={0} end={1209} duration={2} separator="," />
                                </span>
                                <span className="text-red-400 text-[10px]">-0.281</span>
                            </div>
                            {/* Mini chart */}
                            <div className="absolute bottom-0 left-0 right-0 h-14">
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
                                        labels: trendData1.map((_, i) => i),
                                        datasets: [{
                                            fill: true,
                                            data: trendData1.map(d => d.value),
                                            borderColor: '#ef4444',
                                            borderWidth: 2,
                                            backgroundColor: (context) => {
                                                const chart = context.chart;
                                                const { ctx, chartArea } = chart;
                                                if (!chartArea) return 'rgba(239, 68, 68, 0.3)';
                                                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                                                gradient.addColorStop(0, 'rgba(239, 68, 68, 0.3)');
                                                gradient.addColorStop(1, 'rgba(239, 68, 68, 0)');
                                                return gradient;
                                            },
                                            tension: 0.4
                                        }]
                                    }}
                                />
                            </div>
                        </div>

                        <div className="bg-[#212123] flex-1 rounded-[2rem] p-6 text-white shadow-xl relative overflow-hidden border border-gray-700/30 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 group">
                            <div className="flex justify-between items-start z-10 relative">
                                <h3 className="text-gray-400 font-medium text-sm">Target Scope</h3>
                                <div className="bg-[#333] p-1.5 rounded-full group-hover:bg-[#444] transition-colors"><ArrowDownRight className="w-3.5 h-3.5 text-gray-300" /></div>
                            </div>
                            <div className="flex items-baseline gap-2 mt-2 z-10 relative">
                                <span className="text-2xl font-light tracking-wide">
                                    <CountUp start={0} end={2956} duration={2} separator="," />
                                </span>
                                <span className="text-[#16A34A] text-[10px]">+0.116</span>
                            </div>
                            {/* Mini chart */}
                            <div className="absolute bottom-0 left-0 right-0 h-14">
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
                                        labels: trendData2.map((_, i) => i),
                                        datasets: [{
                                            fill: true,
                                            data: trendData2.map(d => d.value),
                                            borderColor: '#22c55e',
                                            borderWidth: 2,
                                            backgroundColor: (context) => {
                                                const chart = context.chart;
                                                const { ctx, chartArea } = chart;
                                                if (!chartArea) return 'rgba(34, 197, 94, 0.3)';
                                                const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                                                gradient.addColorStop(0, 'rgba(34, 197, 94, 0.3)');
                                                gradient.addColorStop(1, 'rgba(34, 197, 94, 0)');
                                                return gradient;
                                            },
                                            tension: 0.4
                                        }]
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Map Area placeholder */}
                <div className="flex-1 relative min-h-[260px] flex items-center justify-center rounded-[2rem] bg-gradient-to-br from-white/30 to-transparent border border-white/20 shadow-[inset_0_0_20px_rgba(255,255,255,0.5)] overflow-hidden animate-fade-in-up-delay-1">
                    <div className="absolute inset-x-0 inset-y-8 bg-[url('https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries-sans-antarctica.json')] bg-center bg-no-repeat bg-contain opacity-20 z-0 drop-shadow-md" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAwIDUwMCI+PHBhdGggZmlsbD0iI2FhYSIgZD0iTTUwMCw1MGMtMjAwLDAtNDAwLDgwLTQwMCwyMDBzMjAwLDE1MCA0MDAsMTUwczQwMC01MCA0MDAtMTUwUzcwMCw1MCA1MDAsNTB6IiBvcGFjaXR5PSIwLjMiLz48L3N2Zz4=')" }} />

                    <div className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-72 h-32 md:h-40 bg-gradient-to-r from-[#F43F5E]/30 via-[#F43F5E]/20 to-transparent blur-3xl z-10 rounded-full transform rotate-12 mix-blend-multiply"></div>

                    <div className="relative z-20 flex flex-col items-center group cursor-pointer mt-8">
                        <div className="relative hover:scale-125 transition-transform duration-300">
                            <div className="animate-ping absolute -inset-2 rounded-full bg-[#F43F5E] opacity-30"></div>
                            <div className="w-4 h-4 bg-[#111] border-2 border-[#F43F5E] rounded-full relative z-20 shadow-[0_0_15px_rgba(244,63,94,0.6)]"></div>
                        </div>
                        <div className="absolute top-6 bg-white/95 backdrop-blur-md text-xs px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center border border-gray-100 pointer-events-none whitespace-nowrap z-30">
                            <span className="font-semibold text-gray-900">4,650 kg CO₂e</span>
                            <span className="text-gray-500 text-[10px]">North Campus Hotspot</span>
                        </div>
                    </div>

                    <div className="absolute top-[38%] right-[32%] z-20 flex flex-col items-center group cursor-pointer">
                        <div className="w-3 h-3 bg-[#111] hover:bg-[#F43F5E] transition-colors rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.4)] ring-2 ring-white/50 relative hover:scale-110 duration-200"></div>
                        <div className="absolute top-5 bg-[#111] text-white backdrop-blur text-[10px] px-2 py-1 rounded-md shadow-lg opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center pointer-events-none whitespace-nowrap z-30">
                            <span className="font-medium text-[#F43F5E]">2,100 kg</span>
                            <span className="text-gray-300 text-[9px]">South Hub</span>
                        </div>
                    </div>

                    <div className="absolute bottom-1/3 left-1/4 z-20 flex flex-col items-center">
                        <div className="w-4 h-4 text-red-500 drop-shadow-[0_0_8px_#ef4444]">
                            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zM7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.88-2.88 7.19-5 9.88C9.88 16.19 7 11.88 7 9z" /><circle cx="12" cy="9" r="2.5" /></svg>
                        </div>
                    </div>
                </div>

                {/* Right Card: Key Suppliers / Scopes */}
                <div className="bg-[#212123] w-full xl:w-[320px] rounded-[2rem] p-7 text-white shadow-xl flex flex-col justify-between border border-gray-700/30 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 relative overflow-hidden group shrink-0 animate-fade-in-up-delay-2">
                    <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#F43F5E]/5 rounded-full blur-3xl group-hover:bg-[#F43F5E]/10 transition-colors duration-500 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white font-medium text-base tracking-wide">Scope Share</h3>
                            <div className="bg-[#333] p-1.5 rounded-full group-hover:bg-[#444] transition-colors cursor-pointer"><ArrowUpRight className="w-3.5 h-3.5 text-gray-300" /></div>
                        </div>
                        <div className="text-[11px] text-[#16A34A] mt-1">
                            14,250 <span className="text-gray-500 font-medium">Total CO₂e</span>
                        </div>
                    </div>

                    {/* Gradient Bar Chart Simulation for "Key Suppliers" view */}
                    <div className="flex mt-6 gap-2 justify-between items-end h-32 w-full pt-4">
                        {[
                            { lbl: 'Scope 2', v: '45%', h: '80%' },
                            { lbl: 'Scope 1', v: '23%', h: '45%' },
                            { lbl: 'Scope 3', v: '19%', h: '35%' },
                            { lbl: 'Other', v: '13%', h: '25%' },
                        ].map((item, i) => (
                            <div key={i} className="flex flex-col items-center flex-1 h-full justify-end relative group">
                                <span className="text-white text-sm font-light mb-2">{item.v}</span>
                                <div
                                    className="w-full rounded-t-sm bg-gradient-to-b from-gray-400/80 to-transparent relative overflow-hidden transition-all duration-300 group-hover:from-red-400 group-hover:to-red-500/20"
                                    style={{ height: item.h }}
                                >
                                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-red-500/60 to-transparent"></div>
                                </div>
                                <span className="text-gray-400 mt-2 text-[10px] whitespace-nowrap">{item.lbl}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col xl:flex-row gap-6 mb-2">
                {/* Table (Spend By Category) */}
                <div className="bg-[#212123] flex-[1.5] rounded-[2rem] p-7 relative overflow-x-auto text-white shadow-xl border border-gray-700/30 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 hide-scrollbar animate-fade-in-up-delay-2">
                    <div className="flex justify-between items-center mb-6 min-w-[500px]">
                        <h3 className="text-white font-medium text-base tracking-wide">Emissions by Category</h3>
                        <div className="flex bg-[#111] rounded-full p-1 border border-gray-800 text-[11px] font-medium shadow-inner">
                            {['All', 'Daily', 'Weekly', 'Monthly', 'Yearly'].map(tab => (
                                <button key={tab} className={`px-3 py-1 rounded-full transition-all duration-300 ${tab === 'Monthly' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full min-w-[500px]">
                        {/* Table Header */}
                        <div className="grid grid-cols-5 text-[10px] text-gray-500 uppercase tracking-wider mb-3 pb-2 border-b border-gray-800">
                            <div className="flex items-center gap-1">Category <ArrowUpRight className="w-2.5 h-2.5" /></div>
                            <div className="flex items-center gap-1">Emissions <ArrowUpRight className="w-2.5 h-2.5" /></div>
                            <div className="flex items-center gap-1">Entries <ArrowUpRight className="w-2.5 h-2.5" /></div>
                            <div className="flex items-center gap-1">Contributors <ArrowUpRight className="w-2.5 h-2.5" /></div>
                            <div className="flex items-center gap-1 justify-end mr-4">Cycle (Avg) <ArrowUpRight className="w-2.5 h-2.5" /></div>
                        </div>

                        {/* Table Rows */}
                        <div className="flex flex-col gap-3">
                            {categoryTableData.map((row, idx) => (
                                <div key={idx} className="grid grid-cols-5 text-xs text-gray-300 items-center justify-between">
                                    <div className="font-light truncate pr-2">{row.category}</div>
                                    <div>{row.spend}</div>
                                    <div>{row.transactions}</div>
                                    <div>{row.suppliers}</div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-12 h-0.5 bg-gray-700 rounded-full relative">
                                                <div className={`absolute top-0 left-0 h-full rounded-full ${row.cycleColor} w-1/2`}>
                                                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full"></div>
                                                </div>
                                            </div>
                                            <span className="text-[10px] w-8">{row.cycle}</span>
                                        </div>
                                        <MoreHorizontal className="w-4 h-4 text-gray-500 cursor-pointer" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Right Chart */}
                <div className="bg-[#212123] flex-1 rounded-[2rem] p-7 text-white shadow-xl flex flex-col justify-between border border-gray-700/30 hover:shadow-2xl hover:border-gray-600/50 transition-all duration-300 animate-fade-in-up-delay-3">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-white font-medium text-base tracking-wide">Total Footprint</h3>
                        <div className="flex bg-[#111] rounded-full p-1 border border-gray-800 text-[11px] font-medium shadow-inner">
                            {['All', 'Weekly', 'Monthly', 'Yearly'].map(tab => (
                                <button key={tab} className={`px-3 py-1 rounded-full transition-all duration-300 ${tab === 'Yearly' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'}`}>
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="w-full h-36 relative mb-4 mt-2">
                        <Chart
                            type="bar"
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: { display: false },
                                    tooltip: {
                                        backgroundColor: '#1E1E1E',
                                        displayColors: false,
                                        callbacks: { label: (context) => `${context.raw}k` }
                                    }
                                },
                                scales: {
                                    x: { grid: { display: false }, ticks: { color: '#888', font: { size: 10 } } },
                                    y: {
                                        grid: { color: 'rgba(51, 51, 51, 0.4)' },
                                        ticks: { color: '#888', font: { size: 10 }, callback: (value) => `${value}k` },
                                        border: { display: false },
                                        beginAtZero: true
                                    }
                                }
                            }}
                            data={{
                                labels: monthlyData.map(d => d.name),
                                datasets: [
                                    {
                                        type: 'line' as const,
                                        label: 'Trend',
                                        data: monthlyData.map(d => d.val),
                                        borderColor: '#e5e5e5',
                                        borderWidth: 1.5,
                                        stepped: true,
                                        pointBackgroundColor: '#fff',
                                        pointRadius: 2,
                                        fill: false,
                                        order: 1
                                    },
                                    {
                                        type: 'bar' as const,
                                        label: 'Value',
                                        data: monthlyData.map(d => d.val),
                                        backgroundColor: (context: any) => {
                                            const chart = context.chart;
                                            const { ctx, chartArea } = chart;
                                            if (!chartArea) return 'rgba(239, 68, 68, 0.8)';
                                            const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                                            gradient.addColorStop(0, 'rgba(239, 68, 68, 0.8)');
                                            gradient.addColorStop(1, 'rgba(239, 68, 68, 0.2)');
                                            return gradient;
                                        },
                                        borderRadius: { topLeft: 2, topRight: 2 },
                                        barPercentage: 0.5,
                                        categoryPercentage: 0.8,
                                        order: 2
                                    }
                                ]
                            }}
                        />
                        <div className="absolute top-[35%] right-[25%] bg-[#111] text-white text-[9px] px-1 py-0.5 rounded shadow pointer-events-none">
                            -4.1%
                        </div>
                    </div>

                    <div className="w-full bg-[#3d181e] border border-red-900/40 rounded-full px-4 py-2 flex justify-between items-center text-[11px] bg-gradient-to-r from-gray-900 to-[#4e111a]">
                        <span className="text-gray-200">Upgrade to access advanced predictive scenarios</span>
                        <button className="bg-black text-white px-3 py-1 rounded-full border border-gray-700 hover:bg-gray-800 transition-colors">
                            Get Pro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
