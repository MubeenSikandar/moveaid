# MoveAid - AI-Powered Physiotherapy & Movement Coaching

<div align="center">
  <img src="assets/MoveAid.svg" alt="MoveAid Logo" width="200"/>
  
  <p><strong>AI-powered physiotherapy and posture coaching — no sensors, just your camera and a smarter way to move.</strong></p>
  
  [![Next.js](https://img.shields.io/badge/Next.js-14-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Clerk](https://img.shields.io/badge/Clerk-Auth-purple?style=for-the-badge)](https://clerk.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
</div>

## 🎯 Overview

MoveAid is a comprehensive AI-powered physiotherapy and movement coaching platform that helps users recover from injuries, improve posture, build movement habits, and enhance their overall physical well-being. The application provides personalized assessments and recommendations through an intuitive, multi-step questionnaire system.

## ✨ Features

### 🔐 Authentication & User Management

- **Clerk Integration**: Secure user authentication and management
- **Protected Routes**: Assessment forms require user authentication
- **User Profiles**: Account management and personalized experience
- **Seamless UX**: Smooth sign-in/sign-up flow

### 📋 Comprehensive Assessment Forms

- **6 Specialized Assessment Types**:
  - 🩹 **Recover From Injury** (8 questions)
  - 🧍 **Fix Posture** (8 questions)
  - 🏃 **Build Movement Habit** (8 questions)
  - 💪 **Improve Workout Form** (9 questions)
  - 🪑 **Stay Active At Desk** (10 questions)
  - 🤸 **Less Stiff, More Mobile** (9 questions)

### 🎨 Interactive UI Components

- **Multi-step Forms**: Progress tracking with visual indicators
- **Dynamic Sliders**: Pain level assessment with color-coded feedback
- **Multi-select Options**: Flexible answer selection with custom inputs
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Accessibility**: Screen reader support and keyboard navigation

### 🎯 Smart Form Features

- **Progressive Disclosure**: Essential questions first, advanced options unlock
- **Visual Feedback**: Immediate validation and progress indicators
- **Smart Defaults**: Pre-filled common options based on user segments
- **Data Privacy**: Local processing with clear consent explanations
- **Form Validation**: Smart validation with contextual error messages

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun
- Clerk account for authentication

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
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
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
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

6. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
moveaid/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout with Clerk provider
│   └── page.tsx                 # Home page
├── assets/                      # Static assets
│   ├── *.svg                   # SVG icons and images
├── components/                  # React components
│   ├── ChoosePath/             # Path selection components
│   │   ├── index.tsx           # Main path selection
│   │   └── PathCard/           # Individual path cards
│   ├── Forms/                  # Assessment forms
│   │   ├── Shared/             # Reusable form components
│   │   │   ├── FormStep.tsx    # Multi-step wrapper
│   │   │   ├── QuestionCard.tsx # Question container
│   │   │   ├── MultiSelect.tsx # Multi-selection component
│   │   │   ├── SliderInput.tsx # Slider input component
│   │   │   └── FormNavigation.tsx # Navigation controls
│   │   ├── FormRouter.tsx      # Form routing logic
│   │   ├── RecoverFromInjuryForm.tsx
│   │   ├── FixPostureForm.tsx
│   │   ├── BuildMovementHabitForm.tsx
│   │   ├── ImproveWorkoutFormForm.tsx
│   │   ├── StayActiveAtDeskForm.tsx
│   │   └── LessStiffMoreMobileForm.tsx
│   ├── TopSection/             # Hero section
│   │   ├── index.tsx           # Main hero component
│   │   └── Header/             # Navigation header
│   ├── ProtectedRoute.tsx      # Authentication wrapper
│   └── [Other components]/     # Additional UI components
├── middleware.ts               # Clerk middleware
├── next.config.ts             # Next.js configuration
├── package.json               # Dependencies and scripts
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎨 Design System

### Color Palette

- **Primary Purple**: `#AD85D1` - Main brand color
- **Secondary Purple**: `#6c47ff` - Accent color
- **Background**: `#FEFEFE` - Clean white
- **Gradients**: Blue to green (`from-blue-50 to-green-50`)

### Typography

- **Font Family**: Geist Sans (primary), Geist Mono (code)
- **Responsive**: Mobile-first design approach
- **Accessibility**: High contrast ratios and readable fonts

### Components

- **Consistent Spacing**: 4px grid system
- **Rounded Corners**: `rounded-4xl` for cards, `rounded-lg` for buttons
- **Shadows**: Subtle elevation with `shadow-lg`
- **Transitions**: Smooth hover effects and state changes

## 🔧 Technical Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Icons**: Custom SVG assets
- **Fonts**: [Geist](https://vercel.com/font) font family

## 📱 User Experience

### For Signed-Out Users

1. **Landing Page**: Clear value proposition and call-to-action
2. **Path Cards**: Visible with lock icons and "Sign in to start assessment"
3. **Authentication**: Smooth sign-in/sign-up flow via Clerk
4. **Visual Feedback**: Clear indicators for protected content

### For Signed-In Users

1. **Immediate Access**: Full functionality without additional authentication
2. **User Management**: UserButton for account settings
3. **Assessment Forms**: Complete multi-step questionnaires
4. **Progress Tracking**: Visual progress indicators and validation

## 🛡️ Security & Privacy

- **Authentication**: Secure user management via Clerk
- **Data Privacy**: Local form processing, no sensitive data storage
- **Protected Routes**: Server-side authentication checks
- **Input Validation**: Client and server-side validation
- **HTTPS**: Secure data transmission

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Other Platforms

- **Netlify**: Static site deployment
- **Railway**: Full-stack deployment
- **AWS**: EC2 or Lambda deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Clerk](https://clerk.com/) for seamless authentication
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [Vercel](https://vercel.com/) for the Geist font family

## 📞 Support

For support, email support@moveaid.com or join our Discord community.

---

<div align="center">
  <p>Made with ❤️ by the MoveAid Team</p>
  <p>© 2024 MoveAid. All rights reserved.</p>
</div>
