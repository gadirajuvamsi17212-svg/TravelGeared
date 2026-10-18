import React, { useState } from 'react';

export const NewsletterSection: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail('');
    }
  };

  return (
    <section className="w-full bg-[#141223] text-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <span className="font-label-mono text-xs uppercase tracking-wider text-[#8E55FD] font-semibold mb-3 block">
          Dispatch & Field Notes
        </span>
        <h2 className="font-headline-lg font-bold text-2xl sm:text-4xl text-white mb-4">
          Travel Smarter Every Week
        </h2>
        <p className="font-body-md text-sm sm:text-base text-[#e3e2e5] max-w-xl mx-auto mb-8 opacity-80 leading-relaxed">
          Get our unbiased gear tests, weight-reduction packing breakdowns, and seasonal flight logistics sent straight to your inbox.
        </p>

        {submitted ? (
          <div className="p-4 rounded-xl bg-[#8E55FD]/20 border border-[#8E55FD] text-white max-w-md mx-auto">
            <p className="font-medium text-sm">Thank you for subscribing! Check your inbox soon.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/50 text-sm focus:outline-none focus:border-[#8E55FD]"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-[#8E55FD] text-white font-semibold text-sm hover:bg-[#7a42ea] transition-all shadow-sm shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
};
