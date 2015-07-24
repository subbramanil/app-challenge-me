/**
 * Created by Subbu on 7/23/15.
 */

(function (angular) {

    var module = angular.module("appControllers");

    module.controller("FirebaseController", [
            '$scope',
            'FirebaseService',
            function ($scope, FirebaseService) {

                /*// create an instance of the authentication service
                 var auth = $firebaseAuth(ref);
                 // login with Facebook
                 auth.$authWithOAuthPopup("facebook").then(function(authData) {
                 console.log("Logged in as:", authData.uid);
                 }).catch(function(error) {
                 console.log("Authentication failed:", error);
                 });*/

            }
        ]
    );
})(angular);