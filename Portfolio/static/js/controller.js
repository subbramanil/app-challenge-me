var portApp = angular.module('portApp', ['ngRoute']);

portApp.config(['$routeProvider',
	function($routeProvider){
		$routeProvider.
		when('/skills',{
			templateUrl : 'views/skills.html',
			controller : 'SkillsController'
		});
	}]);

portApp.controller('SkillsController', function($scope){

});