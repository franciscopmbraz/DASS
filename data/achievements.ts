export interface Tier {
    name: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    description: string;
    requirement: number;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    category: 'Learning & Improvement' | 'Gameplay & Performance' | 'Progress & Dedication' | 'Fun & Engagement' | 'LoL' | 'CS2' | 'Valorant' | 'Cross-Game';
    game?: 'LoL' | 'CS2' | 'Valorant';
    iconType: string;
    tiers?: Tier[];
    maxProgress: number; // For single-tier achievements
    isLocked?: boolean;
    currentProgress: number;
}

export const achievements: Achievement[] = [
    // 🧠 Learning & Improvement Achievements
    {
        id: 'first-analysis',
        title: 'First Analysis',
        description: 'Upload your first gameplay video to get AI insights.',
        category: 'Learning & Improvement',
        iconType: 'brain-upload',
        maxProgress: 1,
        currentProgress: 0,
    },
    {
        id: 'level-up',
        title: 'Level Up',
        description: 'Improve a tracked skill by 10%.',
        category: 'Learning & Improvement',
        iconType: 'trend-up',
        maxProgress: 10,
        currentProgress: 5,
    },
    {
        id: 'fast-learner',
        title: 'Fast Learner',
        description: 'Complete a training plan in under 24 hours.',
        category: 'Learning & Improvement',
        iconType: 'lightning',
        maxProgress: 1,
        currentProgress: 0,
    },
    {
        id: 'break-pattern',
        title: 'Break the Pattern',
        description: 'Fix a repeated mistake identified by the AI.',
        category: 'Learning & Improvement',
        iconType: 'puzzle',
        maxProgress: 1,
        currentProgress: 1, // Completed example
    },

    // 🎮 Gameplay & Performance Achievements
    {
        id: 'mech-mastery',
        title: 'Mechanical Mastery',
        description: 'Reach an advanced mechanics score.',
        category: 'Gameplay & Performance',
        iconType: 'crosshair-gear',
        maxProgress: 100,
        currentProgress: 75,
    },
    {
        id: 'decision-maker',
        title: 'Decision Maker',
        description: 'Achieve high decision-making accuracy.',
        category: 'Gameplay & Performance',
        iconType: 'scale',
        maxProgress: 100,
        currentProgress: 40,
    },
    {
        id: 'clutch-factor',
        title: 'Clutch Factor',
        description: 'Perform exceptionally well in high-pressure situations.',
        category: 'Gameplay & Performance',
        iconType: 'fire',
        maxProgress: 10,
        currentProgress: 3,
    },
    {
        id: 'no-rookie',
        title: 'No More Rookie Mistakes',
        description: 'Eliminate beginner-level errors.',
        category: 'Gameplay & Performance',
        iconType: 'shield-check',
        maxProgress: 5,
        currentProgress: 2,
    },
    {
        id: 'clean-gameplay',
        title: 'Clean Gameplay',
        description: 'Finish a match with minimal AI-detected mistakes.',
        category: 'Gameplay & Performance',
        iconType: 'sparkles',
        maxProgress: 1,
        currentProgress: 0,
    },

    // 🔁 Progress & Dedication Achievements
    {
        id: 'daily-grinder',
        title: 'Daily Grinder',
        description: 'Use the platform for 7 consecutive days.',
        category: 'Progress & Dedication',
        iconType: 'calendar',
        maxProgress: 7,
        currentProgress: 4,
    },
    {
        id: 'monthly-warrior',
        title: 'Monthly Warrior',
        description: 'Stay active for 30 days.',
        category: 'Progress & Dedication',
        iconType: 'sword',
        maxProgress: 30,
        currentProgress: 12,
    },
    {
        id: 'never-skip',
        title: 'Never Skip Training',
        description: 'Complete all recommended sessions in a week.',
        category: 'Progress & Dedication',
        iconType: 'dumbbell',
        maxProgress: 1,
        currentProgress: 0,
    },
    {
        id: 'long-term-improv',
        title: 'Long-Term Improvement',
        description: 'Show progress over 3 consecutive analyses.',
        category: 'Progress & Dedication',
        iconType: 'graph-grow',
        maxProgress: 3,
        currentProgress: 2,
    },

    // 🎯 Fun & Engagement Achievements
    {
        id: 'upload-addict',
        title: 'Upload Addict',
        description: 'Upload 10 gameplay videos.',
        category: 'Fun & Engagement',
        iconType: 'video-stack',
        maxProgress: 10,
        currentProgress: 10, // Completed
    },
    {
        id: 'training-junkie',
        title: 'Training Junkie',
        description: 'Complete 25 AI-generated drills.',
        category: 'Fun & Engagement',
        iconType: 'drill',
        maxProgress: 25,
        currentProgress: 18,
    },
    {
        id: 'just-one-more',
        title: 'Just One More Game',
        description: 'Upload multiple videos in a single day.',
        category: 'Fun & Engagement',
        iconType: 'clock-rewind',
        maxProgress: 1,
        currentProgress: 1,
    },
    {
        id: 'perfectionist',
        title: 'Perfectionist',
        description: 'Replay and refine the same training multiple times.',
        category: 'Fun & Engagement',
        iconType: 'target',
        maxProgress: 5,
        currentProgress: 1,
    },

    // 🎮 LEAGUE OF LEGENDS (LoL) - TIERED
    {
        id: 'lol-macro-mind',
        title: 'Macro Mind',
        description: 'Mastery of strategic decision-making: rotations, objectives, and map control.',
        category: 'LoL',
        game: 'LoL',
        iconType: 'brain-map',
        currentProgress: 4,
        maxProgress: 20, // arbitrary
        tiers: [
            { name: 'Bronze', description: 'Correct macro decisions in 3 games', requirement: 3 },
            { name: 'Silver', description: 'Maintain a strong macro score for 5 games', requirement: 8 }, // cumulative
            { name: 'Gold', description: 'Consistently outperform average macro metrics', requirement: 15 },
            { name: 'Platinum', description: 'Near-perfect macro decision-making', requirement: 25 },
        ]
    },
    {
        id: 'lol-lane-dominator',
        title: 'Lane Dominator',
        description: 'Dominance during the laning phase (CS, trades, wave control).',
        category: 'LoL',
        game: 'LoL',
        iconType: 'minion-sword',
        currentProgress: 10,
        maxProgress: 50,
        tiers: [
            { name: 'Bronze', description: 'Win lane in 5 games', requirement: 5 },
            { name: 'Silver', description: 'Win lane in 15 games', requirement: 15 },
            { name: 'Gold', description: 'Win lane in 30 games', requirement: 30 },
            { name: 'Platinum', description: 'Win lane in 50 games', requirement: 50 },
        ]
    },
    {
        id: 'lol-skillshot',
        title: 'Skillshot Precision',
        description: 'High skillshot hit accuracy.',
        category: 'LoL',
        game: 'LoL',
        iconType: 'target-magic',
        currentProgress: 60,
        maxProgress: 100, // percentage maybe?
        tiers: [
            { name: 'Bronze', description: 'Hit 40% skillshots', requirement: 40 },
            { name: 'Silver', description: 'Hit 55% skillshots', requirement: 55 },
            { name: 'Gold', description: 'Hit 70% skillshots', requirement: 70 },
            { name: 'Platinum', description: 'Hit 85% skillshots', requirement: 85 },
        ]
    },
    {
        id: 'lol-teamfight',
        title: 'Teamfight Architect',
        description: 'Positioning and decisive impact in teamfights.',
        category: 'LoL',
        game: 'LoL',
        iconType: 'team-silhouette',
        currentProgress: 2,
        maxProgress: 20,
        tiers: [
            { name: 'Bronze', description: 'Top damage in 3 fights', requirement: 3 },
            { name: 'Silver', description: 'Ace participation', requirement: 10 },
            { name: 'Gold', description: 'Perfect positioning score', requirement: 15 },
            { name: 'Platinum', description: 'Teamfight carry', requirement: 20 },
        ]
    },

    // 🔫 COUNTER-STRIKE 2 (CS2)
    {
        id: 'cs2-aim-specialist',
        title: 'Aim Specialist',
        description: 'Precision, reaction time, and spray control.',
        category: 'CS2',
        game: 'CS2',
        iconType: 'crosshair-bullet',
        currentProgress: 45,
        maxProgress: 100,
        tiers: [
            { name: 'Bronze', description: '30% Headshot Rate', requirement: 30 },
            { name: 'Silver', description: '45% Headshot Rate', requirement: 45 },
            { name: 'Gold', description: '60% Headshot Rate', requirement: 60 },
            { name: 'Platinum', description: '75% Headshot Rate', requirement: 75 },
        ]
    },
    {
        id: 'cs2-game-sense',
        title: 'Game Sense Master',
        description: 'Game reading, rotations, and enemy anticipation.',
        category: 'CS2',
        game: 'CS2',
        iconType: 'radar-eye',
        currentProgress: 5,
        maxProgress: 50,
        tiers: [
            { name: 'Bronze', description: 'Successful predictions: 5', requirement: 5 },
            { name: 'Silver', description: 'Successful predictions: 20', requirement: 20 },
            { name: 'Gold', description: 'Successful predictions: 50', requirement: 50 },
            { name: 'Platinum', description: 'God-like reads', requirement: 100 },
        ]
    },
    {
        id: 'cs2-objective',
        title: 'Objective Controller',
        description: 'Direct impact on plants, defuses, and bombsite control.',
        category: 'CS2',
        game: 'CS2',
        iconType: 'c4',
        currentProgress: 12,
        maxProgress: 100, // plants/defuses
        tiers: [
            { name: 'Bronze', description: '10 Plants/Defuses', requirement: 10 },
            { name: 'Silver', description: '50 Plants/Defuses', requirement: 50 },
            { name: 'Gold', description: '100 Plants/Defuses', requirement: 100 },
            { name: 'Platinum', description: '500 Plants/Defuses', requirement: 500 },
        ]
    },
    {
        id: 'cs2-clutch',
        title: 'Clutch Mentality',
        description: 'Performance in 1vX situations.',
        category: 'CS2',
        game: 'CS2',
        iconType: 'lone-wolf',
        currentProgress: 2,
        maxProgress: 50,
        tiers: [
            { name: 'Bronze', description: 'Win 5 Clutches', requirement: 5 },
            { name: 'Silver', description: 'Win 20 Clutches', requirement: 20 },
            { name: 'Gold', description: 'Win 50 Clutches', requirement: 50 },
            { name: 'Platinum', description: 'Win 100 Clutches', requirement: 100 },
        ]
    },

    // 🔥 VALORANT
    {
        id: 'val-first-bullet',
        title: 'First Bullet Accuracy',
        description: 'Precision on the first shot.',
        category: 'Valorant',
        game: 'Valorant',
        iconType: 'headshot-spark',
        currentProgress: 20,
        maxProgress: 100,
        tiers: [
            { name: 'Bronze', description: 'High Body Shot %', requirement: 50 },
            { name: 'Silver', description: 'Good Headshot %', requirement: 70 },
            { name: 'Gold', description: 'Great First Shot Accuracy', requirement: 85 },
            { name: 'Platinum', description: 'Demon Accuracy', requirement: 95 },
        ]
    },
    {
        id: 'val-ability',
        title: 'Ability Master',
        description: 'Efficient and strategic use of abilities.',
        category: 'Valorant',
        game: 'Valorant',
        iconType: 'val-orb',
        currentProgress: 15,
        maxProgress: 100,
        tiers: [
            { name: 'Bronze', description: 'Effective Utility > 20%', requirement: 20 },
            { name: 'Silver', description: 'Effective Utility > 40%', requirement: 40 },
            { name: 'Gold', description: 'Effective Utility > 60%', requirement: 60 },
            { name: 'Platinum', description: 'Effective Utility > 80%', requirement: 80 },
        ]
    },
    {
        id: 'val-entry',
        title: 'Entry Fragger',
        description: 'Impact in the first eliminations of the round.',
        category: 'Valorant',
        game: 'Valorant',
        iconType: 'door-lightning',
        currentProgress: 8,
        maxProgress: 100, // entries
        tiers: [
            { name: 'Bronze', description: '10 First Bloods', requirement: 10 },
            { name: 'Silver', description: '50 First Bloods', requirement: 50 },
            { name: 'Gold', description: '150 First Bloods', requirement: 150 },
            { name: 'Platinum', description: '500 First Bloods', requirement: 500 },
        ]
    },
    {
        id: 'val-retake',
        title: 'Perfect Retake',
        description: 'Clean execution in retake situations.',
        category: 'Valorant',
        game: 'Valorant',
        iconType: 'spike-arrow',
        currentProgress: 3,
        maxProgress: 50,
        tiers: [
            { name: 'Bronze', description: '5 Successful Retakes', requirement: 5 },
            { name: 'Silver', description: '20 Successful Retakes', requirement: 20 },
            { name: 'Gold', description: '50 Successful Retakes', requirement: 50 },
            { name: 'Platinum', description: '100 Successful Retakes', requirement: 100 },
        ]
    },

    // 🌟 CROSS-GAME ACHIEVEMENTS (ALL GAMES)
    {
        id: 'ai-disciple',
        title: 'AI Disciple',
        description: 'Following and executing AI recommendations.',
        category: 'Cross-Game',
        iconType: 'brain-chip',
        currentProgress: 4,
        maxProgress: 10,
        tiers: [
            { name: 'Bronze', description: 'Follow 5 Recommendations', requirement: 5 },
            { name: 'Silver', description: 'Follow 20 Recommendations', requirement: 20 },
            { name: 'Gold', description: 'Follow 50 Recommendations', requirement: 50 },
            { name: 'Platinum', description: 'Follow 100 Recommendations', requirement: 100 },
        ]
    },
    {
        id: 'visible-improvement',
        title: 'Visible Improvement',
        description: 'Measurable improvement in key metrics.',
        category: 'Cross-Game',
        iconType: 'graph-up',
        currentProgress: 1,
        maxProgress: 10, // milestones
        tiers: [
            { name: 'Bronze', description: 'Improvement in 1 metric', requirement: 1 },
            { name: 'Silver', description: 'Improvement in 3 metrics', requirement: 3 },
            { name: 'Gold', description: 'High Improvement in 5 metrics', requirement: 5 },
            { name: 'Platinum', description: 'Elite Improvement across board', requirement: 10 },
        ]
    },
    {
        id: 'peak-performance',
        title: 'Peak Performance',
        description: 'Best analysis ever achieved.',
        category: 'Cross-Game',
        iconType: 'mountain-flag',
        currentProgress: 0,
        maxProgress: 1,
        tiers: [
            { name: 'Bronze', description: 'Top 50% Rank', requirement: 0.5 },
            { name: 'Silver', description: 'Top 25% Rank', requirement: 0.25 },
            { name: 'Gold', description: 'Top 10% Rank', requirement: 0.1 },
            { name: 'Platinum', description: 'Top 1% Rank', requirement: 0.01 },
        ]
    }
];
