import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="w-full bg-[#ffffff] min-h-screen text-[#1a1c1e]">
      {/* Top Banner Image */}
      <section className="w-full h-[360px] sm:h-[420px] md:h-[480px] lg:h-[500px] overflow-hidden relative">
        <img
          alt="Travel lifestyle expedition support team in a premium lounge"
          className="w-full h-full object-cover select-none"
          src="/Contact Main.png"
          loading="eager"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/30 pointer-events-none" />
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 py-8 md:py-12">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-label-mono text-[#7b7486] mb-6">
          <Link
            to="/"
            className="hover:text-[#8E55FD] transition-colors cursor-pointer"
          >
            Home
          </Link>
          <span>/</span>
          <span className="text-[#1a1c1e] font-semibold">Contact Us</span>
        </nav>

        {/* Header Section */}
        <section className="mb-10 md:mb-12">
          <h1 className="font-headline-lg font-bold text-3xl sm:text-4xl md:text-5xl text-[#8E55FD] mb-3 tracking-[-0.02em]">
            Contact Us
          </h1>
          <p className="font-body-md text-base sm:text-lg text-[#4a4455] max-w-2xl leading-relaxed">
            We&apos;re here to help with your gear inquiries, technical support, or partnership requests. Reach out to our expedition support team.
          </p>
        </section>

        {/* Contact Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Form Area (Left/Center - 7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-lg border border-[#ccc3d7] shadow-xs">
            {submitted ? (
              <div className="bg-[#eaddff]/40 border border-[#8E55FD] p-8 rounded-xl text-center space-y-4">
                <span className="material-symbols-outlined text-5xl text-[#8E55FD]">mark_email_read</span>
                <h3 className="font-headline-lg font-bold text-2xl text-[#1a1c1e]">Inquiry Dispatched</h3>
                <p className="font-body-md text-sm sm:text-base text-[#4a4455] max-w-md mx-auto leading-relaxed">
                  Thank you for reaching out, {formData.firstName || 'Traveler'}. Our expedition support team will review your inquiry and respond within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({ firstName: '', lastName: '', email: '', subject: '', message: '' });
                  }}
                  className="mt-4 px-6 py-2.5 bg-[#8E55FD] text-white font-title-md text-sm font-semibold rounded hover:bg-[#7232E7] transition-all cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block font-label-mono text-xs font-semibold text-[#1a1c1e] mb-1.5 uppercase tracking-wider"
                    >
                      First Name
                    </label>
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="Jane"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full bg-white border border-[#ccc3d7] rounded px-4 py-2.5 font-body-md text-sm text-[#1a1c1e] placeholder:text-[#7b7486]/60 focus:outline-none focus:border-[#8E55FD] focus:ring-2 focus:ring-[#eaddff] transition-all"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block font-label-mono text-xs font-semibold text-[#1a1c1e] mb-1.5 uppercase tracking-wider"
                    >
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full bg-white border border-[#ccc3d7] rounded px-4 py-2.5 font-body-md text-sm text-[#1a1c1e] placeholder:text-[#7b7486]/60 focus:outline-none focus:border-[#8E55FD] focus:ring-2 focus:ring-[#eaddff] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block font-label-mono text-xs font-semibold text-[#1a1c1e] mb-1.5 uppercase tracking-wider"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder="jane.doe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#ccc3d7] rounded px-4 py-2.5 font-body-md text-sm text-[#1a1c1e] placeholder:text-[#7b7486]/60 focus:outline-none focus:border-[#8E55FD] focus:ring-2 focus:ring-[#eaddff] transition-all"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block font-label-mono text-xs font-semibold text-[#1a1c1e] mb-1.5 uppercase tracking-wider"
                  >
                    Inquiry Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full appearance-none bg-white border border-[#ccc3d7] rounded px-4 py-2.5 font-body-md text-sm text-[#1a1c1e] focus:outline-none focus:border-[#8E55FD] focus:ring-2 focus:ring-[#eaddff] transition-all pr-10 cursor-pointer"
                    >
                      <option value="" disabled>Select an option</option>
                      <option value="support">Technical Support</option>
                      <option value="partnerships">Partnerships</option>
                      <option value="editorial">Editorial / PR</option>
                      <option value="other">Other Inquiries</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#7b7486]">
                      <span className="material-symbols-outlined text-xl">expand_more</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block font-label-mono text-xs font-semibold text-[#1a1c1e] mb-1.5 uppercase tracking-wider"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    placeholder="How can we assist you today?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-[#ccc3d7] rounded px-4 py-2.5 font-body-md text-sm text-[#1a1c1e] placeholder:text-[#7b7486]/60 focus:outline-none focus:border-[#8E55FD] focus:ring-2 focus:ring-[#eaddff] transition-all resize-y leading-relaxed"
                  />
                </div>

                <button
                  id="contact-submit-btn"
                  type="submit"
                  className="bg-[#8E55FD] text-white font-title-md text-sm font-semibold py-3 px-6 rounded hover:bg-[#7232E7] transition-all w-full sm:w-auto inline-flex items-center justify-center gap-2 btn-lift cursor-pointer shadow-sm"
                >
                  Submit Inquiry
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </form>
            )}
          </div>

          {/* Sidebar Info (Right - 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Expedition Support Card */}
            <div className="bg-[#f4f3f6] p-6 sm:p-8 rounded-lg border border-[#ccc3d7]">
              <h2 className="font-title-md font-bold text-lg text-[#1a1c1e] mb-5">
                Expedition Support
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#8E55FD] text-xl mt-0.5">mail</span>
                  <div>
                    <p className="font-label-mono text-xs text-[#7b7486] uppercase mb-0.5 tracking-wider font-semibold">
                      Email
                    </p>
                    <a
                      className="font-body-md text-sm text-[#1a1c1e] hover:text-[#8E55FD] transition-colors font-medium"
                      href="mailto:support@travelgeared.com"
                    >
                      support@travelgeared.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#8E55FD] text-xl mt-0.5">schedule</span>
                  <div>
                    <p className="font-label-mono text-xs text-[#7b7486] uppercase mb-0.5 tracking-wider font-semibold">
                      Hours
                    </p>
                    <p className="font-body-md text-sm text-[#1a1c1e]">
                      Mon-Fri, 9am - 5pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#8E55FD] text-xl mt-0.5">location_on</span>
                  <div>
                    <p className="font-label-mono text-xs text-[#7b7486] uppercase mb-0.5 tracking-wider font-semibold">
                      HQ
                    </p>
                    <p className="font-body-md text-sm text-[#1a1c1e] leading-relaxed">
                      100 Tech Plaza, Suite 400<br />New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Press & Media Card */}
            <div className="bg-white p-6 sm:p-8 rounded-lg border border-[#ccc3d7] relative overflow-hidden group hover:border-[#8E55FD] transition-all shadow-xs">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-title-md font-bold text-lg text-[#1a1c1e]">
                  Press &amp; Media
                </h3>
                <span className="material-symbols-outlined text-[#8E55FD] bg-[#eaddff] p-1.5 rounded-full text-lg">
                  campaign
                </span>
              </div>
              <p className="font-body-md text-sm text-[#4a4455] mb-4 leading-relaxed">
                For editorial inquiries, brand asset requests, and press access.
              </p>
              <a
                className="inline-flex items-center gap-1 font-label-mono text-xs font-semibold text-[#8E55FD] uppercase hover:text-[#7232E7] transition-colors tracking-wider"
                href="mailto:press@travelgeared.com"
              >
                press@travelgeared.com
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
