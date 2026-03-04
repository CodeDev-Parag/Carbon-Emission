import { useState } from 'react';
import {
    ArrowUpRight,
    ArrowDownRight,
    RefreshCw,
    Database,
    FileText,
    Users,
    ClipboardList,
} from 'lucide-react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);

// --- Dummy Data ---

// 12 months for X-axis
const months = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// Data for VIZ B (Total Trend)
const totalEmissionsData = [12500, 13200, 14100, 13800, 15000, 14200, 13100, 12800, 13500, 14000, 14800, 14250];

// Data for VIZ C (Stacked Breakdown)
const energyData = [8000, 8500, 9200, 9000, 9800, 9500, 8500, 8200, 8800, 9100, 9600, 9200];
const transportData = [3500, 3700, 3900, 3800, 4200, 3800, 3600, 3500, 3700, 3900, 4100, 3950];
const wasteData = [1000, 1000, 1000, 1000, 1000, 900, 1000, 1100, 1000, 1000, 1100, 1100];

// Data for VIZ B-1 (Interactive Map Locations)
// Using coordinates matching roughly the Northwestern University campus area (from previous dummy identity)
const campusLocations = [
    { id: 1, name: 'Science Complex', type: 'High Energy', co2: 5200, coords: [42.0580, -87.6750], color: '#ef4444' }, // Red (High)
    { id: 2, name: 'Main Library', type: 'Base Load', co2: 2400, coords: [42.0535, -87.6738], color: '#f59e0b' }, // Amber (Medium)
    { id: 3, name: 'Student Center', type: 'Mixed Use', co2: 3100, coords: [42.0520, -87.6780], color: '#f59e0b' }, // Amber (Medium)
    { id: 4, name: 'North Parking Structure', type: 'Transport Hub', co2: 850, coords: [42.0610, -87.6755], color: '#3b82f6' }, // Blue (Low)
    { id: 5, name: 'Athletic Facility', type: 'Events', co2: 1800, coords: [42.0590, -87.6720], color: '#10b981' }, // Green (Low-Medium)
];

