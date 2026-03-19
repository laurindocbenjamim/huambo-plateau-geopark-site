import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Search, ShoppingBag, User, Menu, X, ChevronDown, Play, Facebook, Instagram, Twitter, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react';
import assets from './data/assets.json';

// --- Components ---

const Navbar = ({ onSearchOpen }: { onSearchOpen: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'VISIT', href: '#' },
    { name: 'EXPERIENCE', href: '#' },
    { name: 'PLANNING', href: '#' },
    { name: 'LEARNING', href: '#' },
    { name: 'AGENDA', href: '#' },
    { name: 'TERRITORY', href: '#' },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full z-50 transition-all duration-500 ${
          isScrolled ? 'bg-white py-4 shadow-md' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img 
              src={assets.hero.logo} 
              alt="Logo" 
              className="h-10 w-10 rounded-full bg-white p-1"
            />
            <div className={`font-heading font-bold text-lg leading-tight transition-colors duration-300 ${isScrolled ? 'text-huambo-dark' : 'text-white'}`}>
              HUAMBO PLATEAU<br /><span className="text-sm font-normal tracking-widest">GEOPARK</span>
            </div>
          </div>

          {/* Desktop Links */}
          <div className={`hidden lg:flex space-x-8 text-sm font-semibold tracking-wide transition-colors duration-300 ${isScrolled ? 'text-huambo-dark' : 'text-white'}`}>
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="hover:text-huambo-red transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          {/* Icons */}
          <div className={`flex items-center space-x-6 transition-colors duration-300 ${isScrolled ? 'text-huambo-dark' : 'text-white'}`}>
            <button onClick={onSearchOpen} className="hover:text-huambo-red transition-colors">
              <Search size={20} />
            </button>
            <button className="hover:text-huambo-red transition-colors hidden md:block">
              <ShoppingBag size={20} />
            </button>
            <button className="hover:text-huambo-red transition-colors hidden md:block">
              <User size={20} />
            </button>
            <button className="font-bold hover:text-huambo-red transition-colors">EN</button>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(true)} 
              className="lg:hidden hover:text-huambo-red transition-colors"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[60] bg-white flex flex-col pt-24 px-6 lg:hidden"
          >
            <button 
              onClick={() => setIsMobileMenuOpen(false)} 
              className="absolute top-6 right-6 text-gray-800"
            >
              <X size={32} />
            </button>
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="text-2xl font-bold text-gray-800 py-4 border-b border-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="mt-8 flex space-x-4">
              <a href={assets.social.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-huambo-red">
                <Facebook size={24} />
              </a>
              <a href={assets.social.youtube} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-huambo-red">
                <Youtube size={24} />
              </a>
              <button className="text-gray-600 font-bold">EN</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % assets.hero.backgroundImages.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="h-screen flex flex-col justify-center items-center text-center text-white relative overflow-hidden">
      {/* Background Slideshow with Ken Burns Effect */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentImageIndex}
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
          transition={{ 
            opacity: { duration: 2, ease: "easeInOut" },
            scale: { duration: 7, ease: "linear" },
            filter: { duration: 1.5 }
          }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${assets.hero.backgroundImages[currentImageIndex]}')`,
            zIndex: 0
          }}
        />
      </AnimatePresence>

      {/* Subtle Texture Overlay */}
      <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ y }}
        className="z-10 px-4"
      >
        <h1 className="text-6xl md:text-8xl font-thin tracking-tighter mb-2">HUAMBO</h1>
        <h1 className="text-7xl md:text-9xl font-bold tracking-tighter mb-6">GEOPARK</h1>
        <p className="text-xl md:text-2xl font-light mb-12 tracking-wide">Your place in history</p>

        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mb-8"
        >
          <span className="text-sm font-semibold uppercase tracking-widest">Welcome!</span>
        </motion.div>

        <button 
          onClick={() => document.getElementById('explore-section')?.scrollIntoView({ behavior: 'smooth' })}
          className="w-16 h-16 rounded-full border-2 border-white/30 border-dashed flex items-center justify-center mx-auto cursor-pointer hover:bg-white hover:text-huambo-red transition-all duration-300 group"
        >
          <ChevronDown className="group-hover:translate-y-1 transition-transform" />
        </button>
      </motion.div>

      {/* UNESCO Logo */}
      <div className="absolute bottom-10 left-10 hidden md:block z-10">
        <div className="border border-white/50 p-2 inline-block">
          <div className="text-xs font-bold uppercase">UNESCO</div>
          <div className="text-[10px]">Global Geopark</div>
        </div>
      </div>

      {/* Slideshow Indicators */}
      <div className="absolute bottom-10 right-10 flex space-x-3 z-10">
        {assets.hero.backgroundImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImageIndex(idx)}
            className="group relative h-1 w-12 bg-white/20 rounded-full overflow-hidden transition-all duration-300 hover:bg-white/30"
          >
            {currentImageIndex === idx && (
              <motion.div 
                layoutId="activeIndicator"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 5, ease: "linear" }}
                className="absolute inset-0 bg-white"
              />
            )}
          </button>
        ))}
      </div>
    </header>
  );
};

