# High-Conversion SaaS Signup Page Design

## Design Overview

This is a modern, high-conversion signup page designed for SaaS applications. The design features a two-panel layout with an immersive promotional section on the left and a clean signup form on the right. It's built with React, TypeScript, Tailwind CSS, and Framer Motion for smooth animations.

### Key Design Principles
- **Responsive Design**: Adapts seamlessly from mobile to desktop
- **High Conversion Focus**: Clean, distraction-free form with social login options
- **Premium Aesthetics**: Gradient backgrounds, subtle shadows, and polished typography
- **Accessibility**: Proper labels, focus states, and semantic HTML
- **Performance**: Optimized animations and efficient CSS

## Features

### Left Panel (Desktop Only)
- Gradient background from emerald to slate
- Animated floating elements
- Feature list with checkmarks
- Trust indicators with user avatars
- Responsive typography scaling

### Right Panel (Signup Form)
- Mobile hero card for smaller screens
- Social login buttons (Google & GitHub)
- Email/password form with validation
- Terms and conditions checkbox
- Call-to-action button with hover effects
- Login link in footer

### Animations
- Fade-in animations on load
- Hover effects on buttons
- Smooth transitions throughout
- Floating decorative elements

### Responsive Behavior
- Mobile: Stacked layout with hero card
- Tablet: Side-by-side with adjusted padding
- Desktop: Full two-panel layout

## Technologies Used

- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Lucide React** for icons
- **Inter Font** from Google Fonts

## Full Code

