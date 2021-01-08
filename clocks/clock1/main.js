var interval = 1000;
function clock() {
  const date = new Date();
  const hours = ((date.getHours() + 11) % 12) + 1;
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const hourDeg = hours * 30;
  const minuteDeg = minutes * 6;
  const secondDeg = seconds * 6;

  const h = hours < 10 ? "0" + hours : hours;
  const m = minutes < 10 ? "0" + minutes : minutes;

  console.log(hours);
  console.log(h);
  document.querySelector(".hours").innerHTML = h;
  document.querySelector(".minutes").innerHTML = m;

  document.querySelector(".hour").style.transform = `rotate(${hourDeg}deg)`;
  document.querySelector(".minute").style.transform = `rotate(${minuteDeg}deg)`;
  document.querySelector(".second").style.transform = `rotate(${secondDeg}deg)`;
}

clock();
setInterval(clock, interval);
