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

// --- Image Slider Modal (Fixed for Tall Portrait Images) ---
const ImageModal = ({ images, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const next = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
        >
          <button onClick={onClose} className="absolute top-6 right-6 text-white/50 hover:text-white z-[110] transition-colors"><X size={40} /></button>
          <button onClick={prev} className="absolute left-4 md:left-10 text-white/50 hover:text-white z-[110] transition-colors"><ChevronLeft size={50} /></button>
          <button onClick={next} className="absolute right-4 md:right-10 text-white/50 hover:text-white z-[110] transition-colors"><ChevronRight size={50} /></button>

          <motion.div 
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="h-[85vh] w-full max-w-4xl flex items-center justify-center"
          >
            {/* object-contain ensures the TALL photo is fully visible without cropping */}
            <img src={images[currentIndex]} className="max-h-full max-w-full object-contain rounded-2xl shadow-2xl border border-white/5" alt="Room View" />
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

// --- Room Card (Fixed Aspect Ratio for Portrait Photos) ---
const RoomCard = ({ title, price, location, metro, images, available = true }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <motion.div 
        whileHover={available ? "hover" : {}}
        whileTap={available ? { scale: 0.98 } : {}}
        variants={popHover}
        onClick={() => available && setIsModalOpen(true)}
        className={`bg-white rounded-[2.5rem] overflow-hidden border border-gray-100 shadow-sm transition-all ${available ? 'hover:shadow-2xl cursor-pointer' : 'opacity-60 grayscale-[0.8] cursor-not-allowed'}`}
      >
        {/* Changed to aspect-[4/5] to fit your tall room photos better */}
        <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 group">
          <img src={images[0]} alt={title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" />
          {!available && (
            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center">
              <span className="bg-white/90 backdrop-blur-md text-slate-900 px-6 py-2 rounded-full font-black uppercase text-[10px] tracking-widest shadow-xl">Sold Out</span>
            </div>
          )}
          {available && (
            <span className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg">Available</span>
          )}
        </div>
        <div className="p-8">
          <h3 className="text-2xl font-display font-bold text-slate-900 mb-4 tracking-tight">{title}</h3>
          <div className="space-y-3 mb-8 text-blue-600 font-bold text-xs uppercase tracking-wider">
            <div className="flex items-center gap-3"><MapPin className="w-4 h-4" /> {location} from Knowledge Park</div>
            <div className="flex items-center gap-3"><Users className="w-4 h-4" /> 3 Person Sharing</div>
            {metro && <div className="flex items-center gap-3"><Footprints className="w-4 h-4" /> {metro}</div>}
          </div>
          <div className="flex items-center justify-between border-t border-gray-50 pt-6">
            <p className="text-3xl font-display font-black text-blue-600">AED {price}<span className="text-slate-300 text-xs font-normal">/mo</span></p>
            {available && <div className="bg-slate-50 p-4 rounded-2xl text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm"><ArrowRight size={20} /></div>}
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
    e.preventDefault(); setStatus('Submitting...');
    const formData = new FormData(e.target);
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwmD7wd4AYTW-PnLMaemjqKV90-idcmejNxxUowgbo8qb7HxqhbOSh3sfkSsG0-rpIBcA/exec';
    try {
      await fetch(scriptURL, { method: 'POST', body: formData, mode: 'no-cors' });
      setStatus('Success! Inquiry Sent.');
      e.target.reset();
    } catch (e) { setStatus('Error. Try again.'); }
  };

  return (
    <div className="font-sans selection:bg-blue-600 selection:text-white antialiased text-slate-900 bg-white">
      <nav className="fixed w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100/50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg"><Home className="text-white w-4 h-4" /></div>
            <span className="text-xl font-display font-black text-slate-900 tracking-tighter uppercase italic">Makaan</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-24 max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        <Reveal>
          <h1 className="text-7xl md:text-8xl font-display font-black leading-[0.9] tracking-tighter mb-8 uppercase">Live Bold. <br /><span className="text-slate-400 font-light italic">Study Smart.</span></h1>
          <p className="text-xl text-slate-500 font-light mb-10 max-w-md leading-relaxed">Luxury student living in the heart of Al Barsha, Dubai.</p>
          <button onClick={() => document.getElementById('living').scrollIntoView({behavior:'smooth'})} className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xl shadow-2xl hover:bg-slate-900 transition-all active:scale-95 uppercase tracking-tight">Explore Living</button>
        </Reveal>
        <div className="relative h-[600px] rounded-[4rem] overflow-hidden shadow-2xl border-[15px] border-white">
          <img src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Makaan Luxury" />
        </div>
      </section>

      {/* Living Section */}
      <section id="living" className="py-32 max-w-6xl mx-auto px-6">
        <Reveal>
          <div className="flex items-center justify-between mb-20">
            <h2 className="text-6xl font-display font-black tracking-tighter uppercase italic text-slate-950">Living Spaces</h2>
            <div className="h-px flex-1 bg-slate-100 mx-10 hidden md:block"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <RoomCard 
              title="Modern Shared" price="2,500" location="15 mins" 
              metro="5 min walk from Insurance Market Metro Station"
              images={["/room1.jpeg", "/room2.jpeg", "/room3.jpeg"]} 
            />
            <RoomCard title="Premium Triple" price="3,000" location="10 mins" available={false} images={["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=1000"]} />
            <RoomCard title="Standard Room" price="2,000" location="20 mins" available={false} images={["https://images.unsplash.com/photo-1594488651083-20630fc6810a?auto=format&fit=crop&q=80&w=800"]} />
          </div>
        </Reveal>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-32 bg-slate-50">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-2 gap-20">
          <Reveal>
            <h2 className="text-7xl font-display font-black tracking-tighter mb-8 uppercase italic">Book <br /> Your Spot <span className="text-blue-600">.</span></h2>
            <div className="space-y-6">
               <div className="flex items-center gap-4 font-bold text-2xl text-slate-800"><Phone className="text-blue-600" /> +971 50 XXX XXXX</div>
               <div className="flex items-center gap-4 font-bold text-2xl text-slate-800"><Mail className="text-blue-600" /> hello@makaan.ae</div>
            </div>
          </Reveal>
          <form onSubmit={handleSubmit} className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-gray-100">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <input name="firstName" placeholder="First Name" required className="p-5 rounded-2xl bg-slate-50 text-sm font-bold border-none outline-none focus:ring-2 ring-blue-100" />
              <input name="lastName" placeholder="Last Name" required className="p-5 rounded-2xl bg-slate-50 text-sm font-bold border-none outline-none focus:ring-2 ring-blue-100" />
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
               <select name="gender" required className="p-5 rounded-2xl bg-slate-50 text-slate-400 text-sm font-bold outline-none focus:ring-2 ring-blue-100"><option value="">Gender</option><option>Male</option><option>Female</option></select>
               <select name="institute" required className="p-5 rounded-2xl bg-slate-50 text-slate-400 text-sm font-bold outline-none focus:ring-2 ring-blue-100"><option value="">Institute</option><option>Middlesex</option><option>Heriot-Watt</option><option>UOWD</option><option>Other</option></select>
            </div>
            <input name="email" type="email" placeholder="Email Address" required className="w-full mb-8 p-5 rounded-2xl bg-slate-50 text-sm font-bold border-none outline-none focus:ring-2 ring-blue-100" />
            <button className="w-full bg-slate-900 text-white py-6 rounded-2xl font-black text-xl hover:bg-blue-600 transition shadow-xl uppercase tracking-[0.2em] active:scale-95">Apply Now</button>
            {status && <p className="mt-6 text-center text-blue-600 font-black text-xs uppercase animate-pulse">{status}</p>}
          </form>
        </div>
      </section>

      <footer className="py-12 text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-300">Makaan © 2026 | Luxury Student Housing Al Barsha</footer>
    </div>
  );
}