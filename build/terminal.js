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
    if(opacity < 0.5)
      opacity = 1;
    all.style.opacity = opacity;
  }
  setInterval(flicker, 1);
  
  function node(folder, inside, val) {
	this.folder = folder;
	this.inside = inside;
	this.val = val;
  }
  
  
  var light = document.getElementById('light'); 
  var strt = "C:\\";
  var dir = "";
  var end = "\> ";
  var input = "";
  var highlight = 0;
  var con = "RoveOS [Version 01.0.00000.000]<br/>(c) NASA (Who Would be Lost Without Jack Trevor).  All Rights Reserved<br /> <br />";
  function actualAdventure() {
	var cdrive = new node(true, [new node(false, "folder", "hello world"), new node(true, [new node(false, "meme", "bet ya didnt expect this huh")], "folder")], "C");
	var curr = cdrive;
 
    light.innerHTML = con.concat(strt, dir, end, input);  
    
	function update() {
	  var output = con.concat(strt, dir, end, input.substr(0, highlight), "<div id=\"highlighted\" class=\"highlighted\">", input.charAt(highlight), "</div>", input.substr(highlight + 1, input.length));     
      if(highlight >= input.length - 1) {
        output = con.concat(strt, dir, end, input.substr(0, highlight), "<div id=\"highlighted\" class=\"highlighted\"> &nbsp </div>");     
      }
      light.innerHTML = output;
	}
	
    function processCmd(sendin) {
		var something = String(sendin).trim();
		var isLs = something.trim() === String("ls");
		var isCd = something.trim().startsWith(String("cd").trim());
		
		
		console.log('it is - ' + something + '\n' + isLs + ' vs ' +  isCd);
		
		if(isLs) {
			console.log('heard');
			for(var i = 0; i < curr.inside.length; i++) {
				console.log(curr.inside[i].val);
				con = con.concat("&nbsp &nbsp &nbsp &nbsp", curr.inside[i].val, "<br />");
			}
		}
		if(isCd) {
			console.log("cd");
			var words = something.split(' ');
			var found = false;
			for(var i = 0; i < curr.inside.length; i++) {
				if(words[1].trim() === curr.inside[i].val.trim() && curr.inside[i].folder == true) {
					curr = curr.inside[i];
					console.log(String(curr.val));
					if(strt.length > 2) 
						strt = strt.substr(0, 2);
					dir = dir.concat("\\", String(curr.val));
					con = con.concat("<br />");
					found = true;
					break;
				}
			}
			if(!found) {
				con = con.concat("Not a valid Directory");
				con = con.concat("<br />");
			}
		}
	}
    document.addEventListener('keydown', (event) => {
      if(event.keyCode == 8) {
        event.preventDefault();
        if(input.length > 0) {
          input = input.substr(0, highlight-1).concat(input.substr(highlight, input.length));
          highlight--;
        }
		update();
		return;
      }
	  if(event.keyCode == 9) {
		event.preventDefault();
		for(var i = 2; i < input.length; i++) {
			for(var i2 = 1; i2 < curr.inside.length; i2++) {
				if(curr.inside[i2].val.trim().startsWith(input.substr(i).trim())) {
					input = input.concat(curr.inside[i2].val.substr(i, curr.inside[i2].val.length));
				}
			}
		}
	  }
      if(event.keyCode == 13) {
        con = con.concat(strt, dir, end, input, "<br />");
        processCmd(input);
        input = "";
      }
      if(event.keyCode == 37) if(highlight > 0) highlight--;
      if(event.keyCode == 39) if(highlight < input.length) highlight++;
	  update();
    });
    
    document.addEventListener('keypress', (event) => {
	
      if(event.keyCode == 8) {
        event.preventDefault();
        if(input.length > 0) {
          input = input.substr(0, highlight-1).concat(input.substr(highlight, input.length));
          highlight--;
        }
		update();
		return;
      }
	  light.scrollTop = light.scrollHeight;

      highlight++;
      input = input.concat(String.fromCharCode(event.keyCode));
      update();
    });
  }
  
  var i = -1;
  var init = "INIT <br />";
  var dot = "[&nbsp...&nbsp]&nbsp&nbsp";
  var ok = "[<div id=\"green\" class=\"green\">&nbspOK&nbsp</div>]&nbsp&nbsp";
  var failed = "[<div id=\"red\" class=\"red\">FAIL</div>]&nbsp&nbsp";
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
      if(i %2 == 1) setTimeout(setTxt, 1000);
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