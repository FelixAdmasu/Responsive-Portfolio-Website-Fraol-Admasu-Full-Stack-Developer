/*=============== PAGE LOADER ===============*/
window.addEventListener('load', () => {
    const pageLoader = document.querySelector('.page-loader');
    if (!pageLoader) return;
    const minLoadingTime = 800;
    
    setTimeout(() => {
        pageLoader.classList.add('hidden');
        
        pageLoader.addEventListener('transitionend', (e) => {
            if (e.propertyName === 'opacity' && pageLoader.classList.contains('hidden')) {
                pageLoader.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }, { once: true });
    }, minLoadingTime);
    
    document.body.style.overflow = 'hidden';
});

/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

if (navClose && navMenu) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    if (navMenu) navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== SWIPER PROJECTS ===============*/
const projectsContainer = document.querySelector('.projects__container')
let swiperProjects = null
if (projectsContainer) {
    swiperProjects = new Swiper(".projects__container", {
        loop: true,
        spaceBetween: 24,
        navigation: {
            nextEl: ".projects__container .swiper-button-next",
            prevEl: ".projects__container .swiper-button-prev",
        },
        pagination: {
            el: ".swiper-pagination",
        },
        mousewheel: true,
        keyboard: true,
    });
}

/*=============== SWIPER TESTIMONIAL ===============*/
const testimonialContainer = document.querySelector('.testimonial__container')
let swiperTestimonial = null
if (testimonialContainer) {
    swiperTestimonial = new Swiper(".testimonial__container", {
        keyboard: true,
        mousewheel: true,
        navigation: {
            nextEl: ".testimonial__container .swiper-button-next",
            prevEl: ".testimonial__container .swiper-button-prev",
        },
    });
}

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav__link')
const navMenuLinks = document.querySelectorAll('.nav__menu a[href*="#"]')

let sectionsData = []
const buildSectionsData = () => {
    sectionsData = Array.from(sections).map(section => ({
        id: section.getAttribute('id'),
        top: section.offsetTop - 100,
        bottom: section.offsetTop + section.offsetHeight - 100,
        link: document.querySelector(`.nav__menu a[href="#${section.getAttribute('id')}"]`)
    }));
}
buildSectionsData()
window.addEventListener('resize', buildSectionsData)

const scrollActive = () => {
    const scrollY = window.pageYOffset + 200
    
    navLinks.forEach(link => link.classList.remove('active-link'));
    
    let currentLink = null;
    sectionsData.forEach(section => {
        if (scrollY >= section.top && scrollY <= section.bottom && section.link) {
            currentLink = section.link;
        }
    });
    
    if (!currentLink || scrollY < 100) {
        const homeLink = document.querySelector('.nav__link[href*="home"]');
        if (homeLink) homeLink.classList.add('active-link');
    } else {
        currentLink.classList.add('active-link');
    }
}

window.addEventListener('load', scrollActive);

let scrollTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollTicking) {
        window.requestAnimationFrame(() => {
            scrollActive();
            scrollTicking = false;
        });
        scrollTicking = true;
    }
});

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
    const scrollUpBtn = document.getElementById('scroll-up')
    if (!scrollUpBtn) return
    window.scrollY >= 350 ? scrollUpBtn.classList.add('show-scroll')
        : scrollUpBtn.classList.remove('show-scroll')
}
let scrollUpTicking = false;
window.addEventListener('scroll', () => {
    if (!scrollUpTicking) {
        window.requestAnimationFrame(() => {
            scrollUp();
            scrollUpTicking = false;
        });
        scrollUpTicking = true;
    }
});

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'ri-sun-line'
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => document.body.classList.contains(iconTheme) ? 'ri-moon-line' : 'ri-sun-line'

if (selectedTheme) {
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    if (themeButton) {
        themeButton.classList[selectedIcon === iconTheme ? 'add' : 'remove'](iconTheme)
    }
}

if (themeButton) {
    themeButton.addEventListener('click', () => {
        document.body.classList.toggle(darkTheme)
        themeButton.classList.toggle(iconTheme)
        localStorage.setItem('selected-theme', getCurrentTheme())
        localStorage.setItem('selected-icon', getCurrentIcon())
    })
}

/*=============== CHANGE BACKGROUND HEADER ===============*/
const header = document.getElementById('header')
let scrollHeaderTicking = false
const scrollHeader = () => {
    if (!scrollHeaderTicking) {
        requestAnimationFrame(() => {
            if (!header) return
            window.scrollY >= 50 ? header.classList.add('bg-header')
                : header.classList.remove('bg-header')
            scrollHeaderTicking = false
        })
        scrollHeaderTicking = true
    }
}
window.addEventListener('scroll', scrollHeader)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

