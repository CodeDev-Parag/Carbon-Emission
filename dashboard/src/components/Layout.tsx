import { Outlet, NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Zap,
    Car,
    Recycle,
    Sparkles,
    Settings as SettingsIcon,
    LogOut,
    Download,
    Sun,
    Moon,
    Bell,
    Building2
} from 'lucide-react';
import { useState } from 'react';

export default function Layout() {
    // Local state for toggles (will be moved to global state later)
    const [isScopeView, setIsScopeView] = useState(false);
    const [isTonnes, setIsTonnes] = useState(false);
    const [period, setPeriod] = useState('month');

    // Sidebar navigation items
    const navItems = [
        { path: '/', icon: LayoutDashboard, label: 'Overview' },
        { path: '/energy', icon: Zap, label: 'Energy' },
        { path: '/transport', icon: Car, label: 'Transport' },
        { path: '/waste', icon: Recycle, label: 'Waste' },
        { path: '/buildings', icon: Building2, label: 'Buildings' },
        { path: '/scenarios', icon: Sparkles, label: 'Scenarios' },
        { path: '/settings', icon: SettingsIcon, label: 'Settings' },
    ];

    return (
        <div className="min-h-screen relative font-sans text-sm pb-8 pt-6 px-4 md:px-8 flex flex-col items-center select-none overflow-y-auto"
            style={{ background: 'radial-gradient(ellipse at center 20%, #2f0f15 0%, #11090a 100%)' }}>

            {/* Top Header Logo outside the App Container */}
            <div className="w-full max-w-[1440px] flex justify-between items-center mb-6 text-white px-2 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-white rounded-sm opacity-80" />
                        <div className="w-3 h-3 bg-white rounded-sm opacity-50" />
                        <div className="w-3 h-3 bg-white rounded-sm opacity-100" />
                    </div>
                    <span className="text-xl font-medium tracking-wide">CampusCarbon</span>
                </div>
                <div className="text-gray-300 font-medium hidden sm:block">GHG Footprint Dashboard</div>
            </div>

            {/* Main App Container */}
            <div className="w-full max-w-[1440px] bg-[#e6e6e9] rounded-[2rem] p-4 md:p-6 shadow-2xl relative flex flex-col md:flex-row min-h-[85vh]">

                {/* Left Sidebar inside container */}
                <div className="w-16 flex flex-col items-center justify-between py-6 rounded-3xl bg-white/40 mr-6 shadow-sm border border-white/50 backdrop-blur-sm relative z-10 hidden md:flex shrink-0">
                    <div className="flex flex-col gap-6 text-gray-400">
                        <NavLink to="/" className="w-8 h-8 flex items-center justify-center text-gray-800 mb-2">
                            {/* Logo block */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="2" y="2" width="8" height="8" rx="2" />
                                <rect x="14" y="2" width="8" height="8" rx="2" fillOpacity="0.5" />
                                <rect x="2" y="14" width="8" height="8" rx="2" fillOpacity="0.8" />
                                <rect x="14" y="14" width="8" height="8" rx="2" />
                            </svg>
                        </NavLink>

                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) => `group relative flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${isActive ? 'bg-white shadow-sm text-primary' : 'hover:bg-white/60 hover:text-gray-900 cursor-pointer'}`}
                                title={item.label}
                            >
                                <item.icon className="w-5 h-5" />
                                {/* Tooltip */}
                                <span className="absolute left-14 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                                    {item.label}
                                </span>
                            </NavLink>
                        ))}
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-xl text-gray-400 hover:bg-white/60 hover:text-gray-900 cursor-pointer transition-all">
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col z-10 min-w-0">

                    {/* Global Top Bar Controls - Redesigned based on spec */}
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-[#f2f2f5] rounded-xl sm:rounded-full p-2 mb-6 border border-white/60 shadow-sm gap-4 sm:gap-0">

                        {/* Left Group: Period & View Toggles */}
                        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 px-2">
                            {/* Period Selector */}
                            <div className="relative border border-gray-200 bg-white rounded-full flex items-center px-3 py-1.5 shadow-sm text-gray-700">
                                <select
                                    className="bg-transparent appearance-none outline-none font-medium pr-6 cursor-pointer text-sm"
                                    value={period}
                                    onChange={(e) => setPeriod(e.target.value)}
                                >
                                    <option value="month">This Month</option>
                                    <option value="quarter">This Quarter</option>
                                    <option value="year">This Year</option>
                                    <option value="custom">Custom Range...</option>
                                </select>
                                <div className="absolute right-3 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>

                            <div className="w-px h-5 bg-gray-300 mx-1 hidden sm:block"></div>

                            {/* Scope Toggle */}
                            <div className="flex bg-gray-200/60 rounded-full p-1 border border-gray-300/40 text-sm font-medium">
                                <button
                                    onClick={() => setIsScopeView(false)}
                                    className={`px-3 py-1 rounded-full transition-all ${!isScopeView ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Category
                                </button>
                                <button
                                    onClick={() => setIsScopeView(true)}
                                    className={`px-3 py-1 rounded-full transition-all ${isScopeView ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Scope View
                                </button>
                            </div>

                            <div className="w-px h-5 bg-gray-300 mx-1 hidden md:block"></div>

                            {/* Unit Toggle */}
                            <div className="flex bg-gray-200/60 rounded-full p-1 border border-gray-300/40 text-sm font-medium hidden md:flex">
                                <button
                                    onClick={() => setIsTonnes(false)}
                                    className={`px-3 py-1 rounded-full text-xs transition-all ${!isTonnes ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    kg CO₂e
                                </button>
                                <button
                                    onClick={() => setIsTonnes(true)}
                                    className={`px-3 py-1 rounded-full text-xs transition-all ${isTonnes ? 'bg-white shadow-sm text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                                >
                                    Tonnes
                                </button>
                            </div>
                        </div>

                        {/* Right Group: Export & Profile */}
                        <div className="flex items-center gap-2 sm:gap-3 px-2 shrink-0">

                            {/* Dark/Light mode toggle (keeping from original as nice-to-have) */}
                            <div className="hidden lg:flex bg-gray-200/60 rounded-full p-1 border border-gray-300/40 mr-1">
                                <button className="p-1 rounded-full bg-white shadow-sm text-gray-700">
                                    <Sun className="w-3.5 h-3.5" />
                                </button>
                                <button className="p-1 rounded-full text-gray-400 hover:text-gray-700">
                                    <Moon className="w-3.5 h-3.5" />
                                </button>
                            </div>

                            {/* Export Button */}
                            <button className="group flex items-center gap-1.5 px-3 py-1.5 bg-white shadow-sm rounded-full border border-gray-200 text-gray-600 hover:text-gray-900 transition-all font-medium text-sm">
                                <Download className="w-4 h-4 text-gray-400 group-hover:text-primary transition-colors" />
                                <span className="hidden sm:inline">Export</span>
                            </button>

                            <button className="relative w-8 h-8 flex items-center justify-center bg-white shadow-sm rounded-full border border-gray-200 text-gray-600 hover:text-black hover:shadow-md transition-all">
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-primary rounded-full ring-2 ring-white"></span>
                            </button>

                            <div className="w-9 h-9 ml-1 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:border-gray-200 transition-colors">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop" alt="user avatar" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Page Content Outlet */}
                    <div className="flex-1 flex flex-col min-w-0 bg-white/40 rounded-2xl p-4 md:p-6 border border-white/50 backdrop-blur-sm shadow-sm overflow-hidden relative">
                        <Outlet />
                    </div>

                </div>

                {/* Global UI ambient map background effect for the Light Container */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-[0.03] pointer-events-none z-0" style={{ backgroundSize: '150%', backgroundPosition: '-10% 20%' }} />

            </div>
        </div>
    );
}
