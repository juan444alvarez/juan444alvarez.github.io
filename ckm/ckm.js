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

updateProgress();

function updateProgress() {
  let scrollPosition =
    document.documentElement.scrollTop || document.body.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  let scrolled = (scrollPosition / height) * 100;
  progress.style.width = `${scrolled}%`;
}
