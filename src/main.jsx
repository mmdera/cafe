import React, {useEffect, useState} from "react";
import {createRoot} from "react-dom/client";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import {ArrowDownRight, ArrowRight, CalendarDays, ChevronDown, Clock3, Instagram, MapPin, Menu, MessageCircle, Phone, Sparkles, X} from "lucide-react";
import "./styles.css";

const WA = "https://wa.me/918765989913";
const wa = (message) => `${WA}?text=${encodeURIComponent(message)}`;

const menu = [
  ["Signature Plates","Truffle Cream Pasta","Silky pasta, wild mushrooms, parmesan & aromatic truffle cream","₹399"],
  ["Signature Plates","NOIRÉ Butter Chicken","Slow-cooked tomato gravy, cultured butter & house spices","₹449"],
  ["Small Bites","Burrata Toast","Creamy burrata, roasted tomato, basil oil & sourdough","₹329"],
  ["Small Bites","Crispy Parmesan Fries","Hand-cut potatoes, parmesan snow & herb aioli","₹249"],
  ["Coffee","NOIRÉ Velvet Latte","Double espresso, silky milk & a hint of vanilla","₹189"],
  ["Coffee","Spanish Cold Brew","Slow-steeped coffee, milk & soft caramel finish","₹219"],
  ["Desserts","Dark Chocolate Tart","70% chocolate ganache, sea salt & vanilla cream","₹279"],
  ["Desserts","Burnt Basque Cheesecake","Caramelised top, soft centre & berry compote","₹299"]
];

const gallery = [
  ["https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1400&q=85","The room"],
  ["https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1100&q=85","Morning coffee"],
  ["https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=1100&q=85","Signature plate"],
  ["https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=1100&q=85","Dessert"],
  ["https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1100&q=85","Dinner"],
  ["https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1100&q=85","The table"]
];

const reveal = {hidden:{opacity:0,y:38},show:{opacity:1,y:0,transition:{duration:.8,ease:[.22,1,.36,1]}}};
const stagger = {hidden:{},show:{transition:{staggerChildren:.08}}};

function Reveal({children,className=""}) {
  return <motion.div className={className} variants={reveal} initial="hidden" whileInView="show" viewport={{once:true,amount:.18}}>{children}</motion.div>
}

