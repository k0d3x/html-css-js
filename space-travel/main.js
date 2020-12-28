//DOM selectors
const canvas = document.getElementById("canvas");
const canvasCtx = canvas.getContext("2d");
const output = document.querySelector("#speed");

//global variables
let screen,
  starsElements,
  starsParams = { speed: 20, number: 400, extinction: 4 };

//run stars

setUpStarts();
updateStars();

//update stars on resize to keep them centered
window.onresize = function () {};

//star constructor
function Star() {
  this.x = Math.random() * canvas.width;
  this.y = Math.random() * canvas.height;
  this.z = Math.random() * canvas.width;

  //this.b = 1;

  this.move = function () {
    this.z -= starsParams.speed;
    if (this.z <= 0) {
      //this.b = 0;
      this.z = canvas.width;
    }
  };

  this.show = function () {
    let x, y, rad, opacity;
    //if (this.b == 1) {
    x = (this.x - screen.c[0]) * (canvas.width / this.z);
    x = x + screen.c[0];
    y = (this.y - screen.c[1]) * (canvas.width / this.z);
    y = y + screen.c[1];
    rad = canvas.width / this.z;
    console.log("rad = " + rad);
    opacity =
      rad > starsParams.extinction
        ? 1.5 * (2 - rad / starsParams.extinction)
        : 1;
    //console.log(this.z);
    //console.log("Center=: [" + x + " , " + y + " ]");
    canvasCtx.beginPath();
    canvasCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
    canvasCtx.arc(x, y, rad, 0, Math.PI * 2);
    canvasCtx.fill();
    //}
  };
}

//setup canvas initialize all stars
function setUpStarts() {
  screen = {
    w: window.innerWidth,
    h: window.innerHeight,
    c: [window.innerWidth * 0.5, window.innerHeight * 0.5],
  };
  window.cancelAnimationFrame(updateStars);
  canvas.width = screen.w;
  canvas.height = screen.h;
  starsElements = [];
  for (let i = 0; i < starsParams.number; i++) {
    starsElements[i] = new Star();
  }
}

//redraw the frame
function updateStars() {
  canvasCtx.fillStyle = "black";
  canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
  starsElements.forEach((star) => {
    star.show();
    star.move();
  });
  window.requestAnimationFrame(updateStars);
}
