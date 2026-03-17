// Scroll-triggered fade-up animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
)

document.querySelectorAll('.fade-up').forEach((el, i) => {
  // Stagger siblings within the same parent
  el.style.transitionDelay = `${(i % 6) * 80}ms`
  observer.observe(el)
})

// Active nav link highlighting on scroll
const sections = document.querySelectorAll('section[id]')
const navLinks = document.querySelectorAll('.nav-links a')

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          link.classList.remove('active')
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active')
          }
        })
      }
    })
  },
  { threshold: 0.4 }
)

sections.forEach((s) => navObserver.observe(s))
