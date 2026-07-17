// import React, { useState, useEffect, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import {
//   Search, Play, Award, Users, BookOpen, Star, ChevronRight,
//   CheckCircle2, Sparkles, TrendingUp, Globe
// } from 'lucide-react';
// import axios from 'axios';
// import API_URL from '../config/api';
// import useScrollReveal from '../hooks/useScrollReveal';
// import Footer from '../Components/Footer';

// // ─── Sub-components (defined before Home so useScrollReveal refs resolve) ──

// function SkeletonCard() {
//   return (
//     <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
//       <div className="w-full h-48 bg-slate-200 animate-pulse" />
//       <div className="p-6 space-y-3">
//         <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
//         <div className="h-4 bg-slate-100 rounded animate-pulse w-full" />
//         <div className="h-4 bg-slate-100 rounded animate-pulse w-2/3" />
//         <div className="flex justify-between pt-2">
//           <div className="h-6 bg-slate-200 rounded animate-pulse w-20" />
//           <div className="h-9 bg-slate-200 rounded-lg animate-pulse w-28" />
//         </div>
//       </div>
//     </div>
//   );
// }

// function FeatureCard({ icon: Icon, title, desc, color, index }) {
//   const ref = useScrollReveal();
//   const colors = {
//     indigo: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white',
//     emerald: 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white',
//     violet: 'bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white',
//     amber: 'bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white',
//   };

//   return (
//     <div
//       ref={ref}
//       className="reveal-up group bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//       style={{ transitionDelay: `${index * 80}ms` }}
//     >
//       <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-colors ${colors[color] || colors.indigo}`}>
//         <Icon size={22} />
//       </div>
//       <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
//       <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
//     </div>
//   );
// }

// function TestimonialCard({ name, role, avatar, text, index }) {
//   const ref = useScrollReveal();

//   return (
//     <div
//       ref={ref}
//       className="reveal-up bg-white rounded-2xl p-7 border border-slate-100 shadow-sm hover:shadow-lg transition-shadow"
//       style={{ transitionDelay: `${index * 100}ms` }}
//     >
//       <div className="flex items-center gap-1 mb-4">
//         {Array.from({ length: 5 }).map((_, i) => (
//           <Star key={i} size={16} className="text-amber-400 fill-amber-400" />
//         ))}
//       </div>
//       <p className="text-slate-700 text-sm leading-relaxed mb-6">"{text}"</p>
//       <div className="flex items-center gap-3">
//         <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-sm font-bold flex-shrink-0">
//           {avatar}
//         </div>
//         <div>
//           <p className="text-sm font-semibold text-slate-900">{name}</p>
//           <p className="text-xs text-slate-500">{role}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function StepCard({ step, title, desc, index }) {
//   const ref = useScrollReveal();

//   return (
//     <div
//       ref={ref}
//       className="reveal-up relative text-center"
//       style={{ transitionDelay: `${index * 120}ms` }}
//     >
//       <div className="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-lg font-bold mx-auto mb-5 shadow-lg shadow-indigo-200">
//         {step}
//       </div>
//       <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
//       <p className="text-slate-600 text-sm leading-relaxed max-w-xs mx-auto">{desc}</p>
//     </div>
//   );
// }

// // ─── Data ─────────────────────────────────────────────────────────────────

// const STATS = [
//   { value: '50+', label: 'Expert Courses', icon: BookOpen },
//   { value: '25K+', label: 'Active Learners', icon: Users },
//   { value: '4.9', label: 'Average Rating', icon: Star },
//   { value: '95%', label: 'Completion Rate', icon: TrendingUp },
// ];

// const HOW_IT_WORKS = [
//   {
//     step: '01',
//     title: 'Create Your Account',
//     desc: 'Sign up in seconds and set your learning goals. No credit card required to get started.',
//   },
//   {
//     step: '02',
//     title: 'Explore & Enroll',
//     desc: 'Browse our curated catalog of expert-led courses and enroll in the ones that fit your goals.',
//   },
//   {
//     step: '03',
//     title: 'Learn & Grow',
//     desc: 'Study at your own pace, get AI-powered doubt support, and earn certificates as you progress.',
//   },
// ];

