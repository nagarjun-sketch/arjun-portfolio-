import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Terminal, User, BookOpen, Code, Award, Mail, 
  Github, Linkedin, Shield, Lock, 
  ShieldAlert, Activity, Cpu, Zap, Home as HomeIcon, 
  ChevronLeft, ChevronRight, FileText,
  Briefcase, Database, BrainCircuit, BarChart3,
  Search, Globe2, X, Maximize2, GraduationCap, School,
  Wifi, HardDrive
} from 'lucide-react';

// --- Global Styles & Cyber Transition Keyframes ---
const lightThemeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght=300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

  :root {
    --bg-primary: #f8fafc;
    --text-main: #0f172a;
    --accent-primary: #6366f1; /* Indigo */
    --accent-secondary: #14b8a6; /* Teal */
    --mouse-x: 50%;
    --mouse-y: 50%;
  }

  body {
    background-color: var(--bg-primary);
    color: var(--text-main);
    font-family: 'Outfit', sans-serif;
    overflow-x: hidden;
    margin: 0;
    -webkit-tap-highlight-color: transparent;
  }

  .font-mono-clean { font-family: 'JetBrains Mono', monospace; }

  /* Cyber Scanline */
  .cyber-scanline {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    background: linear-gradient(to bottom, transparent 50%, rgba(99, 102, 241, 0.03) 51%, transparent 100%);
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 90;
  }
  .cyber-scanline::after {
    content: '';
    position: absolute;
    top: -5%; left: 0; width: 100%; height: 5%;
    background: linear-gradient(to bottom, transparent, rgba(20, 184, 166, 0.2), transparent);
    animation: radar-scan 6s linear infinite;
  }

  @media (max-width: 768px) {
    .cyber-scanline { display: none; }
  }

  @keyframes radar-scan {
    0% { top: -10%; }
    100% { top: 110%; }
  }

  /* Glassmorphism Panels for Inner Pages - Perfectly Frosted & Readable */
  .glass-panel {
    background: rgba(255, 255, 255, 0.72); 
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    box-shadow: 0 10px 40px -10px rgba(99,102,241,0.06), inset 0 0 0 1px rgba(255,255,255,0.4);
  }

  /* Aesthetic Light Cards with Cyber Corners */
  .aesthetic-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.02), 0 1px 3px rgba(0,0,0,0.01);
    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    border: 1px solid rgba(226, 232, 240, 0.8);
    position: relative;
    cursor: pointer;
  }
  
  .aesthetic-card::before, .aesthetic-card::after,
  .cyber-corners::before, .cyber-corners::after {
    content: ''; position: absolute; width: 15px; height: 15px;
    border: 2px solid transparent; transition: all 0.3s ease; opacity: 0;
    pointer-events: none; z-index: 10;
  }
  
  .aesthetic-card::before { top: 10px; left: 10px; border-top-color: var(--accent-primary); border-left-color: var(--accent-primary); transform: translate(-5px, -5px); }
  .aesthetic-card::after { bottom: 10px; right: 10px; border-bottom-color: var(--accent-secondary); border-right-color: var(--accent-secondary); transform: translate(5px, 5px); }
  .cyber-corners::before { top: 10px; right: 10px; border-top-color: var(--accent-secondary); border-right-color: var(--accent-secondary); transform: translate(5px, -5px); }
  .cyber-corners::after { bottom: 10px; left: 10px; border-bottom-color: var(--accent-primary); border-left-color: var(--accent-primary); transform: translate(-5px, 5px); }

  .aesthetic-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(99, 102, 241, 0.08), 0 5px 15px rgba(0,0,0,0.03);
    border-color: rgba(99, 102, 241, 0.3);
  }
  
  .aesthetic-card:hover::before, .aesthetic-card:hover::after,
  .aesthetic-card:hover .cyber-corners::before, .aesthetic-card:hover .cyber-corners::after {
    opacity: 1; transform: translate(0, 0);
  }

  /* Typography Gradients */
  .text-gradient {
    background: linear-gradient(135deg, #1e293b 0%, var(--accent-primary) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Glitch Text Effect */
  .glitch-hover:hover {
    animation: subtle-glitch 0.2s linear infinite;
    color: var(--accent-primary);
  }
  @keyframes subtle-glitch {
    0% { transform: translate(0) }
    20% { transform: translate(-2px, 1px) }
    40% { transform: translate(-1px, -1px) }
    60% { transform: translate(2px, 1px) }
    80% { transform: translate(1px, -1px) }
    100% { transform: translate(0) }
  }

  /* --- Live Page Transitions --- */
  .page-enter-next { animation: slideInRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .page-exit-next { animation: slideOutLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .page-enter-prev { animation: slideInLeft 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  .page-exit-prev { animation: slideOutRight 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

  @keyframes slideInRight { from { opacity: 0; transform: translateX(40px) scale(0.98); } to { opacity: 1; transform: translateX(0) scale(1); } }
  @keyframes slideOutLeft { from { opacity: 1; transform: translateX(0) scale(1); } to { opacity: 0; transform: translateX(-40px) scale(0.98); } }
  @keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px) scale(0.98); } to { opacity: 1; transform: translateX(0) scale(1); } }
  @keyframes slideOutRight { from { opacity: 1; transform: translateX(0) scale(1); } to { opacity: 0; transform: translateX(40px) scale(0.98); } }

  @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
  .cursor-blink { animation: blink 1s step-end infinite; }

  /* Avatar Float Animation */
  @keyframes float-avatar { 0%, 100% { transform: translateY(0px) rotate(1deg); } 50% { transform: translateY(-10px) rotate(-1deg); } }
  .animate-float-avatar { animation: float-avatar 6s ease-in-out infinite; }

  .custom-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
  .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
  .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 10px; }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #94a3b8; }
  
  .modal-enter { animation: fadeInScale 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards; }
  @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95) translateY(10px); } to { opacity: 1; transform: scale(1) translateY(0); } }

  .pb-safe { padding-bottom: 90px; }
  @media (min-width: 768px) { .pb-safe { padding-bottom: 24px; } }
