var weeks = [];
var updateCal = function() {
    var inputJsonVal = document.getElementById('json-input').value;
    if (inputJsonVal) {
      var inputJson = JSON.parse(document.getElementById('json-input').value);
    } else {
      return;
    }
    var personlist = inputJson['list'];
    var inputYear = document.getElementsByClassName("app__input js-year")[0].value;
    if (personlist && inputYear) {
      initializeWeeks();
      personlist = sortList(personlist);
      getPersonDetails(personlist, inputYear);

      refreshCards();
      updateCards();
    } else {
      return;
    }
}

var getPersonDetails = function(list, currentYear) {
 for (var index in list) {
   var birthdate = list[index].birthday;
   var personName = list[index].name;
   var personInitial = personName.split(" ");
   personInitial = personInitial[0][0].toString() + personInitial[1][0].toString();
   var dayNumber = getCurrentYearBirthDay(birthdate, currentYear);
   populateWeeksData(dayNumber, personInitial);
 }
}

var populateWeeksData = function(dayNumber, personInitial) {
  weeks[dayNumber].value.push(personInitial);
}

var updateCards = function() {
  for (var i=0; i<weeks.length; i++) {
    var totalCount = weeks[i].value.length;
    if(totalCount===0) {
      appendEmptyElement(weeks[i]);
    } else {
      for (var index=0; index<weeks[i].value.length; index++) {
        var personInitial = weeks[i].value[index];
        appendPersonElement(personInitial, weeks[i]);
      }
    }
  }
}

var appendEmptyElement = function(weekObj) {
  var day = weekObj.key;
  var parentDayContainer = Array.apply(null, document.querySelectorAll("[data-day="+getDayTag(day)+"]"))[0];
  parentDayContainer.classList.add("day--empty");
}

var appendPersonElement = function(personInitial, weekObj) {
  var day = weekObj.key;
  var personCount = weekObj.value.length;
  var parentDayContainer = document.querySelectorAll("[data-day="+getDayTag(day)+"]");

  var element = document.createElement("div");
  element.classList.add("day__person");
  var personInitial = document.createTextNode(personInitial);
  element.appendChild(personInitial);

  var parentNode = Array.apply(null, parentDayContainer)[0].getElementsByClassName("day__people");
  var pNode = Array.apply(null, parentNode);
  pNode[0].appendChild(element);
  adjustSize(element, personCount);
}
