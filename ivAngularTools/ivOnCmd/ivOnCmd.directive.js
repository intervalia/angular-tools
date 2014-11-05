angular.module('ivTools')
       .directive('ivOnCmd', ivOnCmdDirective );

ivOnCmdDirective.$inject = ['$parse'];
function ivOnCmdDirective($parse) {
  return {
    'restrict': 'A',
    'link': function ($scope, $element, attrs) {
      var fn = $parse(attrs.ivOnCmd);
      $element.on("click", "[data-cmd]", function(event) {
        var $el = angular.element(event.currentTarget);
        event.data = {"cmd": $el.data("cmd"), "cmdData": $el.data("cmdData")};
        $scope.$evalAsync(function() {
          fn($scope, {$event:event});
        });
      });
    }
  };
}
