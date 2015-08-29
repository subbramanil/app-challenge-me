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
                        templateUrl: "./login",
                        controller: "loginController"
                    })
                    .when('/deviceDetails', {
                        templateUrl: "/app/partials/deviceDetails"
                    })
                    .otherwise("/");
            }
        ]
    );

})(angular);