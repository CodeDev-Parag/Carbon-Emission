import { Outlet, NavLink } from 'react-router-dom';
import {
    Sun,
    Moon,
    Bell,
    Folder,
    Grid,
    BarChart2,
    Headphones,
    Settings,
    LogOut,
} from 'lucide-react';

export default function Layout() {


    // Mapping active pathname to tabs logic

    // Helper to format tab string
    const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

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
                    <div className="flex flex-col gap-8 text-gray-400">
                        <NavLink to="/" className="w-8 h-8 flex items-center justify-center text-gray-800">
                            {/* Logo block */}
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <rect x="2" y="2" width="8" height="8" rx="2" />
                                <rect x="14" y="2" width="8" height="8" rx="2" fillOpacity="0.5" />
                                <rect x="2" y="14" width="8" height="8" rx="2" fillOpacity="0.8" />
                                <rect x="14" y="14" width="8" height="8" rx="2" />
                            </svg>
                        </NavLink>

                        <NavLink to="/" className={({ isActive }: { isActive: boolean }) => `w-5 h-5 transition-colors ${isActive ? 'text-black' : 'hover:text-black cursor-pointer'}`}>
                            <Grid className="w-full h-full" />
                        </NavLink>

                        <NavLink to="/energy" className={({ isActive }: { isActive: boolean }) => `w-5 h-5 transition-colors ${isActive ? 'text-black' : 'hover:text-black cursor-pointer'}`}>
                            <Folder className="w-full h-full" />
                        </NavLink>

                        <NavLink to="/transport" className={({ isActive }: { isActive: boolean }) => `w-5 h-5 transition-colors ${isActive ? 'text-black' : 'hover:text-black cursor-pointer'}`}>
                            <BarChart2 className="w-full h-full" />
                        </NavLink>

                        <NavLink to="/scenarios" className={({ isActive }: { isActive: boolean }) => `w-5 h-5 transition-colors ${isActive ? 'text-black' : 'hover:text-black cursor-pointer'}`}>
                            <Headphones className="w-full h-full" />
                        </NavLink>

                        <NavLink to="/settings" className={({ isActive }: { isActive: boolean }) => `w-5 h-5 transition-colors ${isActive ? 'text-black' : 'hover:text-black cursor-pointer'}`}>
                            <Settings className="w-full h-full" />
                        </NavLink>
                    </div>
                    <button className="w-5 h-5 text-gray-400 hover:text-black cursor-pointer transition-colors">
                        <LogOut className="w-full h-full" />
                    </button>
                </div>

                {/* Content Area */}
                <div className="flex-1 flex flex-col z-10 min-w-0">

                    {/* Top Nav Row */}
                    <div className="flex flex-col sm:flex-row justify-between items-center bg-[#f2f2f5] rounded-full p-2 mb-6 border border-white/60 shadow-sm gap-4 sm:gap-0">
                        <div className="flex gap-1 overflow-x-auto max-w-full hide-scrollbar px-2 sm:px-0 sm:ml-2">
                            {['overview', 'energy', 'transport', 'waste', 'scenarios', 'settings'].map(tab => (
                                <NavLink
                                    key={tab}
                                    to={tab === 'overview' ? '/' : `/${tab}`}
                                    className={({ isActive }: { isActive: boolean }) => `px-4 sm:px-6 py-2 rounded-full font-medium transition-all duration-300 text-[13px] tracking-wide whitespace-nowrap ${isActive ? 'bg-[#F43F5E] text-white shadow-[0_4px_12px_rgba(244,63,94,0.3)] hover:bg-[#E11D48]' : 'text-gray-500 hover:text-black hover:bg-black/5'}`}
                                >
                                    {capitalize(tab)}
                                </NavLink>
                            ))}
                        </div>

                        <div className="flex items-center gap-3 sm:gap-4 px-2 shrink-0">
                            <div className="flex bg-gray-200/60 rounded-full p-1 border border-gray-300/40">
                                <button className="p-1.5 rounded-full bg-white shadow-sm text-gray-700">
                                    <Sun className="w-4 h-4" />
                                </button>
                                <button className="p-1.5 rounded-full text-gray-400 hover:text-gray-700">
                                    <Moon className="w-4 h-4" />
                                </button>
                            </div>
                            <button className="relative w-9 h-9 flex items-center justify-center bg-white shadow-sm rounded-full border border-gray-200 text-gray-600 hover:text-black hover:shadow-md transition-all duration-300">
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-[#F43F5E] rounded-full ring-2 ring-white"></span>
                            </button>
                            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer hover:border-gray-200 transition-colors">
                                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop" alt="user avatar" className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </div>

                    {/* Page Content Outlet */}
                    <div className="flex-1 flex flex-col min-w-0">
                        <Outlet />
                    </div>

                </div>

                {/* Global UI ambient map background effect for the Light Container */}
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg')] opacity-[0.03] pointer-events-none z-0" style={{ backgroundSize: '150%', backgroundPosition: '-10% 20%' }} />

            </div>
        </div>
    );
}
