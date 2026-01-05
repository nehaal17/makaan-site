import React, { useState, useEffect } from 'react';
import { Home, Users, MapPin, ArrowRight, Star, Wifi, ShieldCheck, Zap, Sofa, Train, Mail, Phone, Plus, Minus, Heart, X, ChevronLeft, ChevronRight, Footprints } from 'lucide-react';
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
  hover: { y: -10, scale: 1.02, transition: { type: "spring", stiffness: 400, damping: 15 } }
};

// --- New Image Modal Component ---
const ImageModal = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]"><X size={40} /></button>
          
          <button onClick={prev} className="absolute left-4 md:left-10 text-white/50 hover:text-white transition-colors z-[110]"><ChevronLeft size={50} /></button>
          <button onClick={next} className="absolute right-4 md:right-10 text-white/50 hover:text-white transition-colors z-[110]"><ChevronRight size={50} /></button>

          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9, x: 100 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -100 }}
            className="w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl border border-white/10"
          >
            <img src={images[currentIndex]} className="w-full h-full object-cover" alt="Room View" />
          </motion.div>
          
          <div className="absolute bottom-10 flex gap-2">
            {images.map((_, i) => (
              <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'}`} />
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// --- Updated Room Card ---
const RoomCard = ({ title, price, location, metro, images, available = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        whileHover={available ? "hover" : {}}
        whileTap={available ? { scale: 0.98 } : {}}
        variants={popHover}
        onClick={() => available && setIsModalOpen(true)}
        className={`bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all ${available ? 'hover:shadow-2xl cursor-pointer' : 'opacity-60 grayscale-[0.5] cursor-not-allowed'}`}
      >
        <div className="relative h-64 overflow-hidden bg-slate-100 group">
          <img src={images[0]} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          {!available && (
            <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center">
              <span className="bg-white text-slate-900 px-6 py-2 rounded-full font-black uppercase text-xs tracking-widest shadow-xl">Sold Out</span>
            </div>
          )}
          {available && (
            <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest shadow-lg">Available</span>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-display font-bold text-slate-900 leading-tight mb-3 tracking-tight">{title}</h3>
          <div className="space-y-2 mb-6 text-blue-600 font-medium text-xs">
            <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5" /> {location} from Knowledge Park</div>
            <div className="flex items-center gap-2"><Users className="w-3.5 h-3.5" /> 3 Person Sharing</div>
            {metro && <div className="flex items-center gap-2"><Footprints className="w-3.5 h-3.5" /> {metro}</div>}
          </div>
          <div className="flex items-center justify-between border-t border-gray-50 pt-5">
            <p className="text-2xl font-display font-black text-blue-600">AED {price}<span className="text-slate-300 text-[10px] font-normal">/mo</span></p>
            {available && <div className="bg-slate-50 p-3 rounded-xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all"><ArrowRight className="w-4 h-4" /></div>}
          </div>
        </div>
      </motion.div>

      {available && <ImageModal images={images} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

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
      {/* Navbar stays the same as previous Makaan version */}
      <nav className="fixed w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"><Home className="text-white w-4 h-4" /></div>
            <span className="text-xl font-display font-black text-slate-900 tracking-tighter">Makaan</span>
          </div>
          <div className="hidden md:flex items-center gap-8 font-bold text-slate-400 text-[10px] uppercase tracking-[0.2em]">
            <a href="#living" className="hover:text-blue-600">Living</a>
            <a href="#facilities" className="hover:text-blue-600">Facilities</a>
            <button onClick={() => document.getElementById('contact').scrollIntoView({behavior:'smooth'})} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-[11px] font-black uppercase">Claim Spot</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-24 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <h1 className="text-6xl md:text-7xl font-display font-black leading-[1] tracking-tighter mb-6">Makaan. <br /><span className="text-slate-400 font-light italic">Study Smart.</span></h1>
          <p className="text-lg text-slate-500 font-light mb-8 max-w-md">Luxury student housing in Al Barsha, Dubai. Built for community and focus.</p>
          <button onClick={() => document.getElementById('living').scrollIntoView({behavior:'smooth'})} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-lg shadow-2xl hover:bg-slate-900 transition tracking-tight">View Availability</button>
        </Reveal>
        <div className="relative h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border-[12px] border-white">
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Luxury Living" />
        </div>
      </section>

      {/* Living Spaces Section */}
      <section id="living" className="py-24 max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center justify-between mb-16">
            <h2 className="text-5xl font-display font-black tracking-tighter uppercase italic">Living Spaces</h2>
            <div className="h-px flex-1 bg-slate-100 mx-10 hidden md:block"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            {/* The Active Room with Pop-up Slider */}
            <RoomCard 
              title="Modern Shared" 
              price="2,500" 
              location="15 mins" 
              metro="5 min walk from Insurance Market Metro Station"
              images={[
                "https://i.imgur.com/3XJ91e2.jpeg",
                "https://i.imgur.com/G6Z18fR.jpeg",
                "https://i.imgur.com/8T00o7v.jpeg"
              ]} 
            />
            {/* Sold Out Rooms */}
            <RoomCard 
              title="Premium Triple" 
              price="3,000" 
              location="10 mins" 
              available={false}
              images={["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&q=80&w=800"]} 
            />
            <RoomCard 
              title="Standard Room" 
              price="2,000" 
              location="20 mins" 
              available={false}
              images={["https://images.unsplash.com/photo-1594488651083-20630fc6810a?auto=format&fit=crop&q=80&w=800"]} 
            />
          </div>
        </Reveal>
      </section>

      {/* Bright Why Choose Section (Existing Code Kept) */}
      <section id="facilities" className="py-24 bg-gradient-to-b from-blue-600 to-blue-700 text-white overflow-hidden relative">
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-5xl font-display font-black mb-4 tracking-tighter uppercase italic text-white">Why Makaan?</h2>
              <p className="text-blue-100 max-w-xl mx-auto text-sm font-light leading-relaxed">High-performance living for high-performance students.</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: Users, t: "Live & Network", d: "Join a thriving community of global students." },
                { icon: Train, t: "Prime Location", d: "Steps away from the Dubai Metro gateway." },
                { icon: ShieldCheck, t: "24/7 Security", d: "On-site safety teams around the clock." },
                { icon: Zap, t: "All-Inclusive", d: "Bills, DEWA, and AC included in one price." },
                { icon: Wifi, t: "Fiber WiFi", d: "Ultra-fast internet for focus and gaming." },
                { icon: Sofa, t: "Designer Spaces", d: "Move-in ready with modern furniture." }
              ].map((item, i) => (
                <motion.div key={i} variants={popHover} whileHover="hover" whileTap="hover" className="bg-white p-8 rounded-[2.5rem] shadow-xl">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mb-6 text-blue-600"><item.icon size={24} /></div>
                  <h4 className="text-xl font-display font-bold mb-3 text-slate-900">{item.t}</h4>
                  <p className="text-slate-500 text-sm font-light leading-relaxed">{item.d}</p>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Contact Form stays as per your feedback version */}
      <section id="contact" className="py-24 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16">
        <Reveal>
          <h2 className="text-6xl font-display font-black leading-tight tracking-tighter uppercase mb-6">Let's <br /> Talk <span className="text-blue-600">.</span></h2>
          <div className="space-y-4 font-bold text-lg text-slate-600">
            <div className="flex items-center gap-3"><Phone className="text-blue-600" /> +971 50 XXX XXXX</div>
            <div className="flex items-center gap-3"><Mail className="text-blue-600" /> hello@makaan.ae</div>
          </div>
        </Reveal>
        <Reveal>
          <form onSubmit={handleSubmit} className="bg-white p-10 rounded-[3rem] shadow-2xl border border-slate-50">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <input name="firstName" placeholder="First Name" required className="p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm" />
              <input name="lastName" placeholder="Last Name" required className="p-4 rounded-2xl bg-slate-50 border-none outline-none focus:ring-2 ring-blue-100 text-sm" />
            </div>
            <div className="grid grid-cols-2 gap-4 mb-4">
               <select name="gender" required className="p-4 rounded-2xl bg-slate-50 text-slate-400 text-sm"><option value="">Gender</option><option>Male</option><option>Female</option></select>
               <select name="institute" required className="p-4 rounded-2xl bg-slate-50 text-slate-400 text-sm"><option value="">Institute</option><option>Middlesex</option><option>Heriot-Watt</option><option>Other</option></select>
            </div>
            <input name="email" type="email" placeholder="Email Address" required className="w-full mb-4 p-4 rounded-2xl bg-slate-50 border-none text-sm" />
            <textarea name="message" placeholder="Requirements..." rows="3" className="w-full mb-6 p-4 rounded-2xl bg-slate-50 border-none text-sm"></textarea>
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-blue-600 transition shadow-xl uppercase">Apply Now</button>
            {status && <p className="mt-4 text-center text-blue-600 font-black text-xs uppercase animate-pulse">{status}</p>}
          </form>
        </Reveal>
      </section>

      <footer className="py-10 text-center text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Makaan © 2026 | Student Living Dubai</footer>
    </div>
  );
}