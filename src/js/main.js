var obj = require('../js/currency-data-rate.js');
var arrCHF = [], arrEUR = [], arrUSD = [];
writeDataToArr();
function writeDataToArr() {
  for (var date in obj) {
    arrCHF.push(obj[date]['CHF']);
    arrEUR.push(obj[date]['EUR']);
    arrUSD.push(obj[date]['USD']);
  }
}

function minValue(arr) {
  var ln = arr.length - 1;
  var min = Number.MAX_VALUE;
  for (var i = 0; i < ln; i++) {
    var tmp = arr[i]['rate'];
    if (min > tmp) {
      min = tmp;
    }
  }
  return min;
}
function maxValue(arr) {
  var ln = arr.length - 1;
  var max = Number.MIN_VALUE
  for (var i = 0; i < ln; i++) {
    var tmp = arr[i]['rate'];
    if (max < tmp) {
      max = tmp;
    }
  }
  return max;
}
function averageVal(arr) {
  var ln = arr.length - 1;
  var sum = 0;
  for (var i = 0; i < ln; i++) {
    var tmp = arr[i]['rate'];
    sum += tmp;
  }
  return sum / ln;
}
function findAllDayWhisRate(arr, rate) {
  var ln = arr.length - 1;
  var arrDay = [];
  for (var i = 0; i < ln; i++) {
    var tmp = arr[i]['rate'];
    if (rate === tmp) {
      arrDay.push(arr[i]['exchangedate']);
    }
  }
  return arrDay;
}
function findAllDayWhisAverage(arr, average) {
  var ln = arr.length - 1;
  var min = average * 0.975;
  var max = average * 1.025;
  var arrDay = [];

  for (var i = 0; i < ln; i++) {
    if (min < arr[i]['rate'] && arr[i]['rate'] < max) {
      arrDay.push(arr[i]['exchangedate']);
    }
  }
  return arrDay.length;

}
function correlation(arrVal1, arrVal2, averageVal1, averageVal2) {
  var correletion;
  var ln = arrVal1.length - 1;
  var sum1 = 0, sum2 = 0, sum3 = 0;
  for (var i = 0; i < ln; i++) {
    var a = arrVal1[i]['rate'] - averageVal1;
    var b = arrVal2[i]['rate'] - averageVal2
    sum1 += a * b;
    sum2 += Math.pow(a, 2); sum3 += Math.pow(b, 2)
  }
  return sum1 / Math.sqrt(sum2 * sum3);
}
var minUSD = minValue(arrUSD),
  maxUSD = maxValue(arrUSD),
  averageUSD = averageVal(arrUSD),
  datesUSD = findAllDayWhisAverage(arrUSD, averageUSD),
  daysListMinValueUSD = findAllDayWhisRate(arrUSD, minUSD),
  daysListMaxValueUSD = findAllDayWhisRate(arrUSD, maxUSD);


var minCHF = minValue(arrCHF),
  maxCHF = maxValue(arrCHF),
  averageCHF = averageVal(arrCHF),
    datesCHF = findAllDayWhisAverage(arrCHF, averageCHF),
    daysListMinValueCHF = findAllDayWhisRate(arrCHF, minCHF),
  daysListMaxValueCHF = findAllDayWhisRate(arrCHF, maxCHF);

var minEUR = minValue(arrEUR),
  maxEUR = maxValue(arrEUR),
  averageEUR = averageVal(arrEUR),
  datesEUR = findAllDayWhisAverage(arrEUR, averageEUR),
     daysListMinValueEUR = findAllDayWhisRate(arrEUR, minEUR),
  daysListMaxValueEUR = findAllDayWhisRate(arrEUR, maxEUR);

var coreletionUSDtoEUR = correlation(arrUSD, arrEUR, averageUSD, averageEUR),
  corelationCHFtoEUR = correlation(arrCHF, arrEUR, averageCHF, averageEUR);
console.log('correlation USD/EUR = ' + coreletionUSDtoEUR + '; ' + 'correlation CHF/EUR = ' + corelationCHFtoEUR);
var objId = {
  'min-usd': minUSD.toFixed(2),
  'min-eur': minEUR.toFixed(2),
  'min-chf': minCHF.toFixed(2),
  'max-usd': maxUSD.toFixed(2),
  'max-eur': maxEUR.toFixed(2),
  'max-chf': maxCHF.toFixed(2),
  'average-usd': averageUSD.toFixed(2),
  'average-eur': averageEUR.toFixed(2),
  'average-chf': averageCHF.toFixed(2),
  'date-number-usd': datesUSD.toFixed(2),
  'date-number-eur': datesEUR.toFixed(2),
  'date-number-chf': datesCHF.toFixed(2),
  'correlation-usd-eur': coreletionUSDtoEUR.toFixed(3),
  'correlation-chf-eur': corelationCHFtoEUR.toFixed(3)
};
for (var id in objId) {
  document.getElementById(id).innerHTML = objId[id];
}
var objIdSelecet = {
  'dates-usd-min': daysListMinValueUSD,
  'dates-chf-min': daysListMinValueCHF,
  'dates-eur-min': daysListMinValueEUR,
  'dates-usd-max': daysListMaxValueUSD,
  'dates-chf-max': daysListMaxValueCHF,
  'dates-eur-max': daysListMaxValueEUR
}

for (var idSelect in objIdSelecet) {
  createList(objIdSelecet[idSelect], document.getElementById(idSelect));
}

function createList(arr, list) {
  for (var i = 0; i < arr.length; i++) {
    var tmp = document.createElement('option');
    tmp.innerHTML = arr[i];
    list.appendChild(tmp);
  }
}
