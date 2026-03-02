import { Search, Settings as SettingsIcon, Shield, Users, Database } from 'lucide-react';

export default function Settings() {
    return (
        <div className="w-full h-full flex flex-col pb-10">
            <div className="flex justify-between items-center mb-8 px-1">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-full bg-[#111] flex items-center justify-center text-white cursor-pointer hover:bg-gray-800 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300">
                        <Search className="w-5 h-5" />
                    </div>
                    <h1 className="text-[32px] font-semibold text-[#1a1a1c] tracking-tight">Platform Settings</h1>
                </div>
            </div>

            <div className="w-full max-w-4xl bg-white/60 backdrop-blur-xl border border-white rounded-[2rem] shadow-xl overflow-hidden flex flex-col md:flex-row min-h-[500px]">
                {/* Lateral Settings Menu */}
                <div className="w-full md:w-64 bg-gray-50/50 border-r border-gray-100 p-6 flex flex-col gap-2">
                    <button className="flex items-center gap-3 w-full p-3 bg-white rounded-xl shadow-sm text-gray-800 font-medium">
                        <SettingsIcon className="w-4 h-4 text-gray-500" /> General
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 hover:bg-black/5 rounded-xl text-gray-600 transition-colors">
                        <Users className="w-4 h-4 text-gray-400" /> Team Access
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 hover:bg-black/5 rounded-xl text-gray-600 transition-colors">
                        <Database className="w-4 h-4 text-gray-400" /> Integrations
                    </button>
                    <button className="flex items-center gap-3 w-full p-3 hover:bg-black/5 rounded-xl text-gray-600 transition-colors">
                        <Shield className="w-4 h-4 text-gray-400" /> Security
                    </button>
                </div>

                {/* Settings Form */}
                <div className="flex-1 p-8">
                    <h3 className="text-xl font-medium text-gray-800 mb-6">General Preferences</h3>

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">Campus Identity</label>
                            <input type="text" defaultValue="Northwestern Main Campus" className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F43F5E]/50" />
                        </div>

                        <div className="flex flex-col gap-2">
                            <label className="text-sm font-medium text-gray-600">Reporting Framework</label>
                            <select className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#F43F5E]/50 appearance-none">
                                <option>GHG Protocol Corporate Standard</option>
                                <option>ISO 14064</option>
                                <option>EPA Center for Corporate Climate Leadership</option>
                            </select>
                        </div>

                        <div className="mt-4 pt-6 border-t border-gray-100 flex justify-end">
                            <button className="bg-[#111] hover:bg-gray-800 text-white px-6 py-2.5 rounded-full text-sm font-medium shadow-md transition-all">Save Changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
