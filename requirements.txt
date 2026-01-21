Project Overview:
GameCoach AI is an intelligent coaching platform designed to help gamers improve their skills through video analysis and personalized training programs.

Functional Requirements:
1. Authentication
   - Users can sign up and log in using email/password or social providers.
   - Secure session management.

2. Video Analysis
   - Users can upload gameplay videos.
   - AI analyzes the footage to identify key moments, mistakes, and areas for improvement.
   - Detailed breakdown of gameplay with timestamps.

3. Training & Drills
   - Personalized training regimes based on analysis.
   - Library of drills and exercises.
   - Step-by-step guides for improvement.

4. Gamification (XP & Leveling)
   - Users earn XP for completing training and analyzing videos.
   - Leveling system to track progress and unlock badges.
   - Achievements system.

Non-Functional Requirements:
- Performance: Fast load times and responsive UI.
- Scalability: Capable of handling multiple concurrent video analyses.
- Security: Secure handling of user data and video content.
- Usability: Intuitive and modern user interface using React and Tailwind CSS.

Tech Stack:
- Frontend: React, Vite, TypeScript, Tailwind CSS
- Backend/Services: Supabase (Auth, DB), Google Gemini API (AI Analysis)
- Deployment: Vercel
