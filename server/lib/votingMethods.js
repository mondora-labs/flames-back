Lib.getVoteMethod = function (Collection, inc) {
    return function (_id) {
        check(_id, String);
        check(this.userId, String);
        Collection.update({
            _id: _id,
            userId: {
                $ne: this.userId
            }
        }, {
            $inc: {
                points: inc
            }
        });
    };
};
