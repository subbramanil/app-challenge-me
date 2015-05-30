/**
 * Created by Subbu on 5/24/15.
 */

var aquaApp = angular.module('aqua',['ngRoute']);

aquaApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/dashboard', {
                templateUrl : '../views/dashboard.html',
                controller : 'DashboardController'
            }).
            when('/rules', {
                templateUrl : '../views/rules.html',
                controller : 'RulesController'
            }).
            when('/login', {
                templateUrl : '../views/login.html',
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

aquaApp.controller('DashboardController', ['$scope', '$http', function ($scope, $http) {
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

        if ( $.fn.dataTable.isDataTable( '#rulesDetails' ) ) {
            console.log("Deleting existing table");
            $("#rulesDetails").dataTable().fnDestroy();
        }

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
            var aData = rulesTable.row(selRow).data();
            console.log(aData);
            aData.flag = 'D';
            updatedRules.push(aData);
            $('.delete-rule-confirm-modal-lg').modal();
            //rulesTable.row(selRow).remove().draw();
        });

        console.log("aquaScript.showRules() exit");
    };

    $scope.showRules();

    $scope.deleteRule = function(){
        console.log("aquaScript.deleteRule() entry");
        //rulesTable.api().row.add(
        ////rulesTable.rows.add(
        //    [
        //        newRule
        //    ]
        //).draw();
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