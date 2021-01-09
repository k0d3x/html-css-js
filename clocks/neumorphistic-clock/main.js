const deg = 6;
const hr = document.getElementById("hr");
const min = document.getElementById("min");
const sec = document.getElementById("sec");

setInterval(() => {
  let date = new Date();
  let hh = date.getHours() * 30;
  let mm = date.getMinutes() * deg;
  let ss = date.getSeconds() * deg;

  hr.style.transform = `rotateZ(${hh + mm / 12}deg)`;
  min.style.transform = `rotateZ(${mm}deg)`;
  sec.style.transform = `rotateZ(${ss}deg)`;
}, 1000);
