Meteor.methods({
    "sparks:upvote": Lib.getVoteMethod(Sparks, 1),
    "sparks:downvote": Lib.getVoteMethod(Sparks, -1)
});
