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
// Elements are visible by default (see .reveal in styles.css). Here we
// ONLY pre-hide the ones currently below the fold, then un-hide them on
// scroll for a fade-up effect. If this script doesn't run at all, every
// .reveal element simply stays visible — there's no failure mode where
// content is stuck invisible.
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const toWatch = [];
  revealEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top > window.innerHeight * 0.85) {
      el.classList.add('reveal-pending');
      toWatch.push(el);
    }
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.remove('reveal-pending');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  toWatch.forEach(el => io.observe(el));
}

// Note: the intro's word-by-word load-in is now handled entirely by the
// .word class + @keyframes word-in in styles.css, applied directly to
// hand-written <span> tags in the HTML. The previous approach rebuilt this
// text via JavaScript at runtime, which is what caused the earlier bug
// where spaces between words disappeared. Static markup can't do that.