const Explore = ({ onVideoOpen }: { onVideoOpen: () => void }) => {
  return (
    <section id="explore-section" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-500 mb-2">Explore the</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-huambo-red mb-8">Huambo Geopark</h2>

            <div className="space-y-6 text-gray-600 leading-relaxed">
              <p>
                In this UNESCO Global Geopark candidate, there are hiking trails to explore, discover, and capture in the best photo albums of your memory. Fabulous routes to let the adventure flow on mountain bikes across the Central Plateau.
              </p>
              <p>
                Traditional villages that preserve and carry forward the memory of those who lived and live here into the future. Handicrafts, folklore, and traditions that continue to tell our story.
              </p>
              <p>
                And all of this, everything that is part of us and defines us, is kept here, preserved, waiting to be told and left as a legacy for generations to come.
              </p>
            </div>

            <button className="mt-10 bg-huambo-red text-white px-8 py-3 rounded-full shadow-lg hover:bg-red-800 transition-all transform hover:-translate-y-1">
              Experience
            </button>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 w-full"
          >
            <div 
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video group cursor-pointer"
              onClick={onVideoOpen}
            >
              <img 
                src={assets.explore.videoThumbnail} 
                alt="Huambo Landscape" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/30 transition-colors duration-300">
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/50 group-hover:scale-110 transition duration-300">
                  <Play className="text-white ml-1 fill-white" size={32} />
                </div>
              </div>
              <div className="absolute bottom-6 right-6 text-white font-heading font-bold text-xl italic drop-shadow-lg">
                Desafia-te!
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const Happening = () => {
  const events = [
    {
      date: '29-03-2025 a 06-12-2025',
      title: 'Annual Interpretive Visits Program 2025 – Discover Huambo All Year Round',
      image: assets.happening[0].image
    },
    {
      date: '16-06-2025 a 18-07-2025',
      title: 'Volunteering at Huambo Geopark',
      image: assets.happening[1].image
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-light text-gray-500 mb-2">Happening at the</h2>
          <h2 className="text-4xl md:text-5xl font-bold text-huambo-dark mb-16">Geopark</h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.2 }}
              className="group cursor-pointer"
            >
              <div className="rounded-3xl overflow-hidden mb-4 shadow-lg aspect-[4/3]">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
              </div>
              <div className="text-huambo-red font-bold text-sm mb-2">{event.date}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-huambo-red transition-colors">
                {event.title}
              </h3>
              <button className="bg-white text-gray-800 px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all text-sm font-semibold">
                See more
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Story = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-light text-gray-500">Create your own</h2>
        <h2 className="text-4xl md:text-5xl font-bold text-huambo-dark">Story</h2>
      </div>

      <div className="flex justify-center items-center relative h-[600px] max-w-4xl mx-auto px-4">
        {/* Left Card */}
        <motion.div 
          initial={{ x: -100, rotate: -15, opacity: 0 }}
          whileInView={{ x: -150, rotate: -5, opacity: 1 }}
          viewport={{ once: true }}
          className="absolute w-[280px] md:w-[300px] h-[450px] rounded-[20px] overflow-hidden shadow-2xl z-10"
        >
          <img src={assets.story.left} alt="Cathedral" className="w-full h-full object-cover" />
        </motion.div>

        {/* Center Card */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1.1, opacity: 1 }}
          viewport={{ once: true }}
          className="absolute w-[320px] md:w-[340px] h-[500px] rounded-[20px] overflow-hidden shadow-2xl z-20 group"
        >
          <img src={assets.story.center} alt="Viewpoint" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">The most<br />Instagrammable<br />places</h3>
            <button className="border border-white px-8 py-2 rounded-full text-sm hover:bg-white hover:text-black transition-all duration-300">
              See more
            </button>
          </div>
        </motion.div>

        {/* Right Card */}
        <motion.div 
          initial={{ x: 100, rotate: 15, opacity: 0 }}
          whileInView={{ x: 150, rotate: 5, opacity: 1 }}
          viewport={{ once: true }}
          className="absolute w-[280px] md:w-[300px] h-[450px] rounded-[20px] overflow-hidden shadow-2xl z-10"
        >
          <img src={assets.story.right} alt="Rocks" className="w-full h-full object-cover" />
        </motion.div>
      </div>
    </section>
  );
};