// const FEATURES = [
//   {
//     icon: Sparkles,
//     title: 'AI-Powered Learning',
//     desc: 'Get instant answers to your doubts with our built-in AI study assistant available 24/7.',
//     color: 'indigo',
//   },
//   {
//     icon: Award,
//     title: 'Certificates',
//     desc: 'Earn industry-recognized certificates on course completion to showcase on your resume.',
//     color: 'emerald',
//   },
//   {
//     icon: Globe,
//     title: 'Learn Anywhere',
//     desc: 'Access courses from any device, anytime. Pick up right where you left off.',
//     color: 'violet',
//   },
//   {
//     icon: TrendingUp,
//     title: 'Track Progress',
//     desc: 'Monitor your learning journey with detailed progress tracking and milestone celebrations.',
//     color: 'amber',
//   },
// ];

// const TESTIMONIALS = [
//   {
//     name: 'Sandeep Kumar',
//     role: 'JavaScript Developer',
//     avatar: 'SK',
//     text: 'The JavaScript course completely transformed my career. I went from knowing basic HTML to building complex web applications in just 3 months!',
//   },
//   {
//     name: 'Priya Reddy',
//     role: 'Full Stack Developer',
//     avatar: 'PR',
//     text: 'The MERN stack course was comprehensive and practical. I landed my dream job right after completing the course!',
//   },
//   {
//     name: 'Ankit Kumar',
//     role: 'Data Scientist',
//     avatar: 'AK',
//     text: 'The Python for Data Science course provided me with the skills I needed to transition from finance to tech.',
//   },
// ];

// const TRUSTED_BY = [
//   'React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker',
// ];

// // ─── Main ─────────────────────────────────────────────────────────────────

// export default function Home() {
//   const [courses, setCourses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Scroll-reveal refs — one per major section
//   const coursesRef = useScrollReveal()
//   const stepsRef = useScrollReveal()
//   const featuresRef = useScrollReveal()
//   const testimonialsRef = useScrollReveal()

//   const fetchCourses = useCallback(async () => {
//     try {
//       setLoading(true);
//       setError(null);
//       const { data } = await axios.get(`${API_URL}/courses`);
//       setCourses(data.data || []);
//     } catch {
//       setError('Failed to load courses. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchCourses();
//   }, [fetchCourses]);

//   const featured = courses.slice(0, 6);

//   // ─── Render ──────────────────────────────────────────────────────────────

//   return (
//     <div className="min-h-screen bg-white">
//       {/* ─── HERO ─────────────────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-indigo-900 to-indigo-800 text-white">
//         {/* Decorative orbs */}
//         <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/20 blur-3xl" />
//         <div className="absolute -bottom-60 -left-40 w-[400px] h-[400px] rounded-full bg-violet-500/15 blur-3xl" />
//         <div className="absolute top-20 left-1/3 w-64 h-64 rounded-full bg-emerald-400/10 blur-3xl" />

//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
//           <div className="max-w-3xl mx-auto text-center">
//             <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-indigo-100 mb-8 backdrop-blur-sm">
//               <Sparkles size={14} className="text-amber-300" />
//               AI-Powered Learning Platform
//             </span>

//             <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
//               Master skills that
//               <span className="block bg-gradient-to-r from-indigo-300 via-violet-300 to-indigo-200 bg-clip-text text-transparent">
//                 move your career forward
//               </span>
//             </h1>

//             <p className="text-lg sm:text-xl text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
//               Expert-led courses in web development, data science, and AI — with an AI study assistant built in to help you learn faster.
//             </p>

//             <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//               <Link
//                 to="/courses"
//                 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors shadow-lg shadow-indigo-900/30 w-full sm:w-auto justify-center"
//               >
//                 Explore Courses
//                 <ChevronRight size={18} />
//               </Link>
//               <Link
//                 to="/signup"
//                 className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-white font-semibold hover:bg-indigo-500/30 transition-colors w-full sm:w-auto justify-center"
//               >
//                 Start Free
//               </Link>
//             </div>
//           </div>

