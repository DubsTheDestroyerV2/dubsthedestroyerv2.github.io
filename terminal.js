var can = document.getElementById("screen");
var ctx = can.getContext("2d");
for (var i = 4; i < can.clientWidth; i += 4) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i, can.clientHeight);
  ctx.stroke();
}
