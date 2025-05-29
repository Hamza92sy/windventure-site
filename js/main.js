// Windventure - Main JavaScript File

// Import AOS
import AOS from 'aos';

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });

  // Navbar scroll behavior
  const navbar = document.getElementById('mainNav');
  
  if (navbar) {
    // Add scrolled class initially if not at the top
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    }
    
    // Add or remove scrolled class based on scroll position
    window.addEventListener('scroll', function() {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // Implement lazy loading for images
  const lazyImages = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || !targetId) return;
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Add active class to current nav link based on page
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-link');
  
  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    
    // Check if the current path includes the link path
    // (this handles both exact matches and subdirectory matches)
    if (currentLocation === linkPath || 
        (linkPath !== '/' && linkPath !== '/index.html' && currentLocation.includes(linkPath))) {
      link.classList.add('active');
    } else if ((currentLocation === '/' || currentLocation === '/index.html') && 
               (linkPath === '/' || linkPath === '/index.html' || linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Initialize Bootstrap components
  // Tooltips
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  tooltipTriggerList.map(function(tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Popovers
  const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
  popoverTriggerList.map(function(popoverTriggerEl) {
    return new bootstrap.Popover(popoverTriggerEl);
  });

  // Add animation to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.classList.add('animated-btn');
  });

  // Handle mobile menu toggling
  const navbarToggler = document.querySelector('.navbar-toggler');
  const navbarCollapse = document.querySelector('.navbar-collapse');
  
  if (navbarToggler && navbarCollapse) {
    navbarToggler.addEventListener('click', function() {
      navbarToggler.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInside = navbarToggler.contains(event.target) || navbarCollapse.contains(event.target);
      
      if (!isClickInside && navbarCollapse.classList.contains('show')) {
        navbarToggler.click();
      }
    });
    
    // Close mobile menu when clicking on a nav link
    const mobileNavLinks = navbarCollapse.querySelectorAll('.nav-link');
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        if (navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
      });
    });
  }

  // Initialize Google Analytics (placeholder)
  function initAnalytics() {
    // Google Analytics code would go here
    console.log('Analytics initialized');
  }

  // Load Google Analytics
  window.addEventListener('load', initAnalytics);
});