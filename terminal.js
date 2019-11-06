var can = document.getElementById('screen');
can.width = window.innerWidth + "px";
can.height = window.innerHeight + "px";
var ctx = can.getContext('2d');
var i;
for (i = 4; i < can.clientWidth; i += 4) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i, can.clientHeight);
  ctx.stroke();
}
for (i = 4; i < can.clientHeight; i += 4) {
  ctx.beginPath();
  ctx.moveTo(0, i);
  ctx.lineTo(can.clientWidth, i);
  ctx.stroke();
}