```tsx
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Check, ArrowRight, Chrome, Github, Lock, Eye, EyeOff, User } from 'lucide-react';
import { motion } from 'motion/react';

export default function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen w-full bg-slate-950 font-sans text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900 overflow-hidden">
      <div className="flex h-screen w-full flex-col md:flex-row">
        
        {/* Left Side: Immersive Promotional Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative hidden md:flex w-[35%] xl:w-[38%] flex-col justify-between overflow-hidden bg-gradient-to-br from-emerald-600 via-emerald-700 to-slate-950 p-12 text-white shadow-2xl ring-1 ring-white/10 lg:p-16 xl:p-20"
        >
          {/* Advanced Multi-layer Mesh Gradient */}
          <div className="absolute inset-0 z-0 text-white">
            <div className="absolute top-[-10%] left-[-10%] h-[80%] w-[80%] rounded-full bg-emerald-400 blur-[120px] opacity-40 animate-pulse" />
            <div className="absolute bottom-[-20%] right-[-10%] h-[70%] w-[70%] rounded-full bg-teal-500 blur-[130px] opacity-60" />
            <div className="absolute top-[20%] right-[10%] h-[40%] w-[40%] rounded-full bg-yellow-200 blur-[100px] opacity-20" />
          </div>
          
          {/* Decorative Floating Element */}
          <motion.div 
            animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 -right-10 h-40 w-40 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-2xl z-0" 
          />

          <div className="relative z-10">
            <div className="mb-10">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-flex items-center gap-2.5 rounded-full bg-white/10 border border-white/20 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] backdrop-blur-md"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
                </span>
                Join the platform
              </motion.div>
            </div>

            <h1 className="mb-8 text-5xl font-black leading-[0.9] tracking-tighter xl:text-7xl">
              Ship <br />
              <span className="text-emerald-100/50 italic font-serif">Brilliance.</span> <br />
              Every day.
            </h1>

            <ul className="grid grid-cols-1 gap-5">
              {[
                "Instant cloud deployments",
                "Advanced team permissions",
                "Carbon-neutral infrastructure",
              ].map((feature, i) => (
                <motion.li 
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-4 text-base font-bold"
                >
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-1 ring-white/30 text-white">
                    <Check className="h-3.5 w-3.5 stroke-[4]" />
                  </div>
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative z-10 pt-10 border-t border-white/10">
            <div className="flex items-center gap-5">
              <div className="flex -space-x-3">
                {[ "bg-orange-400", "bg-blue-400", "bg-rose-400" ].map((color, i) => (
                  <div key={i} className={`h-10 w-10 rounded-full border-[3px] border-emerald-600 ${color} shadow-lg`} />
                ))}
              </div>
              <p className="text-[11px] font-black uppercase tracking-widest text-emerald-100/60 leading-tight">
                Trusted by <br />
                <span className="text-white text-sm">2,500+ Startups</span>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right Side: Enhanced Signup Form */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="relative flex w-full min-h-0 flex-col justify-center bg-white p-6 md:w-[65%] md:p-10 lg:p-16 xl:p-24 shadow-2xl ring-1 ring-slate-900/5 md:rounded-tr-[40px] md:rounded-br-[40px] overflow-hidden"
        >
          <div className="mx-auto h-full min-h-0 w-full max-w-[540px]">
            <div className="mb-8 rounded-[32px] bg-emerald-50/90 p-5 text-center shadow-sm ring-1 ring-emerald-100 md:hidden">
              <p className="text-[11px] font-black uppercase tracking-[0.35em] text-emerald-700">Ship brilliance every day</p>
              <h3 className="mt-3 text-2xl font-black tracking-tight text-slate-950">Launch faster with a premium signup experience</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600">A modern conversion-focused design made for fast onboarding.</p>
            </div>
            <header className="mb-6 text-center md:text-left">
              <h2 className="mb-2 text-3xl font-black tracking-tighter text-neutral-900 sm:text-4xl lg:text-5xl">
                Create account
              </h2>
              <p className="text-neutral-500 font-medium text-sm sm:text-base">Join the community of 20,000+ builders.</p>
            </header>

            <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2">
              <button className="flex w-full items-center justify-center gap-3 rounded-2xl border border-neutral-100 bg-neutral-50/50 px-4 py-3 text-xs font-black uppercase tracking-widest text-neutral-700 transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-white hover:shadow-lg active:scale-[0.98] ring-1 ring-black/5">
                <Chrome className="h-5 w-5 text-emerald-600" />
                Google
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-2xl bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition duration-300 ease-out hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-xl active:scale-[0.98]">
                <Github className="h-5 w-5" />
                Github
              </button>
            </div>

            <div className="relative mb-8 flex items-center">
              <div className="flex-grow border-t border-neutral-100" />
              <span className="mx-6 flex-shrink text-[10px] font-black uppercase tracking-[0.3em] text-neutral-300">or use your email</span>
              <div className="flex-grow border-t border-neutral-100" />
            </div>

            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1.5" htmlFor="name">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-300 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Cooper"
                      className="w-full rounded-2xl border border-neutral-100 bg-neutral-50/50 pl-12 pr-4 py-4 text-sm text-neutral-900 outline-none transition-all placeholder:text-neutral-300 focus:bg-white focus:border-emerald-500/30 focus:shadow-xl focus:shadow-emerald-500/5 font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1.5" htmlFor="email">
                    Work Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="jane@company.com"
                    className="w-full rounded-2xl border border-neutral-100 bg-neutral-50/50 px-5 py-4 text-sm text-neutral-900 outline-none transition-all placeholder:text-neutral-300 focus:bg-white focus:border-emerald-500/30 focus:shadow-xl focus:shadow-emerald-500/5 font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-neutral-400 ml-1.5" htmlFor="password">
                  Security Password
                </label>
                <div className="relative group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    className="w-full rounded-2xl border border-neutral-100 bg-neutral-50/50 px-6 py-4 pr-14 text-sm text-neutral-900 outline-none transition-all placeholder:text-neutral-300 focus:bg-white focus:border-emerald-500/30 focus:shadow-xl focus:shadow-emerald-500/5 font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-300 hover:text-neutral-900 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-neutral-50/50 p-5 rounded-2xl border border-neutral-100 transition-colors hover:bg-neutral-50 shadow-sm shadow-black/5">
                <div className="relative flex h-5 items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded-md border-neutral-300 text-emerald-600 focus:ring-emerald-500/20"
                  />
                </div>
                <label htmlFor="terms" className="text-[11px] font-medium leading-relaxed text-neutral-400">
                  Join the movement. By signing up, you agree to our <a href="#" className="font-bold text-neutral-900 hover:text-emerald-600 underline underline-offset-4 decoration-neutral-100 hover:decoration-emerald-500 transition-all">Terms of Service</a> and our <a href="#" className="font-bold text-neutral-900 hover:text-emerald-600 underline underline-offset-4 decoration-neutral-100 hover:decoration-emerald-500 transition-all">Privacy Guidelines</a>.
                </label>
              </div>

              <button className="group relative mt-4 flex w-full items-center justify-center gap-3 rounded-[28px] bg-emerald-600 px-6 py-4 text-center font-black uppercase tracking-[0.18em] text-sm text-white transition duration-300 ease-out hover:bg-emerald-700 hover:shadow-[0_24px_60px_-30px_rgba(16,185,129,0.8)] active:scale-[0.98]">
                <span>Create my account</span>
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2" />
              </button>
            </form>

            <footer className="mt-8 text-center text-xs font-bold border-t border-neutral-100/80 pt-6 text-slate-500">
              <span className="uppercase tracking-widest">Already have an account?</span>{" "}
              <button className="font-black text-emerald-600 hover:text-emerald-700 transition-all uppercase tracking-widest ml-1 px-3 py-2 bg-emerald-50 rounded-full shadow-sm">
                Log in
              </button>
            </footer>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
```

## Installation & Usage

1. **Clone or copy** the code into your React project
2. **Install dependencies**:
   ```bash
   npm install react motion framer-motion lucide-react
   # or
   yarn add react motion framer-motion lucide-react
   ```
3. **Ensure Tailwind CSS** is configured in your project
4. **Import and use** the `App` component in your main application

## Customization

- **Colors**: Modify the Tailwind classes for different color schemes
- **Content**: Update the feature list, headings, and copy
- **Animations**: Adjust Framer Motion properties for different effects
- **Layout**: Change breakpoints and responsive behavior

## Browser Support

- Modern browsers with CSS Grid and Flexbox support
- Mobile devices with responsive design
- Requires JavaScript for interactive elements

## Performance Notes

- Uses CSS-in-JS with Tailwind for optimal bundle size
- Animations are hardware-accelerated where possible
- Images are not used (vector-based design)
- Minimal JavaScript for fast loading