// TTT Header Navigation Script

// Load header HTML from external file
(function loadHeader() {
  fetch('header.html')
    .then(response => {
      if (!response.ok) {
        throw new Error('Failed to load header: ' + response.status);
      }
      return response.text();
    })
    .then(html => {
      const container = document.getElementById('ttt-header-container');
      if (container) {
        container.innerHTML = html;
        initializeHeaderBehavior();
      }
    })
    .catch(error => {
      console.error('Error loading header:', error);
    });
})();

function initializeHeaderBehavior() {
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

      if (!isClickInsideHeader && nav?.classList.contains('active')) {
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
}

