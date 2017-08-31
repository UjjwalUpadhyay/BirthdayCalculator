var Module = (function() {

  var weeks = [];

  var updateCal = function() {
      var inputJsonVal, inputJson, personlist, inputYear;
      inputJsonVal = document.getElementById('json-input').value;
      if (inputJsonVal) {
        inputJson = JSON.parse(document.getElementById('json-input').value);
      } else {
        return;
      }
      personlist = inputJson['list'];
      inputYear = document.getElementsByClassName("app__input js-year")[0].value;
      if (personlist && inputYear) {
        weeks = Helper.initializeWeeks();
        personlist = Helper.sortList(personlist);
        getPersonDetails(personlist, inputYear);

        Helper.refreshCards(weeks);
        updateCards();
      } else {
        return;
      }
  }

  var getPersonDetails = function(list, currentYear) {
   var birthdate, personName, personInitial, dayNumber;
   list.map(function(item){
     birthdate = item.birthday;
     personName = item.name;
     personInitial = personName.split(" ");
     personInitial = personInitial[0][0].toString() + personInitial[1][0].toString();
     dayNumber = Helper.getCurrentYearBirthDay(birthdate, currentYear);
     populateWeeksData(dayNumber, personInitial);
   })
  }

  var populateWeeksData = function(dayNumber, personInitial) {
    weeks[dayNumber].value.push(personInitial);
  }

  var updateCards = function() {
    var i, index, personInitial;
    weeks.map(function(weekItem) {
      var totalCount = weekItem.value.length;
      if(totalCount===0) {
        appendEmptyElement(weekItem);
      } else {
        for (index=0; index<weekItem.value.length; index++) {
          personInitial = weekItem.value[index];
          appendPersonElement(personInitial, weekItem);
        }
      }
    })
  }

  var appendEmptyElement = function(weekObj) {
    var day = weekObj.key;
    var parentDayContainer = DOMModule.getDayList(day);
    parentDayContainer.classList.add("day--empty");
  }

  var appendPersonElement = function(personInitial, weekObj) {
    var day, personCount, parentDayContainer, element, personInitial, parentNode, pNode;
    day = weekObj.key;
    personCount = weekObj.value.length;
    parentDayContainer = DOMModule.getDayList(day);

    element = DOMModule.createDivElement();
    element.classList.add("day__person");
    personInitial = DOMModule.createTextNode(personInitial);
    element.appendChild(personInitial);

    parentNode = DOMModule.getParentCardContainer(parentDayContainer);
    pNode = Array.apply(null, parentNode);
    DOMModule.appendDOMElement(pNode, element);
    Helper.adjustSize(element, personCount);
  }

  return {
    updateCal: updateCal,
    getPersonDetails: getPersonDetails,
    populateWeeksData: populateWeeksData,
    updateCards: updateCards,
    appendEmptyElement: appendEmptyElement,
    appendPersonElement: appendPersonElement
  }
})();