`;

// --- Interactive Cyber World Map + Binary Rain ---
const CyberBackgroundMap = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const columns = Math.floor(width / 20);
    const drops = [];
    for(let i=0; i<columns; i++) drops[i] = Math.random() * -100;

    const rawNodes = [
      {x: 0.2, y: 0.3}, {x: 0.25, y: 0.4}, {x: 0.15, y: 0.35},
      {x: 0.3, y: 0.6}, {x: 0.35, y: 0.7},
      {x: 0.48, y: 0.25}, {x: 0.52, y: 0.3}, {x: 0.5, y: 0.35}, {x: 0.55, y: 0.5}, {x: 0.52, y: 0.6},
      {x: 0.7, y: 0.3}, {x: 0.75, y: 0.4}, {x: 0.65, y: 0.45}, {x: 0.8, y: 0.35},
      {x: 0.85, y: 0.7}, {x: 0.9, y: 0.75}
    ];

    let nodes = [];
    let packets = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      nodes = rawNodes.map(n => ({ x: n.x * width, y: n.y * height, radius: Math.random() * 2 + 2, pulse: Math.random() * Math.PI * 2 }));
    };

    window.addEventListener('resize', resize);
    resize();

    class DataPacket {
      constructor(startNode, endNode) {
        this.start = startNode; this.end = endNode; this.progress = 0; 
        this.speed = 0.002 + Math.random() * 0.003;
        this.char = Math.random() > 0.5 ? '1' : '0';
      }
      draw() {
        const x = this.start.x + (this.end.x - this.start.x) * this.progress;
        const y = this.start.y + (this.end.y - this.start.y) * this.progress;
        ctx.font = '10px monospace';
        ctx.fillStyle = `rgba(99, 102, 241, ${Math.sin(this.progress * Math.PI)})`;
        ctx.fillText(this.char, x, y);
      }
      update() { this.progress += this.speed; return this.progress >= 1; }
    }

    const connections = [];
    for(let i=0; i<nodes.length; i++) {
      for(let j=i+1; j<nodes.length; j++) { if(Math.random() > 0.75) connections.push([i, j]); }
    }

    let mouse = { x: -1000, y: -1000 };
    const handleMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)'; 
      ctx.fillRect(0, 0, width, height);
      
      ctx.globalCompositeOperation = 'source-over';
      
      ctx.font = '12px monospace';
      for(let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillStyle = `rgba(20, 184, 166, ${Math.random() * 0.12})`; 
        ctx.fillText(text, i * 20, drops[i] * 20);
        if(drops[i] * 20 > height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
      }

      ctx.lineWidth = 0.5;
      connections.forEach(([i, j]) => {
        const n1 = nodes[i], n2 = nodes[j];
        const dist = Math.sqrt(Math.pow((n1.x + n2.x)/2 - mouse.x, 2) + Math.pow((n1.y + n2.y)/2 - mouse.y, 2));
        ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.quadraticCurveTo((n1.x+n2.x)/2, (n1.y+n2.y)/2 - 50, n2.x, n2.y);
        ctx.strokeStyle = dist < 200 ? `rgba(99, 102, 241, ${0.4 * (1 - dist/200)})` : 'rgba(99, 102, 241, 0.05)';
        ctx.stroke();
      });

      nodes.forEach(node => {
        node.pulse += 0.05;
        const r = node.radius + Math.sin(node.pulse) * 1;
        ctx.beginPath(); ctx.arc(node.x, node.y, Math.max(0.1, r), 0, Math.PI * 2); ctx.fillStyle = 'rgba(99, 102, 241, 0.3)'; ctx.fill();
      });

      if(Math.random() < 0.2 && connections.length > 0) {
        const conn = connections[Math.floor(Math.random() * connections.length)];
        packets.push(new DataPacket(nodes[conn[0]], nodes[conn[1]]));
      }
      for (let i = packets.length - 1; i >= 0; i--) { packets[i].draw(); if (packets[i].update()) packets.splice(i, 1); }

      animationFrameId = requestAnimationFrame(animate);
    };
    animate();
    return () => { window.removeEventListener('resize', resize); window.removeEventListener('mousemove', handleMouseMove); cancelAnimationFrame(animationFrameId); };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.14]"
        style={{
          backgroundImage: `url(/world-map.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'saturate(0.5)',
        }}
      ></div>
      <canvas ref={canvasRef} className="w-full h-full relative z-10 opacity-90" />
    </div>
  );
};

