// GSAP Initialization
gsap.registerPlugin(ScrollTrigger);

// Logo Drawing Animation (Splash Screen)
const splashTimeline = gsap.timeline({
    onComplete: () => {
        document.body.classList.remove('loading');
        // Initialize animations after a brief pause for layout stability
        setTimeout(() => {
            startMainAnimations();
            // Initialize AOS
            AOS.init({
                duration: 600,
                once: true,
                offset: 50,
                easing: 'ease-out-quad'
            });
        }, 100);
    }
});

function initSplashScreen() {
    const logoPaths = document.querySelectorAll('.logo-path');
    
    // Prepare paths precisely
    logoPaths.forEach(path => {
        const length = path.getTotalLength();
        gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
            opacity: 1
        });
    });

    // Intro Animation Sequence
    splashTimeline
        .to('.logo-path', {
            strokeDashoffset: 0,
            duration: 2.5,
            stagger: 0.15,
            ease: "power2.inOut"
        })
        .to('.logo-path', {
            fill: (i, target) => {
                if (target.classList.contains('cyan-color')) return '#00AEEF';
                return '#000000';
            },
            duration: 0.8,
            ease: "power1.in"
        })
        .to('#splash-screen', {
            yPercent: -100,
            duration: 1.2,
            ease: "expo.inOut",
            delay: 0.5
        });
}

function startMainAnimations() {
    // 0. Infinite Marquees (Carousels)
    gsap.to(".hero-marquee", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none"
    });

    gsap.to(".portfolio-marquee", {
        xPercent: -50,
        repeat: -1,
        duration: 30,
        ease: "none"
    });

    // Refresh ScrollTrigger
    ScrollTrigger.refresh();

    // 1. Hero Reveal (Still handled by GSAP for the smooth sequence)
    gsap.from(".hero-content > *", {
        y: 30,
        autoAlpha: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    });

    gsap.from(".hero-visual", {
        autoAlpha: 0,
        x: 40,
        duration: 1.2,
        ease: "power2.out"
    });

    // Note: Project/Service reveal is now handled by AOS in index.html

    // 3. Portfolio Background Shift (Handled by GSAP ScrollTrigger)
    ScrollTrigger.create({
        trigger: ".portfolio",
        start: "top 80%",
        end: "bottom 30%",
        onEnter: () => {
            gsap.to("body", { backgroundColor: "#1B3A5C", color: "#ffffff", duration: 0.4 });
            document.body.classList.add('dark-theme');
        },
        onLeave: () => {
            gsap.to("body", { backgroundColor: "#F7F9FC", color: "#1C1C2E", duration: 0.4 });
            document.body.classList.remove('dark-theme');
        },
        onEnterBack: () => {
            gsap.to("body", { backgroundColor: "#1B3A5C", color: "#ffffff", duration: 0.4 });
            document.body.classList.add('dark-theme');
        },
        onLeaveBack: () => {
            gsap.to("body", { backgroundColor: "#F7F9FC", color: "#1C1C2E", duration: 0.4 });
            document.body.classList.remove('dark-theme');
        }
    });

    // Extra refresh
    setTimeout(() => ScrollTrigger.refresh(), 500);
}

// Global Refresh on Resize
window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
});

// Navbar Scroll Effect
function initNavbarScroll() {
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });
}

// Mobile Menu Logic
function initMobileMenu() {
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            mobileBtn.classList.toggle('active');
            navLinksContainer.classList.toggle('active');
            
            // Prevent scroll when menu is open
            if(navLinksContainer.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileBtn.classList.remove('active');
                navLinksContainer.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
}

// Run Init
window.addEventListener('load', () => {
    initSplashScreen();
    initNavbarScroll();
    initMobileMenu();
});