const PlanTrip = () => {
  const plans = [
    { title: 'To Visit', image: assets.plan[0].image },
    { title: 'To Experience', image: assets.plan[1].image },
    { title: 'Where to Eat', image: assets.plan[2].image },
    { title: 'Where to Sleep', image: assets.plan[3].image }
  ];

  return (
    <section className="py-24 bg-gray-50 relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#8B3A3A 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light text-gray-500">Plan</h2>
            <h2 className="text-4xl md:text-5xl font-bold text-huambo-dark">your Trip</h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:w-1/3 mt-6 md:mt-0"
          >
            <p className="text-gray-600">Discover the charms and hidden gems of this destination of unmissable beauty, adventure, history, and tradition.</p>
            <p className="text-gray-600 mt-2 font-semibold">Your trip starts here and now!</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative h-[400px] rounded-[20px] overflow-hidden group cursor-pointer shadow-lg"
            >
              <img src={plan.image} alt={plan.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-8 text-white">
                <h3 className="text-2xl font-bold mb-4">{plan.title}</h3>
                <button className="bg-white text-gray-900 px-6 py-2 rounded-full text-sm font-semibold self-start group-hover:bg-huambo-red group-hover:text-white transition-colors duration-300">
                  See more
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-white pt-16 pb-8 border-t border-gray-200">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-12">
          {/* Left Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <img src={assets.hero.logo} alt="Logo" className="h-16 w-16 object-contain" />
              <div className="leading-tight">
                <h3 className="text-xl font-bold text-huambo-dark uppercase">Huambo Plateau</h3>
                <span className="text-sm font-semibold text-huambo-green tracking-widest">GEOPARK</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed text-justify">
              The Huambo Plateau Geopark, a territory of conservation, education, tourism, innovation and sustainable development, classified as a UNESCO Global Geopark candidate. We preserve the geological and cultural heritage of Angola's Central Highlands.
            </p>
          </div>

          {/* Center Columns */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h4 className="font-bold text-huambo-dark mb-4 text-sm uppercase tracking-wide">About Us</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-huambo-red transition-colors">Who We Are</a></li>
                <li><a href="#" className="hover:text-huambo-red transition-colors">Team</a></li>
                <li><a href="#" className="hover:text-huambo-red transition-colors">Scientific Council</a></li>
                <li><a href="#" className="hover:text-huambo-red transition-colors">UNESCO</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-huambo-dark mb-4 text-sm uppercase tracking-wide">Visit</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-huambo-red transition-colors">Where to Sleep</a></li>
                <li><a href="#" className="hover:text-huambo-red transition-colors">Where to Eat</a></li>
                <li><a href="#" className="hover:text-huambo-red transition-colors">Geopark Routes</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-huambo-dark mb-4 text-sm uppercase tracking-wide">Education</h4>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-huambo-red transition-colors">School to Geopark</a></li>
                <li><a href="#" className="hover:text-huambo-red transition-colors">Projects</a></li>
              </ul>
            </div>
          </div>

          {/* Right Column */}
          <div className="md:col-span-3">
            <h4 className="font-bold text-huambo-dark mb-6 text-sm uppercase tracking-wide">Social Networks</h4>
            <div className="flex flex-wrap gap-3">
              {[
                { Icon: Facebook, href: assets.social.facebook },
                { Icon: Instagram, href: assets.social.instagram },
                { Icon: Twitter, href: assets.social.twitter },
                { Icon: Linkedin, href: assets.social.linkedin },
                { Icon: Youtube, href: assets.social.youtube }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center bg-gray-100 rounded hover:bg-huambo-red hover:text-white transition-all duration-300"
                >
                  <social.Icon size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-8 text-xs font-semibold text-gray-500 uppercase tracking-wider border-t border-gray-100 pt-8">
          <a href="#" className="hover:text-huambo-red">Privacy Policy</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-huambo-red">Cookie Policy</a>
          <span className="text-gray-300">|</span>
          <a href="#" className="hover:text-huambo-red">Complaints Book</a>
        </div>

        <div className="text-center text-sm text-gray-500">
          <p>&copy; 2024 Huambo Plateau Geopark. Developed by <span className="font-bold text-gray-700">HuamboTech</span></p>
        </div>
      </div>
    </footer>
  );
};

const SearchPopup = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-2xl w-full max-w-lg p-8 relative"
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
            <h3 className="text-2xl font-bold text-huambo-dark mb-6">Search Geopark</h3>
            <form className="flex items-center border-b-2 border-huambo-red pb-2">
              <input 
                type="text" 
                placeholder="What are you looking for?" 
                className="w-full outline-none text-gray-700 placeholder-gray-400 text-lg"
                autoFocus
              />
              <button type="submit" className="text-huambo-red font-bold uppercase text-sm ml-4">Search</button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const VideoModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
        >
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-full max-w-6xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10"
          >
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 text-white hover:text-huambo-red z-10 bg-black/50 rounded-full p-2 transition-colors"
            >
              <X size={24} />
            </button>
            <iframe 
              className="w-full h-full" 
              src={assets.explore.videoUrl} 
              title="YouTube video player" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const ScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const toggleVisible = () => {
      setVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button 
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 bg-huambo-green text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-colors z-50"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Navbar onSearchOpen={() => setIsSearchOpen(true)} />
      <Hero />
      <Explore onVideoOpen={() => setIsVideoOpen(true)} />
      <Happening />
      <Story />
      <PlanTrip />
      <Footer />

      <SearchPopup isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />
      <ScrollToTop />
    </div>
  );
}
