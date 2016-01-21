(function() {
    TeamVote.controller('VoteController', function($stateParams, $state, $cookies, $location,
        Votes, VoteItems,
        Members) {

        var vm = this,
            memberIdKey = 'memberId',
            memberNameKey = 'memberName',
            voteId = $stateParams.voteId;

        vm.showVoteChart = false;
        vm.showVote = false;

        vm.member = {
            id: $cookies.get(memberIdKey),
            name: $cookies.get(memberNameKey)
        };
        vm.choosenRestId = null;
        vm.vote = {};

        vm.chooseRest = chooseRest;
        vm.makeVote = makeVote;
        vm.enterNickname = enterNickname;

        activate();

        function activate() {
            // $cookies.put(memberIdKey);
            if (!vm.member.id || !vm.member.name) {
                $('#memberModal').modal('show');
            } else {
                checkIsVoted();
            }
        }

        function loadVote() {
            vm.showVoteChart
            Votes.get(voteId).then(function(res) {
                vm.vote = res.data;
            });
        }

        function chooseRest(restId) {
            vm.choosenRestId = restId;
        }

        function makeVote() {
            if (vm.choosenRestId && vm.member) {
                VoteItems.post(voteId, vm.choosenRestId, vm.member.id).then(function(res) {
                    $state.go('result', {
                        voteId: voteId
                    });
                }, function(err) {
                    console.log(err);
                });
            } else {
                console.log('zhag');
            }
        };

        function enterNickname() {
            var nickname = $('#recipient-name').val();

            Members.get(nickname).then(function(res) {
                if (res.data) {
                    vm.member = {
                        id: res.data.member._id.$oid,
                        name: res.data.member.name
                    };
                    $cookies.put(memberIdKey, vm.member.id);
                    $cookies.put(memberNameKey, vm.member.name);
                    $('#memberModal').modal('hide');
                    checkIsVoted();
                };
            });
        }

        function checkIsVoted() {
            VoteItems.getByCondition(voteId, vm.member.id).then(function(res) {
                var categories = [],
                    chartData = [],
                    data = null;
                if (res&&res.isVoted) {
                    data = res.voteResult;
                    vm.showVoteChart = true;
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

                    var length = data.length;
                    for (var i = 0; i < length; i++) {
                        categories.push(data[i].rest);
                        chartData.push(data[i].sum);
                    }

                    vm.chartConfig.xAxis.categories = categories;
                    vm.chartConfig.yAxis.currentMax = Math.ceil(data[0].sum * 1.25);
                    vm.chartConfig.series[0].data = chartData;
                } else {
                    vm.showVote = true;
                    loadVote();
                }
            }, function(err) {
                console.log(err);
            });
        }
    });
})();
