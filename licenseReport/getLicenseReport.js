//declaiming 
const reportPath = __dirname+"\\license.bat";
const txtPath = __dirname+"\\report.txt";
var detailReport = [];
var aecList = [];
var userList = [];
var emptyKey = "0 license";
var aecKey = "AECCOL";
var userKey = "start";
var userCount = 0;
var headerKey = "Users";
//Node.js module
const { exec } = require('child_process');
const fs = require('fs');

//functions
function getReport () {
  const child = exec(reportPath, (error, stdout, stderr) => {
    if (error) {
      throw error;
    }
  });
  var report = fs.readFileSync(txtPath).toString();
  //remove header (everything before first "Users")
  report = report.slice(report.indexOf(headerKey));
  //make it array
  report = report.split("\n");
  return report
};

function getSeatInfo (string) {
  var list = string.replace("\r","").split(" ");
  return [list[6], list[12]]
};

function getUserInfo (string) {
  var list = string.replace("\r","").split(" ");
  return [list[4], list[5], list[12], list[13]]
};

function getReportInfo (report) {
  //remove empty space ("\r")& license (0 licenses)
  for (let i=0; i<report.length; i++ ) {
  //clean and move data to detailReport
  
    if(report[i]!=="\r" && report[i].indexOf(emptyKey) == -1) {
      detailReport.push(report[i].replace("\r",""));
      //Get AEC info
      if(report[i].indexOf(aecKey) !== -1 && report[i].indexOf("Total") !== -1) {
        let [a, b] = getSeatInfo(report[i]);
        aecList.push({seaIssued: a, seatUsed: b});
      };
      //Get User info
      if(report[i].indexOf(userKey) !== -1 && userCount<Number(aecList[0].seatUsed)) {
        let [a, b, c, d] = getUserInfo(report[i]);
        userList.push({userName: a, computerName: b, date: c, time: d});
        userCount++
      };
    };
  };
  return [aecList, userList]
};

module.exports = {
  getReport,
  getSeatInfo,
  getUserInfo,
  getReportInfo
};
var report = getReport();
console.log(getReportInfo(report));
