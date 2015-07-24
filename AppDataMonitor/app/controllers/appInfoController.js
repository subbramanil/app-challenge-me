/**
 * Created by Subbu on 7/23/15.
 */

(function (angular) {

    var module = angular.module("appControllers");

    module.controller("appInfoController", [
        '$scope',
        'FirebaseService',
        function ($scope, FirebaseService) {
            $scope.deviceData = FirebaseService.deviceData;
        }
    ]);
})(angular);