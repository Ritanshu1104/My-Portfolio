/**
 * Ritanshu Mahajan - Portfolio JavaScript Logic
 * Modern, Interactive, Fast
 */

document.addEventListener('DOMContentLoaded', () => {
  initNeuralCanvas();
  initTypewriter();
  initTerminal();
  initProjectModals();
  initFilters();
  initMobileNav();
  initSmoothScroll();
});

/* ----------------------------------------------------
   1. Interactive Neural Canvas Background
---------------------------------------------------- */
function initNeuralCanvas() {
  const canvas = document.getElementById('neural-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const mouse = { x: null, y: null, radius: 140 };

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseleave', () => {
    mouse.x = null;
    mouse.y = null;
  });

  const particleCount = Math.min(Math.floor((width * height) / 14000), 75);
  const particles = [];

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.75;
      this.vy = (Math.random() - 0.5) * 0.75;
      this.radius = Math.random() * 2 + 1;
      this.color = Math.random() > 0.4 ? 'rgba(16, 185, 129, ' : 'rgba(56, 189, 248, ';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * force * 2;
          this.y -= Math.sin(angle) * force * 2;
        }
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color + '0.6)';
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting synapses
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 115) {
          const alpha = (1 - dist / 115) * 0.22;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    // Update and draw particles
    particles.forEach((p) => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animate);
  }

  animate();
}

