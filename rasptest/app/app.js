(function(angular) {
    "use strict";
    var module = angular.module("raspApp", []);
    module.controller("raspController", [
	"$http",
	function ($http) {
		$scope.clickMe = function(){
			console.log("click me");
			getStatus();
		};

		var getStatus = function(){
			console.log("Get the status of the LED..");
			$http.get("/getStatus").
				success(function (result, status, headers, config) {
			        	console.log("LED Status: ", result);          
				})
				.error(function (data, status, headers, config) {
			    		console.log("Error: ", status);
				});
		};
	}
    ]);
})(angular);
