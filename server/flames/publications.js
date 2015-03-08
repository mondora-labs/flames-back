Meteor.publish("flamesBySpark", function (sparkId) {
    check(sparkId, String);
    return Flames.find({
        sparkId: sparkId
    });
});
