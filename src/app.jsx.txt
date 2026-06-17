import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Terminal, User, BookOpen, Code, Award, Mail, 
  Github, Linkedin, Shield, Lock, 
  ShieldAlert, Activity, Cpu, Zap, Home, 
  ChevronLeft, ChevronRight, FileText,
  Briefcase, Database, BrainCircuit, BarChart3,
  Search, Globe2, X, Maximize2, GraduationCap, School,
  Wifi, HardDrive
} from 'lucide-react';

// --- Global Styles & Cyber Transition Keyframes ---
const lightThemeStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

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

  @keyframes radar-scan {
    0% { top: -10%; }
    100% { top: 110%; }
  }

  /* Glassmorphism Panels */
  .glass-panel {
    background: rgba(255, 255, 255, 0.85);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    border: 1px solid rgba(255, 255, 255, 0.6);
    border-radius: 20px;
    box-shadow: 0 10px 40px -10px rgba(99,102,241,0.08), inset 0 0 0 1px rgba(255,255,255,0.5);
  }

  /* Aesthetic Light Cards with Cyber Corners */
  .aesthetic-card {
    background: #ffffff;
    border-radius: 16px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03), 0 1px 3px rgba(0,0,0,0.02);
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
    box-shadow: 0 15px 30px rgba(99, 102, 241, 0.1), 0 5px 15px rgba(0,0,0,0.04);
    border-color: rgba(99, 102, 241, 0.4);
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
  @keyframes float-avatar { 0%, 100% { transform: translateY(0px) rotate(2deg); } 50% { transform: translateY(-15px) rotate(-1deg); } }
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
      ctx.fillStyle = 'rgba(248, 250, 252, 0.3)'; 
      ctx.fillRect(0, 0, width, height);
      
      ctx.font = '12px monospace';
      for(let i = 0; i < drops.length; i++) {
        const text = Math.random() > 0.5 ? '1' : '0';
        ctx.fillStyle = `rgba(20, 184, 166, ${Math.random() * 0.15})`; 
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

  return <div className="fixed inset-0 z-0 pointer-events-none mix-blend-darken"><canvas ref={canvasRef} className="w-full h-full" /></div>;
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

const useHeaderTypewriter = (text, speed = 50) => {
  const [displayText, setDisplayText] = useState('');
  useEffect(() => {
    let i = 0; setDisplayText('');
    const timer = setInterval(() => {
      if (i < text.length) { setDisplayText((prev) => prev + text.charAt(i)); i++; } 
      else { clearInterval(timer); }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return displayText;
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
            <ScrambleText text="Arjun" className="text-gradient" as="span" />
          </h1>
          
          <div className="min-h-[2rem] md:min-h-[2.5rem] flex items-center justify-center md:justify-start">
             <h2 className="text-xs sm:text-sm md:text-lg font-mono-clean text-teal-600 font-bold tracking-widest uppercase">
              <ScrambleText text="MSc. DIGITAL FORENSICS • AI RESEARCHER" as="span" />
            </h2>
          </div>
          
          <p className="text-slate-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 font-medium">
            Bridging the gap between software development and cybersecurity. Engineering robust static malware analyzers, developing AI-integrated GRC frameworks, and leveraging data for innovative security solutions.
          </p>
        </div>
        
        <div className="flex-shrink-0 relative order-1 md:order-2 mt-8 md:mt-0 animate-float-avatar">
          <div className="absolute inset-[-20px] rounded-full border border-dashed border-indigo-300 opacity-50 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-[-40px] rounded-full border border-teal-200 opacity-30 animate-[spin_30s_reverse_linear_infinite]"></div>
          
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-300/50 to-teal-300/50 rounded-[2rem] md:rounded-[3rem] blur-2xl opacity-60"></div>
          <div className="relative w-40 h-48 sm:w-48 sm:h-56 md:w-56 md:h-64 flex items-center justify-center bg-indigo-50 rounded-[2rem] md:rounded-[3rem] shadow-2xl border border-white overflow-hidden transition-all duration-500 hover:scale-[1.02]">
            <img src="1000125516.jpg" alt="Arjun Avatar" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }} />
            <div className="hidden absolute inset-0 items-center justify-center bg-indigo-50 z-0"><User className="w-16 h-16 text-indigo-300" /></div>
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
            <div className="w-32 h-32 sm:w-40 sm:h-48 md:w-48 md:h-56 rounded-2xl bg-slate-100 overflow-hidden relative border border-slate-200 shadow-md cyber-corners">
              <img src="1000125516.jpg" alt="Arjun Avatar" className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-105" onError={(e) => { e.target.style.display = 'none'; e.target.nextElementSibling.style.display = 'flex'; }} />
              <div className="hidden absolute inset-0 items-center justify-center bg-slate-200 z-0"><User className="w-12 h-12 text-slate-400" /></div>
            </div>
          </div>
          <div className="space-y-4 text-slate-600 text-sm md:text-base font-medium text-center sm:text-left">
            <p className="text-xl md:text-2xl text-slate-900 font-extrabold tracking-tight mb-2">Hello, I'm <span className="text-indigo-600 font-mono-clean glitch-hover">Arjun_M</span></p>
            <p>A passionate tech enthusiast pursuing my <span className="text-indigo-600 font-bold">MSc. Digital Forensics and Information Security</span> at Jain University, having completed my BSc. CME in 2025.</p>
            <p>I specialize in investigating cyber incidents, developing <span className="text-teal-600 font-bold">Static Malware Analysers</span>, and building intelligent GRC architectures.</p>
            <div className="mt-4 p-3 md:p-4 bg-indigo-50 border border-indigo-100 rounded-xl text-left shadow-inner">
              <p className="text-indigo-600 mb-1 text-xs font-bold uppercase tracking-wider flex items-center gap-2"><Zap className="w-4 h-4"/> Current Operation</p>
              <p className="text-sm md:text-base font-bold text-slate-800 font-mono-clean">EXEC ./Advanced_Malware_Analysis.sh && AI_GRC</p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-4 md:gap-5 border-t lg:border-t-0 lg:border-l border-slate-200/50 pt-6 lg:pt-0 lg:pl-8">
          <div>
             <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Code className="w-3.5 h-3.5"/> Development</h3>
             <div className="flex flex-wrap gap-2">
               {['Python Developer', 'Basic Java', 'UI/UX Designer'].map((skill, i) => (<span key={i} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-md text-xs md:text-sm shadow-sm font-mono-clean">{skill}</span>))}
             </div>
          </div>
          <div>
             <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Database className="w-3.5 h-3.5"/> Data Science</h3>
             <div className="flex flex-wrap gap-2">
               {['Machine Learning', 'Data Cleaning', 'Data Visualization', 'Data Modeling', 'Time Series', 'Regression'].map((skill, i) => (<span key={i} className="px-2.5 py-1 bg-indigo-50 border border-indigo-100 text-indigo-700 rounded-md text-xs md:text-sm shadow-sm font-mono-clean">{skill}</span>))}
             </div>
          </div>
          <div>
             <h3 className="text-[10px] md:text-xs font-bold text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2"><Shield className="w-3.5 h-3.5"/> Cybersecurity</h3>
             <div className="flex flex-wrap gap-2">
               {['Digital Forensics', 'Malware Analysis', 'GRC Frameworks'].map((skill, i) => (<span key={i} className="px-2.5 py-1 bg-teal-50 border border-teal-100 text-teal-700 rounded-md text-xs md:text-sm shadow-sm font-mono-clean">{skill}</span>))}
             </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Education = ({ onOpenDetail }) => {
  const mscDetails = `> INITIALIZING EDUCATION PROFILE...
> INSTITUTION: Jain University
> DEGREE: MSc. Digital Forensics & Information Security
> STATUS: Currently Enrolled

[ CORE OBJECTIVES & RESEARCH ]
• Mastering advanced forensic methodologies for complex cyber investigations.
• Deep diving into Cyber Laws, Ethics, and Global Compliance Standards.
• Conducting active research in Threat Intelligence and Incident Response.
• Integrating Artificial Intelligence (AI) and Machine Learning (ML) techniques into Governance, Risk, and Compliance (GRC) architectures.
• Analyzing advanced persistent threats (APTs) and modern malware signatures.

[ CURRENT ENGAGEMENT ]
Applying theoretical knowledge to practical, scalable security solutions, bridging the gap between raw data analysis and proactive cybersecurity defenses.`;

  const bscDetails = `> RETRIEVING ARCHIVED RECORDS...
> INSTITUTION: Christ (Deemed to be University)
> DEGREE: BSc. Computer Science, Mathematics, Electronics (CME)
> STATUS: Graduated (2025)

[ FOUNDATIONAL EXPERTISE ACQUIRED ]
• Computer Science: Mastered Data Structures, Algorithms, Object-Oriented Programming (Java), and Python Scripting.
• Mathematics: Built strong analytical capabilities through Calculus, Linear Algebra, Statistical Modeling, Regression Analysis, and Time Series Analysis.
• Electronics: Designed and implemented IoT architectures, sensor integrations, and embedded systems (C++, Arduino).

[ KEY ACHIEVEMENTS ]
• Developed an 'Automated Garbage Disposal System' showcased at the Department of Physics & Electronics Project Exhibition (March 2025).
• Laid the groundwork for advanced Machine Learning modeling through extensive data cleaning and visualization projects.
• Established a robust interdisciplinary foundation essential for modern cybersecurity and forensic data analysis.`;

  const pucDetails = `> RETRIEVING HIGH SCHOOL RECORDS...
> INSTITUTION: Vishwa Chethana PU College
> LEVEL: Class 12th (Pre-University)
> COMBINATION: PCMB (Physics, Chemistry, Mathematics, Biology)
> PERFORMANCE: 79%

[ CORE STUDIES ]
• Established a rigorous scientific methodology through intensive Physics and Chemistry coursework.
• Developed advanced quantitative and problem-solving skills via Mathematics.
• Gained foundational biological insights, setting the stage for future bioinformatics or microbial analysis applications.`;

  const schoolDetails = `> RETRIEVING SECONDARY RECORDS...
> INSTITUTION: Anekal Public School
> LEVEL: Class 10th
> PERFORMANCE: 86%

[ CORE STUDIES ]
• Built a strong academic foundation across all core subjects.
• Demonstrated consistent academic excellence and dedication to learning.`;

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar px-4 md:px-8 pb-safe flex flex-col">
      <div className="glass-panel p-5 md:p-8 flex flex-col w-full max-w-6xl mx-auto h-full relative">
        <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-slate-200/50 pb-4 flex-shrink-0">
          <div className="p-2 bg-rose-50 rounded-xl"><BookOpen className="text-rose-600 w-5 h-5 md:w-6 md:h-6" /></div>
          <ScrambleText text="Academic Journey" className="text-xl md:text-2xl font-bold text-slate-800" as="h2" />
          <span className="text-xs font-mono-clean text-teal-600 ml-auto flex items-center gap-1 animate-pulse"><Maximize2 className="w-3 h-3"/> [CLICK_TO_DECRYPT]</span>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-8 flex-grow">
          <div onClick={() => onOpenDetail({ title: "MSc. Digital Forensics", subtitle: "Jain University", icon: Shield, color: "text-indigo-600", bg: "bg-indigo-50", details: mscDetails })}
            className="aesthetic-card p-5 md:p-6 flex flex-col border-l-4 border-l-indigo-500 group row-span-2">
            <div className="cyber-corners"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2.5 md:p-3 bg-indigo-50 rounded-xl text-indigo-600 group-hover:scale-110 transition-transform"><Shield className="w-5 h-5 md:w-6 md:h-6" /></div>
              <span className="px-3 py-1 bg-indigo-600 text-white font-mono-clean font-bold text-[10px] md:text-xs rounded-full shadow-sm">ACTIVE</span>
            </div>
            <h3 className="text-lg md:text-2xl font-extrabold text-slate-800 mb-1 leading-tight group-hover:text-indigo-600 transition-colors relative z-10">MSc. Digital Forensics & Info Sec.</h3>
            <p className="text-indigo-600 font-bold text-sm md:text-base mb-4 relative z-10">Jain University</p>
            <div className="mt-auto relative z-10">
              <div className="flex flex-wrap gap-2 font-mono-clean">
                <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-[10px] md:text-xs font-semibold border border-slate-200">Forensics</span>
                <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-[10px] md:text-xs font-semibold border border-slate-200">Cyber Laws</span>
                <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-[10px] md:text-xs font-semibold border border-slate-200">Threat Intel</span>
              </div>
            </div>
          </div>

          <div onClick={() => onOpenDetail({ title: "BSc. CME", subtitle: "Christ University", icon: Code, color: "text-teal-600", bg: "bg-teal-50", details: bscDetails })}
            className="aesthetic-card p-5 md:p-6 flex flex-col border-l-4 border-l-teal-500 group row-span-2">
            <div className="cyber-corners"></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className="p-2.5 md:p-3 bg-teal-50 rounded-xl text-teal-600 group-hover:scale-110 transition-transform"><Code className="w-5 h-5 md:w-6 md:h-6" /></div>
              <span className="px-3 py-1 bg-slate-100 text-slate-500 font-mono-clean font-bold text-[10px] md:text-xs rounded-full border border-slate-200">COMPLETE_2025</span>
            </div>
            <h3 className="text-lg md:text-2xl font-extrabold text-slate-800 mb-1 group-hover:text-teal-600 transition-colors relative z-10">BSc. CME</h3>
            <p className="text-slate-500 text-xs md:text-sm font-medium mb-1 relative z-10">(Computer Science, Mathematics, Electronics)</p>
            <p className="text-teal-600 font-bold text-sm md:text-base mb-4 relative z-10">Christ (Deemed to be University)</p>
            <div className="mt-auto relative z-10">
              <div className="flex flex-wrap gap-2 font-mono-clean">
                <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-[10px] md:text-xs font-semibold border border-slate-200">Analytics</span>
                <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-[10px] md:text-xs font-semibold border border-slate-200">IoT</span>
                <span className="px-2 py-1 bg-slate-50 text-slate-600 rounded text-[10px] md:text-xs font-semibold border border-slate-200">ML</span>
              </div>
            </div>
          </div>
          
          <div onClick={() => onOpenDetail({ title: "Class 12th (PCMB)", subtitle: "Vishwa Chethana PU College", icon: GraduationCap, color: "text-amber-600", bg: "bg-amber-50", details: pucDetails })}
            className="aesthetic-card p-4 md:p-5 flex flex-col border-l-4 border-l-amber-500 group">
             <div className="cyber-corners"></div>
             <div className="flex justify-between items-start mb-2 relative z-10">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-600 group-hover:scale-110 transition-transform"><GraduationCap className="w-4 h-4" /></div>
              <span className="text-lg font-mono-clean font-black text-amber-600">79%</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-800 group-hover:text-amber-600 transition-colors relative z-10">Class 12th (PCMB)</h3>
            <p className="text-slate-500 text-xs font-medium relative z-10">Vishwa Chethana PU College</p>
          </div>

          <div onClick={() => onOpenDetail({ title: "Class 10th", subtitle: "Anekal Public School", icon: School, color: "text-rose-600", bg: "bg-rose-50", details: schoolDetails })}
            className="aesthetic-card p-4 md:p-5 flex flex-col border-l-4 border-l-rose-500 group">
             <div className="cyber-corners"></div>
             <div className="flex justify-between items-start mb-2 relative z-10">
              <div className="p-2 bg-rose-50 rounded-lg text-rose-600 group-hover:scale-110 transition-transform"><School className="w-4 h-4" /></div>
              <span className="text-lg font-mono-clean font-black text-rose-600">86%</span>
            </div>
            <h3 className="text-base font-extrabold text-slate-800 group-hover:text-rose-600 transition-colors relative z-10">Class 10th</h3>
            <p className="text-slate-500 text-xs font-medium relative z-10">Anekal Public School</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Projects = ({ onOpenDetail }) => {
  const projectsData = [
    { tag: "SEC_ANALYSIS", title: "Static Malware Analyser", desc: "Robust analyzer for examining malicious software without execution, extracting static properties and IOCs.", tech: "Python, YARA, PEfile", icon: FileText, color: "text-indigo-600", bg: "bg-indigo-50", details: `> EXECUTING PROJECT PROFILE: STATIC MALWARE ANALYSER...\n\n[ OVERVIEW ]\nDeveloped a comprehensive Static Malware Analysis tool designed to safely dissect and examine potentially malicious executables without risking system infection.\n\n[ KEY FEATURES & CAPABILITIES ]\n• Automated extraction of Portable Executable (PE) headers, sections, and import/export tables using Python's PEfile library.\n• Integration with YARA rules to identify known malware signatures and suspicious byte patterns rapidly.\n• Extraction of embedded Strings (ASCII/Unicode) to uncover hidden URLs, IP addresses, and command-line arguments (Indicators of Compromise - IOCs).\n• Hash generation (MD5, SHA-256) for quick cross-referencing with global threat databases like VirusTotal.\n\n[ IMPACT ]\nSignificantly reduces the initial triage time for security analysts, providing immediate visibility into software intent before dynamic execution in a sandbox environment is required.` },
    { tag: "AI_GRC", title: "AI-Integrated GRC Framework", desc: "Intelligent Governance, Risk, and Compliance framework leveraging AI to automate compliance mapping.", tech: "Python, AI/ML, Policy", icon: ShieldAlert, color: "text-teal-600", bg: "bg-teal-50", details: `> EXECUTING PROJECT PROFILE: AI-INTEGRATED GRC FRAMEWORK...\n\n[ OVERVIEW ]\nSpearheading the development of a next-generation Governance, Risk, and Compliance (GRC) framework that utilizes Artificial Intelligence to streamline and automate organizational security policies.\n\n[ KEY FEATURES & CAPABILITIES ]\n• Natural Language Processing (NLP) integration to automatically read, parse, and map internal security policies against global frameworks (NIST, ISO 27001, GDPR).\n• Automated Risk Scoring based on historical data and real-time network configurations.\n• Predictive compliance modeling to identify potential regulatory gaps before audits occur.\n• Dynamic dashboarding for security officers to visualize the organization's compliance posture in real-time.\n\n[ IMPACT ]\nTransforms GRC from a manual, spreadsheet-heavy burden into a proactive, continuous, and intelligent process, drastically reducing compliance overhead and minimizing human error.` },
    { tag: "DATA_SCI", title: "Microbial Analysis (AI/ML)", desc: "Machine learning project analyzing and predicting patterns in microbial data using regression and classification.", tech: "Scikit-Learn, Pandas", icon: BrainCircuit, color: "text-rose-600", bg: "bg-rose-50", details: `> EXECUTING PROJECT PROFILE: MICROBIAL DATA ANALYSIS...\n\n[ OVERVIEW ]\nAn advanced interdisciplinary research project applying modern Machine Learning algorithms to complex biological datasets to predict and classify microbial growth patterns.\n\n[ KEY FEATURES & CAPABILITIES ]\n• Extensive Data Cleaning and preprocessing of raw, noisy laboratory datasets using Python (Pandas/NumPy).\n• Implementation of Classification models (Random Forests, SVM) to categorize microbial strains based on environmental variables.\n• Utilization of Regression Analysis to predict growth rates over specific time-series intervals under varying conditions.\n• Creation of rich Data Visualizations (Matplotlib, Seaborn) to present actionable insights to biological researchers.\n\n[ IMPACT ]\nDemonstrates the powerful crossover of data science skills into highly specialized scientific fields, showcasing adaptability, advanced mathematical modeling, and rigorous statistical analysis.` },
    { tag: "HARDWARE", title: "Auto Garbage Disposal", desc: "Automated IoT electronics system exhibited at the Dept. of Physics & Electronics, Christ University.", tech: "Arduino, Sensors, C++", icon: Cpu, color: "text-amber-600", bg: "bg-amber-50", details: `> EXECUTING PROJECT PROFILE: AUTO GARBAGE DISPOSAL SYSTEM...\n\n[ OVERVIEW ]\nA hardware-based IoT initiative designed to modernize waste management through automation. Proudly exhibited at the Department of Physics and Electronics Exhibition at Christ University (March 5, 2025).\n\n[ KEY FEATURES & CAPABILITIES ]\n• Integration of Ultrasonic Sensors to detect the presence and fill-level of waste receptacles in real-time.\n• Automated lid operation using servo motors triggered by proximity sensors, ensuring a touchless, hygienic user experience.\n• Programmed entirely in C++ using the Arduino microcontroller environment.\n• Designed with low-power consumption logic for extended deployment.\n\n[ IMPACT ]\nSuccessfully merged physical electronics engineering with software logic to create a functional, real-world prototype aimed at improving sanitation and smart-campus infrastructure.` }
  ];

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar px-4 md:px-8 pb-safe flex flex-col">
      <div className="glass-panel p-5 md:p-8 flex flex-col w-full max-w-6xl mx-auto h-full">
        <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-slate-200/50 pb-4 flex-shrink-0">
          <div className="p-2 bg-indigo-50 rounded-xl"><Briefcase className="text-indigo-600 w-5 h-5 md:w-6 md:h-6" /></div>
          <ScrambleText text="Innovative Projects" className="text-xl md:text-2xl font-bold text-slate-800" as="h2" />
          <span className="text-xs font-mono-clean text-teal-600 ml-auto flex items-center gap-1 animate-pulse"><Maximize2 className="w-3 h-3"/> [CLICK_TO_DECRYPT]</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {projectsData.map((proj, idx) => {
            const IconComp = proj.icon;
            return (
              <div 
                key={idx} onClick={() => onOpenDetail({ title: proj.title, subtitle: proj.tag, icon: proj.icon, color: proj.color, bg: proj.bg, details: proj.details })}
                className="aesthetic-card p-5 flex flex-col h-full group"
              >
                <div className="cyber-corners"></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className={`p-2.5 rounded-xl ${proj.bg} ${proj.color} shadow-sm group-hover:scale-110 transition-transform`}><IconComp className="w-5 h-5" /></div>
                  <span className={`px-2.5 py-1 rounded-md text-[10px] md:text-xs font-bold font-mono-clean tracking-wide ${proj.bg} ${proj.color}`}>{proj.tag}</span>
                </div>
                <h3 className="text-base md:text-xl font-extrabold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors relative z-10">{proj.title}</h3>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed mb-4 flex-grow font-medium relative z-10">{proj.desc}</p>
                <div className="mt-auto pt-3 border-t border-slate-100 relative z-10 flex justify-between items-end">
                  <div>
                    <p className="text-[9px] md:text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1 flex items-center gap-1"><Code className="w-3 h-3"/> STACK</p>
                    <p className="text-xs md:text-sm font-semibold text-slate-700 font-mono-clean">{proj.tech}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Certificates = ({ onOpenDetail }) => {
  const certs = [
    { title: "Information Security", org: "HCL GUVI", date: "May 2026", icon: Shield, color: "text-emerald-600", bg: "bg-emerald-50", details: `> VERIFYING CREDENTIAL: INFORMATION SECURITY...\n> ISSUER: HCL GUVI (Google for Education Partner)\n> DATE: May 3, 2026\n> ID: j9S7Q01897UG73FA12\n\n[ CERTIFICATION DETAILS ]\nAwarded for the successful completion of the Information Security certification, demonstrating proficiency in core cybersecurity principles.\n\n[ SKILLS VALIDATED ]\n• Understanding of fundamental information security concepts.\n• Threat modeling and vulnerability identification.\n• Best practices for securing networks and applications.\n• Identity and access management principles.` },
    { title: "Accounting Foundations & GAAP", org: "LinkedIn Learning", date: "Apr 2026", icon: BarChart3, color: "text-slate-600", bg: "bg-slate-100", details: `> VERIFYING CREDENTIAL: ACCOUNTING & FINANCE...\n> ISSUER: LinkedIn Learning\n> DATE: April 2026\n> ID: a8acc616c22fbf0712637db8f618fff394b1b4ddecd6ca4f68228e449fec0efa\n\n[ CERTIFICATION DETAILS ]\nCompleted foundational courses in Accounting, Corporate Finance, Managerial Finance, and GAAP standards.\n\n[ SKILLS VALIDATED ]\n• Corporate and Managerial Finance principles.\n• Understanding Generally Accepted Accounting Principles (GAAP).\n• Financial reporting and compliance basics.` },
    { title: "AI in Risk Mgt & Fraud Detection", org: "LinkedIn Learning", date: "Apr 2026", icon: BrainCircuit, color: "text-rose-600", bg: "bg-rose-50", details: `> VERIFYING CREDENTIAL: AI IN RISK MANAGEMENT...\n> ISSUER: LinkedIn Learning\n> DATE: April 20, 2026\n> ID: 7df1a092727f77bf3084d4d18c1c2cf30086c9f09a910c832dla100f21e35626\n\n[ CERTIFICATION DETAILS ]\nCompleted specialized coursework on leveraging Artificial Intelligence for business risk assessment and fraud analysis.\n\n[ SKILLS VALIDATED ]\n• AI implementation for Business operations.\n• Advanced Fraud Analysis and pattern recognition techniques.\n• Automated Risk Assessment protocols and strategies.` },
    { title: "Intro to Risk Management Finance", org: "PMI / LinkedIn Learning", date: "Apr 2026", icon: Activity, color: "text-purple-600", bg: "bg-purple-50", details: `> VERIFYING CREDENTIAL: RISK MANAGEMENT...\n> ISSUER: Project Management Institute (PMI)® / LinkedIn\n> DATE: April 20, 2026\n> ID: 4b807500d13e1608e3121c8ba88e22641322b85264e0252db3bbbell3c813076\n\n[ CERTIFICATION DETAILS ]\nCompleted training from an authorized PMI partner focusing on the financial aspects of risk management within project environments.\n\n[ SKILLS VALIDATED ]\n• Financial Risk Assessment and quantitative analysis techniques.\n• Mitigation strategy formulation for monetary exposure.\n• Aligning project goals with enterprise-level risk tolerance.` },
    { title: "Cybersecurity Foundations: GRC", org: "LinkedIn Learning", date: "Mar 2026", icon: Shield, color: "text-indigo-600", bg: "bg-indigo-50", details: `> VERIFYING CREDENTIAL: GRC FOUNDATIONS...\n> ISSUER: LinkedIn Learning\n> DATE: March 30, 2026\n> ID: 19a9dccdlfffbcf74f300f068acc0f12b9c55fb0d436e7f921e3133990dd5a42\n\n[ CERTIFICATION DETAILS ]\nCompleted specialized coursework focused on the strategic alignment of IT with business objectives through Governance, Risk Management, and Compliance.\n\n[ SKILLS VALIDATED ]\n• Understanding regulatory frameworks and compliance auditing.\n• Implementing organizational risk management strategies.\n• Establishing robust cybersecurity governance structures and policies.` },
    { title: "Exploring IoT w/ Cisco Packet Tracer", org: "Cisco Networking Academy", date: "Mar 2026", icon: Wifi, color: "text-blue-600", bg: "bg-blue-50", details: `> VERIFYING CREDENTIAL: CISCO IOT EXPLORER...\n> ISSUER: Cisco Networking Academy\n> DATE: March 17, 2026\n\n[ CERTIFICATION DETAILS ]\nSuccessfully completed comprehensive training on the Internet of Things (IoT) utilizing Cisco's advanced Packet Tracer simulation environment.\n\n[ SKILLS VALIDATED ]\n• Connecting and configuring IoT devices and sensors within a simulated network infrastructure.\n• Understanding the core components of IoT architectures and data flow.\n• Basic network security protocols applicable to connected devices.\n• Demonstrated practical ability to design, build, and troubleshoot smart systems digitally.` },
    { title: "National Hackathon: Tech for Ag.", org: "Jain University & IBM", date: "Mar 2026", icon: Cpu, color: "text-emerald-600", bg: "bg-emerald-50", details: `> VERIFYING CREDENTIAL: HACKATHON PARTICIPATION...\n> ISSUER: Jain (Deemed-to-be University) & IBM\n> EVENT: National Hackathon - Tech for Agriculture\n> TEAM: CropData\n\n[ CERTIFICATION DETAILS ]\nCertificate of Participation awarded for successfully participating and submitting an entry in the Round-1 Online Screening.\n\n[ SKILLS VALIDATED ]\n• Rapid prototyping for agricultural technology solutions.\n• Team collaboration and competitive project pitching.\n• Integrating technology (AI/IoT/Data) to address real-world agriculture sector challenges.` },
    { title: "Operations Job Simulation", org: "Goldman Sachs / Forage", date: "Dec 2025", icon: Briefcase, color: "text-sky-600", bg: "bg-sky-50", details: `> VERIFYING CREDENTIAL: JOB SIMULATION...\n> ISSUER: Goldman Sachs (via Forage)\n> DATE: December 21, 2025\n> CODE: RMmRHJ8DEnoYNp2kp\n\n[ CERTIFICATION DETAILS ]\nCompleted practical tasks simulating the daily responsibilities of the Operations division at Goldman Sachs.\n\n[ SKILLS VALIDATED ]\n• Foundations of corporate operations and process execution.\n• Facilitating ultra-high net worth transactions.\n• Process optimization and financial workflow management.` },
    { title: "Data Analytics Job Simulation", org: "Deloitte / Forage", date: "Dec 2025", icon: HardDrive, color: "text-lime-600", bg: "bg-lime-50", details: `> VERIFYING CREDENTIAL: DATA ANALYTICS SIMULATION...\n> ISSUER: Deloitte (via Forage)\n> DATE: December 21, 2025\n> CODE: Kf9hx9evd83nLJ6E6\n\n[ CERTIFICATION DETAILS ]\nSuccessfully completed a practical, industry-standard job simulation simulating the daily tasks of a Deloitte Data Analyst within the Forensic Technology division.\n\n[ SKILLS VALIDATED ]\n• Advanced Data Analysis techniques applied to real-world corporate datasets.\n• Forensic Technology methodologies for discovering anomalies and patterns.\n• Data cleaning, structuring, and visualization for executive reporting.` },
    { title: "100 Days of Python Expert", org: "HCL GUVI", date: "Dec 2025", icon: Terminal, color: "text-emerald-600", bg: "bg-emerald-50", details: `> VERIFYING CREDENTIAL: 100 DAYS OF PYTHON...\n> ISSUER: HCL GUVI (Google for Education Partner)\n> DATE: December 17, 2025\n> ID: 6L691f6i59N8s5wK77\n\n[ CERTIFICATION DETAILS ]\nAwarded for the rigorous and successful completion of the "100 Days of Python Expert" intensive bootcamp, demonstrating long-term commitment to software development.\n\n[ SKILLS VALIDATED ]\n• Advanced Python syntax, object-oriented programming, and functional paradigms.\n• Development of complex automation scripts and tool building.\n• Working with external APIs, databases, and extensive library ecosystems.\n• Rigorous daily problem-solving and algorithmic thinking.` },
    { title: "Crisis Mgt in Fraud Investigations", org: "C4E & CLUE4", date: "Sep 2025", icon: Search, color: "text-amber-600", bg: "bg-amber-50", details: `> VERIFYING CREDENTIAL: FRAUD INVESTIGATION CRISIS MGT...\n> ISSUER: C4E Institute for Investigative Studies & CLUE4\n> DATE: September 29, 2025\n\n[ CERTIFICATION DETAILS ]\nCertificate of Participation awarded for active engagement in the specialized webinar focusing on high-stakes fraud investigations.\n\n[ SKILLS VALIDATED ]\n• Crisis response protocols during active fraud discovery.\n• Evidence preservation and chain of custody basics.\n• Investigative methodologies tailored for rapid incident containment.` },
    { title: "Electronics Project Exhibition", org: "Christ University", date: "Mar 2025", icon: Award, color: "text-rose-600", bg: "bg-rose-50", imgPreview: "1000125517.jpg", details: `> VERIFYING CREDENTIAL: PROJECT EXHIBITION...\n> ISSUER: Dept. of Physics and Electronics, Christ University\n> DATE: March 5, 2025\n\n[ CERTIFICATION DETAILS ]\nOfficial recognition for the successful design, build, and exhibition of the "Automatic Garbage Disposal System" during the VI semester BSc. CME program.\n\n[ SKILLS VALIDATED ]\n• End-to-end hardware project lifecycle (design, build, test, present).\n• Practical application of IoT sensors, microcontrollers, and actuators.\n• Technical presentation and demonstration skills.` }
  ];

  return (
    <div className="h-full w-full overflow-y-auto custom-scrollbar px-4 md:px-8 pb-safe flex flex-col">
      <div className="glass-panel p-5 md:p-8 flex flex-col w-full max-w-6xl mx-auto min-h-full">
        <div className="flex items-center gap-3 mb-6 md:mb-8 border-b border-slate-200/50 pb-4 flex-shrink-0">
          <div className="p-2 bg-amber-50 rounded-xl"><Award className="text-amber-600 w-5 h-5 md:w-6 md:h-6" /></div>
          <ScrambleText text="Certifications Vault" className="text-xl md:text-2xl font-bold text-slate-800" as="h2" />
          <span className="text-xs font-mono-clean text-teal-600 ml-auto flex items-center gap-1 animate-pulse"><Maximize2 className="w-3 h-3"/> [CLICK_TO_DECRYPT]</span>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {certs.map((cert, idx) => {
            const IconComp = cert.icon;
            return (
              <div 
                key={idx} onClick={() => onOpenDetail({ title: cert.title, subtitle: cert.org, icon: cert.icon, color: cert.color, bg: cert.bg, details: cert.details })}
                className="aesthetic-card p-4 flex flex-col group"
              >
                <div className="cyber-corners"></div>
                <div className="flex justify-between items-start mb-3 relative z-10">
                   <div className={`p-2 rounded-xl ${cert.bg} ${cert.color} shadow-sm group-hover:scale-110 transition-transform`}><IconComp className="w-4 h-4" /></div>
                   <span className="text-[10px] font-bold font-mono-clean text-slate-500 bg-slate-100 px-2 py-1 rounded-md tracking-wide border border-slate-200">{cert.date}</span>
                </div>
                <div className="flex-grow flex flex-col relative z-10">
                  <h3 className="text-sm md:text-base font-extrabold text-slate-800 mb-1 leading-snug group-hover:text-indigo-600 transition-colors">{cert.title}</h3>
                  <p className="text-xs font-medium text-slate-500 flex items-center mt-auto">{cert.org}</p>
                </div>
                {cert.imgPreview && (
                  <div className="mt-3 relative h-16 w-full rounded border border-slate-200 overflow-hidden group-hover:shadow-md transition-all z-10">
                    <img src={cert.imgPreview} alt={cert.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError={(e) => e.target.style.display = 'none'} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

const Contact = () => (
  <div className="h-full w-full overflow-y-auto custom-scrollbar px-4 md:px-8 pb-safe flex flex-col">
    <div className="glass-panel p-5 md:p-8 flex flex-col w-full max-w-6xl mx-auto h-full justify-center relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(20,184,166,0.05)_0%,transparent_70%)] pointer-events-none"></div>

      <div className="flex items-center gap-3 mb-8 mx-auto flex-shrink-0 relative z-10">
        <div className="p-2 bg-teal-50 rounded-xl"><Mail className="text-teal-600 w-5 h-5 md:w-6 md:h-6" /></div>
        <ScrambleText text="Secure Uplink" className="text-xl md:text-2xl font-bold text-slate-800" as="h2" />
      </div>
      <div className="flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-6 md:space-y-8 pb-8 relative z-10">
        <div className="relative w-24 h-24 md:w-32 md:h-32 flex items-center justify-center">
           <div className="absolute inset-0 rounded-full border border-dashed border-teal-400 opacity-50 animate-[spin_10s_linear_infinite]"></div>
           <div className="absolute inset-2 rounded-full border border-teal-300 bg-white shadow-lg flex items-center justify-center">
              <Lock className="w-8 h-8 md:w-12 md:h-12 text-teal-600 relative z-10" />
           </div>
        </div>
        <div>
          <h3 className="text-2xl md:text-3xl font-extrabold text-slate-800 mb-3 font-mono-clean">STATUS: ONLINE</h3>
          <p className="text-slate-600 mb-8 text-sm md:text-base font-medium px-4 leading-relaxed">
            Ready to collaborate on data analysis, develop robust Python tools, or explore the latest in digital forensics and GRC.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full px-4">
            <a href="#" className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 border border-slate-200 px-5 py-3 rounded-xl transition-all text-slate-700 font-bold shadow-sm hover:-translate-y-1 w-full sm:w-auto">
              <Linkedin className="w-5 h-5 text-[#0a66c2]" /> LinkedIn
            </a>
            <a href="#" className="flex items-center justify-center gap-2 bg-[#0f172a] hover:bg-[#1e293b] border border-[#0f172a] px-5 py-3 rounded-xl transition-all text-white font-bold shadow-sm hover:-translate-y-1 w-full sm:w-auto">
              <Github className="w-5 h-5 text-teal-400" /> GitHub
            </a>
            <a href="mailto:contact@example.com" className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 border border-indigo-600 px-5 py-3 rounded-xl transition-all text-white font-bold shadow-sm hover:-translate-y-1 w-full sm:w-auto group">
              <Terminal className="w-5 h-5 group-hover:animate-pulse" /> Ping Me
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Main Application Wrapper ---

export default function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const [direction, setDirection] = useState('next');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [activeDetail, setActiveDetail] = useState(null);

  useEffect(() => {
    const handleGlobalMouseMove = (e) => {
      document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
    };
    window.addEventListener('mousemove', handleGlobalMouseMove);
    return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
  }, []);

  const pages = [
    { name: 'Home', component: Home, icon: Home },
    { name: 'About', component: About, icon: User },
    { name: 'Education', component: Education, icon: BookOpen },
    { name: 'Projects', component: Projects, icon: Briefcase },
    { name: 'Certificates', component: Certificates, icon: Award },
    { name: 'Contact', component: Contact, icon: Mail }
  ];

  const handleNavigate = (index) => {
    if (index === currentPage || isTransitioning) return;
    setDirection(index > currentPage ? 'next' : 'prev');
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentPage(index);
      setIsTransitioning(false);
    }, 450); 
  };

  const navNext = () => handleNavigate(Math.min(pages.length - 1, currentPage + 1));
  const navPrev = () => handleNavigate(Math.max(0, currentPage - 1));

  const transitionClass = isTransitioning 
    ? (direction === 'next' ? 'page-exit-next' : 'page-exit-prev')
    : (direction === 'next' ? 'page-enter-next' : 'page-enter-prev');

  const CurrentIcon = pages[currentPage].icon;

  return (
    <>
      <style>{lightThemeStyles}</style>
      
      <div className="h-screen w-full relative flex flex-col text-slate-800 selection:bg-teal-200 selection:text-teal-900 bg-slate-50 overflow-hidden">
        
        <div className="cyber-scanline"></div>
        <CyberBackgroundMap />
        <TypingModal data={activeDetail} onClose={() => setActiveDetail(null)} />

        <div className="hidden lg:flex fixed bottom-6 right-8 z-50 flex-col items-end opacity-50 font-mono-clean text-[10px] text-indigo-600 pointer-events-none select-none">
          <p>SYS.SEC.ACTIVE</p>
          <p>MEM: <span className="text-teal-600">ALLOCATED</span></p>
          <p>NET: <span className="animate-pulse">CONNECTED</span></p>
        </div>

        <div className="relative z-10 flex flex-col h-full w-full mx-auto max-w-screen-2xl">
          <header className="flex justify-between items-center p-4 md:p-6 lg:px-8 flex-shrink-0 z-40">
            <div className="flex items-center gap-2 cursor-pointer group glass-panel px-4 py-2 hover:border-indigo-300 transition-colors" onClick={() => handleNavigate(0)}>
              <div className="p-1.5 bg-indigo-100 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all"><Terminal className="w-5 h-5" /></div>
              <span className="text-xl font-extrabold tracking-tight text-slate-800 hidden sm:block">ARJUN<span className="text-indigo-600 animate-pulse">_</span></span>
            </div>
            
            <nav className="hidden lg:flex gap-1 p-1.5 glass-panel">
              {pages.map((page, idx) => {
                const NavIcon = page.icon;
                return (
                  <button 
                    key={idx} onClick={() => handleNavigate(idx)}
                    className={`relative px-4 py-2 rounded-xl font-bold text-sm transition-all duration-300 ${currentPage === idx ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'}`}
                  >
                    <span className="relative z-10 flex items-center gap-2"><NavIcon className="w-4 h-4" />{page.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="lg:hidden glass-panel px-4 py-2 text-indigo-600 font-bold text-sm flex items-center gap-2 shadow-sm font-mono-clean">
               <CurrentIcon className="w-4 h-4" />[{pages[currentPage].name.toUpperCase()}]
            </div>
          </header>

          <main className="flex-grow relative overflow-hidden w-full h-full">
             <div className={`absolute inset-0 w-full h-full pt-2 ${transitionClass}`}>
               {React.createElement(pages[currentPage].component, { onOpenDetail: setActiveDetail })}
             </div>
          </main>

          <footer className="fixed bottom-0 left-0 w-full glass-panel !rounded-none !border-x-0 !border-b-0 p-3 sm:p-4 z-40 flex justify-between items-center md:static md:bg-transparent md:border-none md:p-6 md:px-8 md:!shadow-none md:!backdrop-filter-none">
            {currentPage !== 0 ? (
              <button onClick={navPrev} disabled={isTransitioning} className="bg-white text-slate-700 border border-slate-200 hover:border-indigo-400 hover:text-indigo-600 shadow-sm px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl flex items-center gap-1 sm:gap-2 font-bold text-xs sm:text-sm disabled:opacity-50 transition-all">
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" /> <span className="hidden sm:inline">SYS.PREV</span><span className="sm:hidden">Back</span>
              </button>
            ) : <div className="w-20"></div>}
            
            {currentPage !== pages.length - 1 && (
              <button onClick={navNext} disabled={isTransitioning} className="bg-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-lg px-6 sm:px-8 py-2.5 sm:py-3 rounded-xl flex items-center gap-1 sm:gap-2 font-bold text-xs sm:text-sm disabled:opacity-50 ml-auto transition-all font-mono-clean">
                <span className="hidden sm:inline">{currentPage === 0 ? 'EXECUTE.START' : 'SYS.NEXT'}</span><span className="sm:hidden">Next</span> <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            )}
          </footer>
        </div>
      </div>
    </>
  );
}