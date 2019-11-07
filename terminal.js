alert("If you are prone to epilepsy this site is not for you");
var can = document.querySelector(".overlay");
can = can.querySelector(".screen");
//Pixelation
function makeCRT() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  console.log(can.width + ' vs ' + can.height);
  var ctx = can.getContext('2d');
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 0.5;
  var i;
  for (i = 3; i < can.clientWidth; i += 3) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, can.clientHeight);
    ctx.stroke();
  }
  for (i = 3; i < can.clientHeight; i += 3) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(can.clientWidth, i);
    ctx.stroke();
  }
}
makeCRT();
window.addEventListener("resize", makeCRT);
//Flicker effect
var all = document.documentElement;
var goingDown = true;
function flicker() {
  if(all.style.opacity <= 0.25 && goingDown) {
    goingDown = false;
    console.log('switched up at ' + all.style.opacity);
    return;
  }
  if(all.style.opacity >= 1 && !goingDown) {
    goingDown = true;
    console.log('switched down at ' + all.style.opacity);
    return;
  }
  all.style.opacity += 0.05;
  if(goingDown) all.style.opacity -= 1;
}
setInterval(flicker, 12);
