Directive iv-on-cmd
===================

A tool to allow for a single click event handler to handle events indicated by setting the attribute data-cmd on the children of the element containing the directive iv-on-cmd.

\* **This directive requires jQuery and will not work with jqLite** *

USE
---

The following HTML has the iv-on-cmd directive on the outer div. This allows for a single event handler "processCmd" to handle all of the click events from the three child buttons.
```html
<div data-ng-controller="myCtrl" data-iv-on-cmd="processCmd($event)">
  <button data-cmd="sayHello">Say Hello</button>
  <button data-cmd="speak" data-cmd-data="Hi">Say Hi</button>
  <button data-cmd="speak" data-cmd-data="Bye">Say Bye</button>
</div>
```

The example controller below supplies the 'processCmd' function that is to be accessed any time one of the buttons with the data-cmd attribute is clicked on.

```javascript
angular.module("mine").controller("myCtrl", myCtrl);
myCtrl.$inject = ["$scope"];
function myCtrl($scope) {
  $scope.processCmd = function($event) {
    $event.stopPropigation();
    $event.preventDefault();
  	 if ($event.data.cmd === "sayHello") {
  	   alert("Hello");
  	   return;
  	 }

  	 if ($event.data.cmd === "speak" ) {
  	 	alert("Speaking: " + $event.data.cmdData);
  	 	return;
  	 }
  }
}
```

In the buttons that have data-cmd="speak" you will also see the attribute data-cmd-data. This value is read and placed into the $event.data object along with the value from data-cmd.

For this button:
```html
<button data-cmd="sayHello">Say Hello</button>
```

The object $event.data will be:

```JSON
{
  "cmd": "sayHello",
  "cmdData": undefined
}
```


For this button:
```html
<button data-cmd="speak" data-cmd-data="Hi">Say Hi</button>
```

The object $event.data will be:

```JSON
{
  "cmd": "speak",
  "cmdData": "Hi"
}
```

You can also include objects in the data-cmd-data attribute.

For this button:
```html
<button data-cmd="buy" data-cmd-data='{"title":"Test Product", "price": 3.95}'>Say Hi</button>
```

The object $event.data will be:

```JSON
{
  "cmd": "buy",
  "cmdData": {
    "title": "Test Product",
    "price": 3.95
  }
}
```