let sr = null
if (typeof ScrollReveal !== 'undefined' && !prefersReducedMotion) {
    sr = ScrollReveal({
        origin: 'top',
        distance: '60px',
        duration: 1200,
        delay: 300,
    })
    sr.reveal('.home__data, .projects__container, .testimonial__container, .footer__container')
    sr.reveal('.home__info div', { delay: 600, origin: 'bottom', interval: 100 })
    sr.reveal('.contact__content:nth-child(1)', { origin: 'left' })
    sr.reveal('.contact__content:nth-child(2)', { origin: 'right' })
    sr.reveal('.section__title, .section__subtitle', { origin: 'top', distance: '50px' })
    sr.reveal('.qualification__content:nth-child(1)', {
        origin: 'left',
        distance: '90px',
        duration: 1200,
        delay: 200
    })
    sr.reveal('.qualification__content:nth-child(2)', {
        origin: 'right',
        distance: '90px',
        duration: 1200,
        delay: 200
    })
    sr.reveal('.qualification__info div', {
        origin: 'bottom',
        distance: '60px',
        duration: 1200,
        interval: 100
    })
    sr.reveal('.qualification__img', { delay: 400, scale: 0.8 })
    sr.reveal('.services__card', { interval: 100 })
}

/*=============== LAZY VIDEO LOADING ===============*/
const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play().catch(() => {});
        } else {
            entry.target.pause();
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.projects__img').forEach(video => {
    videoObserver.observe(video);
});

/*=============== SKILLS VIEW TOGGLE ===============*/
const revealSkillsView = (view) => {
    if (!sr) return
    const viewEl = document.querySelector(`.skills__view--${view}`)
    if (!viewEl) return

    const items = view === 'grid'
        ? Array.from(viewEl.querySelectorAll('.skills__data'))
        : Array.from(viewEl.querySelectorAll('.skills__marquee-item'))
    if (!items.length) return

    sr.clean(items)

    if (view === 'grid') {
        items.forEach((item, i) => {
            const content = item.closest('.skills__content')
            const contentIndex = Array.from(viewEl.querySelectorAll('.skills__content')).indexOf(content)
            sr.reveal(item, {
                origin: contentIndex % 2 === 0 ? 'left' : 'right',
                delay: i * 100
            })
        })
    } else {
        const rows = Array.from(viewEl.querySelectorAll('.skills__marquee'))
        sr.reveal(rows, { origin: 'bottom', distance: '40px', interval: 150 })
    }
}

const initSkillsToggle = () => {
    const skillsToggleBtns = document.querySelectorAll('.skills__toggle-btn')
    const skillsViews = document.querySelectorAll('.skills__view')

    if (!skillsToggleBtns.length || !skillsViews.length) return

    skillsToggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view

            skillsToggleBtns.forEach(b => b.classList.remove('active'))
            btn.classList.add('active')

            skillsViews.forEach(v => v.classList.remove('active'))
            const targetView = document.querySelector(`.skills__view--${view}`)
            if (targetView) {
                targetView.classList.add('active')
                revealSkillsView(view)
            }
        })
    })
}

const initSkillsViewReveal = () => {
    initSkillsToggle()
    const activeBtn = document.querySelector('.skills__toggle-btn.active')
    if (activeBtn) revealSkillsView(activeBtn.dataset.view)
}

/*=============== SKILLS MARQUEE INIT ===============*/
const initMarquee = () => {
    const marquees = document.querySelectorAll('.skills__marquee')

    marquees.forEach(marquee => {
        const track = marquee.querySelector('.skills__marquee-track')
        if (!track) return

        const direction = marquee.dataset.direction || 'left'
        const speed = parseInt(marquee.dataset.speed) || 80

        const items = Array.from(track.children)
        const itemCount = items.length

        items.forEach(item => {
            const clone = item.cloneNode(true)
            clone.setAttribute('aria-hidden', 'true')
            clone.style.opacity = '1'
            clone.style.visibility = 'visible'
            track.appendChild(clone)
        })

        const duration = (itemCount * speed) / 10

        track.classList.add(direction === 'left' ? 'marquee-left' : 'marquee-right')
        track.style.animationDuration = `${duration}s`
    })
}

/*=============== SKILLS INIT (marquee must clone before reveal so clones animate too) ===============*/
const initSkills = () => {
    initMarquee()
    initSkillsViewReveal()
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSkills)
} else {
    initSkills()
}

/*=============== WEBGL ERROR BOUNDARY ===============*/
window.addEventListener('error', function(e) {
    const isWebGLScript = e.filename && (
        e.filename.includes('lightrays.js') ||
        e.filename.includes('antigravity.js') ||
        e.filename.includes('magicrings.js')
    );
    if (isWebGLScript) {
        console.warn('WebGL effect failed to load:', e.message);
        const containers = document.querySelectorAll('.light-rays-container');
        containers.forEach(c => c.style.display = 'none');
    }
});

window.addEventListener('unhandledrejection', function(e) {
    if (e.reason && e.reason.message && e.reason.message.includes('WebGL')) {
        console.warn('WebGL promise rejected:', e.reason.message);
    }
});
