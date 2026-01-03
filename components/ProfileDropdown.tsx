import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, LayoutDashboard, GraduationCap, Medal, UserCircle } from 'lucide-react';

interface ProfileDropdownProps {
    user: any;
    profile: { nickname?: string; avatar_url?: string } | null;
    onSignOut: () => void;
    onClose: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ user, profile, onSignOut, onClose }) => {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={dropdownRef}
            className="absolute right-0 top-full mt-2 w-72 bg-slate-900 border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200"
        >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-slate-800/50">
                <div className="flex items-center gap-3">
                    {profile?.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt="Profile"
                            className="w-10 h-10 rounded-full border border-brand-500/30 object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
                            <User className="h-5 w-5 text-brand-400" />
                        </div>
                    )}
                    <div className="flex-1 overflow-hidden">
                        <p className="font-medium text-white truncate">
                            {profile?.nickname || 'User'}
                        </p>
                        <p className="text-xs text-slate-400 truncate">{user?.email}</p>
                    </div>
                </div>
            </div>

            {/* Menu Items */}
            <div className="p-2 space-y-1">
                <Link
                    to="/profile"
                    onClick={onClose}
                    className="flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group"
                >
                    <UserCircle className="h-4 w-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                    See User Profile
                </Link>

                <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2 mb-1">
                    Features
                </div>

                <button
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group text-left cursor-not-allowed opacity-60"
                    title="Coming Soon"
                >
                    <LayoutDashboard className="h-4 w-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                    Your Video Analyzes
                    <span className="ml-auto text-[10px] bg-brand-500/10 text-brand-400 px-1.5 py-0.5 rounded border border-brand-500/20">
                        Soon
                    </span>
                </button>

                <button
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group text-left cursor-not-allowed opacity-60"
                    title="Coming Soon"
                >
                    <GraduationCap className="h-4 w-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                    Training
                    <span className="ml-auto text-[10px] bg-brand-500/10 text-brand-400 px-1.5 py-0.5 rounded border border-brand-500/20">
                        Soon
                    </span>
                </button>

                <button
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors group text-left cursor-not-allowed opacity-60"
                    title="Coming Soon"
                >
                    <Medal className="h-4 w-4 text-slate-400 group-hover:text-brand-400 transition-colors" />
                    Badges
                    <span className="ml-auto text-[10px] bg-brand-500/10 text-brand-400 px-1.5 py-0.5 rounded border border-brand-500/20">
                        Soon
                    </span>
                </button>

                <div className="h-px bg-white/10 my-2" />

                <button
                    onClick={() => {
                        onClose();
                        onSignOut();
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default ProfileDropdown;
