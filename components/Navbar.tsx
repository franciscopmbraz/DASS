import React, { useState, useEffect } from 'react';
import { Menu, X, Crosshair, User, LogOut } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

interface NavbarProps {
  isScrolled: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ isScrolled }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<{ nickname?: string; avatar_url?: string } | null>(null);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

  useEffect(() => {
    // Get initial session and profile
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const { data } = await supabase
      .from('users')
      .select('nickname, avatar_url')
      .eq('id', userId)
      .single();

    if (data) {
      setProfile(data);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled || isOpen ? 'bg-slate-950/90 backdrop-blur-md border-b border-white/10' : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 flex items-center space-x-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <Crosshair className="h-8 w-8 text-brand-400" />
            <span className="font-bold text-xl tracking-tight text-white">
              GameCoach<span className="text-brand-400"> AI</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/dashboard" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">Video Analyzer</Link>
              <Link to="/training" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">Training</Link>
              <a href="#features" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">Features</a>
              <a href="#ai-tech" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">How it Works</a>
              <a href="#audience" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">For You</a>
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    className="flex items-center gap-3 hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium focus:outline-none"
                  >
                    {profile?.avatar_url ? (
                      <img src={profile.avatar_url} alt="Profile" className="w-8 h-8 rounded-full border border-brand-500/30 object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
                        <User className="h-4 w-4" />
                      </div>
                    )}
                    <span>{profile?.nickname || 'Profile'}</span>
                  </button>

                  {isProfileDropdownOpen && (
                    <ProfileDropdown
                      user={user}
                      profile={profile}
                      onSignOut={handleSignOut}
                      onClose={() => setIsProfileDropdownOpen(false)}
                    />
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="hover:text-brand-300 transition-colors px-3 py-2 text-sm font-medium">Login</Link>
                  <Link
                    to="/signup"
                    className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-2 rounded-lg font-medium transition-all hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] hover:-translate-y-0.5"
                  >
                    Get Early Access
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-b border-white/10">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Video Analyser</Link>
            <Link to="/training" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Training</Link>
            <a href="#features" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Features</a>
            <a href="#ai-tech" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>How it Works</a>
            <a href="#audience" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Who is it for?</a>
            {user ? (
              <>
                <Link to="/profile" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3" onClick={() => setIsOpen(false)}>
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="Profile" className="w-8 h-8 rounded-full border border-brand-500/30 object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
                      <User className="h-4 w-4" />
                    </div>
                  )}
                  <span>{profile?.nickname || 'Profile'}</span>
                </Link>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    handleSignOut();
                  }}
                  className="w-full text-left text-red-400 hover:text-red-300 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-3"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium" onClick={() => setIsOpen(false)}>Login</Link>
                <Link to="/signup" className="w-full text-left bg-brand-600 text-white px-3 py-3 rounded-md text-base font-medium mt-4 block" onClick={() => setIsOpen(false)}>
                  Get Early Access
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;