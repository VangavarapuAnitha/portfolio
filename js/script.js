/* ============================================
   ANITHA VANGAVARAPU — PORTFOLIO SCRIPT
   Vanilla JS · No dependencies
   ============================================ */

(function () {
  "use strict";

  /* ---------- Loader ---------- */
  window.addEventListener("load", function () {
    var loader = document.getElementById("loader");
    if (loader) {
      setTimeout(function () {
        loader.classList.add("hide");
        setTimeout(function () {
          loader.style.display = "none";
        }, 600);
      }, 800);
    }
  });

  /* ---------- Custom Cursor ---------- */
  var cursorDot = document.getElementById("cursorDot");
  var cursorGlow = document.getElementById("cursorGlow");
  var mouseX = 0,
    mouseY = 0,
    glowX = 0,
    glowY = 0;

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (cursorDot) {
      cursorDot.style.left = mouseX + "px";
      cursorDot.style.top = mouseY + "px";
    }
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.15;
    glowY += (mouseY - glowY) * 0.15;
    if (cursorGlow) {
      cursorGlow.style.left = glowX + "px";
      cursorGlow.style.top = glowY + "px";
    }
    requestAnimationFrame(animateGlow);
  }
  animateGlow();

  document.querySelectorAll("a, button, .glass-card, .filter-btn, input, textarea").forEach(function (el) {
    el.addEventListener("mouseenter", function () {
      if (cursorGlow) cursorGlow.classList.add("grow");
    });
    el.addEventListener("mouseleave", function () {
      if (cursorGlow) cursorGlow.classList.remove("grow");
    });
  });

  /* ---------- Scroll Progress & Navbar ---------- */
  var scrollProgress = document.getElementById("scrollProgress");
  var navbar = document.getElementById("navbar");
  var backToTop = document.getElementById("backToTop");

  function onScroll() {
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    if (scrollProgress) scrollProgress.style.width = pct + "%";

    if (navbar) {
      if (scrollTop > 50) navbar.classList.add("scrolled");
      else navbar.classList.remove("scrolled");
    }

    if (backToTop) {
      if (scrollTop > 400) backToTop.classList.add("show");
      else backToTop.classList.remove("show");
    }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Mobile Menu ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");

  function toggleMenu(open) {
    if (!menuToggle || !mobileMenu) return;
    if (open === undefined) open = !mobileMenu.classList.contains("open");
    menuToggle.classList.toggle("open", open);
    mobileMenu.classList.toggle("open", open);
    menuToggle.setAttribute("aria-expanded", open);
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      toggleMenu();
    });
  }
  document.querySelectorAll(".mobile-link").forEach(function (link) {
    link.addEventListener("click", function () {
      toggleMenu(false);
    });
  });

  /* ---------- Active Nav Link ---------- */
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".nav-link");

  function activeNav() {
    var scrollY = window.pageYOffset;
    sections.forEach(function (sec) {
      var top = sec.offsetTop - 100;
      var height = sec.offsetHeight;
      var id = sec.getAttribute("id");
      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(function (link) {
          link.classList.toggle("active", link.getAttribute("href") === "#" + id);
        });
      }
    });
  }
  window.addEventListener("scroll", activeNav, { passive: true });

  /* ---------- Reveal on Scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal-up, .reveal-left, .reveal-right, .reveal-scale");
  var io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
  );
  revealEls.forEach(function (el) {
    io.observe(el);
  });

  /* ---------- Typing Animation ---------- */
  var typedEl = document.getElementById("typed");
  if (typedEl) {
    var phrases = [
      "Full Stack Developer",
      "2 Years Experience",
      "React · Node · Angular",
      "Java · TypeScript · SQL",
    ];
    var pIndex = 0,
      cIndex = 0,
      deleting = false;

    function typeLoop() {
      var current = phrases[pIndex];
      if (deleting) {
        typedEl.textContent = current.substring(0, cIndex - 1);
        cIndex--;
        if (cIndex === 0) {
          deleting = false;
          pIndex = (pIndex + 1) % phrases.length;
          setTimeout(typeLoop, 400);
          return;
        }
        setTimeout(typeLoop, 40);
      } else {
        typedEl.textContent = current.substring(0, cIndex + 1);
        cIndex++;
        if (cIndex === current.length) {
          deleting = true;
          setTimeout(typeLoop, 1800);
          return;
        }
        setTimeout(typeLoop, 80);
      }
    }
    typeLoop();
  }

  /* ---------- Counter Animation ---------- */
  var counters = document.querySelectorAll(".stat-num");
  var counterIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          var target = parseInt(el.getAttribute("data-target"), 10);
          var suffix = el.getAttribute("data-suffix") || "";
          var current = 0;
          var step = Math.max(1, Math.ceil(target / 40));
          var interval = setInterval(function () {
            current += step;
            if (current >= target) {
              current = target;
              clearInterval(interval);
            }
            el.textContent = current + suffix;
          }, 30);
          counterIO.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach(function (c) {
    counterIO.observe(c);
  });

  /* ---------- Skill Bar Animation ---------- */
  var skillBars = document.querySelectorAll(".bar-fill");
  var skillIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var level = entry.target.getAttribute("data-level");
          entry.target.style.width = level + "%";
          skillIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.4 }
  );
  skillBars.forEach(function (b) {
    skillIO.observe(b);
  });

  /* ---------- Circular Progress ---------- */
  var circulars = document.querySelectorAll(".circular-progress");
  var circIO = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var val = parseInt(entry.target.getAttribute("data-value"), 10);
          var deg = (val / 100) * 360;
          entry.target.style.background =
            "conic-gradient(var(--primary) " + deg + "deg, rgba(255,255,255,0.06) " + deg + "deg)";
          circIO.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  circulars.forEach(function (c) {
    circIO.observe(c);
  });

  /* ---------- Project Filtering ---------- */
  var filterBtns = document.querySelectorAll(".filter-btn");
  var projectItems = document.querySelectorAll("#projectGrid > div");

  filterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterBtns.forEach(function (b) {
        b.classList.remove("active");
      });
      btn.classList.add("active");
      var filter = btn.getAttribute("data-filter");
      projectItems.forEach(function (item) {
        var cat = item.getAttribute("data-category") || "";
        if (filter === "all" || cat.indexOf(filter) !== -1) {
          item.style.display = "";
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(function () {
            item.style.transition = "opacity 0.4s, transform 0.4s";
            item.style.opacity = "1";
            item.style.transform = "scale(1)";
          }, 50);
        } else {
          item.style.transition = "opacity 0.3s, transform 0.3s";
          item.style.opacity = "0";
          item.style.transform = "scale(0.95)";
          setTimeout(function () {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });

  /* ---------- Project Modal ---------- */
  var projects = [
    {
      title: "CEC Web Survey Application",
      role: "Fullstack Developer",
      tech: "Node.js, Express.js, TypeScript, MSSQL, Angular",
      overview:
        "A web-based survey application supporting the full survey lifecycle — creation, submission, and reporting.",
      responsibilities: [
        "Designed and implemented backend services using Node.js and Express.js.",
        "Designed MSSQL database schema with tables, relationships, and constraints for survey questions and responses.",
        "Created and maintained stored procedures and functions for survey creation, submission, and reporting workflows.",
        "Developed REST APIs for survey lifecycle operations and frontend integration.",
        "Implemented request validation, error handling, and API testing with Postman.",
      ],
      features: [
        "Full survey lifecycle management",
        "Complex business logic at the database level via stored procedures",
        "Efficient data handling with data structures for survey responses",
      ],
      challenges: "Processing complex survey responses and reporting logic efficiently.",
      solutions:
        "Applied efficient data handling techniques and basic data structures while processing survey responses, with complex business logic pushed to the database level.",
    },
    {
      title: "Clinion SSO",
      role: "Full Stack Developer",
      tech: "React.js, TypeScript, Node.js, Express.js, PostgreSQL, Tailwind CSS",
      overview:
        "A Single Sign-On platform with secure form validations and a responsive, component-driven UI.",
      responsibilities: [
        "Designed frontend component architecture using React hooks and TypeScript.",
        "Developed REST APIs and optimized database operations using stored procedures and functions.",
        "Implemented secure form validations using Yup and Joi.",
        "Built responsive UI using Tailwind CSS and tested APIs with Postman.",
      ],
      features: [
        "Secure single sign-on flow",
        "Schema-validated forms with Yup and Joi",
        "Responsive Tailwind CSS UI",
      ],
      challenges: "Ensuring form validation security and UI consistency across devices.",
      solutions:
        "Implemented Yup and Joi for robust client and server-side validation, with a reusable Tailwind-based component system for consistency.",
    },
    {
      title: "Clinion EDC — Data Capture Dashboard",
      role: "Full Stack Developer",
      tech: "React.js, Node.js, MSSQL",
      overview:
        "A dashboard module with dynamic eCRF generation powered by MSSQL stored procedures.",
      responsibilities: [
        "Developed a dashboard module with dynamic generation of eCRFs using MSSQL stored procedures.",
        "Integrated frontend components with backend services for data capture and validation.",
      ],
      features: [
        "Dynamic eCRF generation",
        "Real-time data capture and validation",
        "Frontend-backend integration for clinical data",
      ],
      challenges: "Generating dynamic forms from database-driven metadata.",
      solutions:
        "Used MSSQL stored procedures to drive dynamic eCRF generation, with the frontend rendering forms from the returned metadata.",
    },
    {
      title: "Product Management Web Application",
      role: "Full Stack Developer",
      tech: "React.js, TypeScript, Node.js, Express.js, MongoDB, Tailwind CSS",
      overview:
        "A full-stack CRUD web application for managing products with Mongoose schema validation.",
      responsibilities: [
        "Developed a full-stack CRUD web application for managing products.",
        "Designed RESTful APIs using Node.js and Express.js.",
        "Integrated a TypeScript-based React frontend with MongoDB using Mongoose schemas for validation.",
        "Implemented responsive UI using Tailwind CSS.",
      ],
      features: [
        "Full CRUD operations",
        "Mongoose schema validation",
        "Responsive Tailwind UI",
      ],
      challenges: "Bridging a TypeScript React frontend with MongoDB validation.",
      solutions:
        "Used Mongoose schemas for server-side validation and a typed React frontend to ensure data integrity end-to-end.",
    },
  ];

  var modal = document.getElementById("projectModal");
  var modalContent = document.getElementById("modalContent");
  var modalClose = document.getElementById("modalClose");

  function openModal(index) {
    var p = projects[index];
    if (!p || !modalContent) return;
    var respHTML = p.responsibilities.map(function (r) {
      return "<li>" + r + "</li>";
    }).join("");
    var featHTML = p.features.map(function (f) {
      return "<li>" + f + "</li>";
    }).join("");
    modalContent.innerHTML =
      '<h3>' + p.title + '</h3>' +
      '<p class="modal-role">' + p.role + ' · ' + p.tech + '</p>' +
      '<div class="modal-section"><h4>Overview</h4><p>' + p.overview + '</p></div>' +
      '<div class="modal-section"><h4>Responsibilities</h4><ul>' + respHTML + '</ul></div>' +
      '<div class="modal-section"><h4>Key Features</h4><ul>' + featHTML + '</ul></div>' +
      '<div class="modal-section"><h4>Challenges</h4><p>' + p.challenges + '</p></div>' +
      '<div class="modal-section"><h4>Solutions</h4><p>' + p.solutions + '</p></div>';
    if (modal) modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    if (modal) modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-project]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      openModal(parseInt(btn.getAttribute("data-project"), 10));
    });
  });
  if (modalClose) modalClose.addEventListener("click", closeModal);
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal) closeModal();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeModal();
  });

  /* ---------- Magnetic Buttons ---------- */
  document.querySelectorAll(".magnetic").forEach(function (btn) {
    btn.addEventListener("mousemove", function (e) {
      var rect = btn.getBoundingClientRect();
      var x = e.clientX - rect.left - rect.width / 2;
      var y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = "translate(" + x * 0.2 + "px, " + y * 0.2 + "px)";
    });
    btn.addEventListener("mouseleave", function () {
      btn.style.transform = "translate(0, 0)";
    });
  });

  /* ---------- Ripple Effect ---------- */
  document.querySelectorAll(".btn-gradient, .btn-glow, .btn-outline, .filter-btn, .project-btn").forEach(function (btn) {
    btn.style.position = btn.style.position || "relative";
    btn.style.overflow = "hidden";
    btn.addEventListener("click", function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement("span");
      ripple.className = "ripple";
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + "px";
      ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
      ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
      btn.appendChild(ripple);
      setTimeout(function () {
        if (ripple.parentNode) ripple.parentNode.removeChild(ripple);
      }, 600);
    });
  });

  /* ---------- Tilt Effect on Cards ---------- */
  document.querySelectorAll(".glass-card").forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = "translateY(-4px) perspective(800px) rotateX(" + (-y * 4) + "deg) rotateY(" + (x * 4) + "deg)";
    });
    card.addEventListener("mouseleave", function () {
      card.style.transform = "";
    });
  });

  /* ---------- Contact Form ---------- */
  var form = document.getElementById("contactForm");
  var formStatus = document.getElementById("formStatus");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = document.getElementById("name").value.trim();
      var email = document.getElementById("email").value.trim();
      var subject = document.getElementById("subject").value.trim();
      var message = document.getElementById("message").value.trim();

      if (!name || !email || !subject || !message) {
        if (formStatus) {
          formStatus.textContent = "Please fill in all fields.";
          formStatus.className = "form-status error";
        }
        return;
      }
      var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        if (formStatus) {
          formStatus.textContent = "Please enter a valid email address.";
          formStatus.className = "form-status error";
        }
        return;
      }
      if (formStatus) {
        formStatus.textContent = "Thank you, " + name + "! Your message has been sent.";
        formStatus.className = "form-status success";
      }
      form.reset();
      setTimeout(function () {
        if (formStatus) {
          formStatus.textContent = "";
          formStatus.className = "form-status";
        }
      }, 4000);
    });
  }

  /* ---------- Particle Background ---------- */
  var canvas = document.getElementById("particleCanvas");
  if (canvas) {
    var ctx = canvas.getContext("2d");
    var particles = [];
    var particleCount = window.innerWidth < 768 ? 30 : 60;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    function initParticles() {
      particles = [];
      for (var i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          r: Math.random() * 1.5 + 0.5,
          o: Math.random() * 0.5 + 0.2,
        });
      }
    }
    initParticles();

    function drawParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(124, 58, 237, " + p.o + ")";
        ctx.fill();
      });
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = "rgba(6, 182, 212, " + (0.12 * (1 - dist / 120)) + ")";
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  /* ---------- Footer Year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
