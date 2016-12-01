angular
    .module('pollsApp')
    .factory('pollsService', pollsService);

pollsService.$inject = ['$http', '$q', 'config'];

function pollsService($http, $q, config) {

    var getAll = function () {
        var deferred = $q.defer();

        $http.get(config.apiEndpoint + '/polls')
            .success(function (response) {
                deferred.resolve(response.data);
            })
            .error(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    };

    var get = function (id) {
        var deferred = $q.defer();

        $http.get(config.apiEndpoint + '/polls/' + id)
            .success(function (response) {
                deferred.resolve(response.data);
            })
            .error(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    };

    var getActive = function (room) {
        var deferred = $q.defer();

        $http.get(config.apiEndpoint + '/active-poll' + '?room=' + room)
            .success(function (response) {
                deferred.resolve(response.data);
            })
            .error(function (response, status) {
                deferred.reject(status);
            });

        return deferred.promise;
    };

    var getEmpty = function () {
        return angular.copy({
            title: '',
            questions: [
                {text: '', choices: ['', '']}
            ]
        });
    };

    var add = function (poll) {
        var deferred = $q.defer();

        $http.post(config.apiEndpoint + '/polls', poll)
            .success(function (response) {
                deferred.resolve(response.data);
            })
            .error(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    };

    var remove = function (id) {
        var deferred = $q.defer();

        $http.delete(config.apiEndpoint + '/polls/' + id)
            .success(function (response) {
                deferred.resolve(response.data);
            })
            .error(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    };

    var update = function (id, poll) {
        var deferred = $q.defer();

        $http.put(config.apiEndpoint + '/polls/' + id, poll)
            .success(function (response) {
                deferred.resolve(response.data);
            })
            .error(function (response) {
                deferred.reject(response);
            });

        return deferred.promise;
    };

    return {
        getAll: getAll,
        get: get,
        getActive: getActive,
        getEmpty: getEmpty,
        add: add,
        remove: remove,
        update: update
    };
}
