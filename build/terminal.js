//Please update
window.onload = function() {
    alert("If you are prone to epilepsy this site is not for you");
    var can = document.querySelector(".overlay");
    can = can.querySelector(".screen");
    
    
    //Main planning functions
    function dnode(name) {
        this.folder = true;
        this.val = name;
        this.inside = [];
        this.owner = null;
        this.addNode = function(node) {
            node.owner = this;
            this.inside.push(node);
        }
    }

    function fnode(val, inside) {
        this.val = val;
        this.inside = inside;
        this.folder = false;
        this.owner = null;
        this.addNode = () => null;
    }
    
    //actual planning
    var cdrive = new dnode("C");
    var nest = new dnode("folder");
    var nested = new dnode("inside a folder");
    nested.addNode(new fnode("something-cool.txt", "cool"));
    nested.addNode(new fnode("something-bad.txt", "bad"));
    nested.addNode(new fnode("hexedit.exe", hexedit));
    nest.addNode(nested);
    cdrive.addNode(nest);
    
    //functions for programs
    function hexedit(contents) {
        var highlighted = 0;
        var con = contents;
        update();
        
        
        function push(event) {
            if(event.keyCode == 37) {
                highlighted--;
            }
            if(event.keyCode == 39) {
                highlighted++;
            }
            update();
            if(event.keyCode == 27) {
                con=concpy;
                document.removeEventListener('keypress', press);
                document.removeEventListener('keypush', push);
                actualAdventure();
            }
        }
        function press(event) {
            console.log("its pressed");
            //con = con.concat(String.fromCharCode(event.keyCode));
            //update();
        }
        function update() {
            var output = "";
            var i;
            for(i = 0; i < con.length; i++) {
                output = output.concat((highlighted == i * 2) ? "<div id=\"highlighted\" class=\"highlighted\">" : "", (con.charCodeAt(i) >> 8).toString(16), (highlighted == i) ? "</div>" : "");
                output = output.concat((highlighted == i  * 2 + 1) ? "<div id=\"highlighted\" class=\"highlighted\">" : "", (con.charCodeAt(i) & 0xf).toString(16), (highlighted == i) ? "</div>" : "", " &nbsp ");
            }
            light.innerHTML = output;
        }
        document.addEventListener('keydown', push);
        document.addEventListener('keypress', press);
    }
    
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
        if (opacity < 0.5)
            opacity = 1;
        all.style.opacity = opacity;
    }
    setInterval(flicker, 1);

    function dnode(name) {
        this.folder = true;
        this.val = name;
        this.inside = [];
        this.addNode = function(node) {
            node.owner = this;
            this.inside.push(node);
        }
    }

    function fnode(val, inside) {
        this.val = val;
        this.inside = inside;
        this.folder = false;
        this.addNode = () => null;
    }


    var light = document.getElementById('light');
    var strt = "C:\\";
    var dir = "";
    var concpy;
    var end = "\> ";
    var input = "";
    var highlight = 0;
    var con = "RoveOS [Version 01.0.00000.000]<br/>(c) NASA (Who Would be Lost Without Jack Trevor).  All Rights Reserved<br /> <br />";

    function actualAdventure() {
        var curr = cdrive;
        update();

        function update() {
            var output = con.concat(strt, dir, end, input.substr(0, highlight), "<div id=\"highlighted\" class=\"highlighted\">", input.charAt(highlight), "</div>", input.substr(highlight + 1, input.length));
            if (highlight >= input.length - 1) {
                output = con.concat(strt, dir, end, input.substr(0, highlight), "<div id=\"highlighted\" class=\"highlighted\"> &nbsp </div>");
            }
            light.innerHTML = output;
        }

        function processCmd(sendin) {
            var something = String(sendin).trim();
            var isLs = something.trim() === String("ls");
            var isCd = something.trim().startsWith(String("cd").trim());
            var isCat = something.trim().startsWith(String("cat").trim());
            var isHelp = something.trim().startsWith(String("help").trim());
            var isDotS = something.trim().startsWith(String("./").trim());
            console.log('it is - ' + something + '\n' + isLs + ' vs ' + isCd);
            function pathToNode(path) {
                var targetNode = curr;
                use.split('\\' | '/').forEach((possibleDir, index) => {
                    var found = false;
                    if(possibleDir == '..') {
                        targetNode = targetNode.owner;
                        return;
                    }                 
                    targetNode.inside.forEach((inner) => {
                        if(inner.val.trim() == possibleDir.trim())
                            targetNode = inner;
                    });
                });
            }
            if (isDotS) {
                var found = false;
                for (var i = 0; i < curr.inside.length; i++) {
                    console.log(something.substr(2, something.indexOf(' ') - 2).trim());
                    if (something.substr(2, something.indexOf(' ') - 2).trim() == curr.inside[i].val.trim() && curr.inside[i].folder == false) {
                        found = true;
                    if (typeof(curr.inside[i].inside) == 'function') {
                            var foundtwo = false;
                            var content = "";
                            for (var i2 = 0; i2 < curr.inside.length; i2++) {
                               if (something.substr(something.indexOf(' ') + 1).trim() == curr.inside[i2].val.trim() && curr.inside[i2].folder == false) {
                                   content = curr.inside[i2].inside;
                                   concpy = con;
                                   con = "";
                                   document.removeEventListener('keydown', push);
                                   document.removeEventListener('keypress', press);
                                   foundtwo = true;
                                   curr.inside[i].inside(content);
                                   return true;
                                }
                            }
                            if (!found) {
                                con = con.concat("Not a valid File Bruh", content, " <br/>");
                            }else {
                                curr.inside[i].inside(content);
                                found = true;
                            }
                            break;
                        }
                    }
                }
                if (!found) {
                    con = con.concat("Not a valid File Brother <br />");
                }
            } else if (isHelp) {
                con = con.concat("cd *dir name* - move to another directory<br />ls - see files in the current directory <br /> cat *file name* - view the text contents of a file <br />");
            } else if (isCat) {
                var found = false;
                for (var i = 0; i < curr.inside.length; i++) {
                    if (something.substr(4).trim() == curr.inside[i].val.trim() && curr.inside[i].folder == false) {
                        con = con.concat(curr.inside[i].inside, "<br />");
                        found = true;
                        return true;
                    }
                }
                if (!found) {
                    con = con.concat("Not a valid File <br/>");
                }
            } else if (isLs) {
                console.log('heard');
                if (curr.inside == null) {
                    con = con.concat("<br />");
                    return;
                }
                for (var i = 0; i < curr.inside.length; i++) {
                    console.log(curr.inside[i].val);
                    con = con.concat((!curr.inside[i].folder) ? " <div id=\"green\" class=\"green\"> " : " <div id=\"blue\" class=\"blue\"> ", curr.inside[i].val, "</div><br />");
                }
            } else if (isCd) {
                var targetNode = curr;
                console.log("cd");
                var words = something.split(' ');
                var found = false;
                var use = something.substr(3);
                
                console.log(something.substr(3));
                for (var i = 0; i < curr.inside.length; i++) {
                    if (something.substr(3).trim() == curr.inside[i].val.trim() && curr.inside[i].folder == true) {
                        curr = curr.inside[i];
                        console.log(String(curr.val));
                        dir = dir.concat(String(curr.val), "\\");
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    con = con.concat("Not a valid Directory");
                }
            } else {
                if (input.length > 1)
                    con = con.concat("Unrecognized Command.  Use \"help\" to get a list of common commands <br />");
            }
        }

        function push(event) {
            {
                if (event.keyCode == 8) {
                    event.preventDefault();
                    if (input.length > 0) {
                        input = input.substr(0, highlight - 1).concat(input.substr(highlight, input.length));
                        highlight--;
                    }
                    update();
                    return;
                }
                if (event.keyCode == 9) {
                    event.preventDefault();
                    var starr = input.split(' ');
                    var currPath = "";
                    for (var i = starr.length - 1; i > -1; i--) {
                        currPath = currPath.concat(starr[i]);
                        for (var i2 = 0; i2 < curr.inside.length; i2++) {
                            if (curr.inside[i2].val.trim().startsWith(currPath.trim())) {
                                input = input.concat(curr.inside[i2].val.substr(currPath.length));
                                highlight = input.length;
                                update();
                                return;
                            }
                        }
                    }
                }
                if (event.keyCode == 13) {
                    con = con.concat(strt, dir, end, input, "<br />");
                    if(processCmd(input)) {
                        light.innerHtml = "";
                        return;
                    }
                    input = "";
                }
                if (event.keyCode == 37)
                    if (highlight > 0) highlight--;
                if (event.keyCode == 39)
                    if (highlight < input.length) highlight++;
                update();
            };
    }

    function press(event) {
            if (event.keyCode == 8) {
                event.preventDefault();
                if (input.length > 0) {
                    input = input.substr(0, highlight - 1).concat(input.substr(highlight, input.length));
                    highlight--;
                }
                update();
                return;
            }
            light.scrollTop = light.scrollHeight;

            highlight++;
            input = input.concat(String.fromCharCode(event.keyCode));
            update();
        }
        document.addEventListener('keydown', push);
        document.addEventListener('keypress', press);
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
    switch (i) {
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
    if (i < 8) {
        if (i % 2 == 1) setTimeout(setTxt, 1000);
        else setTimeout(setTxt, 100);
    } else {
        setTimeout(() => {
            bootseq += fifth;
            light.innerHTML = bootseq;
        }, 100);
        setTimeout(() => {
            bootseq += sixth;
            light.innerHTML = bootseq;
        }, 200);
        setTimeout(() => {
            bootseq += seventh;
            light.innerHTML = bootseq;
        }, 300);
        setTimeout(() => {
            bootseq += eigth;
            light.innerHTML = bootseq;
        }, 400);
        setTimeout(actualAdventure, 2000);
    }
}
setTxt();
}
