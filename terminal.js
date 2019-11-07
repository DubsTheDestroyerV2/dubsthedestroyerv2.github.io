var can = document.querySelector(".overlay");
can = can.querySelector(".screen");
function makeCRT() {
  can.width = window.innerWidth;
  can.height = window.innerHeight;
  console.log(can.width + ' vs ' + can.height);
  var ctx = can.getContext('2d');
  ctx.lineWidth = 1;
  var i;
  for (i = 8; i < can.clientWidth; i += 8) {
    ctx.beginPath();
    ctx.moveTo(i, 0);
    ctx.lineTo(i, can.clientHeight);
    ctx.stroke();
  }
  for (i = 8; i < can.clientHeight; i += 8) {
    ctx.beginPath();
    ctx.moveTo(0, i);
    ctx.lineTo(can.clientWidth, i);
    ctx.stroke();
  }
}
makeCRT();
window.addEventListener("resize", makeCRT);
