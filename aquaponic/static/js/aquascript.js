/**
 * Created by Subbu on 5/24/15.
 */

var aquaApp = angular.module('aqua',['ngRoute']);

aquaApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/dashboard', {
                templateUrl : '../views/dashboard',
                controller : 'DashboardController'
            }).
            when('/rules', {
                templateUrl : '../views/rules',
                controller : 'RulesController'
            }).
            when('/login', {
                templateUrl : '../views/login',
                controller : 'LoginController'
            }).
            when('/history', {
                templateUrl : '../views/history',
                controller : 'LoginController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);

var rulesList = [{"rowID":1,"param":"Temperature","opr":"not equals","value":12,"action":"Send out a sms","emailID":"","phoneNumber":"2131221424"}];
var updatedRules=[];
var rulesTable;
var selRow;
var tempData = [{"rowID":1,"sensorID":"1","temp":"32","lastUpdated":"06/05/2015 12:01 AM"},
                {"rowID":2,"sensorID":"1","temp":"30","lastUpdated":"05/05/2015 11:56 PM"}];

aquaApp.controller('DashboardController', ['$scope', '$http', function ($scope, $http) {
    $scope.showTable = function(){
        console.log();
        rulesTable = $('#tempDetails').DataTable( {
            "data": tempData,
            "aaSorting": [],
            "aoColumns": [
                {
                    "mData":"sensorID",
                    "sTitle": "Sensor ID",
                    "orderable": false
                },
                {
                    "mData":"temp",
                    "sTitle": "Temperature",
                    "orderable": false
                },
                {
                    "mData":"lastUpdated",
                    "sTitle": "Last updated on",
                    "orderable": false
                }
            ]
        });
    };
    $scope.showTable();
}]);

aquaApp.controller('LoginController', ['$scope', '$http', function ($scope, $http) {
}]);

aquaApp.controller('RulesController', ['$scope', '$http', function ($scope, $http) {

    // todo get parameter values from Database - One time activity
    $scope.paramOptions = [
        {name: 'Temperature', value: 1},
        {name: 'PH value', value: 2}
    ];

    $scope.operatorOptions = [
        {name: 'equals', value: 1},
        {name: 'not equals', value: 2},
        {name: 'less than', value: 3},
        {name: 'greater than', value: 4}
    ];

    $scope.actionOptions = [
        {name: 'Send out a mail', value: 1},
        {name: 'Send out a sms', value: 2},
        {name: 'Take action', value: 3}
    ];

    $scope.showRules = function () {
        console.log("aquaScript.showRules() entry");

        //if ( $.fn.dataTable.isDataTable( '#rulesDetails' ) ) {
        //    console.log("Deleting existing table");
        //    $("#rulesDetails").dataTable().fnDestroy();
        //}

        console.log("Table data");
        $(rulesList).each(function(){
            console.log(this);
        });

        rulesTable = $('#rulesDetails').DataTable( {
            "data": rulesList,
            "aaSorting": [],
            "aoColumns": [
                {
                    "mData":"param",
                    "sTitle": "Parameter",
                    "orderable": false
                },
                {
                    "mData":"opr",
                    "sTitle": "Operator",
                    "orderable": false
                },
                {
                    "mData":"value",
                    "sTitle": "Value",
                    "orderable": false
                },
                {
                    "mData":"action",
                    "sTitle": "Action",
                    "orderable": false
                },
                {
                    "mData":"emailID",
                    "sTitle": "Email Id",
                    "orderable": false
                },
                {
                    "mData":"phoneNumber",
                    "sTitle": "Phone Number",
                    "orderable": false
                },
                {
                    "sTitle": "",
                    "mData": null,
                    "orderable": false,
                    "mRender": function () {
                        var btn = "<button class='btn btn-warning editBtn' data-toggle='modal' >" + "Edit" + "</button>";
                        return btn;
                    }
                },
                {
                    "sTitle": "",
                    "mData": null,
                    "orderable": false,
                    "mRender": function () {
                        var btn = "<button class='btn btn-danger deleteBtn' data-toggle='modal' >" + "Delete" + "</button>";
                        return btn;
                    }
                }
            ]
        });

        /**
         * Edit Rule
         */
        $('#rulesDetails').on( 'click','tbody tr button.editBtn', function (e) {
            console.log("Editing a rule");
            $scope.selectedRule = new Rule();
            selRow = $(this).closest('tr');
            $scope.$apply(function () {
                var rowData = rulesTable.row(selRow).data();
                $scope.selectedRule = rowData;
                console.log($scope.selectedRule);
                $($scope.paramOptions).each(function(){
                    if(this.name === rowData.param) {
                        $scope.selectedRule.param = this;
                        console.log($scope.selectedRule.param);
                        return false;
                    }
                });
                $($scope.operatorOptions).each(function(){
                    if(this.name === rowData.opr) {
                        $scope.selectedRule.opr = this;
                        console.log($scope.selectedRule.opr);
                        return false;
                    }
                });

                $($scope.actionOptions).each(function(){
                    if(this.name === rowData.action) {
                        $scope.selectedRule.action = this;
                        console.log($scope.selectedRule.action);
                        return false;
                    }
                });
                $scope.selectedRule.flag = 'E';
                updatedRules.push($scope.selectedRule);
            });
            $('.edit-rule-modal-lg').modal();
        });

        /**
         * Delete Rule
         */
        $('#rulesDetails').on( 'click',' tbody tr button.deleteBtn', function (e) {
            console.log("deleting a rule");
            selRow = $(this).closest('tr');
            $scope.$apply(function () {
                console.log(selRow);
                $scope.selectedRule = rulesTable.row(selRow).data();
                console.log($scope.selectedRule);
                //console.log(rowData);
                //rowData.flag = 'D';
                //updatedRules.push(rowData);
            });
            $('.delete-rule-confirm-modal-lg').modal();
        });

        console.log("aquaScript.showRules() exit");
    };

    $scope.showRules();

    $scope.deleteRule = function(){
        console.log("aquaScript.deleteRule() entry");
        rulesTable.row(selRow).remove().draw();
        console.log("aquaScript.deleteRule() exit");
    }

    $scope.clear = function(){
        $scope.currentRule = new Rule();
    };
    $scope.addRule = function () {
        console.log("aquaScript.addRule() entry");
        var newRule = new Rule(
            $scope.currentRule.param.name,
            $scope.currentRule.opr.name,
            $scope.currentRule.value,
            $scope.currentRule.action.name,
            $scope.currentRule.emailID,
            $scope.currentRule.phoneNumber
        );
        rulesList.push(newRule);
        var result = rulesTable.rows.add(
            [
                newRule
            ]
        ).draw();
        console.log("New Rule added");
        console.log(result);
        console.log("aquaScript.addRule() exit");
    };

    $scope.saveEditChanges = function(){
        console.log("aquaScript.saveEditChanges() entry");
        console.log($scope.selectedRule);

        var updatedRule = new Rule(
            $scope.selectedRule.param.name,
            $scope.selectedRule.opr.name,
            $scope.selectedRule.value,
            $scope.selectedRule.action.name,
            $scope.selectedRule.emailID,
            $scope.selectedRule.phoneNumber
        );

        rulesTable.row( selRow )
            .data( updatedRule)
            .draw();

        console.log("aquaScript.saveEditChanges() exit");
    };

    $scope.saveChanges = function(){
        console.log("aquaScript.saveChanges() entry");
        console.log(updatedRules);
        $(updatedRules).each(function(){
            console.log(this);
        });
        console.log("aquaScript.saveChanges() exit");
    };

}]);