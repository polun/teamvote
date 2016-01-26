(function() {
    TeamVote.controller('VoteController', function($stateParams, $state, $cookies,
        Votes, VoteItems, Members) {

        var vm = this,
            memberIdKey = 'memberId',
            memberNameKey = 'memberName',
            voteId = $stateParams.voteId;

        vm.showVoteChart = false;
        vm.showVote = false;
        vm.authMsg = undefined; // 认证信息

        vm.member = {
            id: $cookies.get(memberIdKey),
            name: $cookies.get(memberNameKey)
        };
        vm.choosenRestId = null;
        vm.vote = {};

        vm.chooseRest = chooseRest;
        vm.makeVote = makeVote;
        vm.enterNickname = enterNickname;
        vm.logout = logout;

        activate();

        function activate() {
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
                var expireDate = new Date();
                expireDate.setDate(expireDate.getDate() + 10);
                if (res.data) {
                    vm.member = {
                        id: res.data._id.$oid,
                        name: res.data.name
                    };
                    $cookies.put(memberIdKey, vm.member.id, {'expires': expireDate});
                    $cookies.put(memberNameKey, vm.member.name, {'expires': expireDate});
                    $('#memberModal').modal('hide');
                    checkIsVoted();
                } else {
                    vm.authMsg = '昵称写错了吧';
                }
            });
        }

        function checkIsVoted() {
            VoteItems.getByCondition(voteId, vm.member.id).then(function(res) {
                var categories = [],
                    chartData = [],
                    data = null;
                if (res && res.isVoted) {
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

        function logout() {
            if (confirm('确定注销？')) {
                $cookies.put(memberIdKey);
                $state.go('index');
            };
        }
    });
})();
