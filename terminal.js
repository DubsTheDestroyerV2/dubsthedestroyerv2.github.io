//Please update
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
  var cmdSign = "\>";
  var input = "";
  function actualAdventure() {
    var con = "RoveOS [Version 01.0.00000.000]<br/>(c) NASA (Who Would be Lost Without Jack Trevor).  All Rights Reserved (step off Martians) <br />";
    light.innerHTML = con.concat(input);  
    
    document.addEventListener('keydown', (event) => {
      if(event.keyCode == 8) {
        if(input.length > 0) {
          input = input.substr(0, input.length - 1);
        }
      }
      var output = con.concat(input);
      light.innerHTML = output;
    });
    
    document.addEventListener('keypress', (event) => {
      input = input.concat(String.fromCharCode(event.keyCode));
      var output = con.concat(input);
      console.log(String.fromCharCode(event.keyCode));
      console.log(output);
      light.innerHTML = output;  
    });
  }
  
  var i = -1;
  var init = "INIT <br />";
  var dot = "[&nbsp ... &nbsp]&nbsp&nbsp&nbsp";
  var ok = "[<div id=\"green\" class=\"green\">&nbspOK&nbsp</div>]&nbsp&nbsp";
  var failed = "[<div id=\"red\" class=\"red\">FAIL</div>]&nbsp";
  var first = "Loading Kernel Modules <br />";
  var second = "Verifying Input Method <br />";
  var third = "Activating Swap <br />";
  var fourth = "Initializing Comms Protocols <br />";
  var fifth = "Loading Options.ini <br />";
  var sixth = "Loading Basic OS Functionality <br />";
  var seventh = "Loading Extended OS Functionality <br />";
  var eigth = "Booting ..."
  var bootseq = "";
  function setTxt() {
    i++;
    switch(i) {
      case 0:
        bootseq = init;
        break;
      case 1:
        bootseq = init + dot + first;
        break;
      case 2:
        bootseq = init + ok + first;
        break;
      case 3:
        bootseq = init + ok + first + dot + second;
        break;
      case 4:
        bootseq = init + ok + first + ok + second;
        break;
      case 5:
        bootseq = init + ok + first + ok + second + dot + third;
        break;
      case 6:
        bootseq = init + ok + first + ok + second + ok + third;
        break;
      case 7:
        bootseq = bootseq + dot + fourth;
        break;
      case 8:
        bootseq = init + ok + first + ok + second + ok + third + failed + fourth;
        break;
    }
    light.innerHTML = bootseq;
    if(i < 8) {
      if(i %2 == 1) setTimeout(setTxt, 2000);
      else setTimeout(setTxt, 100);
    }else {
      setTimeout(() => {bootseq += fifth; light.innerHTML = bootseq;}, 100);
      setTimeout(() => {bootseq += sixth; light.innerHTML = bootseq;}, 200);
      setTimeout(() => {bootseq += seventh; light.innerHTML = bootseq;}, 300);
      setTimeout(() => {bootseq += eigth; light.innerHTML = bootseq;}, 400);
      setTimeout(actualAdventure, 2000);
    }
  }
  setTxt();
}
