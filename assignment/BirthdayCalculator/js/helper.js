var Helper = (function() {

  var refreshCards = function(weeks) {
    var i, day, parentDayContainer, pNode;
    weeks.map(function(item) {
      day = item.key;
      parentDayContainer = document.querySelectorAll("[data-day="+getDayTag(day)+"]");
      parentDayContainer = Array.apply(null, parentDayContainer)[0].getElementsByClassName("day__people");
      pNode = Array.apply(null, parentDayContainer);
      if (pNode[0].childNodes[0]) {
        while (pNode[0].hasChildNodes()) {
          pNode[0].removeChild(pNode[0].lastChild);
        }
      }
    });
}
var initializeWeeks = function() {
    var i, weeks;
    weeks = [];
    for (i=0; i<7; i++) {
      switch (i) {
        case 0:
            weeks.push({"key": "Sunday", "value": []});
            break;
        case 1:
            weeks.push({"key": "Monday", "value": []});
            break;
        case 2:
            weeks.push({"key": "Tuesday", "value": []});
            break;
        case 3:
            weeks.push({"key": "Wednesday", "value": []});
            break;
        case 4:
            weeks.push({"key": "Thursday", "value": []});
            break;
        case 5:
            weeks.push({"key": "Friday", "value": []});
            break;
        case 6:
            weeks.push({"key": "Saturday", "value": []});
            break;
      }
    }
    return weeks;
}

var getCurrentYearBirthDay = function(birthdate, currentYear) {
  var birthDateFormatted, currentYearDate, dayNumber;
  birthDateFormatted = birthdate.toLocaleString().replace(/\//g, '-');
  currentYearDate = birthDateFormatted.split('-');
  currentYearDate[2] = currentYear;
  currentYearDate = new Date(currentYearDate.join("-"));
  dayNumber = currentYearDate.getDay();
  return dayNumber;
}

var adjustSize = function(element, count) {
    var size = 100/Math.ceil(Math.sqrt(count)).toString()+"%";
    element.style.float = "left";
    element.style.width = size;
    element.style.height = size;
}

var getDayTag = function (day) {
  var tag;
  switch(day) {
    case "Sunday":
      tag = "sun";
    break;
    case "Monday":
      tag = "mon";
      break;
    case "Tuesday":
      tag = "tue";
      break;
    case "Wednesday":
      tag = "wed";
      break;
    case "Thursday":
      tag = "thu";
      break;
    case "Friday":
      tag = "fri";
      break;
    case "Saturday":
      tag = "sat";
      break;
  }
  return tag;
}

var sortList = function (list) {
  var i, j, temp, a, b;
  for(i=0;i<list.length;i++) {
    for(j=0; j<list.length-i-1;j++) {
      a = parseInt(list[j].birthday.split("/")[2],10);
      b = parseInt(list[j+1].birthday.split("/")[2],10);
      if (a < b) {
        temp = list[j];
        list[j] = list[j+1];
        list[j+1] = temp;
      }
    }
  }
  return list;
}

  return {
    refreshCards: refreshCards,
    initializeWeeks: initializeWeeks,
    getCurrentYearBirthDay: getCurrentYearBirthDay,
    adjustSize: adjustSize,
    getDayTag: getDayTag,
    sortList: sortList
  }
})();
