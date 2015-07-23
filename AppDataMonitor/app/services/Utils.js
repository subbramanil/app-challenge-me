/**
 * Created by Subbu on 7/22/15.
 */
(function (angular) {
    var module = angular.module('appServices');

    module.service('Utils', [
        '$log',
        function (log) {
            var service = {};

            /**
             * Util method to log messages in a string format
             * @param msg
             * @param param
             */
            service.logMsg = function(msg, param){
                log.debug("**** "+msg+":"+JSON.stringify(param)+" ****");
            };

            /**
             * Util method to log error messages in a string format
             * @param msg
             * @param param
             */
            service.logError = function(msg, param){
                log.error("**** "+Error+":"+JSON.stringify(param)+" ****");
            };

            return service;
        }
    ]);

})(angular);