gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("main").style.transform ? "transform" : "fixed"
});






// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


gsap.from(".anim", {
    y: -120,
    opacity: 0,
    duration: 1,
    scrollTrigger: {
        scroller: "main",
        trigger: ".anim",
        start: "top 30%",
        end: "top 20%",
        // markers: true
    }
});

gsap.from(".anime", {
    y: -100,
    opacity: 0,
    duration: 0.8,
    stagger: 0.1,
    scrollTrigger: {
        scroller: "main",
        trigger: ".anime",
        start: "top 25%", 
        end: "top 40%",
        // markers: true
    }
});

gsap.from(".animate", {
    x: -100,
    opacity: 0,
    duration: 1,
    stagger: 0.3,
    scrollTrigger: {
        scroller: "main",
        trigger: ".animate",
        start: "top 70%", 
        end: "top 85%",
        // markers: true
    }
});

gsap.from(".animat", {
    x: -100,
    opacity: 0,
    duration: 0.7,
    stagger: 0.3,
    scrollTrigger: {
        scroller: "main",
        trigger: ".service",
        start: "top 70%", 
        end: "top 85%",
        // markers: true
    }
});

gsap.from(".zoom", {
    scale: 0,
    duration: 0.5,
    stagger: 0.3,
    scrollTrigger: {
        scroller: "main",
        trigger: ".counter",
        start: "top 70%", 
        end: "top 85%",
        // markers: true
    }
});

gsap.from(".zoomer", {
    scale: 0,
    duration: 0.7,
    stagger: 0.3,
    scrollTrigger: {
        scroller: "main",
        trigger: ".align-self-center",
        start: "top 70%", 
        end: "top 85%",
        // markers: true
    }
});

document.addEventListener('DOMContentLoaded', function (event) {
    // array with texts to type in typewriter
    var dataText = ["DreamCrash* Now Your Skills are valuable", "Get Connect with Clients", "Start Selling from Today", "Join us Now"];

    // type one text in the typewriter
    // keeps calling itself until the text is finished
    function typeWriter(text, i, fnCallback) {
        // check if text isn't finished yet
        if (i < (text.length)) {
            // add next character to h4
            document.querySelector(".typewriter-text").innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';

            // wait for a while and call this function again for the next character
            setTimeout(function () {
                typeWriter(text, i + 1, fnCallback)
            }, 100);
        }
        // text finished, call the callback if there is a callback function
        else if (typeof fnCallback == 'function') {
            // call the callback after a timeout
            setTimeout(fnCallback, 700);
        }
    }

    // start a typewriter animation for a text in the dataText array
    function startTextAnimation(i) {
        if (typeof dataText[i] == 'undefined') {
            setTimeout(function () {
                startTextAnimation(0);
            }, 20000);
        }
        // check if dataText[i] exists
        if (i < dataText[i].length) {
            // text exists! start the typewriter animation
            typeWriter(dataText[i], 0, function () {
                // after the callback (and the whole text has been animated), start the next text
                startTextAnimation(i + 1);
            });
        }
    }
    // start the text animation
    startTextAnimation(0);
});
