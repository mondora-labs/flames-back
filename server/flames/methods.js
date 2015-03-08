Meteor.methods({
    "flames:upvote": Lib.getVoteMethod(Flames, 1),
    "flames:downvote": Lib.getVoteMethod(Flames, -1)
});
