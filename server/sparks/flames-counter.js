var EventEmitter = Meteor.npmRequire("events").EventEmitter;

FlamesCounter = new EventEmitter();

FlamesCounter._flamesHandles = {};
FlamesCounter._sparks = {};

var increment = function (sparkId, inc) {
    return function () {
        FlamesCounter._sparks[sparkId] += inc;
        FlamesCounter.emit("changed", sparkId);
    };
};

FlamesCounter.watchSpark = function (sparkId) {
    if (!FlamesCounter._flamesHandles[sparkId]) {
        var selector = {
            sparkId: sparkId
        };
        FlamesCounter._sparks[sparkId] = 0;
        FlamesCounter._flamesHandles[sparkId] = Flames.find(selector).observeChanges({
            added: increment(sparkId, 1),
            removed: increment(sparkId, -1)
        });
        FlamesCounter._flamesHandles[sparkId].watchers = 1;
    } else {
        FlamesCounter._flamesHandles[sparkId].watchers += 1;
    }
};

FlamesCounter.unwatchSpark = function (sparkId) {
    if (!FlamesCounter._flamesHandles[sparkId]) {
        return;
    }
    FlamesCounter._flamesHandles[sparkId].watchers -= 1;
    if (FlamesCounter._sparks[sparkId].watchers === 0) {
        FlamesCounter._flamesHandles[sparkId].stop();
        delete FlamesCounter._flamesHandles[sparkId];
        delete FlamesCounter._sparks[sparkId];
    }
};

FlamesCounter.count = function (sparkId) {
    return FlamesCounter._sparks[sparkId];
};
