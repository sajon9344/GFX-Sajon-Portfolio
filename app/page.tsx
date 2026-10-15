'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDownRight, ArrowRight, ArrowUpRight, Asterisk, Menu, X, MoveUpRight } from 'lucide-react';
import { sampleProjects, type Project } from '@/lib/projects';

const categories = ['All work', 'Brand Identity', 'Packaging Design', 'Campaign Design', 'Art Direction', 'Digital Design'];
const fadeUp = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: .7, ease: [0.22, 1, 0.36, 1] } } };

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [filter, setFilter] = useState('All work');
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', project: 'Brand identity', message: '' });
  const [formState, setFormState] = useState<'idle'|'sending'|'sent'|'error'>('idle');
  const [selected, setSelected] = useState<Project | null>(null);

  useEffect(() => {
    fetch('/api/projects').then(r => r.ok ? r.json() : Promise.reject()).then(data => { if (Array.isArray(data.projects) && data.projects.length) setProjects(data.projects); }).catch(() => {});
  }, []);

  const visibleProjects = useMemo(() => filter === 'All work' ? projects : projects.filter(p => p.category === filter), [filter, projects]);
  async function submitContact(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setFormState('sending');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (!res.ok) throw new Error('Could not send message');
      setFormState('sent'); setForm({ name: '', email: '', project: 'Brand identity', message: '' });
    } catch { setFormState('error'); }
  }

  return <main>
    <div className="top-glow" aria-hidden="true" />
    <header className="nav-wrap"><a href="#home" className="wordmark" aria-label="Sajon home">sajon<span>®</span></a><nav className={menuOpen ? 'nav-links open' : 'nav-links'}><a onClick={() => setMenuOpen(false)} href="#work">Work <span>01</span></a><a onClick={() => setMenuOpen(false)} href="#about">About <span>02</span></a><a onClick={() => setMenuOpen(false)} href="#services">Services <span>03</span></a><a onClick={() => setMenuOpen(false)} href="#contact">Contact <span>04</span></a><a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s talk <ArrowUpRight size={15}/></a></nav><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button></header>

    <section className="hero section-pad" id="home">
      <motion.div className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .15 }}><span className="status-dot"/> INDEPENDENT DESIGNER <span className="eyebrow-sep">/</span> AVAILABLE FOR SELECT PROJECTS</motion.div>
      <motion.h1 initial="hidden" animate="show" variants={fadeUp}>Ideas into<br/><span className="outline-word">identity</span><span className="purple-dot">.</span></motion.h1>
      <div className="hero-bottom"><p className="hero-intro">I&apos;m Sajon — a graphic designer shaping <strong>distinctive brands</strong>, visual stories and digital experiences with purpose.</p><a href="#work" className="round-link" aria-label="Explore selected work"><span>SCROLL TO EXPLORE</span><i><ArrowDownRight size={22}/></i></a></div>
      <div className="hero-orbit" aria-hidden="true"><div className="orbit-ring ring-one"/><div className="orbit-ring ring-two"/><div className="orbit-core"><Asterisk size={54} strokeWidth={1.2}/></div><span className="orbit-label">DESIGN WITH INTENT · EST. 2020 ·</span></div>
      <div className="hero-index"><span>BASED IN BANGLADESH</span><span>CREATIVE PARTNER / 2026</span></div>
    </section>

    <section className="work-section section-pad" id="work"><div className="section-heading"><div><span className="section-kicker">01 / SELECTED WORK</span><h2>Made to <span>matter.</span></h2></div><p>A selection of identities, campaigns and visual worlds made with curiosity and intent.</p></div>
      <div className="filter-row" role="group" aria-label="Filter projects">{categories.map(c => <button key={c} className={filter === c ? 'filter-chip active' : 'filter-chip'} onClick={() => setFilter(c)}>{c}<span>{c === 'All work' ? projects.length.toString().padStart(2,'0') : projects.filter(p => p.category === c).length.toString().padStart(2,'0')}</span></button>)}</div>
      <motion.div layout className="project-grid"><AnimatePresence mode="popLayout">{visibleProjects.map((p, i) => <motion.button layout key={p.id} className={`project-card ${i % 3 === 1 ? 'project-tall' : ''}`} onClick={() => setSelected(p)} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .4 }}><div className="project-image" style={{ backgroundColor: p.accent }}><img src={p.image_url} alt={`${p.title} design project`} loading="lazy"/><span className="project-open"><MoveUpRight size={19}/></span><span className="project-number">0{i+1}</span></div><div className="project-meta"><div><h3>{p.title}</h3><p>{p.category}</p></div><span>{p.year}</span></div></motion.button>)}</AnimatePresence></motion.div>
      <div className="work-footnote"><span>✳ SAMPLE PROJECTS — REPLACE WITH YOUR WORK</span><span>{visibleProjects.length.toString().padStart(2,'0')} PROJECTS SHOWN</span></div>
    </section>

    <section className="manifesto section-pad" id="about"><div className="section-kicker">02 / A LITTLE ABOUT ME</div><div className="manifesto-layout"><h2>Good design<br/>isn&apos;t decoration.<br/>It&apos;s <span>a point of view.</span></h2><div className="manifesto-copy"><div className="asterisk-big"><Asterisk size={60} strokeWidth={1}/></div><p>I partner with ambitious people and growing businesses to turn big ideas into clear, memorable visual identities. From the first sketch to the final pixel, every detail has a reason to be there.</p><p>My approach blends strategic thinking with expressive craft — creating work that looks different because it thinks differently.</p><a className="text-link" href="#contact">Have a project in mind? <ArrowUpRight size={17}/></a></div></div><div className="stats-row"><div><strong>04<span>+</span></strong><small>YEARS OF MAKING</small></div><div><strong>300<span>+</span></strong><small>DESIGN CONCEPTS</small></div><div><strong>06</strong><small>CORE DISCIPLINES</small></div><div><strong>∞</strong><small>IDEAS TO EXPLORE</small></div></div></section>

    <section className="services-section section-pad" id="services"><div className="section-heading"><div><span className="section-kicker">03 / WHAT I DO</span><h2>Good ideas.<br/><span>Great execution.</span></h2></div><p>From defining the big picture to refining the smallest details, I help brands show up with confidence.</p></div><div className="services-list">{[{n:'01',name:'Brand Identity',desc:'Strategy, logo systems, visual language & guidelines'},{n:'02',name:'Packaging Design',desc:'Shelf-ready packaging, labels & product storytelling'},{n:'03',name:'Campaign Design',desc:'Social campaigns, launch assets & promotional visuals'},{n:'04',name:'Art Direction',desc:'Concept development, visual worlds & creative direction'},{n:'05',name:'Digital Design',desc:'Digital assets, landing pages & social-first design'},{n:'06',name:'Print & Editorial',desc:'Posters, brochures, layouts & print collateral'}].map(s => <div className="service-row" key={s.n}><span className="service-n">{s.n}</span><h3>{s.name}</h3><p>{s.desc}</p><ArrowUpRight className="service-arrow" size={21}/></div>)}</div></section>

    <section className="contact-section section-pad" id="contact"><div className="contact-top"><div><span className="section-kicker">04 / YOUR TURN</span><h2>Let&apos;s make<br/>something <span>real.</span></h2></div><p>Have a good problem to solve or an idea worth exploring? Tell me a little about it.</p></div><div className="contact-layout"><div className="contact-aside"><span className="availability"><span className="status-dot"/> AVAILABLE FOR PROJECTS</span><a className="email-link" href="mailto:hello@sajon.design">hello@sajon.design <ArrowUpRight size={18}/></a><p>Prefer a quick hello? Drop me a line and let&apos;s start there.</p><div className="social-links"><a href="https://www.behance.net/" target="_blank" rel="noreferrer">Behance <ArrowUpRight size={14}/></a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={14}/></a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">LinkedIn <ArrowUpRight size={14}/></a></div></div><form className="contact-form" onSubmit={submitContact}><div className="form-row"><label>Your name<input required minLength={2} value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Name"/></label><label>Email address<input required type="email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@company.com"/></label></div><label>What do you need?<select value={form.project} onChange={e=>setForm({...form,project:e.target.value})}><option>Brand identity</option><option>Packaging design</option><option>Campaign design</option><option>Digital design</option><option>Something else</option></select></label><label>Tell me about it<textarea required minLength={10} rows={4} value={form.message} onChange={e=>setForm({...form,message:e.target.value})} placeholder="A little about your project, timeline, goals…"/></label><div className="form-submit-row"><button className="submit-button" type="submit" disabled={formState==='sending'}>{formState==='sending'?'Sending…':'Send inquiry'} <ArrowUpRight size={17}/></button><span className={`form-feedback ${formState}`}>{formState==='sent'?'Thanks — your inquiry has been received.':formState==='error'?'Could not send. Check setup or email hello@sajon.design.':'Usually replies within 1–2 business days.'}</span></div></form></div></section>

    <footer className="footer section-pad"><a href="#home" className="wordmark">sajon<span>®</span></a><span>INDEPENDENT DESIGNER · BANGLADESH</span><a href="#home" className="back-top">BACK TO TOP ↑</a><div className="footer-bottom"><span>© {new Date().getFullYear()} SAJON. ALL RIGHTS RESERVED.</span><span>MADE WITH INTENTION <span className="purple-dot">✳</span></span></div></footer>

    <AnimatePresence>{selected && <motion.div className="modal-backdrop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} onClick={() => setSelected(null)}><motion.div className="project-modal" initial={{y:25,scale:.98}} animate={{y:0,scale:1}} exit={{y:15,scale:.98}} onClick={e=>e.stopPropagation()}><button className="modal-close" onClick={()=>setSelected(null)} aria-label="Close project"><X/></button><img src={selected.image_url} alt={selected.title}/><div className="modal-copy"><span className="section-kicker">{selected.category} / {selected.year}</span><h2>{selected.title}</h2><p>{selected.description}</p><span className="sample-note">SAMPLE CASE STUDY — ADD YOUR PROJECT DETAILS IN THE ADMIN DASHBOARD</span></div></motion.div></motion.div>}</AnimatePresence>
  </main>;
}
