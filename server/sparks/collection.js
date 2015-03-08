var customValidators = {
    // A spark must have either the url or text properties set
    urlAndText: function () {
        return this.field("url").isSet || this.field("text").isSet ? null : "notAllowed";
    }
};

var sparkSchema = new SimpleSchema({
    userId: {
        type: String,
        // Set before insert by a hook
        optional: true
    },
    date: {
        type: Number,
        // Set before insert by a hook
        optional: true
    },
    channel: {
        type: String,
        index: true
    },
    title: {
        type: String,
        max: 100
    },
    url: {
        type: String,
        custom: customValidators.urlAndText
    },
    text: {
        type: String,
        custom: customValidators.urlAndText
    },
    points: {
        type: Number,
        defaultValue: 0
    }
});

Sparks = new Mongo.Collection("sparks");
Sparks.attachSchema(sparkSchema);