function App(){
  const [open,setOpen]=useState(false);
  const [chat,setChat]=useState(false);
  const [category,setCategory]=useState("Signature Plates");
  const [scrolled,setScrolled]=useState(false);
  const {scrollYProgress}=useScroll();
  const heroY=useTransform(scrollYProgress,[0,.3],[0,120]);

  useEffect(()=>{
    const fn=()=>setScrolled(window.scrollY>40);
    window.addEventListener("scroll",fn); fn(); return()=>window.removeEventListener("scroll",fn);
  },[]);

  const reservation=wa("Hello NOIRÉ! I'd like to make a reservation.\n\nName:\nDate:\nTime:\nGuests:\n\nPlease confirm availability.");

  return <div className="site">
    <header className={`nav ${scrolled?"nav-scrolled":""}`}>
      <a className="logo" href="#home" onClick={()=>setOpen(false)}>NOIRÉ<span>•</span></a>
      <nav className="desktop-nav">
        {["home","story","menu","gallery","contact"].map((x)=><a key={x} href={`#${x}`}>{x==="home"?"Home":x==="story"?"Our Story":x[0].toUpperCase()+x.slice(1)}</a>)}
      </nav>
      <div className="nav-actions">
        <a className="nav-reserve" href={reservation} target="_blank" rel="noreferrer">Reserve a Table <ArrowRight size={15}/></a>
        <button className="hamburger" onClick={()=>setOpen(true)} aria-label="Open menu"><Menu/></button>
      </div>
    </header>

    <AnimatePresence>
      {open && <motion.div className="mobile-menu" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
        <button className="close" onClick={()=>setOpen(false)}><X/></button>
        <div className="mobile-brand">NOIRÉ<span>•</span></div>
        <div className="mobile-links">
          {["Home","Our Story","Menu","Gallery","Contact"].map(x=><a key={x} href={`#${x==="Home"?"home":x==="Our Story"?"story":x.toLowerCase()}`} onClick={()=>setOpen(false)}>{x}</a>)}
        </div>
        <a className="button button-light" href={reservation} target="_blank" rel="noreferrer">Reserve via WhatsApp <ArrowRight size={17}/></a>
      </motion.div>}
    </AnimatePresence>

    <main>
      <section id="home" className="hero">
        <motion.img style={{y:heroY}} className="hero-image" src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=2200&q=90" alt="Warm restaurant dining room"/>
        <div className="hero-overlay"/>
        <div className="hero-content">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p variants={reveal} className="eyebrow">CAFÉ • KITCHEN • EXPERIENCE</motion.p>
            <motion.h1 variants={reveal}>Where Every<br/><em>Moment</em><br/>Tastes Better.</motion.h1>
            <motion.p variants={reveal} className="hero-copy">An intimate dining experience crafted around exceptional food, thoughtful hospitality and unforgettable moments.</motion.p>
            <motion.div variants={reveal} className="hero-buttons">
              <a className="button button-gold" href={reservation} target="_blank" rel="noreferrer">Reserve a Table <ArrowRight size={17}/></a>
              <a className="text-button" href="#menu">Explore Menu <ArrowDownRight size={17}/></a>
            </motion.div>
          </motion.div>
        </div>
        <div className="hero-meta"><span><MapPin size={14}/> Hardoi, Uttar Pradesh</span><span className="scroll-label">SCROLL TO EXPLORE <ArrowDownRight size={15}/></span></div>
      </section>

      <section className="intro section">
        <Reveal className="section-kicker">THE NOIRÉ EXPERIENCE</Reveal>
        <div className="intro-grid">
          <Reveal><h2>Good food brings people together. <em>Great food gives them something to remember.</em></h2></Reveal>
          <Reveal><div className="intro-side"><p>NOIRÉ is a modern café and kitchen shaped around warm hospitality, honest ingredients and the quiet theatre of a beautiful meal.</p><a className="line-link" href="#story">Discover our story <ArrowRight size={16}/></a></div></Reveal>
        </div>
      </section>

      <section id="menu" className="menu-section section dark">
        <div className="section-head">
          <Reveal><p className="section-kicker">FROM OUR KITCHEN</p><h2>A menu with <em>character.</em></h2></Reveal>
          <Reveal><a className="line-link light-link" href={wa("Hello NOIRÉ! Please share the full menu.")} target="_blank" rel="noreferrer">View Full Menu <ArrowRight size={16}/></a></Reveal>
        </div>
        <div className="category-tabs">
          {["Signature Plates","Small Bites","Coffee","Desserts"].map(c=><button key={c} className={category===c?"active":""} onClick={()=>setCategory(c)}>{c}</button>)}
        </div>
        <motion.div className="menu-list" layout>
          {menu.filter(x=>x[0]===category).map((item,i)=><motion.div className="menu-item" key={item[1]} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.07}}>
            <div><span className="menu-number">0{i+1}</span><div><h3>{item[1]}</h3><p>{item[2]}</p></div></div><strong>{item[3]}</strong>
          </motion.div>)}
        </motion.div>
      </section>

      <section className="signature section">
        <div className="signature-image-wrap"><motion.img whileInView={{scale:[1.08,1]}} transition={{duration:1.2}} viewport={{once:true}} src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1600&q=90" alt="Truffle pasta"/></div>
        <Reveal className="signature-copy"><p className="section-kicker">THE SIGNATURE</p><h2>A dish designed to become your <em>favourite.</em></h2><p>Silky pasta, wild mushrooms, parmesan and aromatic truffle cream — finished with the kind of restraint that lets every ingredient speak.</p><h3>NOIRÉ Truffle Pasta <span>₹399</span></h3><a className="button button-dark" href={wa("Hello NOIRÉ! I'd like to know more about the NOIRÉ Truffle Pasta.")} target="_blank" rel="noreferrer">Ask on WhatsApp <ArrowRight size={17}/></a></Reveal>
      </section>

      <section id="story" className="story section">
        <div className="story-copy"><Reveal><p className="section-kicker">OUR STORY</p><h2>Made with <em>intention.</em></h2><p>We believe a restaurant should feel like somewhere you want to stay. Every plate starts with fresh ingredients and thoughtful preparation; every evening is finished with warm, attentive hospitality.</p></Reveal>
          <div className="story-points"><span>Fresh ingredients</span><span>Crafted daily</span><span>Warm hospitality</span><span>Contemporary presentation</span></div>
        </div>
        <div className="story-image"><img src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=1400&q=90" alt="NOIRÉ interior"/></div>
      </section>

      <section className="features section">
        <Reveal><p className="section-kicker">WHY NOIRÉ</p></Reveal>
        <motion.div className="feature-grid" variants={stagger} initial="hidden" whileInView="show" viewport={{once:true,amount:.2}}>
          {[["01","Fresh Ingredients","Thoughtfully selected ingredients."],["02","Crafted Daily","Prepared with care every day."],["03","Warm Hospitality","Service designed around the guest."],["04","Memorable Atmosphere","A space made for conversations and celebrations."]].map(x=><motion.div variants={reveal} className="feature" key={x[0]}><span>{x[0]}</span><h3>{x[1]}</h3><p>{x[2]}</p></motion.div>)}
        </motion.div>
      </section>

      <section id="gallery" className="gallery section">
        <div className="section-head"><Reveal><p className="section-kicker">A LITTLE LOOK AROUND</p><h2>Moments at <em>NOIRÉ.</em></h2></Reveal></div>
        <div className="gallery-grid">
          {gallery.map((g,i)=><motion.figure key={g[1]} className={`gallery-card g${i}`} whileHover={{y:-7}}><img src={g[0]} alt={g[1]}/><figcaption>{g[1]}</figcaption></motion.figure>)}
        </div>
      </section>

      <section className="quote-section dark"><div className="quote-mark">“</div><Reveal><blockquote>Beautiful ambience, delicious food and an experience that makes you want to come back.</blockquote><div className="stars">★★★★★</div><p>— Guest Experience</p></Reveal></section>

      <section id="contact" className="reservation section">
        <div><Reveal><p className="section-kicker">COME AS YOU ARE</p><h2>Your table is <em>waiting.</em></h2><p>Planning a dinner, celebration or simply a beautiful evening? We'd love to host you.</p></Reveal></div>
        <Reveal className="reservation-actions"><a className="button button-dark" href={reservation} target="_blank" rel="noreferrer">Reserve via WhatsApp <MessageCircle size={17}/></a><a className="phone-link" href="tel:+918765989913"><Phone size={17}/> +91 8765989913</a></Reveal>
      </section>
    </main>

    <footer className="footer dark">
      <div className="footer-top"><div><div className="footer-logo">NOIRÉ<span>•</span></div><p>Café & Kitchen</p></div><div className="footer-address"><p><MapPin size={15}/> Hardoi, Uttar Pradesh, India</p><p><Clock3 size={15}/> Mon–Sun · 11:00 AM — 11:00 PM</p></div><div className="footer-social"><a href={WA} target="_blank" rel="noreferrer"><MessageCircle/></a><a href="#" aria-label="Instagram"><Instagram/></a></div></div>
      <div className="footer-bottom"><span>© 2026 NOIRÉ — Café & Kitchen</span><span>Made for memorable evenings.</span></div>
    </footer>

    <AnimatePresence>
      {chat && <motion.div className="chat-panel" initial={{opacity:0,y:20,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20,scale:.96}}>
        <div className="chat-head"><div><strong>Chat with NOIRÉ</strong><small>Usually replies on WhatsApp</small></div><button onClick={()=>setChat(false)}><X size={18}/></button></div>
        <p className="chat-intro">Hi. How can we help you today?</p>
        <div className="quick-actions">
          <a href="#menu" onClick={()=>setChat(false)}>🍽️ View Menu</a>
          <a href={reservation} target="_blank" rel="noreferrer">📅 Reserve a Table</a>
          <a href="https://www.google.com/maps/search/?api=1&query=Hardoi%2C%20Uttar%20Pradesh" target="_blank" rel="noreferrer">📍 Get Directions</a>
          <a href="tel:+918765989913">📞 Call Us</a>
          <a className="wa-action" href={WA} target="_blank" rel="noreferrer">💬 Continue on WhatsApp</a>
        </div>
      </motion.div>}
    </AnimatePresence>
    <button className="chat-fab" onClick={()=>setChat(!chat)} aria-label="Chat with NOIRÉ"><MessageCircle size={21}/><span>Chat with NOIRÉ</span></button>
  </div>
}

createRoot(document.getElementById("root")).render(<App/>);