export default function Overview() {
    const [isNormalized, setIsNormalized] = useState(false);

    // Calculate normalized percentages for VIZ C if toggled
    const getStackedData = () => {
        if (!isNormalized) {
            return {
                energy: energyData,
                transport: transportData,
                waste: wasteData
            };
        }

        return {
            energy: energyData.map((val, i) => (val / totalEmissionsData[i]) * 100),
            transport: transportData.map((val, i) => (val / totalEmissionsData[i]) * 100),
            waste: wasteData.map((val, i) => (val / totalEmissionsData[i]) * 100)
        };
    };

    const stackedData = getStackedData();

    // Chart Configuration for VIZ B: Total Trend
    const totalTrendOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                titleColor: '#a3a3a3',
                bodyColor: '#fff',
                borderColor: '#333',
                borderWidth: 1,
                padding: 12,
                callbacks: {
                    label: (context: any) => `${context.parsed.y.toLocaleString()} kg CO₂e`
                }
            }
        },
        scales: {
            x: {
                grid: { display: false, color: '#333' },
                ticks: { color: '#888', font: { size: 11 } }
            },
            y: {
                grid: { color: 'rgba(51, 51, 51, 0.2)' },
                ticks: {
                    color: '#888',
                    font: { size: 11 },
                    callback: (value: any) => `${(value / 1000).toFixed(0)}k`
                },
                border: { display: false },
                beginAtZero: true
            }
        },
        interaction: { mode: 'nearest' as const, axis: 'x' as const, intersect: false },
    };

    // Chart Configuration for VIZ C: Stacked Categories
    const stackedOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom' as const,
                labels: { color: '#a3a3a3', usePointStyle: true, boxWidth: 8, padding: 20 }
            },
            tooltip: {
                mode: 'index' as const,
                intersect: false,
                backgroundColor: 'rgba(17, 17, 17, 0.9)',
                callbacks: {
                    label: (context: any) => {
                        let label = context.dataset.label || '';
                        if (label) label += ': ';
                        if (context.parsed.y !== null) {
                            label += isNormalized
                                ? `${context.parsed.y.toFixed(1)}%`
                                : `${context.parsed.y.toLocaleString()} kg`;
                        }
                        return label;
                    }
                }
            }
        },
        scales: {
            x: {
                stacked: true,
                grid: { display: false },
                ticks: { color: '#888', font: { size: 11 } }
            },
            y: {
                stacked: true,
                grid: { color: 'rgba(51, 51, 51, 0.2)' },
                ticks: {
                    color: '#888',
                    font: { size: 11 },
                    callback: (value: any) => isNormalized ? `${value}%` : `${(value / 1000).toFixed(0)}k`
                },
                border: { display: false },
                min: 0,
                max: isNormalized ? 100 : undefined
            }
        },
        interaction: { mode: 'index' as const, intersect: false },
    };

    return (
        <div className="w-full flex flex-col gap-6 animate-fade-in-up">

            {/* Title Row */}
            <div className="flex justify-between items-center px-1">
                <div>
                    <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Campus Overview</h1>
                    <p className="text-gray-500 text-sm mt-1">Campus-level GHG footprint summary and trends.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-4 py-2 rounded-xl text-[13px] font-medium hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-all duration-200">
                        <RefreshCw className="w-3.5 h-3.5" /> Refresh Data
                    </button>
                </div>
            </div>

            {/* VIZ A: KPI Tiles Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4">

                {/* Card 1: Total CO2e */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-800"></div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider">Total CO₂e</h3>
                        <div className="group relative">
                            <div className="w-2 h-2 rounded-full bg-green-500 self-center"></div>
                            {/* Confidence Tooltip */}
                            <span className="absolute -top-7 -left-12 bg-gray-800 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">High Confidence</span>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light text-gray-900">14,250</span>
                            <span className="text-gray-500 text-sm">kg</span>
                        </div>
                        <div className="flex items-center mt-3 justify-between">
                            <span className="text-red-500 text-xs flex items-center font-medium bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 2.4% MoM
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100" title="Source: Meter / Bill">
                                <Database className="w-3 h-3" /> Metered
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 2: Energy CO2e */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#0284C7]"></div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider">Energy</h3>
                        <div className="group relative">
                            <div className="w-2 h-2 rounded-full bg-green-500 self-center"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light text-gray-900">9,200</span>
                            <span className="text-gray-500 text-sm">kg</span>
                        </div>
                        <div className="flex items-center mt-3 justify-between">
                            <span className="text-red-500 text-xs flex items-center font-medium bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 1.8% MoM
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                <FileText className="w-3 h-3" /> Bill
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 3: Transport CO2e */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#D97706]"></div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider">Transport</h3>
                        <div className="group relative">
                            <div className="w-2 h-2 rounded-full bg-amber-400 self-center"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light text-gray-900">3,950</span>
                            <span className="text-gray-500 text-sm">kg</span>
                        </div>
                        <div className="flex items-center mt-3 justify-between">
                            <span className="text-red-500 text-xs flex items-center font-medium bg-red-50 px-1.5 py-0.5 rounded border border-red-100">
                                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 4.2% MoM
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                <ClipboardList className="w-3 h-3" /> Survey
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 4: Waste CO2e */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-[#7C3AED]"></div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider">Waste</h3>
                        <div className="group relative">
                            <div className="w-2 h-2 rounded-full bg-amber-400 self-center"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light text-gray-900">1,100</span>
                            <span className="text-gray-500 text-sm">kg</span>
                        </div>
                        <div className="flex items-center mt-3 justify-between">
                            <span className="text-green-600 text-xs flex items-center font-medium bg-green-50 px-1.5 py-0.5 rounded border border-green-100">
                                <ArrowDownRight className="w-3 h-3 mr-0.5" /> 0.8% MoM
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                <Database className="w-3 h-3" /> Log
                            </span>
                        </div>
                    </div>
                </div>

                {/* Card 5: Per Capita */}
                <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200 flex flex-col justify-between relative overflow-hidden group hover:border-gray-300 transition-colors">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gray-300"></div>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-gray-500 font-medium text-xs uppercase tracking-wider">Per Capita</h3>
                        <div className="group relative">
                            <div className="w-2 h-2 rounded-full bg-amber-400 self-center"></div>
                        </div>
                    </div>
                    <div>
                        <div className="flex items-baseline gap-2">
                            <span className="text-3xl font-light text-gray-900">4.4</span>
                            <span className="text-gray-500 text-sm">kg / person</span>
                        </div>
                        <div className="flex items-center mt-3 justify-between">
                            <span className="text-gray-500 text-xs flex items-center font-medium bg-gray-50 px-1.5 py-0.5 rounded border border-gray-200">
                                <ArrowUpRight className="w-3 h-3 mr-0.5" /> 1.1% YoY
                            </span>
                            <span className="flex items-center gap-1 text-[10px] text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                <Users className="w-3 h-3" /> Est
                            </span>
                        </div>
                    </div>
                </div>

            </div>

            {/* Charts Row */}
            <div className="flex flex-col lg:flex-row gap-6">

                {/* VIZ B: Main Trend Area Chart */}
                <div className="bg-white flex-[3] rounded-[2rem] p-6 shadow-sm border border-gray-200 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-gray-800 font-medium text-base">Campus Total CO₂e Trend</h3>
                            <p className="text-gray-500 text-xs mt-1">12-month trailing emissions across all sources</p>
                        </div>
                    </div>

                    <div className="w-full h-72">
                        <Line
                            options={totalTrendOptions}
                            data={{
                                labels: months,
                                datasets: [{
                                    fill: true,
                                    label: 'Total CO₂e',
                                    data: totalEmissionsData,
                                    borderColor: '#171717',
                                    borderWidth: 2,
                                    pointBackgroundColor: '#fff',
                                    pointBorderColor: '#171717',
                                    pointBorderWidth: 2,
                                    pointRadius: 4,
                                    pointHoverRadius: 6,
                                    backgroundColor: (context: any) => {
                                        const chart = context.chart;
                                        const { ctx, chartArea } = chart;
                                        if (!chartArea) return 'rgba(23, 23, 23, 0.1)';
                                        const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                                        gradient.addColorStop(0, 'rgba(23, 23, 23, 0.15)');
                                        gradient.addColorStop(1, 'rgba(23, 23, 23, 0)');
                                        return gradient;
                                    },
                                    tension: 0.4
                                }]
                            }}
                        />
                    </div>
                </div>

                {/* VIZ C: Stacked Category Chart */}
                <div className="bg-white flex-[2] rounded-[2rem] p-6 shadow-sm border border-gray-200 relative overflow-hidden">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h3 className="text-gray-800 font-medium text-base">Emissions by Category</h3>
                            <p className="text-gray-500 text-xs mt-1">Energy vs Transport vs Waste split</p>
                        </div>
                        {/* Normalize Toggle */}
                        <div className="flex bg-gray-100 rounded-lg p-0.5 border border-gray-200 text-xs font-medium">
                            <button
                                onClick={() => setIsNormalized(false)}
                                className={`px-2 py-1 rounded-md transition-all ${!isNormalized ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Absolute
                            </button>
                            <button
                                onClick={() => setIsNormalized(true)}
                                className={`px-2 py-1 rounded-md transition-all ${isNormalized ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                            >
                                Percent %
                            </button>
                        </div>
                    </div>

                    <div className="w-full h-72">
                        <Line
                            options={stackedOptions as any}
                            data={{
                                labels: months,
                                datasets: [
                                    {
                                        fill: true,
                                        label: 'Waste',
                                        data: stackedData.waste,
                                        borderColor: '#7C3AED',
                                        backgroundColor: 'rgba(124, 58, 237, 0.8)',
                                        borderWidth: 1,
                                        pointRadius: 0,
                                        pointHoverRadius: 4,
                                        tension: 0.4
                                    },
                                    {
                                        fill: true,
                                        label: 'Transport',
                                        data: stackedData.transport,
                                        borderColor: '#D97706',
                                        backgroundColor: 'rgba(217, 119, 6, 0.8)',
                                        borderWidth: 1,
                                        pointRadius: 0,
                                        pointHoverRadius: 4,
                                        tension: 0.4
                                    },
                                    {
                                        fill: true,
                                        label: 'Energy',
                                        data: stackedData.energy,
                                        borderColor: '#0284C7',
                                        backgroundColor: 'rgba(2, 132, 199, 0.8)',
                                        borderWidth: 1,
                                        pointRadius: 0,
                                        pointHoverRadius: 4,
                                        tension: 0.4
                                    }
                                ]
                            }}
                        />
                    </div>
                </div>

            </div>

            {/* Map Row */}
            {/* VIZ B-1: Interactive Operations Map */}
            <div className="bg-white w-full rounded-[2rem] p-6 shadow-sm border border-gray-200 relative overflow-hidden">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h3 className="text-gray-800 font-medium text-base">Campus Operations Map</h3>
                        <p className="text-gray-500 text-xs mt-1">Interactive view of facilities and emissions hotspots</p>
                    </div>
                </div>

                {/* z-0 ensures leaflet controls don't overlay top drop-downs if we add any */}
                <div className="w-full h-96 rounded-xl overflow-hidden border border-gray-100 relative z-0">
                    <MapContainer
                        center={[42.0560, -87.6750]}
                        zoom={15}
                        scrollWheelZoom={false}
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                        />

                        {campusLocations.map(site => (
                            <CircleMarker
                                key={site.id}
                                center={site.coords as [number, number]}
                                radius={Math.max(8, site.co2 / 300)} // Dynamic radius based on CO2 intensity
                                pathOptions={{
                                    fillColor: site.color,
                                    color: site.color,
                                    fillOpacity: 0.6,
                                    weight: 2
                                }}
                            >
                                <Popup className="rounded-xl">
                                    <div className="flex flex-col gap-1 p-1 min-w-[140px]">
                                        <span className="font-bold text-gray-900 text-sm leading-tight">{site.name}</span>
                                        <span className="text-xs text-gray-500">{site.type}</span>
                                        <div className="mt-2 text-sm">
                                            <span className="font-semibold text-gray-900">{site.co2.toLocaleString()}</span>
                                            <span className="text-gray-500 text-xs ml-1">kg CO₂e/mo</span>
                                        </div>
                                    </div>
                                </Popup>
                            </CircleMarker>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
}
