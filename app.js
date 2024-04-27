document.addEventListener("DOMContentLoaded", function(){
    const workItems = document.querySelectorAll(".work-item");
    const work = document.querySelector(".work");
    const overlay = document.querySelector(".overlay");
    const prevElements = document.querySelectorAll(".prev");

    overlay.style.top = "0%";
    overlay.style.left = "13.25%";
    document.querySelector("#prev-2").classList.add("active");

    function removeActiveClass(){
        prevElements.forEach(function(prev){
            prev.classList.remove("active");
        });
    }

    workItems.forEach((item, index) => {
        item.addEventListener("mouseover", function (){
            removeActiveClass();
            const activePrev = document.querySelector("#prev-" + (index +1));
            if(activePrev){
                activePrev.classList.add("active");
            }

            work.classList.add("hovered");
            switch(index){
                case 0:
                    overlay.style.top = "50%";
                    overlay.style.left = "50%";
                    work.className = "work bg-color-red hovered";
                    break;
                case 1:
                    overlay.style.top = "0%";
                    overlay.style.left = "13.25%";
                    work.className = "work bg-color-blue hovered";
                    break;
                case 2:
                    overlay.style.top = "-50%";
                    overlay.style.left = "-23.5%";
                    work.className = "work bg-color-green hovered";
                    break;
            }
        });

        item.addEventListener("mouseout", function(){
            work.classList.remove("hovered");
            work.className = "work";
            overlay.style.top = "0%";
            removeActiveClass();
            document.querySelector("#prev-2").classList.add("active");
        });
    });
});

// Function to handle tab switching
function switchTab(index) {
    let move = (100 / btns.length) * index;
    active.style.left = move + "%";

    // Reset text color for all buttons
    for (let j = 0; j < btns.length; j++) {
        btns[j].style.color = ""; // Reset to default text color
    }

    // Set text color to white for the clicked button
    btns[index].style.color = "white";
}

// Select all buttons and active tab
const btns = document.querySelectorAll(".tabs button");
const active = document.querySelector(".tabs .active"); // Corrected selector to select only one element

// Set initial state when the page loads
switchTab(0);

// Add click event listeners to buttons
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function() {
        // Reset text color for all anchor tags inside buttons
        for (let j = 0; j < btns.length; j++) {
            const anchorTag = btns[j].querySelector("a");
            if (anchorTag) {
                anchorTag.style.color = ""; // Reset to default text color
            }
        }
        
        switchTab(i);
        
        // Set text color of the clicked button's anchor tag
        const anchorTag = btns[i].querySelector("a");
        if (anchorTag) {
            anchorTag.style.color = "white";
        }
    });
}