//           {/* Glass-morphism stat cards floating below hero */}
//           <div className="mt-16 md:mt-20 max-w-5xl mx-auto">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {STATS.map(({ value, label, icon: Icon }) => (
//                 <div
//                   key={label}
//                   className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-5 text-center"
//                 >
//                   <Icon size={20} className="mx-auto mb-2 text-indigo-300" />
//                   <div className="text-2xl font-bold text-white">{value}</div>
//                   <div className="text-xs text-indigo-200 mt-1">{label}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom curve transition */}
//         <div className="absolute bottom-0 left-0 right-0">
//           <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
//             <path d="M0 60V30C240 0 480 0 720 15C960 30 1200 30 1440 15V60H0Z" fill="#f8fafc" />
//           </svg>
//         </div>
//       </section>

//       {/* ─── TRUSTED BY ───────────────────────────────────────────────────── */}
//       <section className="bg-slate-50 py-10 border-b border-slate-100">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <p className="text-center text-xs font-medium text-slate-400 uppercase tracking-widest mb-6">
//             Trusted by learners from leading companies
//           </p>
//           <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-slate-400">
//             {TRUSTED_BY.map((company) => (
//               <span key={company} className="text-sm font-semibold tracking-wide opacity-60 hover:opacity-100 transition-opacity">
//                 {company}
//               </span>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── FEATURED COURSES ─────────────────────────────────────────────── */}
//       <section ref={coursesRef} className="reveal-up py-20 md:py-28 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-14">
//             <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
//               Featured Courses
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//               Start learning today
//             </h2>
//             <p className="text-slate-600 max-w-xl mx-auto">
//               Handpicked courses by industry experts to take you from beginner to job-ready.
//             </p>
//           </div>

//           {error && (
//             <div className="text-center py-12">
//               <p className="text-red-600 mb-4">{error}</p>
//               <button
//                 onClick={fetchCourses}
//                 className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors"
//               >
//                 Try Again
//               </button>
//             </div>
//           )}

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
//             {loading
//               ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
//               : featured.map((course) => (
//                 <Link
//                   key={course._id}
//                   to={`/courses/enroll/${course._id}`}
//                   className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
//                 >
//                   <div className="relative overflow-hidden">
//                     <img
//                       src={course.poster}
//                       alt={course.name}
//                       className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
//                       onError={(e) => {
//                         e.target.src = 'https://placehold.co/600x400?text=Course+Image';
//                       }}
//                     />
//                     <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-xs font-semibold text-slate-700">
//                       {course.category}
//                     </span>
//                     {course.originalPrice && (
//                       <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-red-500 text-white text-xs font-semibold">
//                         {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
//                       </span>
//                     )}
//                   </div>
//                   <div className="p-6">
//                     <div className="flex items-center gap-2 mb-2">
//                       <span className="px-2 py-0.5 rounded-md bg-indigo-50 text-indigo-700 text-[11px] font-semibold uppercase tracking-wide">
//                         {course.level}
//                       </span>
//                       <span className="text-xs text-slate-400">{course.duration}</span>
//                     </div>
//                     <h3 className="text-lg font-semibold text-slate-900 mb-1.5 group-hover:text-indigo-600 transition-colors line-clamp-1">
//                       {course.name}
//                     </h3>
//                     <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
//                       {course.description}
//                     </p>
//                     <div className="flex items-center justify-between pt-4 border-t border-slate-50">
//                       <div className="flex items-baseline gap-2">
//                         <span className="text-xl font-bold text-slate-900">₹{course.price.toLocaleString()}</span>
//                         {course.originalPrice && (
//                           <span className="text-sm text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
//                         )}
//                       </div>
//                       <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
//                         Enroll <ChevronRight size={14} />
//                       </span>
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//           </div>

//           {!loading && featured.length === 0 && !error && (
//             <div className="text-center py-16 text-slate-500">
//               No courses available right now. Check back soon!
//             </div>
//           )}

//           {!loading && featured.length > 0 && (
//             <div className="text-center mt-12">
//               <Link
//                 to="/courses"
//                 className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border-2 border-indigo-600 text-indigo-600 font-semibold hover:bg-indigo-600 hover:text-white transition-all"
//               >
//                 View All Courses
//                 <ChevronRight size={18} />
//               </Link>
//             </div>
//           )}
//         </div>
//       </section>

