
        let gallery = document.querySelector('.card-ul')
        let wrapper = document.querySelector('.gal')
        let moveVal = 0;

        let dragging = false, mouseLocation, galleryLocation;

        const easeOutQuad = t => {
            return t * (2 - t)
        }

        moveGallery = () => {
            moveVal = easeOutQuad(window.scrollY * -.002);
            gallery.style.transform = `translateX(${moveVal}%)`
            console.log(moveVal)

            requestAnimationFrame(moveGallery);
        }

        requestAnimationFrame(moveGallery);

        const dragStart = e => {
            dragging = true;
            mouseLocation = e.pageX;
            galleryLocation = wrapper.scrollLeft;
        }

        const dragActive = e => {
            if(!dragging) return;

            let offset = e.pageX - mouseLocation;
            wrapper.scrollLeft = galleryLocation - offset;
        }

        const dragStop = e => {
            dragging = false;
            mouseLocation = e.pageX;
            galleryLocation = wrapper.scrollLeft;
        }

        gallery.addEventListener('mousedown', dragStart);
        gallery.addEventListener('mousemove', dragActive);
        gallery.addEventListener('mouseup', dragStop);

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

let progress = document.getElementById("progress");

window.onscroll = function () {
  updateProgress();
};

function updateProgress() {
  let scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let scrolled = (scrollPosition / height) * 100;
  progress.style.width = `${scrolled}%`;
}
