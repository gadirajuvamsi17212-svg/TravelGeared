import React, { useState } from 'react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <section id="newsletter-section" className="relative w-full bg-[#8E55FD] py-16 md:py-20 overflow-hidden select-none">
      {/* Floating geometric circles */}
      <div className="absolute inset-0 z-0 opacity-20 floating pointer-events-none">
        <svg
          className="absolute top-0 right-0 w-64 h-64 transform translate-x-1/2 -translate-y-1/2 text-white"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg
          className="absolute bottom-0 left-0 w-48 h-48 transform -translate-x-1/3 translate-y-1/3 text-white"
          fill="currentColor"
          viewBox="0 0 100 100"
        >
          <circle cx="50" cy="50" r="50" />
        </svg>
      </div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="font-headline-lg font-bold text-2xl sm:text-3xl md:text-4xl text-white mb-3 sm:mb-4">
          Join the Expedition
        </h2>
        <p className="font-body-lg text-sm sm:text-base md:text-lg text-white/90 mb-6 sm:mb-8 max-w-md mx-auto leading-relaxed">
          Travel Smarter. Get Better Gear Recommendations.
        </p>

        {subscribed ? (
          <div className="max-w-md mx-auto bg-white/20 backdrop-blur-md p-4 rounded-lg text-white font-body-md animate-in fade-in zoom-in-95 duration-300">
            <div className="flex items-center justify-center gap-2 font-semibold text-sm">
              <span className="material-symbols-outlined text-green-300 text-lg">check_circle</span>
              Welcome aboard! Check your inbox for your first gear guide.
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              id="newsletter-email-input"
              aria-label="Email address"
              className="flex-1 px-4 py-3 rounded border border-white/20 bg-white/10 text-white placeholder:text-white/60 focus:ring-2 focus:ring-white focus:bg-white/20 font-body-md outline-hidden transition-all text-sm"
              placeholder="Enter your email address"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button
              id="newsletter-subscribe-button"
              className="px-6 py-3 bg-[#141223] text-white font-title-md font-semibold text-sm rounded hover:bg-white hover:text-[#141223] transition-colors btn-lift whitespace-nowrap cursor-pointer shadow-md"
              type="submit"
            >
              Subscribe
            </button>
          </form>
        )}

        <p className="font-body-md text-xs sm:text-sm text-white/75 mt-4">
          We respect your privacy. No spam, ever.
        </p>
      </div>
    </section>
  );
};
