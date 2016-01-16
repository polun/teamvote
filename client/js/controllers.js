(function() {
    TeamVote.controller('DesignController', function($scope, $timeout, Rests, Votes) {
            $scope.selectedRests = [];
            $scope.name = null;

            Rests.get().then(function(res) {
                $scope.rests = res;
            });

            function showAlert(msg) {
                $scope.isAlert = true;
                $scope.alertMessage = msg;

                $timeout(function() {
                    $scope.isAlert = false;
                    $scope.alertMessage = '';
                }, 3000);
            }

            $scope.select = function(rest) {
                if (!rest.selected) {
                    rest.selected = true;
                    $scope.selectedRests.push(rest);
                } else {
                    showAlert(rest.name + '已经选过了!!!');
                }
            };
            $scope.removeRest = function(rest) {
                if ($scope.selectedRests.length > 0) {
                    var index = $scope.selectedRests.indexOf(rest);
                    $scope.selectedRests[index].selected = false;
                    $scope.selectedRests.splice(index, 1);
                };
            };
            $scope.newRest = function() {
                $scope.rests.push({
                    'id': '5',
                    'name': '球场'
                });
            };
            $scope.publish = function() {
                selectedRestIds = _.map($scope.selectedRests, function(rest) {
                    return rest._id.$oid;
                });

                Votes.post($scope.title, selectedRestIds);
            };
        })
        .controller('VoteController', function($scope, $routeParams, $cookies, Votes, VoteItems,
            Members) {

            var vm = this,
                memberIdKey = 'memberId',
                memberNameKey = 'memberName',
                voteId = $routeParams.voteId;

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
                $cookies.put(memberIdKey);
                if (!vm.member.id || !vm.member.name) {
                    $('#memberModal').modal('show');
                } else {
                    checkIsVoted();
                    return Votes.get(voteId).then(function(res) {
                        vm.vote = res.data;
                    });
                }
            }

            function chooseRest(restId) {
                vm.choosenRestId = restId;
            }

            function makeVote() {
                if (vm.choosenRestId && vm.member) {
                    VoteItems.post(voteId, vm.choosenRestId, vm.member.id).then(function(res) {
                        console.log(res);
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
                    };
                });
            }

            function checkIsVoted() {
                console.log(vm.member);
                VoteItems.getByCondition(voteId, vm.member.id);
            }
        });
})();