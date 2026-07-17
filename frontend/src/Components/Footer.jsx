import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Mail, Github, Twitter, Linkedin } from 'lucide-react';

const FOOTER_LINKS = {
  product: [
    { label: 'Courses', to: '/courses' },
    { label: 'My Courses', to: '/my-courses' },
    { label: 'Doubt Assistant', to: '/doubt' },
    { label: 'About', to: '/about' },
  ],
  company: [
    { label: 'About Us', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy', to: '#' },
    { label: 'Terms of Service', to: '#' },
  ],
};

const SOCIAL = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Github, href: '#', label: 'GitHub' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:support@upskillx.dev', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center text-white font-bold text-sm group-hover:bg-indigo-400 transition-colors">
                <BookOpen size={18} />
              </div>
              <span className="text-xl font-bold text-white">EduStack</span>
            </Link>
            <p className="mt-4 text-slate-400 text-sm leading-relaxed max-w-xs">
              Expert-led online courses designed to help you master modern skills and advance your career.
            </p>
            <div className="flex items-center gap-4 mt-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Product</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.product.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.company.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Legal</h4>
            <ul className="space-y-3">
              {FOOTER_LINKS.legal.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} EduStack. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with care for learners everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
