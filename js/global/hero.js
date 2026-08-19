document.addEventListener('DOMContentLoaded', () => {
  const slides = [
    {
      category: 'Growth-driven UX',
      metric: '2.5X',
      text: 'Average increase in user engagement for our B2B clients.'
    },
    {
      category: 'Market Leader',
      metric: '#1',
      text: 'Rated design partner for high-growth startups.'
    },
    {
      category: 'Human-Centered',
      metric: '1500+',
      text: 'Hours of user research and usability testing conducted annually.'
    }
  ];

  let currentIndex = 0;
  const statContent = document.getElementById('statContent');
  const statCategory = document.getElementById('statCategory');
  const statMetric = document.getElementById('statMetric');
  const statText = document.getElementById('statText');
  const indicators = document.querySelectorAll('.slider-indicators .indicator');

  function changeSlide() {
    // 1. Fade out current content
    statContent.classList.add('fade-out');

    setTimeout(() => {
      // 2. Update data
      currentIndex = (currentIndex + 1) % slides.length;
      const currentSlide = slides[currentIndex];

      statCategory.textContent = currentSlide.category;
      statMetric.textContent = currentSlide.metric;
      statText.textContent = currentSlide.text;

      // 3. Update active dot indicator
      indicators.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });

      // 4. Fade back in
      statContent.classList.remove('fade-out');
    }, 350); // Matches the CSS transition duration
  }

  // Interval timer for auto-transition
  let slideInterval = setInterval(changeSlide, 1500);

  // Pause on hover
  const statCard = document.querySelector('.stat-card');
  if (statCard) {
    statCard.addEventListener('mouseenter', () => clearInterval(slideInterval));
    statCard.addEventListener('mouseleave', () => {
      slideInterval = setInterval(changeSlide, 3500);
    });
  }
});