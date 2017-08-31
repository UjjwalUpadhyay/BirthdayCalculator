var DOMModule = (function() {
  var getDayList = function(day) {
    return Array.apply(null, document.querySelectorAll("[data-day="+Helper.getDayTag(day)+"]"))[0];
  }

  var createDivElement = function() {
    return document.createElement("div");
  }

  var createTextNode = function(text) {
    return document.createTextNode(text);
  }

  var getParentCardContainer = function(parentContainer) {
    return parentContainer.getElementsByClassName("day__people");
  }

  var appendDOMElement = function(pNode, element) {
    pNode[0].appendChild(element);
  }

  return {
    getDayList: getDayList,
    createDivElement: createDivElement,
    createTextNode: createTextNode,
    getParentCardContainer: getParentCardContainer,
    appendDOMElement: appendDOMElement
  }
})();
