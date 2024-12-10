// Smooth scrolling navigation with active link highlighting
const navLinks = document.querySelectorAll('nav ul li a');
const sections = document.querySelectorAll('section');

// Smooth scrolling and active link management
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);

    if (targetSection) {
      // Smooth scroll to the target section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });

      // Update active class for links
      updateActiveLink(link);
    }
  });
});

// Update active class on scroll
window.addEventListener('scroll', () => {
  let currentSection = getCurrentSection();

  navLinks.forEach(link => {
    const targetId = link.getAttribute('href').substring(1);
    link.classList.toggle('active', targetId === currentSection);
  });
});

// Helper function to determine the current section
const getCurrentSection = () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    if (window.scrollY >= sectionTop - sectionHeight / 3) {
      current = section.getAttribute('id');
    }
  });
  return current;
};

// Helper function to update active link
const updateActiveLink = (activeLink) => {
  navLinks.forEach(link => link.classList.remove('active'));
  activeLink.classList.add('active');
};

// Contact form submission with user-friendly feedback
const contactForm = document.getElementById('contact-form');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get('name')?.trim();
    const email = formData.get('email')?.trim();

    // Simple form validation
    if (!name || !email) {
      showAlert('Please fill in both your name and email.', 'error');
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      showAlert(`Thank you, ${name}! Your message has been received.`, 'success');
      contactForm.reset();
    }, 500);
  });
}

// Helper function to show user-friendly alerts
const showAlert = (message, type) => {
  const alertBox = document.createElement('div');
  alertBox.textContent = message;
  alertBox.className = `alert ${type}`;
  document.body.appendChild(alertBox);

  // Remove alert after 3 seconds
  setTimeout(() => alertBox.remove(), 3000);
};

// Optional: Style alerts with CSS
const alertStyles = `
  .alert {
    position: fixed;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    padding: 1rem 2rem;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: bold;
    z-index: 1000;
    transition: opacity 0.3s ease;
    opacity: 0.9;
  }
  .alert.success {
    background-color: #4caf50;
    color: white;
  }
  .alert.error {
    background-color: #f44336;
    color: white;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.textContent = alertStyles;
document.head.appendChild(styleSheet);
