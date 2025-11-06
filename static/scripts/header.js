// TTT Header Navigation Script

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const mobileToggle = document.querySelector('.ttt-mobile-toggle');
  const nav = document.querySelector('.ttt-nav');

  if (mobileToggle && nav) {
    mobileToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
    });
  }

  // Mobile dropdown toggle
  const dropdownItems = document.querySelectorAll('.ttt-nav-item.has-dropdown');

  for (const item of dropdownItems) {
    const link = item.querySelector('.ttt-nav-link');

    // For mobile: toggle dropdown on click
    if (link) {
      link.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
          e.preventDefault();
          item.classList.toggle('active');
        }
      });
    }
  }

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (window.innerWidth <= 768) {
      const isClickInsideHeader = event.target.closest('.ttt-header');

      if (!isClickInsideHeader && nav && nav.classList.contains('active')) {
        nav.classList.remove('active');
      }
    }
  });

  // Handle window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      if (window.innerWidth > 768) {
        if (nav) {
          nav.classList.remove('active');
        }
        for (const item of dropdownItems) {
          item.classList.remove('active');
        }
      }
    }, 250);
  });
});