//       {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
//       <section ref={stepsRef} className="reveal-up py-20 md:py-28 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
//               How It Works
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//               Start learning in 3 simple steps
//             </h2>
//             <p className="text-slate-600 max-w-xl mx-auto">
//               Getting started is easy. Join thousands of learners already upgrading their skills.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
//             {HOW_IT_WORKS.map((step, i) => (
//               <div key={step.step} className="relative">
//                 <StepCard {...step} index={i} />
//                 {i < HOW_IT_WORKS.length - 1 && (
//                   <div className="hidden md:block absolute top-7 left-[calc(50%+40px)] w-[calc(100%-80px)]">
//                     <div className="border-t-2 border-dashed border-indigo-200" />
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── FEATURES ─────────────────────────────────────────────────────── */}
//       <section ref={featuresRef} className="reveal-up py-20 md:py-28 bg-white">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-14">
//             <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
//               Why EduStack
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//               Everything you need to succeed
//             </h2>
//             <p className="text-slate-600 max-w-xl mx-auto">
//               We've built a complete learning experience so you can focus on what matters most — growing your skills.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//             {FEATURES.map((feature, i) => (
//               <FeatureCard key={feature.title} {...feature} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
//       <section ref={testimonialsRef} className="reveal-up py-20 md:py-28 bg-slate-50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-14">
//             <span className="inline-block px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-semibold uppercase tracking-wider mb-4">
//               Testimonials
//             </span>
//             <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
//               Loved by learners worldwide
//             </h2>
//             <p className="text-slate-600 max-w-xl mx-auto">
//               Join thousands of students who've transformed their careers with EduStack.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-7 max-w-6xl mx-auto">
//             {TESTIMONIALS.map((t, i) => (
//               <TestimonialCard key={t.name} {...t} index={i} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* ─── CTA ──────────────────────────────────────────────────────────── */}
//       <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 py-20 md:py-28">
//         <div className="absolute inset-0 opacity-10">
//           <div className="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl" />
//           <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-indigo-300 rounded-full blur-3xl" />
//         </div>

//         <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
//           <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/10 text-sm text-indigo-100 mb-6">
//             <CheckCircle2 size={14} className="text-emerald-300" />
//             Start learning for free
//           </div>
//           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
//             Ready to transform your career?
//           </h2>
//           <p className="text-lg text-indigo-200 max-w-2xl mx-auto mb-10 leading-relaxed">
//             Join 25,000+ learners already building real skills with expert-led courses and AI-powered support.
//           </p>
//           <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//             <Link
//               to="/signup"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors shadow-xl w-full sm:w-auto justify-center"
//             >
//               Get Started — It's Free
//               <ChevronRight size={18} />
//             </Link>
//             <Link
//               to="/courses"
//               className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-indigo-500/20 border border-indigo-400/30 text-white font-semibold hover:bg-indigo-500/30 transition-colors w-full sm:w-auto justify-center"
//             >
//               Browse Courses
//             </Link>
//           </div>
//         </div>
//       </section>

//       {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
//       <Footer />
//     </div>
//   );
// }





import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Search, Play, Award, Users, BookOpen, Star, ChevronRight,
  CheckCircle2, Sparkles, TrendingUp, Globe
} from 'lucide-react';
import axios from 'axios';
import API_URL from '../config/api';
import useScrollReveal from '../hooks/useScrollReveal';
import Footer from '../Components/Footer';

// ─── Sub-components (defined before Home so useScrollReveal refs resolve) ──

