/**
 * Created by Subbu on 7/22/15.
 */

(function (angular) {
    var module = angular.module("appServices");

    module.service("FirebaseService", [
            '$firebaseObject',
            "$log",
            function ($firebaseObject, log) {
                var service = {};
                var ref = new Firebase("https://sweltering-heat-1721.firebaseio.com");

                service.getDeviceData = function () {
                    service.deviceData = $firebaseObject(ref.child('oneplus-LRX22G'));
                    // this waits for the data to load and then logs the output. Therefore,
                    // data from the server will now appear in the logged output. Use this with care!
                    service.deviceData .$loaded()
                        .then(function () {
                            log.debug(service.deviceData);
                        })
                        .catch(function (err) {
                            log.error(err);
                        });
                };

                service.getDeviceData();

                return service;
            }
        ]
    );
})(angular);
