import React, { useState, useEffect } from 'react';
import { Home, Users, MapPin, ArrowRight, Star, Wifi, ShieldCheck, Zap, Sofa, Train, Mail, Phone, Plus, Minus, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Lenis from '@studio-freight/lenis';

// --- Global Animation Logic ---
const Reveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
  >
    {children}
  </motion.div>
);

const popHover = {
  hover: { 
    y: -8,
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 17 }
  }
};

// --- Components ---

const Navbar = () => (
  <nav className="fixed w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100/50">
    <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
      <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
        <motion.div whileHover={{ rotate: 15, scale: 1.1 }} className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-200">
          <Home className="text-white w-4 h-4" />
        </motion.div>
        <span className="text-xl font-display font-black text-slate-900 tracking-tighter">Makaan<span className="text-blue-600">.ae</span></span>
      </div>
      <div className="hidden md:flex items-center gap-8 font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em]">
        <a href="#living" className="hover:text-blue-600 transition-colors uppercase">Living</a>
        <a href="#facilities" className="hover:text-blue-600 transition-colors uppercase">Facilities</a>
        <a href="#faq" className="hover:text-blue-600 transition-colors uppercase">FAQ</a>
        <button onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[11px] font-black hover:bg-blue-600 transition active:scale-95 shadow-lg uppercase">Claim Spot</button>
      </div>
    </div>
  </nav>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button onClick={() => setIsOpen(!isOpen)} className="w-full py-5 flex justify-between items-center text-left focus:outline-none group">
        <span className="text-sm font-bold text-slate-700 group-hover:text-blue-600 transition-colors">{question}</span>
        {isOpen ? <Minus className="text-blue-600 w-4 h-4" /> : <Plus className="text-blue-600 w-4 h-4" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
            <p className="pb-5 text-slate-500 text-xs leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RoomCard = ({ title, price, location, image, available = true }) => (
  <motion.div 
    whileHover={{ y: -8 }}
    className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-xl ${!available && 'opacity-70 grayscale-[0.5]'}`}
  >
    <div className="relative h-56 overflow-hidden bg-slate-100">
      <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
      {available ? (
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-blue-600 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Available</span>
      ) : (
        <span className="absolute top-4 left-4 bg-slate-800/90 backdrop-blur-md text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-sm">Fully Booked</span>
      )}
    </div>
    <div className="p-6">
      <h3 className="text-lg font-display font-bold text-slate-900 leading-tight mb-3 tracking-tight">{title}</h3>
      <div className="space-y-2 mb-6 text-slate-500 font-medium text-xs">
        <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-blue-500" /> {location} from Knowledge Park</div>
        <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5 text-blue-500" /> 3 Person Sharing</div>
      </div>
      <div className="flex items-center justify-between border-t border-gray-50 pt-5">
        <p className="text-xl font-display font-black text-blue-600">AED {price}<span className="text-slate-300 text-[10px] font-normal">/mo</span></p>
        <button 
          onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})}
          disabled={!available} 
          className="bg-slate-50 p-3 rounded-xl text-slate-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [status, setStatus] = useState('');

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2 });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Submitting...');
    const formData = new FormData(e.target);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwmD7wd4AYTW-PnLMaemjqKV90-idcmejNxxUowgbo8qb7HxqhbOSh3sfkSsG0-rpIBcA/exec';
    try {
      await fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' });
      setStatus('Success! Inquiry Sent.');
      e.target.reset();
    } catch (e) { setStatus('Error. Try again.'); }
  };

  return (
    <div className="font-sans selection:bg-blue-600 selection:text-white antialiased overflow-x-hidden text-slate-900 bg-white">
      <Navbar />

      {/* 1. Hero Section - The "Perfect" Look */}
      <section id="home" className="relative pt-32 pb-16 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl md:text-6xl font-display font-black leading-[1.05] tracking-tighter mb-6">
              Live Bold. <br /> Study <span className="text-blue-600 italic">Smart.</span>
            </h1>
            <p className="text-lg text-slate-500 font-light mb-8 max-w-md leading-relaxed">Premium student living in the heart of Al Barsha, Dubai. Designed for excellence and community.</p>
            
            <div className="flex flex-col gap-3 mb-10">
               {['Community-driven living', 'Affordable housing', 'Prime Dubai Location'].map((usp, i) => (
                 <motion.div 
                   key={i}
                   variants={popHover}
                   whileHover="hover"
                   className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm w-fit group cursor-default"
                 >
                    <motion.div whileHover={{ rotate: 20, scale: 1.2 }} transition={{ type: "spring" }}>
                        <Star className="w-4 h-4 text-blue-600 fill-current" />
                    </motion.div>
                    <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">{usp}</span>
                 </motion.div>
               ))}
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => document.getElementById('living').scrollIntoView({behavior:'smooth'})} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-display font-black text-lg shadow-xl hover:bg-blue-600 transition cursor-pointer active:scale-95">Explore Living</button>
              <button onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})} className="bg-white border-2 border-slate-900 text-slate-900 px-8 py-4 rounded-xl font-display font-black text-lg hover:bg-slate-900 hover:text-white transition cursor-pointer active:scale-95">Book Viewing</button>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <img 
              src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000" 
              className="relative rounded-[2.5rem] shadow-2xl h-[480px] w-full object-cover border-[10px] border-white transition-transform duration-700 hover:scale-[1.01]" 
              alt="Designer Room" 
            />
            {/* FLOATING BADGE */}
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-slate-50 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Heart className="w-5 h-5 text-green-600 fill-current" /></div>
                <div><p className="text-[10px] font-black uppercase text-slate-400">Student Choice</p><p className="text-sm font-bold text-slate-800">Top Rated 2025</p></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 2. Living Section - 3 Rooms Grid */}
      <section id="living" className="py-20 max-w-6xl mx-auto px-6">
        <Reveal>
          <h2 className="text-4xl font-display font-black mb-12 tracking-tighter">Available Rooms</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <RoomCard title="Modern Shared" price="1,200" location="15 mins" image="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800" />
            <RoomCard title="Premium Triple" price="1,350" location="10 mins" image="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800" />
            {/* FIXED 3RD ROOM IMAGE */}
            <RoomCard title="Standard Room" price="1,100" location="20 mins" image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800" available={false} />
          </div>
        </Reveal>
      </section>

      {/* 3. Why Choose Section - Dark Premium Grid */}
      <section id="facilities" className="py-20 bg-[#0f0f0f] text-white">
        <div className="max-w-6xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-black mb-4 tracking-tighter uppercase italic">Why Makaan.ae?</h2>
              <p className="text-gray-500 max-w-xl mx-auto text-sm font-light leading-relaxed">Designed for a frictionless student experience, from high-speed connectivity to total security.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Users, color: "#4ade80", t: "Live & Network", d: "Connect with world-class students and expand your global professional network." },
                { icon: Train, color: "#38bdf8", t: "Prime Connectivity", d: "Steps away from the Dubai Metro. Your gateway to the entire city." },
                { icon: ShieldCheck, color: "#a3e635", t: "24/7 Total Safety", d: "On-site security and dedicated student support teams at all hours." },
                { icon: Zap, color: "#2dd4bf", t: "All-Inclusive Living", d: "Utilities, cooling, and maintenance are all included in your monthly rent." },
                { icon: Wifi, color: "#818cf8", t: "Ultra High-Speed WiFi", d: "Uncapped fiber internet perfect for online lectures, streaming, and gaming." },
                { icon: Sofa, color: "#10b981", t: "Fully Furnished", d: "Move in hassle-free with high-end designer furniture and appliances." }
              ].map((item, i) => (
                <motion.div key={i} variants={popHover} whileHover="hover" className="bg-[#181818] p-8 rounded-[2rem] border border-white/5 group">
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }} className="w-10 h-10 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: item.color }}><item.icon className="text-white w-5 h-5" /></motion.div>
                  <h4 className="text-xl font-display font-bold mb-3 tracking-tight">{item.t}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed font-light">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 4. FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl font-display font-black text-center mb-12 tracking-tighter uppercase">Frequently Asked Questions</h2>
            <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
              <FAQItem question="What is included in the monthly rent?" answer="Your monthly rent covers everything: a fully furnished room, electricity, water, cooling (A/C), high-speed fiber WiFi, and 24/7 building security." />
              <FAQItem question="How far is it from Knowledge Park?" answer="Our student hubs are strategically located for a 10-20 minute commute to Knowledge Park and major universities via Metro or Bus." />
              <FAQItem question="What is the minimum contract period?" answer="We offer flexible contracts starting from 6 months, ideal for university semesters, as well as annual leases." />
              <FAQItem question="Can I view the room before booking?" answer="Absolutely. Use the contact form below to schedule a physical tour or a virtual viewing via video call." />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="py-20 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <h2 className="text-6xl font-display font-extrabold text-slate-950 leading-[0.9] tracking-tighter mb-6 uppercase">Contact <br /> Us <span className="text-blue-600">.</span></h2>
          <div className="space-y-6 mt-10">
            <div className="flex gap-4 items-center font-display font-bold text-xl"><div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shadow-sm"><Phone className="w-5 h-5"/></div> +971 50 XXX XXXX</div>
            <div className="flex gap-4 items-center font-display font-bold text-xl"><div className="bg-blue-50 p-4 rounded-2xl text-blue-600 shadow-sm"><Mail className="w-5 h-5"/></div> hello@makaan.ae</div>
          </div>
        </Reveal>
        <Reveal>
          <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-slate-200/40">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input name="firstName" placeholder="First Name" required className="p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-50 text-sm font-medium" />
              <input name="lastName" placeholder="Last Name" required className="p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-50 text-sm font-medium" />
            </div>
            <input name="email" type="email" placeholder="Email Address" required className="w-full mb-4 p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-50 text-sm font-medium" />
            <input name="phone" placeholder="Phone Number" required className="w-full mb-4 p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-50 text-sm font-medium" />
            <textarea name="message" placeholder="Tell us about your requirements..." rows="3" className="w-full mb-6 p-4 rounded-xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-50 text-sm font-medium"></textarea>
            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-display font-black text-lg hover:bg-blue-600 transition cursor-pointer active:scale-95 shadow-xl">Submit Inquiry</button>
            {status && <p className="mt-4 text-center text-blue-600 font-black uppercase tracking-widest text-xs animate-pulse">{status}</p>}
          </form>
        </Reveal>
      </section>

      <footer className="py-12 border-t border-gray-50 text-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
        Makaan.ae © 2025 | Luxury Student Housing Dubai
      </footer>
    </div>
  );
}