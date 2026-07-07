// ===== CONFIG =====
// Resume PDF is hosted directly in this repo (assets/resume.pdf), so the
// link never expires and doesn't depend on anyone's Google account/session.
const RESUME_URL = "assets/resume.pdf";

// ===== Resume nav opens the PDF in a new tab =====
document.getElementById('navResume').addEventListener('click', (e) => {
  e.preventDefault();
  window.open(RESUME_URL, '_blank', 'noopener');
});

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
      span.textContent = word;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(10px)';
      span.style.transition = `opacity 0.5s ease ${i * 0.045}s, transform 0.5s ease ${i * 0.045}s`;
      target.appendChild(span);
      // Add the space as its own text node between spans, not inside the
      // inline-block span — a trailing space at the edge of an inline-block
      // box gets silently collapsed away by the browser, which is what was
      // causing "Iamcurrentlyathird-year..." to run together with no gaps.
      if (i < words.length - 1) {
        target.appendChild(document.createTextNode(' '));
      }
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
