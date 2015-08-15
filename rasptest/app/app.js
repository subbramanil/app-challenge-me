(function(angular) {
    "use strict";
    var module = angular.module('raspApp', ['uiSwitch']);
    module.controller('raspController', [
	'$http',
	'$scope',	
	function ($http, $scope) {
		
		$scope.getLEDStatus = function(){
			console.log("Get the status of the LED..");
			$http.get("/getStatus").
				success(function (result, status, headers, config) {
			        	console.log("is LED On: ", result);
					$scope.isLEDOn = result;
				})
				.error(function (data, status, headers, config) {
			    		console.log("Error: ", status);
				});
		};
		
		$scope.toggleLEDStatus = function(){
			console.log("Is LED On: ", $scope.isLEDOn);
			$http.get("/setStatus/"+$scope.isLEDOn).
				success(function (result, status, headers, config) {
			        	console.log("Result: LED status: ", result);
					$scope.isLEDOn = result;
			    	}).
				error(function (data, status, headers, config) {
			            console.log("Error: ", status);
			        });
		};
		$scope.getLEDStatus();
	}
    ]);
})(angular);
