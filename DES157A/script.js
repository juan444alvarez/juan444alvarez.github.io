(function(){
    'use strict';
    console.log('reading JS');

    //image array
    const filmImages = [
        'img/film-1.webp',
        'img/film-2.webp',
        'img/film-3.webp',
        'img/film-4.webp',
        'img/film-5.webp',
        'img/film-6.webp'
    ];
    
    //css blend-mode array
    const blendModes = [
        'exclusion',
        'hard-light',
        'luminosity',
        'screen',
        'difference',
        'normal'
    ];

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/randomx
    //returns random element from any given array (using 2 so just applying same logic to both)
    function getRandomItem(arr) {
        return arr[Math.floor(Math.random() * arr.length)];
    }

    function randomizeGrid() {
        //Grabbing all grid-item images
        const gridImages = document.querySelectorAll('.grid-item img');
        //kind of like a loop here but for each item in array
        //random delay for semi-staggered effect. originally had without & images change all together which is odd. would've liked to have more chaotic effect vs "burst" effect but fisher-yates is too hard to figure out at the moment!
        gridImages.forEach(img => {
            const randomDelay = Math.random() * 200;

            setTimeout(() => {
                const randomImg = getRandomItem(filmImages);
                img.src = randomImg;

                const randomBlendMode = getRandomItem(blendModes);
                img.style.mixBlendMode = randomBlendMode;
            }, randomDelay);
        });
    }

    let targetCenterX = 0;
    let targetCenterY = 0;  
    let finalScrollX = 0;
    let finalScrollY = 0;

    function calculateTargetCenter() {
        const centralImage = document.querySelector('.central-image');
        //getting size and position of the elemnt relative to viewport
        const rect = centralImage.getBoundingClientRect();

        //adding half the width of central-image to rect.left to get center
        const imageCenterX = rect.left + rect.width / 2;
        const imageCenterY = rect.top + rect.height / 2;

        //originally tried to grab center of entire screen, but have to calc central image beforehand since "true center" is offset on grid.
        targetCenterX = window.scrollX + imageCenterX - window.innerWidth / 2;
        targetCenterY = window.scrollY + imageCenterY - window.innerHeight / 2;

        finalScrollX = targetCenterX;
        finalScrollY = targetCenterY;
    }

    //ai to help me figure out linear interpolation for mouse movement, parallax effect, and formulas for calculation.
    //(not part of assignment reqs but I thought it would be a cool addition and experimentation with event.clientX/Y & window.inner)
    //also referenced https://processing.org/examples/interpolate.html
    function handleParallax(event) {
        const xPos = event.clientX;
        const yPos = event.clientY;

        const factorX = (xPos / window.innerWidth) * 2 - 1;
        const factorY = (yPos / window.innerHeight) * 2 - 1;

        const MAX_OFFSET_X = window.innerWidth * 0.2;
        const MAX_OFFSET_Y = window.innerHeight * 0.2;

        const offsetX = factorX * MAX_OFFSET_X;
        const offsetY = factorY * MAX_OFFSET_Y;

        finalScrollX = targetCenterX + offsetX;
        finalScrollY = targetCenterY + offsetY;
    }

    function animateScroll() {
        const currentScrollX = window.scrollX;
        const currentScrollY = window.scrollY;

        const newScrollX = currentScrollX + (finalScrollX - currentScrollX) * 0.04;
        const newScrollY = currentScrollY + (finalScrollY - currentScrollY) * 0.04;
                
        window.scrollTo(newScrollX, newScrollY);
        requestAnimationFrame(animateScroll);
    }
    //end ai

    //since functions and not all event listeners, adding slight delay to call
    setTimeout(() => {
        calculateTargetCenter();
        window.scrollTo(targetCenterX, targetCenterY);
        randomizeGrid();
        //repeating timer every 1.5 seconds to cycle through images and blend-modes
        setInterval(randomizeGrid, 1500);
        window.addEventListener('mousemove', handleParallax);               
        requestAnimationFrame(animateScroll);
    }, 50);
}());
