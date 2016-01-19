(function() {
    TeamVote.controller('ResultController', function($stateParams, VoteItems) {
        var vm = this,
            voteId = $stateParams.voteId;

        activate();

        vm.chartConfig = {
            options: {
                chart: {
                    type: 'bar'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            title: {
                text: '吃啥呢'
            },
            loading: false,
            xAxis: {
                categories: [],
                title: {
                    text: null
                }
            },
            yAxis: {
                currentMin: 0,
                tickInterval: 1,
                title: {
                    text: null
                }
            },
            series: [{
                name: '人数',
                data: []
            }]
        };

        function activate(argument) {
            VoteItems.getVoteResult(voteId).then(function(data) {
                var categories = [],
                    chartData = [];
                if (data && angular.isArray(data)) {
                    var length = data.length;
                    for (var i = 0; i < length; i++) {
                        categories.push(data[i].rest);
                        chartData.push(data[i].sum);
                    }

                    vm.chartConfig.xAxis.categories = categories;
                    vm.chartConfig.yAxis.currentMax = Math.ceil(data[0].sum * 1.25);
                    vm.chartConfig.series[0].data = chartData;
                };
            }, function(err) {
                console.log(err);
            });
        }
    });
})();
