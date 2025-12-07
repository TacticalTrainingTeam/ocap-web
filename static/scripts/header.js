// TTT Header Navigation Script

// Load header HTML from external file
(async () => {
  try {
    const response = await fetch('header.html');
    if (!response.ok) throw new Error(`Failed to load header: ${response.status}`);
    
    const container = document.getElementById('ttt-header-container');
    if (container) {
      container.innerHTML = await response.text();
      initializeHeaderBehavior();
    }
  } catch (error) {
    console.error('Error loading header:', error);
  }
})();

function initializeHeaderBehavior() {
  const mobileToggle = document.querySelector('.ttt-mobile-toggle');
  const nav = document.querySelector('.ttt-nav');
  const header = document.querySelector('.ttt-header');
  const dropdownItems = document.querySelectorAll('.ttt-nav-item.has-dropdown');
  const isMobile = () => window.innerWidth <= 768;

  // Event delegation for better performance
  header?.addEventListener('click', (e) => {
    // Mobile menu toggle
    if (e.target.closest('.ttt-mobile-toggle')) {
      nav?.classList.toggle('active');
      return;
    }

    // Mobile dropdown toggle
    if (isMobile()) {
      const dropdownLink = e.target.closest('.ttt-nav-item.has-dropdown > .ttt-nav-link');
      if (dropdownLink) {
        e.preventDefault();
        dropdownLink.parentElement.classList.toggle('active');
      }
    }
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
    if (isMobile() && !e.target.closest('.ttt-header') && nav?.classList.contains('active')) {
      nav.classList.remove('active');
    }
  });

  // Handle window resize with debouncing
  let resizeTimer;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (!isMobile()) {
        nav?.classList.remove('active');
        dropdownItems.forEach(item => item.classList.remove('active'));
      }
    }, 250);
  });
}