/* ----------------------------------------------------
   2. Dynamic Typewriter Effect
---------------------------------------------------- */
function initTypewriter() {
  const el = document.getElementById('typewriter-text');
  if (!el) return;

  const phrases = [
    'Software Development Engineer (SDE)',
    'AI & Machine Learning Specialist',
    'Deep Learning & CV Pipeline Builder',
    'Full-Stack Developer (Django & React)',
    'MCA Scholar @ VIT University (8.54 CGPA)'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let delay = 90;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      delay = 45;
    } else {
      el.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      delay = 90;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      delay = 2000; // Pause at full phrase
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ----------------------------------------------------
   3. Interactive Developer Terminal Emulator
---------------------------------------------------- */
function initTerminal() {
  const output = document.getElementById('terminal-output');
  const input = document.getElementById('terminal-input');
  if (!output || !input) return;

  const commands = {
    help: () => `
<div class="text-emerald-400 font-semibold mb-1">Available Commands:</div>
  <span class="text-cyan-300 font-mono">whoami</span>       - Quick bio & current education
  <span class="text-cyan-300 font-mono">skills</span>       - Core technical stack (AI, Web, Languages)
  <span class="text-cyan-300 font-mono">projects</span>     - Key projects with links
  <span class="text-cyan-300 font-mono">hackathons</span>   - Hackathon achievements & innovations
  <span class="text-cyan-300 font-mono">education</span>    - Academics & degrees
  <span class="text-cyan-300 font-mono">certifications</span>- Certifications earned
  <span class="text-cyan-300 font-mono">contact</span>      - Email, phone, socials
  <span class="text-cyan-300 font-mono">sudo hire</span>    - Instant recruit shortcut 😉
  <span class="text-cyan-300 font-mono">clear</span>        - Clear terminal screen
`,
    whoami: () => `
<div><span class="text-emerald-400 font-bold">Ritanshu Mahajan</span> — Software Development Engineer (SDE) & AI/ML Engineer.</div>
<div class="text-slate-300 mt-1">Currently pursuing MCA at <span class="text-amber-300">Vellore Institute of Technology (VIT)</span> with an <span class="text-emerald-300 font-bold">8.54 CGPA</span>.</div>
<div class="text-slate-400 text-xs mt-1">Passionate about low-latency computer vision, scalable backend architectures, and end-to-end intelligent software solutions.</div>
`,
    skills: () => `
<div class="space-y-1">
  <div><span class="text-emerald-400 font-semibold">🤖 AI/ML:</span> PyTorch, TensorFlow, OpenCV, NumPy, Pandas, CNN, Quantization</div>
  <div><span class="text-cyan-400 font-semibold">💻 Languages:</span> Python, Java, JavaScript, C, SQL, R, HTML5, CSS3</div>
  <div><span class="text-indigo-400 font-semibold">⚙️ Backend/Web:</span> Django, Flask, Node.js, Express, React, Bootstrap</div>
  <div><span class="text-purple-400 font-semibold">🗄️ Databases:</span> PostgreSQL, MongoDB, MySQL, Supabase</div>
  <div><span class="text-amber-400 font-semibold">🏛️ CS Core:</span> DSA, OOP, OS, Networks, DBMS, Cloud Computing</div>
</div>
`,
    projects: () => `
<div class="space-y-1.5">
  <div>🚀 <span class="text-emerald-300 font-bold">Intelligent Sign Language Recognition System</span> (Python, OpenCV, TensorFlow, Flask)</div>
  <div class="text-xs text-slate-400 ml-5">Real-time ISL classifier into text & speech, CNN with quantization for low latency. <a href="https://shorturl.at/N1cH3" target="_blank" class="text-cyan-400 underline">[Repo]</a></div>
  <div>🌐 <span class="text-cyan-300 font-bold">Gurukul - The E-learning Platform</span> (Python, Django, JS, Bootstrap, PostgreSQL)</div>
  <div class="text-xs text-slate-400 ml-5">Personalized paths, interactive multimedia, responsive UI & Django ORM. <a href="https://shorturl.at/oIyFu" target="_blank" class="text-cyan-400 underline">[Repo]</a></div>
  <div>💡 <span class="text-amber-300 font-bold">EdgeEdu</span> (Ignition Hackathon 2026, Texas) - Offline adaptive learning platform.</div>
  <div>🧬 <span class="text-pink-300 font-bold">GeneGuard</span> (HealthHack 2026, VITB-JHU) - Predictive analytics in maternal & child health.</div>
</div>
`,
    hackathons: () => `
<div class="space-y-1">
  <div>🏆 <span class="text-cyan-300 font-bold">Ignition Hackathon 2026</span> (Texas, USA - Participant)</div>
  <div class="text-xs text-slate-400 ml-5">Project: <b>EdgeEdu</b> — Offline adaptive learning platform engineered for low-connectivity zones.</div>
  <div>🏆 <span class="text-emerald-300 font-bold">HealthHack 2026, VITB-JHU</span> (Bhopal, India - Participant)</div>
  <div class="text-xs text-slate-400 ml-5">Project: <b>GeneGuard</b> — Machine learning predictive analytics empowering preventive maternal care.</div>
</div>
`,
    education: () => `
<div class="space-y-1">
  <div>🎓 <span class="text-emerald-400 font-bold">MCA</span> - Vellore Institute of Technology (VIT University) | <b>8.54 CGPA</b> (2025–2027)</div>
  <div>🎓 <span class="text-cyan-400 font-bold">BBA (Computer Applications)</span> - Pune University (Garware College) | <b>8.8 CGPA</b> (2022–2025)</div>
  <div>📜 <span class="text-slate-300">12th HSC</span> - Sir Parashurambhau College | <b>70%</b> (2022)</div>
  <div>📜 <span class="text-slate-300">10th SSC</span> - Greenwoods School | <b>84.40%</b> (2020)</div>
</div>
`,
    certifications: () => `
<div class="space-y-1">
  <div>🏅 <span class="text-amber-300 font-semibold">Kaggle:</span> Python Certification</div>
  <div>🏅 <span class="text-emerald-300 font-semibold">Great Learning:</span> Front End Development (HTML5, CSS3)</div>
  <div>🏅 <span class="text-cyan-300 font-semibold">ServiceNow University:</span> ServiceNow Administration Fundamentals</div>
  <div>🏅 <span class="text-purple-300 font-semibold">Imarticus Learning:</span> Data Analytics and Visualization with Power BI</div>
</div>
`,
    contact: () => `
<div class="space-y-1 text-slate-200">
  <div>📧 Email: <a href="mailto:ritanshupm@gmail.com" class="text-emerald-400 underline">ritanshupm@gmail.com</a></div>
  <div>📱 Phone: <a href="tel:+919579036245" class="text-cyan-400 underline">+91 9579036245</a></div>
  <div>💼 LinkedIn: <a href="https://www.linkedin.com/in/ritanshu-mahajan" target="_blank" class="text-blue-400 underline">linkedin.com/in/ritanshu-mahajan</a></div>
  <div>🐙 GitHub: <a href="https://github.com/Ritanshu1104" target="_blank" class="text-purple-400 underline">github.com/Ritanshu1104</a></div>
</div>
`,
    'sudo hire': () => {
      setTimeout(() => {
        window.location.href = 'mailto:ritanshupm@gmail.com?subject=Exciting%20Opportunity%20for%20Ritanshu%20Mahajan&body=Hi%20Ritanshu,%0D%0A%0D%0AWe%20reviewed%20your%20portfolio%20and%20would%20love%20to%20connect%20with%20you%20regarding%20an%20opportunity!';
      }, 900);
      return `<div class="text-emerald-400 font-bold animate-pulse">Access Granted! Root privileges obtained. 🚀<br><span class="text-slate-300 text-xs">Opening email client to ritanshupm@gmail.com...</span></div>`;
    },
    clear: () => {
      output.innerHTML = '';
      return '';
    }
  };

  function executeCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Append user input line
    const userLine = document.createElement('div');
    userLine.className = 'flex items-center space-x-2 text-slate-300 font-mono text-sm';
    userLine.innerHTML = `<span class="text-emerald-400">ritanshu@dev:~$</span> <span>${escapeHtml(rawCmd)}</span>`;
    output.appendChild(userLine);

    // Run command
    const resLine = document.createElement('div');
    resLine.className = 'text-sm mb-3 mt-1 text-slate-200 pl-4 border-l-2 border-emerald-500/30 font-mono';

    if (commands[cmd]) {
      const result = commands[cmd]();
      if (cmd !== 'clear') {
        resLine.innerHTML = result;
        output.appendChild(resLine);
      }
    } else {
      resLine.innerHTML = `<span class="text-rose-400">Command not found: "${escapeHtml(cmd)}". Type <span class="text-cyan-300 font-bold">help</span> to view all commands.</span>`;
      output.appendChild(resLine);
    }

    input.value = '';
    const scrollContainer = document.getElementById('terminal-scroll-area');
    if (scrollContainer) {
      scrollContainer.scrollTop = scrollContainer.scrollHeight;
    }
  }

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      executeCommand(input.value);
    }
  });

  // Chip click handlers
  window.runTerminalCommand = function (cmd) {
    executeCommand(cmd);
    input.focus();
  };
}

