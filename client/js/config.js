(function(argument) {
    var baseUrl = 'http://123.56.226.235:8080/api/v1/'
    TeamVote.constant('apiUrl', {
        rests: baseUrl + 'rests',
        votes: baseUrl + 'votes',
        voteItem: baseUrl + 'voteitem',
        member: baseUrl + 'member',
        voteResult: baseUrl + 'voteresult',
        allVotes: baseUrl + 'allvotes'
    });
})();
