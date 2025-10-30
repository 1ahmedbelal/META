// Mobile nav
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger?.addEventListener('click',()=>{
  navLinks.classList.toggle('show');
  hamburger.classList.toggle('open');
});

// Intersection Observer for reveal
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('visible'); io.unobserve(e.target); }
  });
},{threshold:0.15});
document.querySelectorAll('.fade-in').forEach(el=>io.observe(el));

// Animated counters
function animateCount(el){
  const target = +el.dataset.count;
  const step = Math.max(1, Math.floor(target/80));
  let n = 0;
  const t = setInterval(()=>{
    n += step;
    if(n >= target){ n = target; clearInterval(t); }
    el.textContent = n.toLocaleString();
  },16);
}
document.querySelectorAll('.stat-num').forEach(animateCount);

// Theme toggle
const root = document.documentElement;
const toggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('meta-theme');
if(saved==='dark'){ root.classList.add('dark'); }
toggle?.addEventListener('click',()=>{
  root.classList.toggle('dark');
  localStorage.setItem('meta-theme', root.classList.contains('dark') ? 'dark' : 'light');
});

// Scroll-to-top button
const scrollBtn = document.createElement('button');
scrollBtn.innerText = '↑';
scrollBtn.id = 'scrollTopBtn';
Object.assign(scrollBtn.style, {
  position:'fixed', right:'20px', bottom:'22px', padding:'10px 12px',
  fontSize:'18px', borderRadius:'999px', border:'0',
  background:'#F9D949', color:'#111827', cursor:'pointer', boxShadow:'0 10px 24px -12px rgba(0,0,0,.45)',
  display:'none', zIndex:150
});
document.body.appendChild(scrollBtn);
window.addEventListener('scroll',()=>{
  scrollBtn.style.display = window.scrollY > 260 ? 'block' : 'none';
});
scrollBtn.addEventListener('click',()=> window.scrollTo({top:0, behavior:'smooth'}));

// Join modal
const openJoin = document.getElementById('openJoin');
const joinModal = document.getElementById('joinModal');
const closeJoin = document.getElementById('closeJoin');
openJoin?.addEventListener('click',()=> joinModal.classList.add('show'));
closeJoin?.addEventListener('click',()=> joinModal.classList.remove('show'));
joinModal?.addEventListener('click',e=>{ if(e.target===joinModal) joinModal.classList.remove('show'); });

// Dummy handlers
document.getElementById('joinForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thanks for joining META! We will contact you by email.');
  joinModal.classList.remove('show');
});
document.getElementById('contactForm')?.addEventListener('submit', (e)=>{
  e.preventDefault();
  alert('Thanks for your message! We will get back to you soon.');
});