// --- Hacker Text Scramble Hook ---
const ScrambleText = ({ text, as: Component = 'span', className = '' }) => {
  const [displayText, setDisplayText] = useState(text);
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>/\\|{}[]';
  
  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIterations = 15;
    const interval = setInterval(() => {
      setDisplayText(text.split('').map((char, index) => {
        if(char === ' ') return ' ';
        if(index < (iteration / maxIterations) * text.length) return text[index];
        return chars[Math.floor(Math.random() * chars.length)];
      }).join(''));
      
      iteration++;
      if (iteration > maxIterations) clearInterval(interval);
    }, 30);
  }, [text]);

  useEffect(() => { scramble(); }, [scramble]);

  return <Component className={`${className} cursor-crosshair`} onMouseEnter={scramble}>{displayText}</Component>;
};

// --- Typing Modal Component ---
const TypingModal = ({ data, onClose }) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const content = data?.details || '';

  useEffect(() => {
    if (!data) return;
    setDisplayText('');
    setIsTyping(true);
    let i = 0;
    const timer = setInterval(() => {
      if (i < content.length) {
        setDisplayText((prev) => prev + content.slice(i, i + 3)); 
        i += 3;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 10);
    return () => clearInterval(timer);
  }, [data, content]);

  if (!data) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-md">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="modal-enter relative w-full max-w-3xl bg-[#0f172a] rounded-xl shadow-2xl border border-indigo-500/50 overflow-hidden flex flex-col max-h-[85vh]">
        <div className="flex items-center justify-between p-3 border-b border-indigo-500/30 bg-[#1e293b]">
          <div className="flex items-center gap-3">
            <Terminal className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="font-mono-clean font-bold text-teal-400 text-sm tracking-widest">{data.title.toUpperCase()}</h3>
              <p className="text-[10px] text-indigo-400 font-mono-clean">{data.subtitle}</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="w-3 h-3 rounded-full bg-slate-600 hover:bg-emerald-500 transition-colors"></button>
            <button className="w-3 h-3 rounded-full bg-slate-600 hover:bg-amber-500 transition-colors"></button>
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-slate-600 hover:bg-rose-500 transition-colors flex items-center justify-center"></button>
          </div>
        </div>
        <div className="p-5 md:p-8 text-teal-50 font-mono-clean text-xs md:text-sm leading-relaxed overflow-y-auto custom-scrollbar flex-grow shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] relative">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none"></div>
          <div className="mb-4 text-indigo-400 select-none">
            Welcome to Portfolio_OS v2.0.4. Type 'help' for commands.<br/>
            arjun@sys:~$ <span className="text-teal-400">extract_data -target "{data.title}"</span>
          </div>
          <div className="whitespace-pre-wrap break-words relative z-10 text-slate-300">
            {displayText.split(/(\[.*?\])/g).map((part, i) => 
              part.startsWith('[') ? <span key={i} className="text-teal-400 font-bold">{part}</span> : part
            )}
            {isTyping && <span className="inline-block w-2 h-4 bg-teal-400 ml-1 align-middle animate-pulse shadow-[0_0_8px_#2dd4bf]"></span>}
            {!isTyping && <span className="inline-block w-2 h-4 bg-teal-400 ml-1 align-middle cursor-blink shadow-[0_0_8px_#2dd4bf]"></span>}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Page Content Components ---
const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full overflow-y-auto custom-scrollbar px-4 md:px-8 pb-safe">
      <div className="w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 mt-4 md:mt-0">
        <div className="flex-1 text-center md:text-left space-y-4 md:space-y-6 order-2 md:order-1">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 rounded-full bg-white/50 backdrop-blur-md border border-indigo-100 text-indigo-600 font-mono-clean font-bold text-[10px] md:text-xs shadow-sm mx-auto md:mx-0 uppercase tracking-widest">
            <Activity className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-500 animate-pulse" />
            SYS.LOC // Jain University
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Hi, I'm <br className="md:hidden" />
            <ScrambleText text="Arjun M" className="text-gradient" as="span" />
          </h1>
          
          <div className="min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center md:justify-start">
             <h2 className="text-xs sm:text-sm md:text-lg font-mono-clean text-teal-600 font-bold tracking-widest uppercase">
              <ScrambleText text="Python Developer • Digital Forensics Enthusiast • Security Learner" as="span" />
            </h2>
          </div>
          
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium">
            Developing automation tools, analyzing digital evidence, and expanding expertise in Information security to solve real-world security challenges. Uncovering insights through digital forensics, and building a strong foundation in information security.
          </p>
        </div>
        
        <div className="flex-shrink-0 relative order-1 md:order-2 mt-8 md:mt-0 animate-float-avatar">
          <div className="absolute inset-[-15px] rounded-[2rem] border border-dashed border-indigo-300 opacity-40 animate-[spin_25s_linear_infinite]"></div>
          <div className="absolute inset-[-30px] rounded-[2.5rem] border border-teal-200 opacity-20 animate-[spin_35s_reverse_linear_infinite]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-200/30 to-teal-200/30 rounded-[2rem] blur-2xl opacity-40"></div>
          
          {/* FIX: Reverted to high-tech dashboard rectangle module with matching dark container tone to eliminate side/bottom cropping completely */}
          <div className="relative w-40 h-48 sm:w-48 sm:h-56 md:w-56 md:h-64 flex items-center justify-center bg-[#1e222b] rounded-[2rem] border border-white/40 shadow-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03]">
            <img src="/avatar-1.jpeg" alt="Arjun 3D Avatar" className="w-full h-full object-contain object-bottom" />
          </div>
        </div>
      </div>
    </div>
  );
};

const About = () => (
  <div className="h-full w-full overflow-y-auto custom-scrollbar px-4 md:px-8 pb-safe flex flex-col">
    <div className="glass-panel p-5 md:p-8 flex flex-col w-full max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-slate-200/50 pb-4">
        <div className="p-2 bg-indigo-50 rounded-xl"><User className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" /></div>
        <ScrambleText text="About Me & Skills" className="text-xl md:text-2xl font-bold text-slate-800" as="h2" />
      </div>
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        <div className="flex-1 flex flex-col sm:flex-row gap-6 md:gap-8 items-center sm:items-start">
          <div className="flex-shrink-0 relative group">
            <div className="w-32 h-32 sm:w-40 sm:h-48 md:w-48 md:h-56 rounded-2xl bg-[#1e222b] overflow-hidden relative border border-slate-200 shadow-md cyber-corners">
              <img src="/avatar-1.jpeg" alt="Arjun 3D Avatar" className="w-full h-full object-cover object-top relative z-10 transition-transform duration-700 group-hover:scale-105" />
            </div>
          </div>
          <div className="space-y-4 text-slate-600 text-sm md:text-base font-medium text-center sm:text-left">
            <p className="text-xl md:text-2xl text-slate-900 font-extrabold tracking-tight mb-2">Hello, I'm <span className="text-indigo-600 font-mono-clean glitch-hover">Arjun_M</span></p>
            <p>A passionate tech enthusiast pursuing my <span className="text-indigo-600 font-bold">MSc. Digital Forensics and Information Security</span> at Jain University. I'm a student with a strong interest in cyber investigations, malware analysis, and security automation. My work focuses on uncovering digital evidence, analyzing cyber threats, and developing intelligent solutions that strengthen organizational security. I enjoy combining forensic methodologies, Python development, and AI-driven approaches to solve complex cybersecurity challenges.</p>
            <p>I strive to transform complex technical data into meaningful insights that support <span className="text-teal-600 font-bold">investigation, defense, and informed decision-making</span>, and building intelligent GRC architectures.</p>
            <div className="mt-4 p-3 md:p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-left shadow-inner">
              <p className="text-indigo-600 mb-1 text-xs font-bold uppercase tracking-wider flex items-center gap-2"><Zap className="w-4 h-4"/> Current Working</p>
              <p className="text-sm md:text-base font-bold text-slate-800 font-mono-clean">PROJECT: AI-INTEGRATED GRC FRAMEWORK</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col