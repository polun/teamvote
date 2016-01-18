(function() {
    TeamVote.controller('DesignController', function($timeout, $location, Rests, Votes) {
        var vm = this;
        vm.selectedRests = [];
        vm.name = null;

        activate();
        vm.select = select;
        vm.removeRest = removeRest;
        vm.newRest = newRest;
        vm.publish = publish;

        function activate() {
            Rests.get().then(function(res) {
                vm.rests = res;
            });
        }

        function showAlert(msg) {
            vm.isAlert = true;
            vm.alertMessage = msg;

            $timeout(function() {
                vm.isAlert = false;
                vm.alertMessage = '';
            }, 3000);
        }


        function select(rest) {
            if (!rest.selected) {
                rest.selected = true;
                vm.selectedRests.push(rest);
            } else {
                showAlert(rest.name + '已经选过了!!!');
            }
        }

        function removeRest(rest) {
            if (vm.selectedRests.length > 0) {
                var index = vm.selectedRests.indexOf(rest);
                vm.selectedRests[index].selected = false;
                vm.selectedRests.splice(index, 1);
            };
        }

        function newRest() {
            vm.rests.push({
                'id': '5',
                'name': '球场'
            });
        };

        function publish() {
            if (vm.title.trim()) {
                var selectedRestIds = _.map(vm.selectedRests, function(rest) {
                    return rest._id.$oid;
                });

                Votes.post(vm.title, selectedRestIds).then(function (res) {
                    console.log(res);
                });
            } else {
                showAlert('名称不能为空！')
            }
        }
    });
})();
