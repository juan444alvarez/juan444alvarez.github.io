const tl = gsap.timeline({defaults: {duration: 0.75, ease: "power2.in"}})
tl.fromTo('.img', {opacity: 0}, {opacity: 1, ease: "power2.out"})
tl.fromTo('.text', {opacity: 0}, {opacity: 1}, '<50%')
tl.fromTo('.container', {opacity: 0}, {opacity: 1}, '<')
tl.fromTo('.nav-container', {opacity: 0}, {opacity: 1}, '<')
tl.fromTo('.block-wrapper', {opacity: 0}, {opacity: 1}, '<')

const letters = "012ABCDEFGHIJKLMNOPQRSTUVWXYZ";

let interval = null;

const elements = document.querySelectorAll(".random");

for (let i = 0; i < elements.length; i++) {
  elements[i].onmouseover = event => {  
    let iteration = 0;

    clearInterval(interval);

    interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split("")
        .map((letter, index) => {
          if(index < iteration) {
            return event.target.dataset.value[index];
          }

          return letters[Math.floor(Math.random() * 29)]
        })
        .join("");

      if(iteration >= event.target.dataset.value.length){ 
        clearInterval(interval);
      }

      iteration += 1 / 2;
    }, 25);
  }
}
