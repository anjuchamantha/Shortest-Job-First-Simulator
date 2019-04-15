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
  
  canvasInitiate();

  arr = getTableData();
  processes = arr.slice(0, arr.length);
  var totalBurst = 0;
  for (l = 0; l < processes.length; l++) {
    totalBurst = totalBurst + Number(processes[l].burstTime);
  }
  time = 0;
  while (true) {
    if (totalBurst <= 0) {
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
        // document.getElementById('processTable').rows[i].cells[j].style.backgroundColor = "#003366";
        exProcessBurstTime = exProcess.burstTime;
        changeColor();
        while (exProcessBurstTime > 0) {
          console.log("t="+time+ " " + exProcess.job + " " + exProcessBurstTime + " " + color);
          await execute();
          time++;
          totalBurst--;
          exProcessBurstTime--;
        }
      }
    } else {
      color = "#F5F7FA";

      await execute();
      time++;
    }
  }
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
