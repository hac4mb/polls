(function () {
    'use strict';

    angular
        .module('pollsApp')
        .controller('resultsDetailController', resultsDetailController);

    resultsDetailController.$inject = ['crudService', '$stateParams', '$filter'];

    function resultsDetailController(crudService, $stateParams, $filter) {
        var vm = this;
        var $translate = $filter('translate');

        var chartPrefix = 'chart_';

        var loadResult = function (id) {
            crudService.get('results', id)
                .then(function (result) {
                    vm.result = result;
                    initCharts(vm.result.results);
                })
                .catch(function (res) {
                    vm.result = null;

                    if (res.status === 404) {
                        vm.message = $translate('NO_SUCH_RESULT');
                    } else {
                        vm.message = $translate('ERROR');
                    }
                });
        };

        function initCharts(results) {
            angular.forEach($filter('groupBy')(results, 'questionId'), function (value, key) {
                var chart = chartPrefix + key;
                vm[chart] = {};
                vm[chart].type = 'PieChart';

                vm[chart].data = {
                    'cols': [
                        {label: 'Var', type: 'string'},
                        {label: 'Count', type: 'number'}
                    ], 'rows': []
                };

                angular.forEach(vm.result.results, function (res) {
                    if (res.questionId === key) {
                        vm[chart].options = {
                            title: res.questionText,
                            legend: {position: 'left'}
                        };

                        vm[chart].data.rows.push({
                            c: [
                                {v: res.answer},
                                {v: res.count}
                            ]
                        });
                    }

                });

            });
        }

        if ($stateParams.id) {
            loadResult($stateParams.id);
        }
    }

})();
