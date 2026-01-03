import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';
import { Camera, Save, Plus, X, Gamepad2, Target, User, Edit2, Loader2, CheckCircle, LogOut, Trash2, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const UserProfilePage: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const [notification, setNotification] = useState<{ message: string, type: 'success' | 'error' } | null>(null);

    // Form states
    const [nickname, setNickname] = useState('');
    const [description, setDescription] = useState('');
    const [age, setAge] = useState<string>('');
    const [gender, setGender] = useState('');
    const [favoriteGames, setFavoriteGames] = useState<string[]>([]);
    const [goals, setGoals] = useState<string[]>([]);
    const [newGame, setNewGame] = useState('');
    const [newGoal, setNewGoal] = useState('');

    // Goal editing state
    const [editingGoalIndex, setEditingGoalIndex] = useState<number | null>(null);
    const [editingGoalText, setEditingGoalText] = useState('');

    useEffect(() => {
        getProfile(true);
    }, []);

    // Auto-dismiss notification
    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const getProfile = async (initialLoad = false) => {
        try {
            if (initialLoad) setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                navigate('/login');
                return;
            }

            const { data, error } = await supabase
                .from('users')
                .select('*')
                .eq('id', user.id)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
            }

            if (data) {
                setProfile(data);
                setNickname(data.nickname || '');
                setDescription(data.description || '');
                setAge(data.age ? data.age.toString() : '');
                setGender(data.gender || '');
                setFavoriteGames(data.favorite_games || []);
                setGoals(data.goals || []);
                setAvatarPreview(data.avatar_url || null);
            }
        } catch (error) {
            console.error('Error loading user data:', error);
        } finally {
            if (initialLoad) setLoading(false);
        }
    };

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        navigate('/');
    };

    const uploadAvatar = async (userId: string) => {
        if (!avatarFile) return profile?.avatar_url;

        const fileExt = avatarFile.name.split('.').pop();
        const fileName = `${userId}-${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, avatarFile);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage.from('avatars').getPublicUrl(filePath);
        return data.publicUrl;
    };

    const updateProfile = async () => {
        try {
            setSaving(true);
            setNotification(null);
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) throw new Error('No user logged in');

            let avatarUrl = profile?.avatar_url;
            if (avatarFile) {
                try {
                    avatarUrl = await uploadAvatar(user.id);
                } catch (uploadError) {
                    console.error('Avatar upload failed:', uploadError);
                    setNotification({ message: "Failed to upload avatar, but other changes were saved.", type: 'error' });
                }
            }

            const updates = {
                id: user.id,
                email: user.email,
                nickname,
                description,
                age: age ? parseInt(age) : null,
                gender,
                favorite_games: favoriteGames,
                goals,
                avatar_url: avatarUrl
            };

            const { error } = await supabase.from('users').upsert(updates);

            if (error) throw error;

            await getProfile(false);
            setNotification({ message: 'Your information has been successfully updated', type: 'success' });

        } catch (error: any) {
            setNotification({ message: error.message || 'Failed to update profile', type: 'error' });
        } finally {
            setSaving(false);
        }
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setAvatarFile(file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    const addGame = () => {
        if (newGame.trim() && !favoriteGames.includes(newGame.trim())) {
            setFavoriteGames([...favoriteGames, newGame.trim()]);
            setNewGame('');
        }
    };

    const removeGame = (gameToRemove: string) => {
        setFavoriteGames(favoriteGames.filter(game => game !== gameToRemove));
    };

    const addGoal = () => {
        if (newGoal.trim() && !goals.includes(newGoal.trim())) {
            setGoals([...goals, newGoal.trim()]);
            setNewGoal('');
        }
    };

    const removeGoal = (goalToRemove: string) => {
        setGoals(goals.filter(goal => goal !== goalToRemove));
    };

    const startEditingGoal = (index: number) => {
        setEditingGoalIndex(index);
        setEditingGoalText(goals[index]);
    };

    const saveGoalEdit = () => {
        if (editingGoalIndex !== null) {
            const updatedGoals = [...goals];
            updatedGoals[editingGoalIndex] = editingGoalText.trim();
            setGoals(updatedGoals);
            setEditingGoalIndex(null);
            setEditingGoalText('');
        }
    };

    const cancelGoalEdit = () => {
        setEditingGoalIndex(null);
        setEditingGoalText('');
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">
                <Loader2 className="w-10 h-10 animate-spin text-brand-500" />
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex text-white overflow-hidden pt-24 pb-20 px-4 sm:px-6 lg:px-8">
            {/* Background Elements (copied from Hero.tsx for theme consistency) */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/valorant/1920/1080')] bg-cover bg-center opacity-20 blur-sm mix-blend-overlay fixed"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950/90 to-slate-950 fixed"></div>

                {/* Animated Glows */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/20 rounded-full blur-[128px] animate-pulse fixed"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-[128px] fixed"></div>
            </div>

            {/* Notification Toast */}
            {notification && (
                <div className={`fixed top-24 right-4 z-50 px-6 py-4 rounded-xl shadow-2xl border flex items-center gap-3 animate-in slide-in-from-right duration-300 ${notification.type === 'success'
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                    : 'bg-red-500/10 border-red-500/20 text-red-400'
                    }`}>
                    {notification.type === 'success' ? <CheckCircle size={20} /> : <X size={20} />}
                    <p className="font-medium">{notification.message}</p>
                    <button onClick={() => setNotification(null)} className="ml-2 opacity-70 hover:opacity-100">
                        <X size={16} />
                    </button>
                </div>
            )}

            <div className="relative z-10 max-w-4xl mx-auto w-full">

                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors group"
                >
                    <div className="p-2 rounded-full bg-slate-800/50 group-hover:bg-slate-700/50 border border-white/5 group-hover:border-white/10 transition-all">
                        <ArrowLeft size={20} />
                    </div>
                    <span className="font-medium">Back</span>
                </button>

                {/* Header */}
                <div className="relative mb-12 p-8 rounded-3xl bg-slate-900/50 border border-white/5 backdrop-blur-xl overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600/10 to-accent-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-800 shadow-2xl relative bg-slate-800 group-hover:border-brand-500/50 transition-colors duration-300">
                                {avatarPreview ? (
                                    <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-slate-500">
                                        <User size={48} />
                                    </div>
                                )}
                            </div>
                            <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 p-2 bg-brand-600 rounded-full cursor-pointer hover:bg-brand-500 transition-colors shadow-lg border border-slate-900 text-white hover:scale-110 active:scale-95 duration-200">
                                <Camera size={18} />
                            </label>
                            <input
                                id="avatar-upload"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleFileChange}
                            />
                        </div>

                        <div className="text-center md:text-left flex-1">
                            <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">{nickname || 'Player One'}</h1>
                            <p className="text-slate-400 max-w-xl leading-relaxed">{description || 'No description yet. Write something about yourself!'}</p>
                        </div>

                        {/* Sign Out Button */}
                        <div className="mt-4 md:mt-0">
                            <button
                                onClick={handleSignOut}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-lg border border-red-500/20 hover:border-red-500/40 transition-all font-medium text-sm"
                            >
                                <LogOut size={16} />
                                Sign Out
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Left Column: Personal Info */}
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-400">
                                <User size={20} /> Personal Info
                            </h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Nickname</label>
                                    <input
                                        type="text"
                                        value={nickname}
                                        onChange={(e) => setNickname(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-white"
                                        placeholder="Enter nickname"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Age</label>
                                    <input
                                        type="number"
                                        value={age}
                                        onChange={(e) => setAge(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-white"
                                        placeholder="Enter age"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Gender</label>
                                    <select
                                        value={gender}
                                        onChange={(e) => setGender(e.target.value)}
                                        className="w-full bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all text-slate-300 hover:text-white"
                                    >
                                        <option value="">Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-binary">Non-binary</option>
                                        <option value="Other">Other</option>
                                        <option value="Prefer not to say">Prefer not to say</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Details & Stats */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Description */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-400">
                                <Edit2 size={20} /> About Me
                            </h2>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="w-full h-32 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all resize-none placeholder-slate-600 text-white"
                                placeholder="Tell us about yourself..."
                            ></textarea>
                        </div>

                        {/* Favorite Games */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-400">
                                <Gamepad2 size={20} /> Favorite Games
                            </h2>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {favoriteGames.map((game, index) => (
                                    <span key={index} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-brand-500/10 text-brand-300 border border-brand-500/20 group">
                                        {game}
                                        <button onClick={() => removeGame(game)} className="ml-2 text-brand-400/50 group-hover:text-red-400 transition-colors focus:outline-none">
                                            <X size={14} />
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newGame}
                                    onChange={(e) => setNewGame(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addGame()}
                                    className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-white"
                                    placeholder="Add a game..."
                                />
                                <button
                                    onClick={addGame}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors border border-slate-700 hover:border-slate-600 active:scale-95 duration-200"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                        {/* Goals */}
                        <div className="bg-slate-900/50 p-6 rounded-2xl border border-white/5 backdrop-blur-sm hover:border-white/10 transition-colors duration-300">
                            <h2 className="text-xl font-bold mb-6 flex items-center gap-2 text-brand-400">
                                <Target size={20} /> Goals
                            </h2>

                            <div className="space-y-3 mb-4">
                                {goals.map((goal, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/30 border border-slate-800/50 hover:border-slate-800 transition-colors group">
                                        {editingGoalIndex === index ? (
                                            <div className="flex-1 flex gap-2">
                                                <input
                                                    type="text"
                                                    value={editingGoalText}
                                                    onChange={(e) => setEditingGoalText(e.target.value)}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') saveGoalEdit();
                                                        if (e.key === 'Escape') cancelGoalEdit();
                                                    }}
                                                    autoFocus
                                                    className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-1 text-sm text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                                                />
                                                <button onClick={saveGoalEdit} className="text-emerald-500 hover:text-emerald-400 p-1"><CheckCircle size={18} /></button>
                                                <button onClick={cancelGoalEdit} className="text-slate-500 hover:text-slate-400 p-1"><X size={18} /></button>
                                            </div>
                                        ) : (
                                            <>
                                                <span
                                                    className="text-slate-300 text-sm flex-1 cursor-pointer hover:text-brand-300 transition-colors"
                                                    onClick={() => startEditingGoal(index)}
                                                    title="Click to edit"
                                                >
                                                    {goal}
                                                </span>
                                                <div className="flex items-center opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                                                    <button onClick={() => startEditingGoal(index)} className="text-slate-500 hover:text-brand-400 transition-colors p-1">
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button onClick={() => removeGoal(goal)} className="text-slate-500 hover:text-red-400 transition-colors p-1">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newGoal}
                                    onChange={(e) => setNewGoal(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && addGoal()}
                                    className="flex-1 bg-slate-950/50 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none transition-all placeholder-slate-600 text-white"
                                    placeholder="Add a goal..."
                                />
                                <button
                                    onClick={addGoal}
                                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition-colors border border-slate-700 hover:border-slate-600 active:scale-95 duration-200"
                                >
                                    <Plus size={20} />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Footer Action */}
                <div className="mt-12 flex justify-end">
                    <button
                        onClick={updateProfile}
                        disabled={saving}
                        className="flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold shadow-lg shadow-brand-600/20 hover:shadow-brand-600/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg hover:-translate-y-1 active:scale-95 duration-200"
                    >
                        {saving ? <Loader2 className="animate-spin" /> : <Save size={20} />}
                        {saving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>

            </div>
        </div>
    );
};

export default UserProfilePage;
