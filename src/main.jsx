import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, Clock3, Coffee,
  Instagram, MapPin, Menu as MenuIcon, Minus, Plus, Search, ShoppingBag,
  Sparkles, Star, Utensils, X, MessageCircle
} from 'lucide-react';
import './styles.css';

const WHATSAPP = '918765989913';
const WA_URL = `https://wa.me/${WHATSAPP}`;

const menuItems = [
  { id:'sig1', category:'SIGNATURES', name:'Noiré Butter Chicken', description:'Charred chicken, tomato makhani, smoked butter & kasuri methi.', price:449, veg:false, image:'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=1200&q=85', ingredients:'Chicken, tomato, butter, cream, kasuri methi, house spices' },
  { id:'sig2', category:'SIGNATURES', name:'Truffle Cream Pasta', description:'Silky ribbons, wild mushrooms, parmesan & aromatic truffle cream.', price:399, veg:true, image:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85', ingredients:'Pasta, mushroom, parmesan, cream, truffle oil, herbs' },
  { id:'st1', category:'STARTERS', name:'Smoked Paneer Skewers', description:'Tandoor-charred paneer, peppers, mint yoghurt & smoked chilli.', price:329, veg:true, image:'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1200&q=85', ingredients:'Paneer, bell peppers, yoghurt, mint, chilli, spices' },
  { id:'st2', category:'STARTERS', name:'Crisp Chicken 65', description:'Southern spice, curry leaf, lime & a cool yoghurt dip.', price:349, veg:false, image:'https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=1200&q=85', ingredients:'Chicken, curry leaf, chilli, ginger, garlic, yoghurt' },
  { id:'m1', category:'MAINS', name:'Dal Noiré', description:'Slow-cooked black lentils finished with cultured butter and cream.', price:299, veg:true, image:'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=1200&q=85', ingredients:'Black lentils, butter, cream, tomato, spices' },
  { id:'m2', category:'MAINS', name:'Makhani Chicken Bowl', description:'Tender chicken, fragrant rice, makhani glaze & pickled onions.', price:429, veg:false, image:'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=85', ingredients:'Chicken, basmati rice, tomato, butter, cream, pickles' },
  { id:'p1', category:'PASTA & PIZZA', name:'Burrata Margherita', description:'Slow-roasted tomato, basil, mozzarella, burrata & olive oil.', price:459, veg:true, image:'https://images.unsplash.com/photo-1579751626657-72bc17010498?auto=format&fit=crop&w=1200&q=85', ingredients:'Flour, tomato, mozzarella, burrata, basil, olive oil' },
  { id:'p2', category:'PASTA & PIZZA', name:'Pesto Penne', description:'Basil pesto, toasted pine nuts, parmesan & blistered tomatoes.', price:359, veg:true, image:'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=1200&q=85', ingredients:'Penne, basil, pine nuts, parmesan, tomato, olive oil' },
  { id:'c1', category:'COFFEE', name:'Cold Coffee', description:'Slow-blended espresso, milk, vanilla cream & cocoa dust.', price:149, veg:true, image:'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=85', ingredients:'Espresso, milk, vanilla, cocoa' },
  { id:'c2', category:'COFFEE', name:'Noiré Cappuccino', description:'Double espresso, velvet microfoam and a dark cocoa finish.', price:169, veg:true, image:'https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=1200&q=85', ingredients:'Espresso, milk, cocoa' },
  { id:'d1', category:'DESSERTS', name:'Biscoff Cheesecake', description:'Creamy cheesecake, biscuit crumb, caramel & sea salt.', price:249, veg:true, image:'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1200&q=85', ingredients:'Cream cheese, biscuit, caramel, sugar, vanilla' },
  { id:'d2', category:'DESSERTS', name:'Dark Chocolate Torte', description:'Dense chocolate, espresso, warm ganache & flaky salt.', price:269, veg:true, image:'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85', ingredients:'Dark chocolate, cocoa, flour, butter, espresso' },
  { id:'b1', category:'BEVERAGES', name:'Rose Lemonade', description:'Fresh lemon, rose, mint and a delicate sparkle.', price:129, veg:true, image:'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=1200&q=85', ingredients:'Lemon, rose, mint, sparkling water' },
  { id:'b2', category:'BEVERAGES', name:'Masala Chai', description:'Slow-brewed Assam tea, cardamom, ginger & warm spice.', price:99, veg:true, image:'https://images.unsplash.com/photo-1597318181409-cf64d0b5d8a2?auto=format&fit=crop&w=1200&q=85', ingredients:'Assam tea, milk, cardamom, ginger, spices' }
];

const categories = ['SIGNATURES','STARTERS','MAINS','PASTA & PIZZA','COFFEE','DESSERTS','BEVERAGES'];

const reveal = { hidden:{opacity:0,y:28}, show:{opacity:1,y:0,transition:{duration:.7,ease:[.22,1,.36,1]}} };
const stagger = { hidden:{}, show:{transition:{staggerChildren:.07}} };

function formatINR(value){ return `₹${value.toLocaleString('en-IN')}`; }

function App(){
  const [activeCategory,setActiveCategory]=useState('SIGNATURES');
  const [cart,setCart]=useState(()=>{ try{return JSON.parse(localStorage.getItem('noire-cart')||'[]')}catch{return []} });
  const [cartOpen,setCartOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [selected,setSelected]=useState(null);
  const [checkoutOpen,setCheckoutOpen]=useState(false);
  const [searchOpen,setSearchOpen]=useState(false);
  const [search,setSearch]=useState('');
  const [order,setOrder]=useState({name:'',phone:'',type:'Takeaway',guests:'',address:''});

  useEffect(()=>localStorage.setItem('noire-cart',JSON.stringify(cart)),[cart]);

  const totalQty=cart.reduce((s,i)=>s+i.qty,0);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const visibleItems=useMemo(()=>menuItems.filter(i=>i.category===activeCategory),[activeCategory]);
  const searchResults=useMemo(()=>search.trim()?menuItems.filter(i=>`${i.name} ${i.category} ${i.description}`.toLowerCase().includes(search.toLowerCase())):[],[search]);

  function add(item,qty=1){
    setCart(prev=>{const found=prev.find(i=>i.id===item.id); return found?prev.map(i=>i.id===item.id?{...i,qty:i.qty+qty}:i):[...prev,{...item,qty}]});
    setSelected(null);
  }
  function change(id,delta){ setCart(prev=>prev.map(i=>i.id===id?{...i,qty:i.qty+delta}:i).filter(i=>i.qty>0)); }
  function remove(id){setCart(prev=>prev.filter(i=>i.id!==id));}
  function scrollTo(id){document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenuOpen(false);}
  function generateMessage(){
    const lines=cart.map((i,n)=>`${n+1}. ${i.name} × ${i.qty} — ${formatINR(i.price*i.qty)}`).join('\n');
    return `Hello NOIRÉ! 👋\n\nI'd like to place an order.\n\n━━━━━━━━━━━━━━\nORDER\n━━━━━━━━━━━━━━\n${lines}\n\n━━━━━━━━━━━━━━\nTOTAL: ${formatINR(total)}\n━━━━━━━━━━━━━━\n\nCustomer: ${order.name || 'Not provided'}\nPhone: ${order.phone || 'Not provided'}\nOrder Type: ${order.type}${order.guests?`\nGuests: ${order.guests}`:''}${order.address?`\nAddress: ${order.address}`:''}\n\nPlease confirm my order.\n\nThank you!`;
  }
  function sendWhatsApp(){
    if(!cart.length)return;
    window.open(`${WA_URL}?text=${encodeURIComponent(generateMessage())}`,'_blank','noopener,noreferrer');
    setCheckoutOpen(false);setCartOpen(false);
  }

  return <div className="site-shell">
    <header className="nav">
      <button className="brand" onClick={()=>scrollTo('home')} aria-label="NOIRÉ home"><span>NOIRÉ</span><small>CAFÉ · KITCHEN</small></button>
      <nav className="desktop-links">
        {['home','story','menu','experience','gallery','contact'].map(x=><button key={x} onClick={()=>scrollTo(x)}>{x}</button>)}
      </nav>
      <div className="nav-actions">
        <button className="icon-btn search-btn" onClick={()=>setSearchOpen(v=>!v)} aria-label="Search"><Search size={17}/></button>
        <button className="cart-pill" onClick={()=>setCartOpen(true)}><ShoppingBag size={16}/><span>Cart ({totalQty})</span></button>
        <a className="nav-wa" href={WA_URL} target="_blank" rel="noreferrer"><MessageCircle size={15}/> WhatsApp</a>
        <button className="reserve-btn" onClick={()=>scrollTo('contact')}>Reserve</button>
        <button className="mobile-menu-btn" onClick={()=>setMenuOpen(true)} aria-label="Open menu"><MenuIcon size={21}/></button>
      </div>
    </header>

    <AnimatePresence>{searchOpen&&<motion.div className="search-overlay" initial={{opacity:0,y:-15}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-15}}>
      <div className="search-inner"><Search size={18}/><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search the menu..."/><button onClick={()=>{setSearchOpen(false);setSearch('')}}><X size={19}/></button></div>
      {search&&<div className="search-results">{searchResults.length?<>{searchResults.slice(0,5).map(i=><button key={i.id} onClick={()=>{setSelected(i);setSearchOpen(false)}}><img src={i.image}/><span><b>{i.name}</b><small>{i.category}</small></span><strong>{formatINR(i.price)}</strong></button>)}</>:<p>No dishes found.</p>}</div>}
    </motion.div>}</AnimatePresence>

    <main>
      <section id="home" className="hero">
        <div className="hero-image"/>
        <div className="hero-grain"/>
        <div className="hero-content">
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.p className="eyebrow" variants={reveal}>CAFÉ · KITCHEN · EXPERIENCE</motion.p>
            <motion.h1 variants={reveal}>COME FOR THE<br/><em>FLAVOUR.</em><br/>STAY FOR THE<br/><em>MOMENTS.</em></motion.h1>
            <motion.p className="hero-copy" variants={reveal}>A contemporary dining experience in the heart of Hardoi — crafted for long conversations, slow evenings and plates worth remembering.</motion.p>
            <motion.div className="hero-ctas" variants={reveal}><button className="primary" onClick={()=>scrollTo('menu')}>Explore Menu <ArrowUpRight size={17}/></button><a className="ghost" href={WA_URL} target="_blank" rel="noreferrer">Order via WhatsApp <MessageCircle size={16}/></a></motion.div>
          </motion.div>
        </div>
        <div className="hero-meta"><span>HARDoi · UTTAR PRADESH</span><span>SCROLL TO DISCOVER <ChevronDown size={15}/></span></div>
      </section>

      <section id="story" className="story section-pad">
        <motion.div className="section-kicker" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}><span>01</span><i/> THE NOIRÉ STORY</motion.div>
        <div className="story-grid">
          <motion.div variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}><h2>A table is<br/><em>more than</em><br/>a place to eat.</h2></motion.div>
          <motion.div className="story-copy" variants={reveal} initial="hidden" whileInView="show" viewport={{once:true}}><p className="lead">NOIRÉ was imagined as a warm corner of Hardoi where contemporary plates meet familiar Indian comfort.</p><p>We care about the details between the bites: the glow of the room, the first pour of coffee, the music behind a conversation and the dish that makes everyone reach for one more taste.</p><button className="text-link" onClick={()=>scrollTo('experience')}>Discover the experience <ArrowUpRight size={15}/></button></motion.div>
        </div>
        <div className="story-marquee"><span>GOOD FOOD · SLOW MOMENTS · GOOD COMPANY · </span><span>GOOD FOOD · SLOW MOMENTS · GOOD COMPANY · </span></div>
      </section>

      <section id="menu" className="menu-section section-pad">
        <div className="menu-heading"><div><div className="section-kicker"><span>02</span><i/> THE MENU</div><h2>Plates with a<br/><em>point of view.</em></h2></div><p>From comfort classics to signature pours, every item is designed to feel familiar — with just enough NOIRÉ in the details.</p></div>
        <div className="category-bar">{categories.map(c=><button key={c} className={activeCategory===c?'active':''} onClick={()=>setActiveCategory(c)}>{c}</button>)}</div>
        <motion.div className="menu-editorial" key={activeCategory} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:.45}}>
          {visibleItems.map((item,index)=><motion.article key={item.id} className="dish-row" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:index*.06}} onClick={()=>setSelected(item)}>
            <div className="dish-index">0{index+1}</div><div className="dish-thumb"><img src={item.image} alt={item.name}/></div><div className="dish-info"><div className="dish-top"><h3>{item.name}</h3><span className={item.veg?'veg':'nonveg'}>{item.veg?'V':'NV'}</span></div><p>{item.description}</p></div><div className="dish-price">{formatINR(item.price)}</div><button className="add-mini" onClick={e=>{e.stopPropagation();add(item)}}><Plus size={17}/><span>Add</span></button>
          </motion.article>)}
        </motion.div>
        <div className="menu-note"><span>Tap any dish to view ingredients & details.</span><button onClick={()=>setCartOpen(true)}>Open your selection <ShoppingBag size={15}/></button></div>
      </section>

      <section className="signature" id="experience">
        <div className="signature-image"><img src={menuItems[0].image} alt="Noiré Butter Chicken"/></div>
        <div className="signature-panel"><div className="section-kicker"><span>03</span><i/> THE SIGNATURE</div><p className="small-label">OUR TAKE ON A CLASSIC</p><h2>Butter chicken,<br/><em>the Noiré way.</em></h2><p>Smoky char, a velvet tomato sauce and the kind of warmth that belongs at the centre of the table. Rich without being heavy. Familiar without being predictable.</p><div className="signature-meta"><div><span>01</span><b>Charred<br/>chicken</b></div><div><span>02</span><b>Smoked<br/>butter</b></div><div><span>03</span><b>House<br/>makhani</b></div></div><button className="primary" onClick={()=>setSelected(menuItems[0])}>View dish <ArrowUpRight size={17}/></button></div>
      </section>

      <section className="experience-strip section-pad"><div className="experience-intro"><div className="section-kicker"><span>04</span><i/> THE EXPERIENCE</div><h2>Stay a little<br/><em>longer.</em></h2></div><div className="experience-list"><div><Clock3/><span><b>Slow afternoons</b><small>12:00 PM — 4:00 PM</small></span></div><div><Coffee/><span><b>Coffee after dinner</b><small>Freshly brewed, always</small></span></div><div><Utensils/><span><b>Made for sharing</b><small>Good food belongs in the middle</small></span></div><div><Sparkles/><span><b>Evenings at NOIRÉ</b><small>Warm light. Long conversations.</small></span></div></div></section>

      <section id="gallery" className="gallery-section section-pad"><div className="gallery-heading"><div className="section-kicker"><span>05</span><i/> FROM THE ROOM</div><h2>A little <em>NOIRÉ</em><br/>in every frame.</h2></div><div className="gallery-grid"><div className="g tall"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=85"/></div><div className="g"><img src="https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=85"/></div><div className="g"><img src="https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=1000&q=85"/></div><div className="g wide"><img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1600&q=85"/></div></div></section>

      <section className="quote-section"><div className="quote-mark">“</div><blockquote>Come hungry.<br/><em>Leave with a story.</em></blockquote><div className="quote-credit"><span/><p>THE NOIRÉ TABLE<br/><small>Hardoi, Uttar Pradesh</small></p><span/></div></section>

      <section id="contact" className="contact-section section-pad"><div className="contact-grid"><div><div className="section-kicker"><span>06</span><i/> COME FIND US</div><h2>Your next<br/><em>favourite table.</em></h2><p className="contact-copy">For reservations, celebrations or a simple dinner that turns into a long evening, reach out to us directly.</p><div className="contact-details"><div><MapPin size={17}/><span>Hardoi, Uttar Pradesh<br/>India</span></div><div><MessageCircle size={17}/><a href={WA_URL} target="_blank" rel="noreferrer">+91 8765989913</a></div><div><Clock3 size={17}/><span>Mon — Sun · 11:00 AM — 11:00 PM</span></div></div></div><div className="reservation-card"><p className="small-label">RESERVATION</p><h3>Make it<br/><em>an occasion.</em></h3><p>Send us a WhatsApp and we'll help you plan your table.</p><a href={WA_URL} target="_blank" rel="noreferrer" className="primary full">Reserve via WhatsApp <ArrowUpRight size={17}/></a><a className="plain-phone" href="tel:+918765989913">Call +91 8765989913</a></div></div></section>
    </main>

    <footer><div className="footer-top"><div className="footer-brand"><span>NOIRÉ</span><small>CAFÉ · KITCHEN</small></div><p>Good food. Slow moments.<br/>See you at the table.</p><a href={WA_URL} target="_blank" rel="noreferrer"><MessageCircle size={16}/> Chat on WhatsApp</a></div><div className="footer-bottom"><span>© 2026 NOIRÉ Café & Kitchen</span><span>Hardoi · Uttar Pradesh</span><span><Instagram size={14}/> @noirecafe</span></div></footer>

    <button className="floating-wa" onClick={()=>window.open(WA_URL,'_blank','noopener,noreferrer')} aria-label="Chat on WhatsApp"><MessageCircle size={21}/><span>Chat</span></button>

    <AnimatePresence>{menuOpen&&<motion.div className="mobile-overlay" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><button className="mobile-close" onClick={()=>setMenuOpen(false)}><X/></button><div className="mobile-menu-content"><span className="mobile-menu-logo">NOIRÉ</span>{['home','story','menu','experience','gallery','contact'].map((x,i)=><motion.button key={x} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*.07}} onClick={()=>scrollTo(x)}>{x}<ArrowUpRight size={17}/></motion.button>)}<a className="mobile-order" href={WA_URL} target="_blank" rel="noreferrer">ORDER ON WHATSAPP <MessageCircle size={17}/></a></div></motion.div>}</AnimatePresence>

    <AnimatePresence>{selected&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={()=>setSelected(null)}><motion.div className="dish-modal" initial={{opacity:0,y:30,scale:.98}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:20}} onMouseDown={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)}><X/></button><div className="modal-img"><img src={selected.image} alt={selected.name}/></div><div className="modal-body"><div className="modal-category">{selected.category} <span className={selected.veg?'veg':'nonveg'}>{selected.veg?'VEGETARIAN':'NON-VEGETARIAN'}</span></div><h2>{selected.name}</h2><p>{selected.description}</p><div className="ingredient-box"><small>INGREDIENTS</small><span>{selected.ingredients}</span></div><div className="modal-bottom"><strong>{formatINR(selected.price)}</strong><button className="primary" onClick={()=>add(selected)}>Add to cart <Plus size={17}/></button></div></div></motion.div></motion.div>}</AnimatePresence>

    <AnimatePresence>{cartOpen&&<motion.div className="drawer-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onMouseDown={()=>setCartOpen(false)}><motion.aside className="cart-drawer" initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:28,stiffness:260}} onMouseDown={e=>e.stopPropagation()}><div className="drawer-head"><div><small>YOUR SELECTION</small><h2>{totalQty ? `${totalQty} ${totalQty===1?'item':'items'}` : 'Your table is waiting.'}</h2></div><button onClick={()=>setCartOpen(false)}><X/></button></div>{cart.length?<><div className="cart-items">{cart.map(i=><div className="cart-item" key={i.id}><img src={i.image}/><div className="cart-item-info"><b>{i.name}</b><span>{formatINR(i.price*i.qty)}</span><div className="qty"><button onClick={()=>change(i.id,-1)}><Minus size={13}/></button><span>{i.qty}</span><button onClick={()=>change(i.id,1)}><Plus size={13}/></button><button className="remove" onClick={()=>remove(i.id)}>Remove</button></div></div></div>)}</div><div className="cart-foot"><div><span>Subtotal</span><strong>{formatINR(total)}</strong></div><div className="total-row"><span>Total</span><strong>{formatINR(total)}</strong></div><button className="primary full" onClick={()=>setCheckoutOpen(true)}>Order via WhatsApp <ArrowUpRight size={17}/></button><button className="clear" onClick={()=>setCart([])}>Clear selection</button></div></>:<div className="empty-cart"><div className="empty-icon"><ShoppingBag/></div><h3>Your table is still waiting.</h3><p>Add something delicious to begin.</p><button className="primary" onClick={()=>{setCartOpen(false);scrollTo('menu')}}>Explore Menu</button></div>}</motion.aside></motion.div>}</AnimatePresence>

    <AnimatePresence>{checkoutOpen&&<motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.div className="checkout-modal" initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} exit={{opacity:0,y:20}}><button className="modal-close" onClick={()=>setCheckoutOpen(false)}><X/></button><div className="checkout-head"><small>FINAL STEP</small><h2>Your order,<br/><em>your way.</em></h2><p>We'll open WhatsApp with everything already prepared.</p></div><div className="checkout-layout"><div className="checkout-form"><label>Name<input value={order.name} onChange={e=>setOrder({...order,name:e.target.value})} placeholder="Your name"/></label><label>Phone<input value={order.phone} onChange={e=>setOrder({...order,phone:e.target.value})} placeholder="+91" inputMode="tel"/></label><label>Order type<select value={order.type} onChange={e=>setOrder({...order,type:e.target.value})}><option>Dine-in</option><option>Takeaway</option><option>Delivery</option></select></label>{order.type==='Dine-in'&&<label>Number of guests<input value={order.guests} onChange={e=>setOrder({...order,guests:e.target.value})} placeholder="2" inputMode="numeric"/></label>}{order.type==='Delivery'&&<label>Address<textarea value={order.address} onChange={e=>setOrder({...order,address:e.target.value})} placeholder="Delivery address"/></label>}</div><div className="checkout-summary"><small>YOUR ORDER</small>{cart.map(i=><div key={i.id}><span>{i.name} × {i.qty}</span><b>{formatINR(i.price*i.qty)}</b></div>)}<hr/><div className="summary-total"><span>TOTAL</span><b>{formatINR(total)}</b></div></div></div><button className="primary full checkout-btn" onClick={sendWhatsApp}>Confirm & Continue to WhatsApp <ArrowUpRight size={17}/></button></motion.div></motion.div>}</AnimatePresence>
  </div>
}

createRoot(document.getElementById('root')).render(<App/>);
