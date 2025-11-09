# MoveAid - AI-Powered Physiotherapy & Movement Coaching

<div align="center">
  <img src="assets/MoveAid.svg" alt="MoveAid Logo" width="200"/>
  
  <p><strong>AI-powered physiotherapy and posture coaching — no sensors, just your camera and a smarter way to move.</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=for-the-badge)](https://clerk.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![TensorFlow.js](https://img.shields.io/badge/TensorFlow.js-4.11-FF6F00?style=for-the-badge&logo=tensorflow)](https://www.tensorflow.org/js)
</div>

## 🎯 Overview

MoveAid is a comprehensive AI-powered physiotherapy and movement coaching platform that helps users recover from injuries, improve posture, build movement habits, and enhance their overall physical well-being. The application provides personalized assessments, real-time pose detection, and interactive workout sessions through an intuitive interface.

## ✨ Key Features

### 🔐 Authentication & User Management

- **Clerk Integration**: Secure user authentication with social login support
- **Protected Routes**: Middleware-based route protection
- **User Profiles**: Personalized account management
- **SSO Support**: Single sign-on callback handling

### 📋 Multi-Step Assessment System

- **4-Step Onboarding Process**:

  1. **Basic Details**: Personal information and fitness level
  2. **Goals & Preferences**: Customized fitness objectives
  3. **Movement Assessment**: AI-powered camera-based posture analysis
  4. **Accessibility & Comfort**: Personalized comfort settings

- **6 Specialized Assessment Paths**:
  - 🩹 **Recover From Injury**: Targeted rehabilitation programs
  - 🧍 **Fix Posture**: Posture correction and alignment
  - 🏃 **Build Movement Habit**: Consistency and routine building
  - 💪 **Improve Workout Form**: Exercise technique optimization
  - 🪑 **Stay Active At Desk**: Desk-friendly mobility exercises
  - 🤸 **Less Stiff, More Mobile**: Flexibility and mobility enhancement

### 🎥 AI-Powered Pose Detection

- **Real-time Pose Estimation**: TensorFlow.js with MoveNet model
- **Camera Integration**: Browser-based webcam access
- **Skeleton Overlay**: Visual keypoint and connection rendering
- **Pose Validation**: Live feedback on exercise form
- **No External Sensors**: Camera-only solution

### 📊 Comprehensive Dashboard

#### Home Tab

- **Weekly Progress Card**: Visual progress tracking
- **Start Session Card**: Quick workout initiation
- **Mood Insights Card**: Emotional wellness tracking
- **Next Milestone Card**: Goal progression
- **Posture Accuracy Card**: Form quality metrics
- **Weekly Streak Card**: Consistency tracking

#### Plan Tab

- **Start Session Card**: Today's workout with circular progress indicator
- **Weekly Schedule Card**: 7-day activity calendar with active/inactive states
- **Phase Progress Card**: Current phase tracking (e.g., "Phase 1: Core Stability")
- **Plan Adjustment**: Customize intensity, session length, and focus area
- **Workout Library**: ExerciseDB API integration with 11,000+ exercises
  - Horizontal scrolling exercise cards
  - Search functionality
  - Detailed exercise information
  - Equipment and muscle group filters

#### Exercises Tab

- **Live Exercise Sessions**: Real-time workout guidance
- **Camera Feed**: Full-screen video with pose overlay
- **Exercise Timer**: Countdown for each exercise
- **Rep Counter**: Automatic repetition tracking
- **Pose Detection Status**: Real-time pose validation indicator
- **Exercise Queue**: Sidebar with upcoming exercises
- **Session Controls**: Pause, resume, restart, and skip functionality

#### Health Tracker Tab

- **Metrics Dashboard**: Comprehensive health data visualization
- **Progress Charts**: Historical data tracking
- **Goal Setting**: Personalized health objectives

#### Settings Tab

- **Profile Management**: User information and preferences
- **Notification Settings**: Customizable alerts
- **Privacy Controls**: Data management options
- **Account Settings**: Security and authentication

#### Notifications Tab

- **Activity Feed**: Recent updates and achievements
- **Reminders**: Workout and goal reminders
- **System Notifications**: App updates and announcements

### 🎨 Interactive UI Components

- **Multi-step Forms**: Progress tracking with visual indicators
- **Dynamic Sliders**: Pain level and intensity assessment
- **Multi-select Options**: Flexible answer selection
- **Circular Progress Indicators**: Visual session completion
- **Responsive Cards**: Mobile-first design approach
- **Smooth Animations**: Polished user experience

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun
- Clerk account for authentication
- Webcam for pose detection features

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/moveaid.git
   cd moveaid
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   CLERK_SECRET_KEY=your_clerk_secret_key_here

   # Clerk URLs (optional)
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/auth
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/auth
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/assessment
   ```

4. **Get Clerk Keys**

   - Go to [clerk.com](https://clerk.com) and create an account
   - Create a new application
   - Go to "API Keys" in your dashboard
   - Copy the "Publishable key" and "Secret key"
   - Paste them into your `.env.local` file

5. **Run the development server**

   ```bash
   npm run dev
   # or with Turbopack (faster)
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
moveaid/
├── app/                              # Next.js App Router
│   ├── assessment/                   # Multi-step assessment flow
│   │   ├── step1/                   # Basic details
│   │   ├── step2/                   # Goals & preferences
│   │   ├── step3/                   # Movement assessment (camera)
│   │   └── step4/                   # Accessibility & comfort
│   ├── auth/                        # Authentication pages
│   ├── dashboard/                   # Main dashboard
│   ├── sso-callback/                # SSO callback handler
│   ├── visual-test/                 # Component visual testing
│   ├── globals.css                  # Global styles
│   ├── layout.tsx                   # Root layout with Clerk
│   └── page.tsx                     # Landing page
│
├── components/                       # React components
│   ├── Dashboard/                   # Dashboard components
│   │   ├── Exercises/              # Live exercise session
│   │   │   └── index.tsx           # Camera + pose detection
│   │   ├── Header/                 # Dashboard navigation
│   │   ├── HealthTracker/          # Health metrics
│   │   ├── Home/                   # Home dashboard
│   │   │   ├── MoodInsightsCard/
│   │   │   ├── NextMileStoneCard/
│   │   │   ├── PostureAccuracyCard/
│   │   │   ├── StartSessionCard/
│   │   │   ├── WeeklyProgressCard/
│   │   │   └── WeeklyStreakCard/
│   │   ├── Notifications/          # Notification center
│   │   ├── Plan/                   # Workout planning
│   │   │   ├── PhaseProgressCard/  # Phase tracking
│   │   │   ├── StartSessionCard/   # Session initiation
│   │   │   ├── WeeklyScheduleCard/ # 7-day calendar
│   │   │   └── WorkoutCard/        # Exercise library
│   │   ├── Settings/               # User settings
│   │   └── index.tsx               # Dashboard container
│   │
│   └── LandingPage/                # Marketing pages
│       ├── ChoosePath/             # Path selection
│       ├── Form/                   # Assessment forms
│       │   ├── Step1/              # Basic details form
│       │   ├── Step2/              # Goals form
│       │   ├── Step3/              # Camera assessment
│       │   └── Step4/              # Accessibility form
│       ├── HowItWorks/             # Feature explanation
│       ├── MemberStories/          # Testimonials
│       ├── ProgressYouCanFeel/     # Benefits section
│       ├── SmarterCoachingBuiltIn/ # AI features
│       ├── TopSection/             # Hero section
│       ├── TrackWhatMattersMost/   # Tracking features
│       ├── YourBodyYourPlan/       # Personalization
│       ├── ProtectedRoute.tsx      # Auth wrapper
│       └── SuccessMessage.tsx      # Completion message
│
├── assets/                          # Static assets
│   └── *.svg                       # SVG icons and images
│
├── .kiro/                          # Kiro IDE configuration
│   └── specs/                      # Feature specifications
│       └── circular-progress-component/
│
├── middleware.ts                    # Clerk auth middleware
├── next.config.ts                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS config
├── tsconfig.json                   # TypeScript config
├── package.json                    # Dependencies
├── README.md                       # This file
├── TROUBLESHOOTING.md              # Common issues
└── VISUAL_TEST_GUIDE.md            # Visual testing guide
```

## 🎨 Design System

### Color Palette

- **Primary Purple**: `#AD85D1` - Main brand color
- **Secondary Purple**: `#9c72c0` - Hover states
- **Background Beige**: `#ebe7dd` - Card backgrounds
- **Gradient Beige**: `from-[#ebe7dd] to-[#f5f1e8]` - Subtle depth
- **White**: `#FFFFFF` - Clean backgrounds
- **Black**: `#000000` - Text and overlays
- **Green**: `#10B981` - Success states
- **Red**: `#EF4444` - Error states

### Typography

- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Responsive Sizes**: Mobile-first with breakpoints
- **Font Weights**: 300 (light), 400 (normal), 500 (medium), 600 (semibold), 700 (bold)

### Components

- **Spacing**: 4px grid system (gap-1 to gap-12)
- **Border Radius**: `rounded-4xl` (2rem) for cards, `rounded-full` for buttons
- **Shadows**: `shadow-lg`, `shadow-xl`, `shadow-2xl` for elevation
- **Transitions**: `transition-all duration-200` for smooth interactions

## 🔧 Technical Stack

### Core Technologies

- **Framework**: [Next.js 15.5](https://nextjs.org/) with App Router and Turbopack
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication**: [Clerk 6.33](https://clerk.com/)

### AI & Computer Vision

- **Pose Detection**: [TensorFlow.js 4.11](https://www.tensorflow.org/js)
- **Model**: MoveNet SinglePose Lightning
- **Canvas Rendering**: HTML5 Canvas API
- **Video Processing**: MediaStream API

### External APIs

- **Exercise Database**: [ExerciseDB API v2](https://exercisedb.dev/)
  - 11,000+ exercises
  - 20,000+ images
  - 15,000+ videos
  - Detailed exercise data

### Development Tools

- **Package Manager**: npm/yarn/pnpm/bun
- **Linting**: ESLint 9 with Next.js config
- **Type Checking**: TypeScript strict mode
- **Build Tool**: Turbopack (Next.js 15)

## 📱 User Flows

### New User Journey

1. **Landing Page** → View features and benefits
2. **Sign Up** → Create account via Clerk
3. **Assessment** → Complete 4-step onboarding
4. **Dashboard** → Access personalized workout plan
5. **First Session** → Start guided exercise with pose detection

### Returning User Journey

1. **Sign In** → Quick authentication
2. **Dashboard** → View progress and upcoming workouts
3. **Start Session** → Continue from last exercise
4. **Track Progress** → Monitor improvements over time

### Exercise Session Flow

1. **Select Exercise** → Choose from workout plan or library
2. **Camera Setup** → Grant camera permissions
3. **Pose Detection** → AI validates body position
4. **Guided Workout** → Follow on-screen instructions
5. **Track Reps** → Automatic counting and feedback
6. **Complete Session** → View summary and progress

## 🛡️ Security & Privacy

### Authentication

- **Clerk Integration**: Industry-standard authentication
- **Session Management**: Secure token handling
- **Protected Routes**: Server-side middleware protection
- **SSO Support**: Social login options

### Data Privacy

- **Local Processing**: Camera feed processed in-browser
- **No Video Storage**: Real-time processing only
- **User Consent**: Clear permission requests
- **Data Encryption**: HTTPS for all communications

### Camera Access

- **Permission-Based**: Explicit user consent required
- **Browser-Only**: No server-side video transmission
- **Secure Context**: HTTPS required for camera access
- **User Control**: Easy enable/disable functionality

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# - NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# - CLERK_SECRET_KEY
```

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables

Ensure all required environment variables are set in your deployment platform:

- Clerk authentication keys
- API endpoints (if using custom backend)

## 🧪 Testing

### Visual Testing

```bash
# Access visual test page
http://localhost:3000/visual-test
```

See [VISUAL_TEST_GUIDE.md](VISUAL_TEST_GUIDE.md) for detailed testing instructions.

### Component Testing

- Circular progress indicators
- Pose detection accuracy
- Camera feed rendering
- Exercise timer functionality

## 🐛 Troubleshooting

Common issues and solutions are documented in [TROUBLESHOOTING.md](TROUBLESHOOTING.md):

- Camera permission errors
- Pose detection not working
- Build errors
- Authentication issues

## 📊 Performance Optimizations

- **Turbopack**: Faster development builds
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Dynamic imports for heavy components
- **CDN Delivery**: TensorFlow.js from CDN
- **Caching**: Aggressive caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript strict mode
- Use Tailwind CSS for styling
- Write meaningful commit messages
- Test camera features across browsers
- Ensure mobile responsiveness

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Clerk](https://clerk.com/) - Authentication platform
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [TensorFlow.js](https://www.tensorflow.org/js) - Machine learning
- [ExerciseDB](https://exercisedb.dev/) - Exercise database
- [Vercel](https://vercel.com/) - Hosting and fonts

## 📞 Support

- **Documentation**: See [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/moveaid/issues)
- **Email**: support@moveaid.com
- **Discord**: [Join our community](https://discord.gg/moveaid)

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] Advanced pose correction algorithms
- [ ] Social features and challenges
- [ ] Integration with fitness wearables
- [ ] Personalized AI coaching
- [ ] Multi-language support
- [ ] Offline mode support
- [ ] Video recording and playback
- [ ] Progress analytics dashboard
- [ ] Community workout sharing

---

<div align="center">
  <p>Made with ❤️ by the MoveAid Team</p>
  <p>© 2024 MoveAid. All rights reserved.</p>
  
  <p>
    <a href="https://moveaid.com">Website</a> •
    <a href="https://github.com/yourusername/moveaid">GitHub</a> •
    <a href="https://twitter.com/moveaid">Twitter</a> •
    <a href="https://discord.gg/moveaid">Discord</a>
  </p>
</div>