function escapeHtml(string) {
  return String(string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

/* ----------------------------------------------------
   4. Projects & Skills Filter Logic
---------------------------------------------------- */
function initFilters() {
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach((b) => {
        b.classList.remove('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/50');
        b.classList.add('bg-slate-800/60', 'text-slate-400', 'border-white/5');
      });

      btn.classList.add('bg-emerald-500/20', 'text-emerald-300', 'border-emerald-500/50');
      btn.classList.remove('bg-slate-800/60', 'text-slate-400', 'border-white/5');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || (filter === 'hackathon' && card.dataset.hackathon === 'true')) {
          card.classList.remove('hidden');
          card.classList.add('animate-fadeIn');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
}

/* ----------------------------------------------------
   5. Project Deep Dive Modal Logic
---------------------------------------------------- */
const projectDetails = {
  isl: {
    title: 'Intelligent Sign Language Recognition System',
    category: 'AI / Machine Learning & Computer Vision',
    badgeClass: 'badge-ai',
    repoUrl: 'https://shorturl.at/N1cH3',
    overview:
      'A real-time Indian Sign Language (ISL) recognition pipeline designed to bridge communication gaps for the deaf and hard-of-hearing community by translating dynamic hand gestures into text and audible speech.',
    architecture: [
      'Vision Pipeline: Captures live webcam feed using OpenCV with region-of-interest (ROI) skin-tone & contour segmentation.',
      'Deep Learning Model: Custom Deep CNN trained on labeled gesture datasets with data augmentation (rotations, zooms, lighting variations) and Dropout regularization to prevent overfitting.',
      'Optimization & Latency: Profiled and reduced inference latency via Batch Normalization and Post-Training Quantization (FP16/INT8), making it lightweight for real-time edge devices.',
      'Backend & Deployment: Lightweight Flask REST API microservice delivering real-time predictions and audio synthesis output.'
    ],
    tech: ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'CNN Architecture', 'Model Quantization', 'NumPy'],
    metrics: ['Sub-50ms inference latency', 'Over 94% gesture accuracy', 'Zero cloud GPU dependency']
  },
  gurukul: {
    title: 'Gurukul - The E-Learning Platform',
    category: 'Full-Stack Software Development',
    badgeClass: 'badge-sde',
    repoUrl: 'https://shorturl.at/oIyFu',
    overview:
      'A full-featured interactive e-learning platform providing customized learning tracks, rich course multimedia management, and student progress tracking.',
    architecture: [
      'Backend Architecture: Built with Django MTV pattern, utilizing Django ORM, authentication middleware, and secure session management.',
      'Personalized Learning Engine: Algorithms for recommending relevant course modules and tracking curriculum completion milestones.',
      'Interactive Student Experience: Responsive UI with Bootstrap & JavaScript for quiz evaluation, video player embeds, and progress graphs.',
      'Database & Data Integrity: Relational schema in PostgreSQL with automated migrations and relational integrity for enrollments and feedback.'
    ],
    tech: ['Python', 'Django', 'PostgreSQL', 'JavaScript', 'Bootstrap', 'HTML5/CSS3', 'REST API'],
    metrics: ['Role-based access (Students/Instructors/Admins)', 'Responsive on all device screens', 'Modular extensible codebase']
  },
  edgeedu: {
    title: 'EdgeEdu — Offline Adaptive Learning Platform',
    category: 'Hackathon Innovation (Ignition 2026, Texas)',
    badgeClass: 'badge-core',
    repoUrl: 'https://github.com/Ritanshu1104',
    overview:
      'Engineered for the Ignition Hackathon 2026 (Texas, USA), EdgeEdu addresses educational inequality in low-connectivity and rural regions by offering adaptive, offline-first education software.',
    architecture: [
      'Offline-First Sync: Local caching of lightweight curriculum modules with intelligent peer-to-peer / low-bandwidth sync upon network discovery.',
      'Adaptive Micro-Testing: Dynamic difficulty scaling based on student responses computed entirely on-device without remote servers.',
      'Resource Constraint Tuning: Minimized memory and CPU footprint to ensure smooth execution on low-cost tablets and legacy hardware.'
    ],
    tech: ['Python', 'Offline-First Architecture', 'Adaptive Scoring Engine', 'Local Storage Caching'],
    metrics: ['Ignition Hackathon 2026 (Texas, USA)', 'Full functionality without active internet', 'Lightweight memory footprint']
  },
  geneguard: {
    title: 'GeneGuard — Maternal & Child Predictive Care',
    category: 'Hackathon Innovation (HealthHack 2026, VITB-JHU)',
    badgeClass: 'badge-ai',
    repoUrl: 'https://github.com/Ritanshu1104',
    overview:
      'Developed at HealthHack 2026 (VITB-JHU Bhopal), GeneGuard provides intelligent predictive analytics to empower preventive care in maternal and child healthcare.',
    architecture: [
      'Predictive Analytics: Machine learning classification models trained on maternal vital parameters and clinical risk markers.',
      'Preventive Risk Stratification: Real-time risk scoring alerting healthcare workers to potential complications before critical windows.',
      'Clinician Dashboard: Clear data visualizations showing biomarker trends and patient vitals history.'
    ],
    tech: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Power BI / Visualization', 'Predictive Modeling'],
    metrics: ['HealthHack 2026 (VITB-JHU Bhopal)', 'Early-warning risk score system', 'Designed for healthcare practitioners']
  }
};

function initProjectModals() {
  const modal = document.getElementById('project-modal');
  if (!modal) return;

  const modalBackdrop = document.getElementById('modal-backdrop');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  window.openProjectModal = function (projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    document.getElementById('modal-title').textContent = data.title;
    document.getElementById('modal-category').textContent = data.category;
    document.getElementById('modal-category').className = `text-xs px-2.5 py-1 rounded-full font-semibold ${data.badgeClass}`;
    document.getElementById('modal-overview').textContent = data.overview;
    document.getElementById('modal-repo-link').href = data.repoUrl;

    // Tech badges
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = '';
    data.tech.forEach((t) => {
      const badge = document.createElement('span');
      badge.className = 'text-xs px-2.5 py-1 rounded bg-slate-800 text-slate-300 border border-slate-700/60 font-mono';
      badge.textContent = t;
      techContainer.appendChild(badge);
    });

    // Architecture list
    const archContainer = document.getElementById('modal-architecture');
    archContainer.innerHTML = '';
    data.architecture.forEach((item) => {
      const li = document.createElement('li');
      li.className = 'flex items-start text-sm text-slate-300';
      li.innerHTML = `<span class="text-emerald-400 mr-2">▹</span><span>${item}</span>`;
      archContainer.appendChild(li);
    });

    // Metrics list
    const metricsContainer = document.getElementById('modal-metrics');
    metricsContainer.innerHTML = '';
    data.metrics.forEach((m) => {
      const span = document.createElement('span');
      span.className = 'text-xs px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 font-medium';
      span.innerHTML = `✓ ${m}`;
      metricsContainer.appendChild(span);
    });

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };

  window.closeProjectModal = function () {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeProjectModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeProjectModal();
      closeResumeModal();
    }
  });
}

/* ----------------------------------------------------
   6. Resume Modal Controls
---------------------------------------------------- */
window.openResumeModal = function () {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closeResumeModal = function () {
  const resumeModal = document.getElementById('resume-modal');
  if (resumeModal) {
    resumeModal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

/* ----------------------------------------------------
   7. Clipboard & Toast Notifications
---------------------------------------------------- */
window.copyToClipboard = function (text, label) {
  navigator.clipboard.writeText(text).then(
    () => {
      showToast(`✓ Copied ${label} to clipboard!`);
    },
    () => {
      // Fallback
      showToast(`Contact: ${text}`);
    }
  );
};

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-message');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

/* ----------------------------------------------------
   8. Navigation & Smooth Scroll
---------------------------------------------------- */
function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  const links = menu.querySelectorAll('a');
  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

function initSmoothScroll() {
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}
