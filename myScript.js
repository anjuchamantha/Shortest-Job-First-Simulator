function getTableData() {
  var dataTable = document.getElementById("processTable")
  var rowLength = dataTable.rows.length;
  var processArr = [];
  for (k = 1; k < rowLength; k++) {
    var objCells = dataTable.rows.item(k).cells;
    var process = new Process(objCells.item(0).innerHTML, objCells.item(1).innerHTML, objCells.item(2).innerHTML);
    processArr.push(process);
  }
  return processArr;
}


function random_color() {
  var a = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var c = Math.floor(Math.random() * 256);
  var random_color = "rgb(" + a + "," + b + "," + c + "," + 0.8 + ")";

  return random_color;
}

async function run() {
  time = 0;

  var speed = parseInt(document.getElementById("drop").value);
  // document.getElementById('bt').style.visibility = 'hidden';
  document.getElementById('btstop').style.visibility = 'visible';

  canvasInitiate();
  arr = getTableData();
  reset(arr);
  processes = arr.slice(0, arr.length);
  var totalBurst = 0;
  for (l = 0; l < processes.length; l++) {
    totalBurst = totalBurst + Number(processes[l].burstTime);
  }

  var tb = 0;
  waitingTimes = [];
  turnAroundTimes = [];
  while (true) {
    if (tb >= totalBurst) {
      break;
    }

    waitingArr = [];

    for (m = 0; m < processes.length; m++) {
      p = processes[m];
      if (p.arrivalTime <= time) {
        waitingArr.push(processes[m]);
        processes.splice(m, 1);
        m--;
      }
    }

    if (!(waitingArr.length == 0)) {
      waitingArr.sort(dynamicSort("burstTime"));

      for (ex = 0; ex < waitingArr.length; ex++) {
        exProcess = waitingArr[ex];

        var wt = tb - exProcess.arrivalTime;
        if (wt < 0) {
          wt = 0;
        }

        exProcessBurstTime = exProcess.burstTime;
        changeColor();

        for (pos = 0; pos < arr.length; pos++) {
          if (arr[pos].job == exProcess.job) {
            break
          }
        }
        console.log("")
        console.log(exProcess.job + " waiting time = " + wt);
        document.getElementById('processTable').rows[pos + 1].cells[5].innerHTML = wt;
        var turnAroundTime = parseInt(wt) + parseInt(exProcessBurstTime);
        turnAroundTimes.push(turnAroundTime);
        document.getElementById('processTable').rows[pos + 1].cells[6].innerHTML = turnAroundTime;


        waitingTimes.push(wt);
        document.getElementById('avgwt').innerHTML = "Average Waiting Time = " + roundToTwo(waitingTimes.reduce((a, b) => a + b, 0) / waitingTimes.length);
        document.getElementById('avgtat').innerHTML = "Average Turn Around Time = " + roundToTwo(turnAroundTimes.reduce((c, d) => c + d, 0) / turnAroundTimes.length);

        document.getElementById('processTable').rows[pos + 1].cells[4].style.backgroundColor = color;
        var h = 0;
        while (exProcessBurstTime > 0) {
          h++;
          console.log("t=" + time + " " + exProcess.job + " " + exProcessBurstTime + " " + color);
          var speed = parseInt(document.getElementById("drop").value);
          await execute(speed, exProcess.job + h);
          time++;
          tb++;
          exProcessBurstTime--;
        }
      }
    } else {
      color = "#fff";
      var speed = parseInt(document.getElementById("drop").value);
      await execute(speed, "-");
      time++;
    }
  }
  c.fillStyle = '#000080';
  c.font = "10px Comic Sans MS";
  c.fillText(i, x, y + 62);
  document.getElementById('btstop').innerHTML = "Reload";
  document.getElementById('avgwt').style.color = 'crimson';
  document.getElementById('avgtat').style.color = 'crimson';
}




function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function dynamicSort(property) {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a, b) {
    var result = (a[property] > b[property]) ? -1 : (a[property] < b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

function stop() {
  document.location.reload(true);
}

function roundToTwo(num) {
  return num.toFixed(2);
}

function reset(arr) {
  document.getElementById('avgwt').style.color = '#404E67';
  document.getElementById('avgtat').style.color = '#404E67';
  document.getElementById('avgwt').innerHTML = "Average Waiting Time = 0.00";
  document.getElementById('avgtat').innerHTML = "Average Turn Around Time = 0.00";

  for (q = 1; q <= arr.length; q++) {
    document.getElementById('processTable').rows[q].cells[4].style.backgroundColor = '#fff';
    document.getElementById('processTable').rows[q].cells[5].innerHTML = null;
    document.getElementById('processTable').rows[q].cells[6].innerHTML = null;
  }

}