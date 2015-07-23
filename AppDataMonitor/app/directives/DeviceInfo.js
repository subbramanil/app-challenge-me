/**
 * Created by Subbu on 7/22/15.
 */

(function (angular) {
    var module = angular.module("appDirectives");

    module.directive("deviceInfo", [
        '$log',
        "FirebaseService",
        function (log, FirebaseService) {
            return {
                templateUrl: "./app/partials/deviceInfo.html",
                restrict: "E",
                scope: "=",
                controller: [
                    "$scope",
                    function ($scope) {
                        $scope.deviceData = [];
                        $scope.$watch(function () {
                            return FirebaseService.deviceData;
                        }, function () {
                            $scope.deviceData = FirebaseService.deviceData ;
                            log.info($scope.deviceData);
                        });
                    }
                ]
            }
        }]);

})(angular);
