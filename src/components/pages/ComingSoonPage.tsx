import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMetaRobots } from '../../hooks/useMetaRobots';

interface ComingSoonPageProps {
  contextTitle?: string;
}

export const ComingSoonPage: React.FC<ComingSoonPageProps> = ({ contextTitle }) => {
  useMetaRobots('noindex, follow');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 5000);
    }
  };

  return (
    <div className="w-full bg-[#faf9fc] min-h-[calc(100vh-140px)] flex flex-col justify-center text-[#1a1c1e] py-12 md:py-16 selection:bg-[#8E55FD] selection:text-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 w-full flex-grow flex items-center">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text & Form Content (Left) */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-5 order-2 lg:order-1">
            {/* Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#eaddff] text-[#8E55FD] rounded-full w-fit">
              <span className="w-2 h-2 rounded-full bg-[#8E55FD] animate-pulse"></span>
              <span className="font-label-mono text-xs uppercase tracking-wider font-semibold">
                System Update in Progress
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-headline-lg text-3xl sm:text-4xl md:text-5xl lg:text-[48px] lg:leading-[56px] font-bold text-[#1a1c1e] leading-tight tracking-[-0.02em]">
              Engineering the <br />
              <span className="text-[#8E55FD]">
                Future of Travel.
              </span>
            </h1>

            {/* Description */}
            <p className="font-body-md text-base sm:text-lg text-[#4a4455] max-w-lg leading-relaxed">
              We&apos;re currently perfecting new technical features to elevate your next journey. Our team of experts is hard at work refining the most precise gear analysis platform on the web.
            </p>

            {/* Subscribe / Notify Form */}
            {submitted ? (
              <div className="p-4 bg-[#eaddff] border border-[#8E55FD]/30 rounded-lg text-[#1a1c1e] flex items-center gap-3 animate-fade-in max-w-md">
                <span className="material-symbols-outlined text-[#8E55FD] text-2xl shrink-0">
                  check_circle
                </span>
                <div>
                  <p className="font-title-md font-semibold text-sm text-[#1a1c1e]">
                    You&apos;re on the early access list!
                  </p>
                  <p className="font-body-md text-xs text-[#4a4455]">
                    We&apos;ll notify you the moment this section goes live.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md pt-1">
                <div className="relative flex-grow">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-4 py-3 bg-white border border-[#ccc3d7] rounded focus:outline-none focus:border-[#8E55FD] focus:ring-1 focus:ring-[#8E55FD] text-[#1a1c1e] placeholder:text-[#7b7486] transition-all font-body-md text-sm shadow-xs"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#8E55FD] hover:bg-[#7232E7] text-white px-6 py-3 rounded font-title-md text-sm font-semibold whitespace-nowrap shadow-sm btn-lift flex items-center justify-center gap-2 cursor-pointer transition-all shrink-0"
                >
                  Notify Me
                </button>
              </form>
            )}

            {/* Quick Return to Home Link */}
            <div className="pt-2">
              <Link
                to="/"
                className="inline-flex items-center gap-1.5 text-xs font-label-mono uppercase tracking-wider text-[#7b7486] hover:text-[#8E55FD] transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Return to Home
              </Link>
            </div>
          </div>

          {/* Visual Asset (Right) */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative w-full aspect-[4/3] lg:aspect-[16/10] rounded-xl overflow-hidden bg-[#eeedf0] shadow-lg border border-[#e8e8eb]">
              <img
                alt="Professional traveler walking with luggage in modern airport terminal"
                className="w-full h-full object-cover select-none"
                src="https://lh3.googleusercontent.com/aida/AP1WRLvmach6BZPWSsWnvzuV6OkT_wRAOZDrQaes7x6jnZTnbBXFozssf5fF7XYO1O4W06IhrY-lUaQcyzpTo8uTZDN1ma3CtAy8tuSLXz0mDf-eexxJezAAIX9f7sq_LI4CpeRbOY1WOEPQR4reKPstT2cFUBIGpJiitrbrW90R08FdiPYyC0yml9ooEaBq0rT0VQ_SD-9dp7GVjmLLRsY_IU0FFb9hG3jNMXu0oGHAyri3rYMD_Uvebe4ErK2-"
                loading="eager"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
