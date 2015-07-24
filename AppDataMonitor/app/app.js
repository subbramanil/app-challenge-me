/**
 * Created by Subbu on 7/22/15.
 */

(function (angular) {
    var myApp = angular.module("fireApp", [
        "ngRoute",
        "appServices",
        "appControllers",
        "appDirectives"
    ]);

    myApp.config(
        [
            "$routeProvider",
            function ($routeProvider) {
                $routeProvider
                    .when("/", {
                        templateUrl: "./app/partials/dashBoard",
                        controller: "appInfoController"
                    })
                    .when('/deviceDetails', {
                        templateUrl: "/app/partials/deviceDetails"
                    })
                    .otherwise("/");
            }
        ]
    );

})(angular);