document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

  // Lazy loading for images
  const images = document.querySelectorAll('img[data-src]');
  const config = {
      rootMargin: '0px 0px 50px 0px',
      threshold: 0
  };

  let observer = new IntersectionObserver(function (entries, self) {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              preloadImage(entry.target);
              self.unobserve(entry.target);
          }
      });
  }, config);

  images.forEach(image => {
      observer.observe(image);
  });

  function preloadImage(img) {
      const src = img.getAttribute('data-src');
      if (!src) { return; }
      img.src = src;
  }

  // Add active class to current navigation item
  const navItems = document.querySelectorAll('.nav-li a');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          if (pageYOffset >= sectionTop - sectionHeight / 3) {
              current = section.getAttribute('id');
          }
      });

      navItems.forEach(item => {
          item.classList.remove('active');
          if (item.getAttribute('href').slice(1) === current) {
              item.classList.add('active');
          }
      });
  });
});

