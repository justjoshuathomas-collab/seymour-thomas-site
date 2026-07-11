// ===== CONFIG =====
// Resume PDF is hosted directly in this repo (assets/resume.pdf), so the
// link never expires and doesn't depend on anyone's Google account/session.
const RESUME_URL = "assets/resume.pdf";

// ===== Resume nav opens the PDF in a new tab =====
document.getElementById('navResume').addEventListener('click', (e) => {
  e.preventDefault();
  window.open(RESUME_URL, '_blank', 'noopener');
});

// ===== Build the decorative dotted trail as an S-curve of dots =====
(function buildDotTrail(){
  const svg = document.getElementById('dotTrail');
  const width = 120, height = 900;
  const dotCount = 34;
  const ns = "http://www.w3.org/2000/svg";
  for(let i = 0; i < dotCount; i++){
    const t = i / (dotCount - 1);
    const y = t * height;
    // gentle S-curve using two sine waves of different frequency
    const x = width/2 + Math.sin(t * Math.PI * 2.1) * (width/2 - 14);
    const r = 3.2 + Math.sin(t * Math.PI * 5) * 1.1;
    const circle = document.createElementNS(ns, "circle");
    circle.setAttribute("cx", x.toFixed(1));
    circle.setAttribute("cy", y.toFixed(1));
    circle.setAttribute("r", Math.max(1.8, r).toFixed(1));
    circle.style.animationDelay = (t * 4).toFixed(2) + "s";
    svg.appendChild(circle);
  }
})();

// ===== Scroll reveal (fade up as elements enter viewport) =====
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add('is-visible'));
}

// ===== Slow word-by-word fade-in for the intro text on page load =====
(function wordFadeIn(){
  const targets = document.querySelectorAll('[data-word-fade]');
  targets.forEach(target => {
    const words = target.textContent.trim().split(/\s+/);
    target.textContent = '';
    words.forEach((word, i) => {
      const span = document.createElement('span');
      span.textContent = word + ' ';
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(10px)';
      span.style.transition = `opacity 0.5s ease ${i * 0.045}s, transform 0.5s ease ${i * 0.045}s`;
      target.appendChild(span);
    });
  });

  // trigger after a tick so the transition actually plays
  requestAnimationFrame(() => {
    setTimeout(() => {
      document.querySelectorAll('[data-word-fade] span').forEach(span => {
        span.style.opacity = '1';
        span.style.transform = 'translateY(0)';
      });
    }, 80);
  });
})();
