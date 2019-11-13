window.onload = function() {
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
    ctx.lineWidth = 0.4;
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
  var all = document.getElementById('light');
  var goingDown = false;
  var opacity = 0.5;
  var i = 0;
  function flicker() {
    opacity -= 0.1;
    if(opacity < 0.4)
      opacity = 1;
    all.style.opacity = opacity;
  }
  setInterval(flicker, 1);
  
  var light = document.getElementById('light'); 
  var bootseq = "INIT";
  light.innerHTML = bootseq;
  var i = -1;
  function setTxt() {
    i++;
    switch(i) {
      case 1:
        bootseq = "INIT" + "<br />[...] Loading Kernel Modules";
        break;
      case 2:
        bootseq = "INIT" + "<br />[<div id=\"green\"> OK </div>] Loading Kernel Modules";
        break;
    }
    light.innerHTML = bootseq;
  }
  setTimeout(setTxt, 500);
  setTimeout(setTxt, 500);
  setTimeout(setTxt, 1000);
}
