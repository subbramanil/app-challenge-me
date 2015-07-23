/**
 * Created by Subbu on 7/22/15.
 */

(function (angular) {
    var module = angular.module("appDirectives");

    module.directive("appInfo", [
        '$log',
        "FirebaseService",
        function (log) {
            return {
                templateUrl: "./app/partials/appInfo.html",
                restrict: "E",
                scope: {
                    appData: "=data"
                },
                controller: [
                    "$scope",
                    function ($scope) {
                        
                    }
                ]
            }
        }]);

})(angular);
