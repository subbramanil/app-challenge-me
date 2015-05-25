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
                controller : 'RulesController'
            }).
            otherwise({
                redirectTo: '/'
            });
}]);


//var rulesList = new Array();
var rulesList = [{"rowID":1,"param":"Temperature","opr":"not equals","value":12,"action":"Send out a sms","emailID":"","phoneNumber":"2131221424"}];

var selected=[];
var rulesTable;
var selectedRule;

aquaApp.controller('DashboardController', ['$scope', '$http', function ($scope, $http) {
}]);

function test(obj){
    console.log("test called");
    console.log(obj);
}

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

        if ( $.fn.DataTable.isDataTable( '#rulesDetails' ) ) {
            console.log("Deleting existing table");
            $("#rulesDetails").dataTable().fnDestroy();
        }

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
                    "mRender": function (row) {
                        var btn = '<button class="btn btn-success" onclick="test('+row+');" data-toggle="modal" data-target=".edit-rule-modal-lg">' + 'Edit' + '</button>';
                        return btn;
                    }
                }
            ],
            "rowCallback": function( row, data ) {
                console.log(data);
                console.log(selected);
                console.log($.inArray(data.rowID, selected));
                if ( $.inArray(data.rowID, selected) !== -1 ) {
                    $(row).toggleClass('selected');
                    selected.push(data);
                }
            }
        });

        $('#rulesDetails tbody').on('click', 'tr', function () {
            console.log("selected");
            selectedRule = rulesTable.row(this).data();
            var index = $.inArray(selectedRule.rowID, selected);

            if ( index === -1 ) {
                selected.push(selectedRule.rowID);
            } else {
                selected.splice(index, 1);
            }

            console.log(selected);

            $(this).toggleClass('selected');
        } );


        console.log("aquaScript.showRules() exit");
    };

    $scope.showRules();

    $scope.editRule = function(){
        console.log("aquaScript.editRule() entry");
        console.log(selectedRow);
        console.log("aquaScript.editRule() exit");
    };

    $scope.clear = function(){
        $scope.currentRule = new Rule();
    };
    $scope.addRule = function () {
        console.log("aquaScript.addRule() entry");
        console.log("New Rule added");
        var newRule = new Rule(
            $scope.currentRule.param.name,
            $scope.currentRule.opr.name,
            $scope.currentRule.value,
            $scope.currentRule.action.name,
            $scope.currentRule.emailID,
            $scope.currentRule.phoneNumber
        );
        rulesList.push(newRule);
        rulesTable.rows.add(
            [
                newRule
            ]
        ).draw();
        console.log("aquaScript.addRule() exit");
    };

}]);