// ==================================================
// NAVBAR
// ==================================================
const nav = document.getElementById("navbar");
const links = nav.querySelectorAll(".nav-link");
const navBg = nav.querySelector(".nav-bg");
const header = document.querySelector("header");

// ==================================================
// MOVE NAV BACKGROUND
// ==================================================
function moveBackground(link) {
  if (!link || !navBg) return;

  navBg.style.transform = `translateX(${link.offsetLeft}px)`;
  navBg.style.width = `${link.offsetWidth}px`;
}

// ==================================================
// SET ACTIVE NAV
// ==================================================
function setActive(link) {
  if (!link) return;

  links.forEach((item) => {
    item.classList.remove("active");
  });

  link.classList.add("active");
  moveBackground(link);
}

// ==================================================
// GET SECTIONS
// ==================================================
const sections = [];

links.forEach((link) => {
  const targetId = link.getAttribute("href");
  const target = document.querySelector(targetId);

  if (target) {
    sections.push({
      element: target,
      link: link,
    });
  }
});

// ==================================================
// PAGE LOAD NAV
// ==================================================
window.addEventListener("load", () => {
  const activeLink = nav.querySelector(".nav-link.active");

  if (activeLink) {
    requestAnimationFrame(() => {
      moveBackground(activeLink);
    });
  }

  updateActiveOnScroll();
});

// ==================================================
// CLICK NAVIGATION
// ==================================================
links.forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    const target = document.querySelector(targetId);

    if (!target) return;

    e.preventDefault();

    setActive(this);

    const headerHeight = header ? header.offsetHeight : 0;
    const position =
      target.getBoundingClientRect().top + window.scrollY - headerHeight - 25;

    window.scrollTo({
      top: position,
      behavior: "smooth",
    });
  });
});

// ==================================================
// ACTIVE NAV WHEN SCROLL
// ==================================================
function updateActiveOnScroll() {
  if (!sections.length) return;

  const headerHeight = header ? header.offsetHeight : 0;
  const scrollPosition = window.scrollY + headerHeight + 120;

  let currentSection = sections[0];

  sections.forEach((section) => {
    if (scrollPosition >= section.element.offsetTop) {
      currentSection = section;
    }
  });

  const bottomReached =
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 20;

  if (bottomReached) {
    currentSection = sections[sections.length - 1];
  }

  if (currentSection && !currentSection.link.classList.contains("active")) {
    setActive(currentSection.link);
  }
}

// ==================================================
// SMOOTH SCROLL EVENT
// ==================================================
let scrollTicking = false;

window.addEventListener("scroll", () => {
  if (scrollTicking) return;

  scrollTicking = true;

  requestAnimationFrame(() => {
    updateActiveOnScroll();
    scrollTicking = false;
  });
});

// ==================================================
// RESIZE NAV
// ==================================================
let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    const activeLink = nav.querySelector(".nav-link.active");

    if (activeLink) {
      moveBackground(activeLink);
    }
  }, 100);
});

// ==================================================
// TYPEWRITER TEXT
// ==================================================
const typingTexts = [
  {
    id: "helloText",
    text: "Hi there! ",
    speed: 30,
  },
  {
    id: "nameText",
    text: "I'm Saktra",
    speed: 100,
  },
  {
    id: "text1",
    text: "A Junior Web Developer who recently entered the field and is full of energy to build new projects.",
    speed: 35,
  },
  {
    id: "text2",
    text: "My goal is to become a developer who can build applications that solve real-world problems in society.",
    speed: 35,
  },
  {
    id: "text3",
    text: "And a recent Computer Science graduate from Western University.",
    speed: 45,
  },
];

// ==================================================
// TYPE FUNCTION
// ==================================================
function typeText(element, text, speed) {
  return new Promise((resolve) => {
    let index = 0;

    element.classList.add("typing-active");

    function typing() {
      if (index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typing, speed);
      } else {
        element.classList.remove("typing-active");
        setTimeout(resolve, 250);
      }
    }

    typing();
  });
}

// ==================================================
// START TYPEWRITER
// ==================================================
async function startTypingAnimation() {
  for (const item of typingTexts) {
    const element = document.getElementById(item.id);

    if (!element) continue;

    await typeText(element, item.text, item.speed);
  }

  const lastText = document.getElementById("text3");

  if (lastText) {
    lastText.classList.add("typing-active");
  }
}

// ==================================================
// RUN TYPEWRITER
// ==================================================
window.addEventListener("load", () => {
  setTimeout(() => {
    startTypingAnimation();
  }, 500);
});

// ==================================================
// PROGRAMMING SKILL ANIMATION
// ==================================================
const skillSection = document.querySelector("#skill");
const skillBars = document.querySelectorAll(".skill-progress");
const skillItems = document.querySelectorAll(".skill-item");

let skillAnimated = false;

// ==================================================
// START SKILL ANIMATION
// ==================================================
function startSkillAnimation() {
  if (skillAnimated) return;

  skillAnimated = true;

  skillItems.forEach((item, index) => {
    setTimeout(() => {
      item.classList.add("show");
    }, index * 120);
  });

  skillBars.forEach((bar, index) => {
    const width = bar.getAttribute("data-width");

    setTimeout(
      () => {
        bar.style.width = width;
      },
      250 + index * 120,
    );
  });
}

// ==================================================
// SKILL OBSERVER
// ==================================================
if (skillSection) {
  const skillObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startSkillAnimation();
          skillObserver.unobserve(skillSection);
        }
      });
    },
    {
      threshold: 0.25,
    },
  );

  skillObserver.observe(skillSection);
}

// ==================================================
// PROJECT CARD ANIMATION
// ==================================================
const projectGrid = document.querySelector(".gr-box");

if (projectGrid) {
  const projectCards = projectGrid.querySelectorAll(".box");

  const projectObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        projectCards.forEach((card, index) => {
          setTimeout(() => {
            card.classList.add("show");
          }, index * 130);
        });

        projectObserver.unobserve(projectGrid);
      });
    },
    {
      threshold: 0.2,
    },
  );

  projectObserver.observe(projectGrid);
}

// ==================================================
// LIGHT / DARK MODE
// ==================================================

const themeToggle = document.getElementById("themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");

// Get saved theme
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark-mode");
  if (themeIcon) themeIcon.textContent = "☀️";
} else {
  if (themeIcon) themeIcon.textContent = "🌙";
}

// Change theme
themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  const isDark = document.body.classList.contains("dark-mode");

  if (isDark) {
    themeIcon.textContent = "☀️";
    localStorage.setItem("theme", "dark");
  } else {
    themeIcon.textContent = "🌙";
    localStorage.setItem("theme", "light");
  }

  themeIcon.animate(
    [
      { transform: "rotate(0deg) scale(1)" },
      { transform: "rotate(180deg) scale(.6)" },
      { transform: "rotate(360deg) scale(1)" },
    ],
    {
      duration: 450,
      easing: "ease",
    },
  );
});
