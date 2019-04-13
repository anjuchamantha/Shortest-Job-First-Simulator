function getTableData() {
  var dataTable = document.getElementById("processTable")
  var rowLength = dataTable.rows.length;
  var processArr = [];
  for (k = 1; k < rowLength; k++) {
    var objCells = dataTable.rows.item(k).cells;
    var process = new Process(objCells.item(0).innerHTML, objCells.item(1).innerHTML, objCells.item(2).innerHTML, random_color());
    // console.log(process);
    processArr.push(process);
  }
  return processArr;
}

function takeColor(){
  var colorArr = []
}

function random_color() {
  var a = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  var c = Math.floor(Math.random() * 256);
  var random_color = "rgb(" + a + "," + b + "," + c + "," + 0.8 + ")";

  return random_color;
}

function run() {
  
  canvasInitiate();

  arr = getTableData();
  processes = arr.slice(0, arr.length);
  // console.log(processes);
  var totalBurst = 0;
  for (l = 0; l < processes.length; l++) {
    totalBurst = totalBurst + Number(processes[l].burstTime);
  }
  // alert(totalBurst);
  // console.log(processes[0].at)
  time = 0;
  while (true) {
    if (totalBurst <= 0) {
      break;
    }

    waitingArr = [];
    for (m = 0; m < processes.length; m++) {
      p = processes[m];
      // console.log(p.arrivalTime);
      if (p.arrivalTime <= time) {
        // console.log(processes[y]);
        waitingArr.push(processes[m]);
        processes.splice(m, 1);
        m--;
      }
    }

    if (!(waitingArr.length == 0)) {
      waitingArr.sort(dynamicSort("burstTime"));

      for (ex = 0; ex < waitingArr.length; ex++) {
        exProcess = waitingArr[ex];
        exProcessBurstTime = exProcess.burstTime;
        changeColor();
        while (exProcessBurstTime > 0) {
          console.log("t="+time+ " " + exProcess.job + " " + exProcessBurstTime + " " + color);
          // wait(1000);
          execute();
          time++;
          totalBurst--;
          exProcessBurstTime--;
        }

      }
    } else {
      
      color = "#F5F7FA";
      // wait();
      execute();
      time++;

    }

  }
}


async function simulate() {
    await timeout(1000);
    execute();
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

function wait(ms)
{
var d = new Date();
var d2 = null;
do { d2 = new Date(); }
while(d2-d < ms);
}