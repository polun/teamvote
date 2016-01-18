(function() {
    TeamVote.controller('VoteController', function($stateParams, $state, $cookies, $location, Votes, VoteItems,
        Members) {

        var vm = this,
            memberIdKey = 'memberId',
            memberNameKey = 'memberName',
            voteId = $stateParams.voteId;

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
                loadVote();
            }
        }

        function loadVote() {
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
                    loadVote();
                };
            });
        }

        function checkIsVoted() {
            VoteItems.getByCondition(voteId, vm.member.id).then(function(data) {
                console.log(data);
                if (data) {
                    $state.go('result', {
                        voteId: voteId
                    });
                }
            }, function(err) {
                console.log(err);
            });
        }
    });
})();
