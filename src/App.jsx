import React, { useState, useEffect } from 'react';
import { Home, Users, MapPin, ArrowRight, Star, Wifi, ShieldCheck, Zap, Sofa, Train, Mail, Phone, Plus, Minus, Heart, GraduationCap } from 'lucide-react';
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
    y: -10,
    scale: 1.02,
    transition: { type: "spring", stiffness: 400, damping: 15 }
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
        <span className="text-xl font-display font-black text-slate-900 tracking-tighter">Makaan</span>
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
    whileHover={{ y: -10 }}
    whileTap={{ scale: 0.98 }}
    className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all hover:shadow-2xl ${!available && 'opacity-70 grayscale-[0.5]'}`}
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
        <button onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})} disabled={!available} className="bg-slate-50 p-3 rounded-xl text-slate-400 hover:bg-blue-600 hover:text-white transition-all cursor-pointer active:scale-95 shadow-sm">
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

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-5xl md:text-7xl font-display font-black leading-[1] tracking-tighter mb-6">
              Makaan. <br /> 
              <span className="text-slate-400">Study Smart.</span>
            </h1>
            <p className="text-lg text-slate-500 font-light mb-8 max-w-md leading-relaxed italic">The premier choice for student living in Al Barsha, Dubai.</p>
            
            <div className="flex flex-col gap-3 mb-10">
               {['Community-driven living', 'Affordable housing', 'Prime Dubai Location'].map((usp, i) => (
                 <motion.div key={i} variants={popHover} whileHover="hover" whileTap="hover" className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white border border-gray-100 shadow-sm w-fit group cursor-default">
                    <Star className="w-4 h-4 text-blue-600 fill-current" />
                    <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">{usp}</span>
                 </motion.div>
               ))}
            </div>
            
            <div className="flex gap-4">
              <button onClick={() => document.getElementById('living').scrollIntoView({behavior:'smooth'})} className="bg-slate-900 text-white px-8 py-4 rounded-xl font-display font-black text-lg shadow-xl hover:bg-blue-600 transition cursor-pointer active:scale-95">Explore Rooms</button>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2 }} className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-[2.5rem] blur opacity-20"></div>
            <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000" className="relative rounded-[2.5rem] shadow-2xl h-[480px] w-full object-cover border-[10px] border-white" alt="Makaan Luxury" />
            <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-2xl border border-slate-50 hidden md:block">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center"><Heart className="w-5 h-5 text-blue-600 fill-current" /></div>
                <div><p className="text-[10px] font-black uppercase text-slate-400">Chosen by Students</p><p className="text-sm font-bold text-slate-800">Makaan Quality</p></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Bright Why Choose Section */}
      <section id="facilities" className="py-24 bg-gradient-to-b from-blue-600 to-blue-700 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black mb-4 tracking-tighter uppercase italic">Why Makaan?</h2>
              <p className="text-blue-100 max-w-xl mx-auto text-sm font-light leading-relaxed">Experience a new standard of living designed specifically for student success.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Users, t: "Live & Network", d: "Join a thriving community of students from across the globe." },
                { icon: Train, t: "Prime Location", d: "Located steps from Dubai Metro for effortless city travel." },
                { icon: ShieldCheck, t: "24/7 Security", d: "Your safety is our priority with around-the-clock on-site teams." },
                { icon: Zap, t: "All-Inclusive", d: "One monthly payment covers rent, DEWA, cooling, and internet." },
                { icon: Wifi, t: "Ultra High-Speed", d: "Dedicated fiber optic WiFi for seamless online learning." },
                { icon: Sofa, t: "Fully Furnished", d: "Modern, designer-picked furniture ready for you to move in." }
              ].map((item, i) => (
                <motion.div key={i} variants={popHover} whileHover="hover" whileTap="hover" className="bg-white p-8 rounded-[2.5rem] shadow-xl group cursor-default">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600"><item.icon className="w-6 h-6" /></div>
                  <h4 className="text-xl font-display font-bold mb-3 tracking-tight text-slate-900">{item.t}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed font-light">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Living Section */}
      <section id="living" className="py-24 max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-4xl font-display font-black tracking-tighter uppercase">Living Spaces</h2>
            <div className="h-px flex-1 bg-slate-100 mx-8 hidden md:block"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <RoomCard title="Modern Shared" price="1,200" location="15 mins" image="https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&q=80&w=800" />
            <RoomCard title="Premium Triple" price="1,350" location="10 mins" image="https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=800" />
            <RoomCard title="Standard Room" price="1,100" location="20 mins" image="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800" available={false} />
          </div>
        </Reveal>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-slate-50">
        <div className="max-w-3xl mx-auto px-6">
          <Reveal>
            <h2 className="text-3xl font-display font-black text-center mb-12 tracking-tighter uppercase">Common Questions</h2>
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
              <FAQItem question="What is included in the Makaan monthly rent?" answer="Your monthly rent covers everything: furniture, electricity, water, cooling, high-speed WiFi, and 24/7 building security." />
              <FAQItem question="How far is the commute to Knowledge Park?" answer="Makaan locations are strategically chosen for a 10-20 minute commute via Dubai Metro or public bus." />
              <FAQItem question="Are there flexible contract options?" answer="Yes, we offer seasonal and semester-based contracts specifically for university students." />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
        <Reveal>
          <h2 className="text-6xl font-display font-extrabold text-slate-950 leading-[0.9] tracking-tighter mb-8 uppercase">Let's <br /> Talk <span className="text-blue-600">.</span></h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-center font-bold text-xl"><Phone className="w-5 h-5 text-blue-600"/> +971 50 XXX XXXX</div>
            <div className="flex gap-4 items-center font-bold text-xl"><Mail className="w-5 h-5 text-blue-600"/> hello@makaan.ae</div>
          </div>
        </Reveal>
        <Reveal>
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] border border-gray-100 shadow-2xl">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input name="firstName" placeholder="First Name" required className="p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm font-medium" />
              <input name="lastName" placeholder="Last Name" required className="p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm font-medium" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
               <select name="gender" required className="p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm font-medium text-slate-400">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
               </select>
               <select name="institute" required className="p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm font-medium text-slate-400">
                  <option value="">Institute</option>
                  <option value="Middlesex">Middlesex Dubai</option>
                  <option value="Heriot-Watt">Heriot-Watt</option>
                  <option value="UOWD">UOWD</option>
                  <option value="Other">Other</option>
               </select>
            </div>

            <input name="email" type="email" placeholder="Email Address" required className="w-full mb-4 p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm font-medium" />
            
            <select name="leadSource" required className="w-full mb-4 p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm font-medium text-slate-400">
                <option value="">How did you hear about Makaan?</option>
                <option value="Social Media">Social Media</option>
                <option value="Friend/Referral">Friend/Referral</option>
                <option value="Google Search">Google Search</option>
                <option value="University Campus">University Campus</option>
            </select>

            <textarea name="message" placeholder="Any specific requirements?" rows="3" className="w-full mb-6 p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm font-medium"></textarea>
            
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-display font-black text-lg hover:bg-blue-600 transition active:scale-95 shadow-xl uppercase tracking-widest">Apply Now</button>
            {status && <p className="mt-4 text-center text-blue-600 font-black text-xs animate-pulse uppercase tracking-widest">{status}</p>}
          </form>
        </Reveal>
      </section>

      <footer className="py-12 border-t border-gray-100 text-center text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
        Makaan © 2026 | Luxury Student Housing Dubai
      </footer>
    </div>
  );
}