/* =====================================
   MOBILE NAVIGATION TOGGLE
===================================== */
const menuBtn = document.querySelector(".menu-btn");
const navMenu = document.querySelector(".nav-menu");

if (menuBtn) {
    menuBtn.addEventListener("click", () => {
        navMenu.classList.toggle("active");
        menuBtn.innerHTML = navMenu.classList.contains("active")
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
    });
}

// Close mobile menu when clicking nav links
document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
        }
    });
});

/* =====================================
   SCROLL PROGRESS BAR
===================================== */
window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = (scrollTop / height) * 100;
    const progressBar = document.getElementById("progress-bar");
    if (progressBar) {
        progressBar.style.width = progress + "%";
    }
});

/* =====================================
   ANIMATED COUNTERS ON SCROLL
===================================== */
const counters = document.querySelectorAll("[data-count]");
let counterStarted = false;

function startCounter() {
    if (counterStarted) return;

    const statsSection = document.querySelector(".statistics");
    if (!statsSection) return;

    const sectionPosition = statsSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (sectionPosition < screenPosition - 50) {
        counterStarted = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute("data-count");
            let count = 0;
            const speed = Math.max(1, Math.ceil(target / 80));

            const updateCounter = () => {
                if (count < target) {
                    count += speed;
                    if (count > target) count = target;
                    counter.innerText = count;
                    setTimeout(updateCounter, 25);
                } else {
                    counter.innerText = target + "+";
                }
            };

            updateCounter();
        });
    }
}

window.addEventListener("scroll", startCounter);
startCounter(); // Trigger once in case it's already in view

/* =====================================
   ACTIVE NAVIGATION ON SCROLL
===================================== */
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* =====================================
   SMOOTH SCROLL
===================================== */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        if (targetId === "#") return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});
