const tl = gsap.timeline({defaults: {duration: 1, ease: "power2.out"}})
tl.fromTo('.text', {opacity: 0}, {opacity: 1})
tl.fromTo('.nav-header', {opacity: 0}, {opacity: 1}, '<')
tl.fromTo('.id-card', {opacity: 0}, {opacity: 1})
tl.fromTo('.footer', {opacity: 0}, {opacity: 1}, '<85%')

//fade up