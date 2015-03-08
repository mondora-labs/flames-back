Meteor.publishComposite("sparks:byChannel", function (channel, limit) {
    check(channel, String);
    check(limit, Match.Optional(String));
    return {
        find: function () {
            return Sparks.find({
                channel: channel
            }, {
                sort: {
                    date: -1
                },
                limit: limit || 25
            });
        },
        children: [{
            find: function (spark) {
                return Meteor.users.find({
                    _id: spark.userId
                }, {
                    limit: 1,
                    fields: {
                        profile: 1
                    }
                });
            }
        }]
    };
});

Meteor.publishComposite("sparks:byId", function (sparkId) {
    check(sparkId, String);
    return {
        find: function () {
            return Sparks.find({
                _id: sparkId
            });
        },
        children: [{
            find: function (spark) {
                return Flames.find({
                    sparkId: spark._id
                });
            },
            children: [{
                find: function (flame, spark) {
                    return Meteor.users.find({
                        _id: {
                            $in: [flame.userId, spark.userId]
                        }
                    }, {
                        limit: 1,
                        fields: {
                            profile: 1
                        }
                    });
                }
            }]
        }]
    };
});

Meteor.publish("sparks:flamesCount", function (sparkId) {
    check(sparkId, String);
    var self = this;
    var updateCount = function (changedSparkId) {
        if (changedSparkId !== sparkId) {
            return;
        }
        self.changed("sparks", sparkId, {
            flamesCount: FlamesCounter.count(sparkId)
        });
    };
    FlamesCounter.watchSpark(sparkId);
    FlamesCounter.addListener("change", updateCount);
    self.onStop(function () {
        FlamesCounter.removeListener("change", updateCount);
        FlamesCounter.unwatchSpark(sparkId);
    });
    self.added("sparks", sparkId, {
        flamesCount: FlamesCounter.count(sparkId)
    });
    self.ready();
});
