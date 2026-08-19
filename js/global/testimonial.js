// js/global/testimonial.js

function initTestimonials() {
  const container = document.getElementById('testimonialContainer');
  const track = document.getElementById('testimonialTrack');
  const prevBtn = document.getElementById('prevTestimonial');
  const nextBtn = document.getElementById('nextTestimonial');

  if (!container || !track) return;

  let isDragging = false;
  let startX = 0;
  let currentTranslate = 0;
  let prevTranslate = 0;

  const getCardStep = () => {
    const card = track.querySelector('.testimonial-card');
    if (!card) return 448;
    return card.offsetWidth + 28;
  };

  const getMaxScroll = () => {
    return Math.max(0, track.scrollWidth - container.clientWidth);
  };

  const clamp = (val, min, max) => Math.min(Math.max(val, min), max);

  const setPosition = (x) => {
    track.style.transform = `translateX(${x}px)`;
  };

  const updatePosition = (newPos, animate = true) => {
    track.style.transition = animate
      ? 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)'
      : 'none';
    currentTranslate = clamp(newPos, -getMaxScroll(), 0);
    prevTranslate = currentTranslate;
    setPosition(currentTranslate);
    updateNavButtons();
  };

  const updateNavButtons = () => {
    const maxScroll = getMaxScroll();
    if (prevBtn) {
      prevBtn.style.opacity = currentTranslate >= 0 ? '0.35' : '1';
      prevBtn.style.pointerEvents = currentTranslate >= 0 ? 'none' : 'auto';
    }
    if (nextBtn) {
      nextBtn.style.opacity = Math.abs(currentTranslate) >= maxScroll - 5 ? '0.35' : '1';
      nextBtn.style.pointerEvents = Math.abs(currentTranslate) >= maxScroll - 5 ? 'none' : 'auto';
    }
  };

  // Drag & Touch Logic
  const dragStart = (pageX) => {
    isDragging = true;
    startX = pageX;
    track.classList.add('dragging');
    container.classList.add('active');
  };

  const dragMove = (pageX) => {
    if (!isDragging) return;
    const deltaX = pageX - startX;
    currentTranslate = clamp(prevTranslate + deltaX, -getMaxScroll() - 40, 40);
    setPosition(currentTranslate);
  };

  const dragEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    track.classList.remove('dragging');
    container.classList.remove('active');
    updatePosition(currentTranslate, true);
  };

  // Mouse Listeners
  container.onmousedown = (e) => dragStart(e.pageX);
  window.onmousemove = (e) => dragMove(e.pageX);
  window.onmouseup = dragEnd;

  // Touch Listeners
  container.ontouchstart = (e) => dragStart(e.touches[0].pageX);
  window.ontouchmove = (e) => {
    if (isDragging) dragMove(e.touches[0].pageX);
  };
  window.ontouchend = dragEnd;

  // Arrow Controls
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.preventDefault();
      updatePosition(currentTranslate + getCardStep(), true);
    };
  }

  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.preventDefault();
      updatePosition(currentTranslate - getCardStep(), true);
    };
  }

  window.onresize = () => updatePosition(currentTranslate, false);
  updatePosition(0, false);
}

window.initTestimonials = initTestimonials;
document.addEventListener('DOMContentLoaded', initTestimonials);
document.addEventListener('componentsLoaded', initTestimonials);