/**
  * AUTHOR: 张太振
  */

var total = 0, timer, count = 0, bot = 0,
    start = document.getElementById('start'),
    stop = document.getElementById('stop'),
    restart = document.getElementById('restart'),
    countobj = document.getElementById('count'),
    ttn = document.getElementById('ttn'),
    bots = document.getElementById('bot-content').getElementsByTagName('span');
start.onclick = function() {
    var h, m, s;
    if(!timer) {
        startCount();
        start.className = 'active';
        setTimeout(function(){start.className = '';},100); 
    }
}
stop.onclick = function() {
    // var time = document.getElementById("count").innerHTML.match(/\d+/g);
    clearInterval(timer);
    timer = null;
    stop.className = 'active';
    setTimeout(function(){stop.className = '';},100); 
}
restart.onclick = function() {
    var h, m, s;
    clearInterval(timer);
    timer = null;
    count = 0;
    setNumber(countobj, 0);
    startCount();
    restart.className = 'active';
    setTimeout(function(){restart.className = '';},100); 
}
function startCount() {
    timer = setInterval(function() {
        count++;
        total++;
        setNumber(countobj, count);
        setNumber(ttn, total);
        for(var i=0,len=bots.length;i<len;i++) {
        	bots[i].className = '';
        }
        bots[bot].className = 'active';
        bot = (bot+1)%3;
    }, 1000);
}
function setNumber(obj, all) {
    var h = Math.floor(all/3600),
        m = Math.floor(all%3600/60),
        s = all%3600%60;
    h = h<10 ? ('0'+h) : h;
    m = m<10 ? ('0'+m) : m;
    s = s<10 ? ('0'+s) : s;
    obj.innerHTML = h + ':' + m + ':' + s;
}