function SkeletonCard() {
  return (
    <div className="bg-white rounded-md overflow-hidden border border-slate-200">
      <div className="w-full h-48 bg-slate-100 animate-pulse" />
      <div className="p-6 space-y-3">
        <div className="h-3 bg-slate-100 rounded animate-pulse w-1/4" />
        <div className="h-5 bg-slate-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-slate-100 rounded animate-pulse w-full" />
        <div className="flex justify-between pt-4 mt-2 border-t border-slate-100">
          <div className="h-5 bg-slate-200 rounded animate-pulse w-16" />
          <div className="h-5 bg-slate-100 rounded animate-pulse w-20" />
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, color, index }) {
  const ref = useScrollReveal();
  const accents = {
    indigo: 'border-indigo-600 text-indigo-600',
    emerald: 'border-emerald-600 text-emerald-600',
    violet: 'border-violet-600 text-violet-600',
    amber: 'border-amber-600 text-amber-600',
  };
  const accent = accents[color] || accents.indigo;

  return (
    <div
      ref={ref}
      className={`reveal-up group border-t-2 ${accent.split(' ')[0]} pt-6`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="font-mono text-xs text-slate-400">0{index + 1}</span>
        <Icon size={20} className={accent.split(' ')[1]} strokeWidth={1.75} />
      </div>
      <h3 className="text-base font-semibold text-slate-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
    </div>
  );
}

function TestimonialCard({ name, role, avatar, text, index }) {
  const ref = useScrollReveal();
  const borders = ['border-indigo-600', 'border-violet-600', 'border-emerald-600'];

  return (
    <div
      ref={ref}
      className={`reveal-up bg-white pl-6 py-1 border-l-2 ${borders[index % borders.length]}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <p className="text-slate-700 text-[15px] leading-relaxed mb-6">{text}</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-sm bg-slate-900 text-white flex items-center justify-center text-xs font-mono font-semibold flex-shrink-0">
          {avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{name}</p>
          <p className="text-xs font-mono text-slate-400">{role}</p>
        </div>
      </div>
    </div>
  );
}

function StepCard({ step, title, desc, index }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className="reveal-up relative"
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      <span className="block font-mono text-6xl font-light text-slate-100 leading-none mb-2 select-none">
        {step}
      </span>
      <div className="w-8 h-px bg-indigo-600 mb-4" />
      <h3 className="text-lg font-semibold text-slate-900 mb-2 tracking-tight">{title}</h3>
      <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{desc}</p>
    </div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────

const STATS = [
  { value: '50+', label: 'Expert Courses', icon: BookOpen },
  { value: '25K+', label: 'Active Learners', icon: Users },
  { value: '4.9', label: 'Average Rating', icon: Star },
  { value: '95%', label: 'Completion Rate', icon: TrendingUp },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Create your account',
    desc: 'Sign up in seconds and set your learning goals. No credit card required to get started.',
  },
  {
    step: '02',
    title: 'Explore & enroll',
    desc: 'Browse our curated catalog of expert-led courses and enroll in the ones that fit your goals.',
  },
  {
    step: '03',
    title: 'Learn & grow',
    desc: 'Study at your own pace, get AI-powered doubt support, and earn certificates as you progress.',
  },
];

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-powered learning',
    desc: 'Get instant answers to your doubts with our built-in AI study assistant, available around the clock.',
    color: 'indigo',
  },
  {
    icon: Award,
    title: 'Certificates',
    desc: 'Earn industry-recognized certificates on completion to showcase on your resume.',
    color: 'emerald',
  },
  {
    icon: Globe,
    title: 'Learn anywhere',
    desc: 'Access courses from any device, any time. Pick up right where you left off.',
    color: 'violet',
  },
  {
    icon: TrendingUp,
    title: 'Track progress',
    desc: 'Monitor your learning journey with detailed progress tracking and milestone markers.',
    color: 'amber',
  },
];

const TESTIMONIALS = [
  {
    name: 'Sandeep Kumar',
    role: 'JavaScript Developer',
    avatar: 'SK',
    text: 'The JavaScript course completely transformed my career. I went from knowing basic HTML to building complex web applications in just 3 months.',
  },
  {
    name: 'Priya Reddy',
    role: 'Full Stack Developer',
    avatar: 'PR',
    text: 'The MERN stack course was comprehensive and practical. I landed my dream job right after completing it.',
  },
  {
    name: 'Ankit Kumar',
    role: 'Data Scientist',
    avatar: 'AK',
    text: 'The Python for Data Science course gave me the skills I needed to move from finance into tech.',
  },
];

const TRUSTED_BY = ['React', 'Node.js', 'Python', 'MongoDB', 'AWS', 'Docker'];

// ─── Main ─────────────────────────────────────────────────────────────────

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Scroll-reveal refs — one per major section
  const coursesRef = useScrollReveal()
  const stepsRef = useScrollReveal()
  const featuresRef = useScrollReveal()
  const testimonialsRef = useScrollReveal()

  const fetchCourses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axios.get(`${API_URL}/courses`);
      setCourses(data.data || []);
    } catch {
      setError('Failed to load courses. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  const featured = courses.slice(0, 6);

  // ─── Render ──────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative bg-slate-950 text-white overflow-hidden">
        {/* fine structural grid, not a blurred gradient orb */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-12 md:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left: copy */}
            <div className="lg:col-span-6">
              <p className="font-mono text-xs tracking-widest uppercase text-indigo-400 mb-6">
                / EduStack — Course Platform
              </p>

              <h1 className="text-4xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-[1.08] mb-6">
                Learn like an {" "}
                {/* <br /> */}
                 engineer, not a {" "}
                {/* <br /> */}
                <span className="text-indigo-400">student.</span>
              </h1>

              <p className="text-base sm:text-md text-slate-400 max-w-md mb-10 leading-relaxed">
                Expert-led courses in web development, data science, and AI —
                with a built-in study assistant to help you learn faster.
              </p>

              <div className="flex flex-wrap items-center gap-4 mb-14">
                <Link
                  to="/courses"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-slate-950 font-semibold text-sm hover:bg-indigo-100 transition-colors"
                >
                  Explore courses
                  <ChevronRight size={16} />
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-semibold text-sm hover:border-white/40 hover:bg-white/5 transition-colors"
                >
                  Start free
                </Link>
              </div>

              {/* inline stat line — no cards, no blur */}
              <div className="flex flex-wrap gap-x-4 gap-y-4">
                {STATS.map(({ value, label }, i) => (
                  <div key={label} className={i > 0 ? 'pl-8 border-l border-white/10' : ''}>
                    <div className="font-mono text-2xl font-semibold text-white">{value}</div>
                    <div className="text-xs text-slate-500 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: signature element — a real lesson panel, not an abstract shape */}
            <div className="lg:col-span-6">
              <div className="bg-slate-900 border border-white/10 shadow-2xl shadow-black/40">
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/10">
                  <span className="font-mono text-xs text-slate-500">course/intro-to-react.tsx</span>
                  <span className="font-mono text-[11px] text-emerald-400">saved</span>
                </div>
                <div className="px-5 py-5 font-mono text-[13px] leading-relaxed">
                  <p><span className="text-violet-400">import</span> <span className="text-slate-300">{'{ useState }'}</span> <span className="text-violet-400">from</span> <span className="text-emerald-400">'react'</span></p>
                  <p className="mt-2"><span className="text-violet-400">function</span> <span className="text-indigo-300">Counter</span><span className="text-slate-400">() {'{'}</span></p>
                  <p className="pl-4 text-slate-400">const [count, setCount] = useState(0)</p>
                  <p className="text-slate-500">{'}'}</p>
                </div>
                <div className="border-t border-white/10 px-5 py-5 space-y-3">
                  {['Components & props', 'State and the useState hook', 'Handling events'].map((lesson, i) => (
                    <div key={lesson} className="flex items-center gap-3">
                      <CheckCircle2
                        size={16}
                        className={i < 2 ? 'text-emerald-400' : 'text-slate-600'}
                      />
                      <span className={`text-sm ${i < 2 ? 'text-slate-300' : 'text-slate-600'}`}>{lesson}</span>
                    </div>
                  ))}
                  <div className="pt-2">
                    <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-indigo-500" />
                    </div>
                    <p className="font-mono text-[11px] text-slate-500 mt-2">2 of 3 lessons complete</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── TRUSTED BY ───────────────────────────────────────────────────── */}
      <section className="bg-white py-8 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-y-4">
            <p className="font-mono text-xs text-slate-400 uppercase tracking-widest">
              Curriculum built around
            </p>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-2 text-slate-400">
              {TRUSTED_BY.map((company) => (
                <span key={company} className="text-sm font-medium tracking-wide">
                  {company}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FEATURED COURSES ─────────────────────────────────────────────── */}
      <section ref={coursesRef} className="reveal-up py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div>
              <p className="font-mono text-xs tracking-widest uppercase text-indigo-600 mb-3">
                / Featured
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
                Start learning today
              </h2>
            </div>
            <p className="text-slate-500 max-w-sm text-sm leading-relaxed">
              Handpicked courses by industry experts, built to take you from beginner to job-ready.
            </p>
          </div>

          {error && (
            <div className="text-center py-12 border border-slate-100">
              <p className="text-red-600 mb-4 text-sm">{error}</p>
              <button
                onClick={fetchCourses}
                className="px-6 py-2.5 bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors"
              >
                Try again
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-100">
            {loading
              ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
              : featured.map((course) => (
                <Link
                  key={course._id}
                  to={`/courses/enroll/${course._id}`}
                  className="group bg-white hover:bg-slate-50 transition-colors"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.poster}
                      alt={course.name}
                      className="w-full h-48 object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-500"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/600x400?text=Course+Image';
                      }}
                    />
                    <span className="absolute top-3 left-3 px-2 py-1 bg-slate-950/80 text-white text-[11px] font-mono">
                      {course.category}
                    </span>
                    {course.originalPrice && (
                      <span className="absolute top-3 right-3 px-2 py-1 bg-red-600 text-white text-[11px] font-mono">
                        -{Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3 font-mono text-[11px] text-slate-400 uppercase tracking-wide">
                      <span>{course.level}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-300" />
                      <span>{course.duration}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mb-1.5 tracking-tight group-hover:text-indigo-600 transition-colors line-clamp-1">
                      {course.name}
                    </h3>
                    <p className="text-sm text-slate-500 mb-5 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex items-baseline gap-2 font-mono">
                        <span className="text-lg font-semibold text-slate-900">₹{course.price.toLocaleString()}</span>
                        {course.originalPrice && (
                          <span className="text-sm text-slate-400 line-through">₹{course.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-indigo-600 group-hover:gap-2 transition-all">
                        Enroll <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          {!loading && featured.length === 0 && !error && (
            <div className="text-center py-16 text-slate-500 border border-slate-100">
              No courses available right now. Check back soon.
            </div>
          )}

          {!loading && featured.length > 0 && (
            <div className="mt-12">
              <Link
                to="/courses"
                className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 border-b-2 border-indigo-600 pb-1 hover:gap-3 transition-all"
              >
                View all courses
                <ChevronRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ─── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section ref={stepsRef} className="reveal-up py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-16 max-w-xl">
            <p className="font-mono text-xs tracking-widest uppercase text-indigo-600 mb-3">
              / Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Three steps to your first certificate
            </h2>
            <p className="text-slate-500 leading-relaxed">
              Getting started is straightforward. Join thousands of learners already upgrading their skills.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
            {HOW_IT_WORKS.map((step, i) => (
              <StepCard key={step.step} {...step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURES ─────────────────────────────────────────────────────── */}
      <section ref={featuresRef} className="reveal-up py-20 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-xl">
            <p className="font-mono text-xs tracking-widest uppercase text-indigo-600 mb-3">
              / Why EduStack
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
              Everything you need to finish, not just start
            </h2>
            <p className="text-slate-500 leading-relaxed">
              A complete learning experience so you can focus on what matters — growing your skills.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, i) => (
              <FeatureCard key={feature.title} {...feature} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─────────────────────────────────────────────────── */}
      <section ref={testimonialsRef} className="reveal-up py-20 md:py-28 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-14 max-w-xl">
            <p className="font-mono text-xs tracking-widest uppercase text-indigo-600 mb-3">
              / Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Loved by learners worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {TESTIMONIALS.map((t, i) => (
              <TestimonialCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ──────────────────────────────────────────────────────────── */}
      <section className="relative bg-indigo-700 py-20 md:py-28 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage: 'repeating-linear-gradient(-45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)',
          }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="font-mono text-xs tracking-widest uppercase text-indigo-200 mb-6">
            / Start for free
          </p>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight tracking-tight">
            Ready to transform your career?
          </h2>
          <p className="text-lg text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed">
            Join 25,000+ learners already building real skills with expert-led courses and AI-powered support.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-indigo-700 font-semibold hover:bg-indigo-50 transition-colors w-full sm:w-auto justify-center"
            >
              Get started — it's free
              <ChevronRight size={18} />
            </Link>
            <Link
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 border border-white/30 text-white font-semibold hover:bg-white/10 transition-colors w-full sm:w-auto justify-center"
            >
              Browse courses
            </Link>
          </div>
        </div>
      </section>

      {/* ─── FOOTER ───────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  );
}