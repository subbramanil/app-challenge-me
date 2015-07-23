/**
 * Created by Subbu on 7/23/15.
 */

(function (angular) {

    var module = angular.module("appControllers");

    module.controller("testController", [
        '$scope',
        '$firebaseObject',
        function ($scope, $firebaseObject) {
            $scope.test = "this might work";
            var ref = new Firebase("https://sweltering-heat-1721.firebaseio.com");

            $scope.data = $firebaseObject(ref);
            // this waits for the data to load and then logs the output. Therefore,
            // data from the server will now appear in the logged output. Use this with care!
            $scope.data.$loaded()
                .then(function() {
                    console.log($scope.data);
                })
                .catch(function(err) {
                    console.error(err);
                });
        }
    ]);
})(angular);