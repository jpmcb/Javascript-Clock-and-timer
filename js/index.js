// ---- JS clock and timer, by jpmcb, message me with questions! --- //

// define the timer object with functions to be called
var timer = {
  defaultMinutes : 25,
  defaultSeconds : 0,
  defaultTenthSeconds : 0,
  pause : false,

  add : function () {
    timer.defaultMinutes = timer.defaultMinutes + 1;
    document.getElementById("timerDisplay").innerHTML =
      timer.defaultMinutes + " : " + timer.defaultSeconds + timer.defaultTenthSeconds;

  },

  sub : function () {
    timer.defaultMinutes = timer.defaultMinutes - 1;
    document.getElementById("timerDisplay").innerHTML =
      timer.defaultMinutes + " : " + timer.defaultSeconds + timer.defaultTenthSeconds;
  }
}

function setClock() {
  // get & set the data for current time
  var d = new Date ();
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var seconds = d.getSeconds();
  document.getElementById("clock").innerHTML = hours + " : " + minutes + " : " + seconds;

  if (timer.pause) {
    if (timer.defaultMinutes === 0 && timer.defaultSeconds === 0 && timer.defaultTenthSeconds === 0) {
      document.getElementById("timerDisplay").innerHTML = "COMPLETE";
      document.getElementById("animate").style.animationPlayState = "paused"
    } else {

      if (timer.defaultSeconds === 0 && timer.defaultTenthSeconds === 0) {
        timer.defaultSeconds = 6;
        timer.defaultMinutes = timer.defaultMinutes - 1;
        document.getElementById("timerDisplay").innerHTML =
          timer.defaultMinutes + " : " + timer.defaultSeconds + timer.defaultTenthSeconds;
      }

      if (timer.defaultTenthSeconds === 0) {
        timer.defaultTenthSeconds = 10;

        document.getElementById("timerDisplay").innerHTML =
          timer.defaultMinutes + " : " + timer.defaultSeconds + timer.defaultTenthSeconds;

        timer.defaultSeconds = timer.defaultSeconds - 1;
      }

      if (timer.defaultTenthSeconds !== 0) {
        timer.defaultTenthSeconds -= 1;
        document.getElementById("timerDisplay").innerHTML =
          timer.defaultMinutes + " : " + timer.defaultSeconds + timer.defaultTenthSeconds;
      }
    }
  }
}

// increase timeout once button click
document.getElementById("addTime").onclick = timer.add;

// decrease timeout once button is clicked
document.getElementById("subTime").onclick = timer.sub;

// when pause button is clicked, change the pause value to true or false
document.getElementById("pause").onclick = function () {
  if (timer.pause === true) {
    timer.pause = false;
    document.getElementById("pause").innerHTML = "Start";
    document.getElementById("animate").style.animationPlayState = "paused";
  } else if (timer.pause === false) {
    timer.pause = true;
    document.getElementById("pause").innerHTML = "Pause";
    if (document.getElementById("animate").className != "animation") {
      document.getElementById("animate").className += "animation";
    }
    document.getElementById("animate").style.animationPlayState = "running";
  }
}

window.onload = function () {
  document.getElementById("timerDisplay").innerHTML =
    timer.defaultMinutes + " : " + timer.defaultSeconds + timer.defaultTenthSeconds;
  window.setInterval(setClock, 1000);
}
