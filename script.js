document.addEventListener("DOMContentLoaded", function () {
    // Typing Animation
    const typingAnimationElement = document.getElementById("typing-animation");
    const typingTexts = [" Developer, ", " Fast Learner."];
    let currentTextIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
  
    function playTypingAnimation() {
      const currentText = typingTexts[currentTextIndex];
      if (isDeleting) {
        typingAnimationElement.textContent = currentText.substring(0, charIndex--);
      } else {
        typingAnimationElement.textContent = currentText.substring(0, charIndex++);
      }
  
      if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => (isDeleting = true), 1000);
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentTextIndex = (currentTextIndex + 1) % typingTexts.length;
      }
  
      setTimeout(playTypingAnimation, isDeleting ? 50 : 100);
    }
    playTypingAnimation();
  
    // Greeting Message
    const greeting = document.createElement("div");
    greeting.style.position = "fixed";
    greeting.style.top = "10px";
    greeting.style.right = "20px";
    greeting.style.padding = "15px 25px";
    greeting.style.fontSize = "18px";
    greeting.style.color = "#fff";
    greeting.style.backgroundColor = "#007bff";
    greeting.style.borderRadius = "50px";
    greeting.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.3)";
    greeting.style.opacity = "0";
    greeting.style.transform = "translateY(-20px)";
    greeting.style.transition = "opacity 1s ease, transform 1s ease";
    greeting.style.fontFamily = "'Roboto', sans-serif";
    greeting.style.fontWeight = "bold";
    document.body.appendChild(greeting);
  
    function updateGreeting() {
      const now = new Date();
      const hours = now.getHours();
      let message = "";
  
      if (hours < 12) {
        message = "Good Morning!";
      } else if (hours < 18) {
        message = "Good Afternoon!";
      } else {
        message = "Good Evening!";
      }
  
      greeting.innerText = message;
    }
  
    function fadeInOutGreeting() {
      greeting.style.opacity = "1";
      greeting.style.transform = "translateY(0)";
      setTimeout(() => {
        greeting.style.opacity = "0";
        greeting.style.transform = "translateY(-20px)";
      }, 3000);
  
      setTimeout(fadeInOutGreeting, 5000);
    }
  
    updateGreeting();
    fadeInOutGreeting();
  
    // Back to Top Button
    const backToTop = document.createElement("button");
    backToTop.innerText = "↑";
    backToTop.style.position = "fixed";
    backToTop.style.bottom = "20px";
    backToTop.style.right = "20px";
    backToTop.style.padding = "10px";
    backToTop.style.fontSize = "20px";
    backToTop.style.backgroundColor = "#007bff";
    backToTop.style.color = "#fff";
    backToTop.style.border = "none";
    backToTop.style.borderRadius = "50%";
    backToTop.style.cursor = "pointer";
    backToTop.style.display = "none";
    document.body.appendChild(backToTop);
  
    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  
    window.addEventListener("scroll", () => {
      backToTop.style.display = window.scrollY > 300 ? "block" : "none";
    });
  
    // Read More functionality (toggle About section visibility)
    const readMoreBtn = document.getElementById('read-more-btn');
    const aboutSection = document.getElementById('about-section');
  
    // Function to toggle the "Read More" link
    readMoreBtn.onclick = function () {
      if (aboutSection.style.display === 'none' || aboutSection.style.display === '') {
        aboutSection.style.display = 'block';
        readMoreBtn.textContent = 'Read Less';
      } else {
        aboutSection.style.display = 'none';
        readMoreBtn.textContent = 'Read More';
      }
    };
  
    // Smooth scrolling for Contact section when clicking Contact button
    document.getElementById('contact-link').onclick = function (event) {
      event.preventDefault();  // Prevent default anchor behavior
      document.querySelector('#contact-section').scrollIntoView({ behavior: 'smooth' });
    };
  
    // Ensure Read More button scrolls to the About section
    document.getElementById('read-more-btn').onclick = function (event) {
      document.querySelector('#about-section').scrollIntoView({ behavior: 'smooth' });
    };
  
    // JavaScript for handling form submission
    document.getElementById('contact-form').addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent form from reloading the page
  
      // Hide the form
      document.getElementById('contact-form').style.display = 'none';
  
      // Show the thank-you message
      document.getElementById('thank-you-message').style.display = 'block';
    });
  
    
    // Sidebar Toggle functionality
    function toggleSidebar() {
      var sidebar = document.querySelector('.sidebar');
      var mainContent = document.querySelector('.main-content');
      
      // Toggle the sidebar visibility
      sidebar.classList.toggle('active');
      
      // Adjust the main content's margin to fill the space
      if (sidebar.classList.contains('active')) {
        mainContent.style.marginLeft = '0';
      } else {
        mainContent.style.marginLeft = '250px';
      }
    }
  
    // Smooth Scroll Functionality
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
  
        // Highlight active link
        document.querySelectorAll('.sidebar-list li a').forEach(link => link.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    // Highlight active section while scrolling
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 60) {
          current = section.getAttribute('id');
        }
      });
  
      document.querySelectorAll('.sidebar-list li a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  
    // Get the theme toggle button
    const themeToggle = document.getElementById("theme-toggle");
  
    // Check and set initial theme based on localStorage
    if (localStorage.getItem("theme") === "dark") {
      document.body.classList.add("dark-mode");
    }
  
    // Toggle dark mode on button click
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
  
      // Save the user's theme preference
      if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
      } else {
        localStorage.setItem("theme", "light");
      }
    });
  
    // Lightbox functionality for project images
    const images = document.querySelectorAll(".project-card img");
    const lightbox = document.createElement("div");
    const lightboxImg = document.createElement("img");
  
    lightbox.id = "lightbox";
    document.body.appendChild(lightbox);
    lightbox.appendChild(lightboxImg);
  
    images.forEach((img) => {
      img.addEventListener("click", () => {
        lightbox.classList.add("active");
        lightboxImg.src = img.src;
      });
    });
  
    lightbox.addEventListener("click", () => {
      lightbox.classList.remove("active");
    });
  
    // Contact form submission with AJAX
    document.getElementById("contact-form").addEventListener("submit", function (e) {
      e.preventDefault();
  
      const formData = new FormData(this);
  
      fetch("save_contact.php", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          alert(data);
          document.getElementById("contact-form").reset();
        })
        .catch((error) => console.error("Error:", error));
    });
  
    // Hover effect for skills
    const skills = document.querySelectorAll('.skill');
  
    skills.forEach(skill => {
      skill.addEventListener('mouseenter', () => {
        skill.style.transform = 'scale(1.1)';
        skill.style.transition = 'transform 0.3s ease';
      });
  
      skill.addEventListener('mouseleave', () => {
        skill.style.transform = 'scale(1)';
      });
    });
  
    // Smooth Scroll Effect
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  
    // Animate Timeline on Scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
  
    window.addEventListener('scroll', () => {
      timelineItems.forEach(item => {
        const position = item.getBoundingClientRect().top;
        if (position < window.innerHeight) {
          item.classList.add('fade-in');
        }
      });
    });
  
    // Dynamic Progress Bar Animation
    const progressBars = document.querySelectorAll('.progress-bar');
  
    window.addEventListener('scroll', () => {
      progressBars.forEach(bar => {
        const position = bar.getBoundingClientRect().top;
        if (position < window.innerHeight) {
          const value = bar.getAttribute('data-value');
          bar.style.width = `${value}%`;
          bar.style.transition = 'width 2s ease-out';
        }
      });
    });
  
    // Sticky header effect
    const header = document.querySelector('header');
    const sticky = header.offsetTop;
  
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    });
  });
  document.addEventListener("DOMContentLoaded", function () {
    const sidebar = document.getElementById("sidebar");
    const sidebarToggle = document.getElementById("sidebarToggle");

    console.log("Sidebar:", sidebar);
    console.log("Sidebar Toggle:", sidebarToggle);

    if (sidebarToggle) {
        sidebarToggle.addEventListener("click", function () {
            sidebar.classList.toggle("active");
        });
    } else {
        console.error("Sidebar toggle button not found!");
    }
});
