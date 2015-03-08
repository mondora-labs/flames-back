var flameSchema = new SimpleSchema({
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
    sparkId: {
        type: String,
        index: true
    },
    parentId: {
        type: String,
        defaultValue: "spark",
        optional: true
    },
    text: {
        type: String
    },
    points: {
        type: Number,
        defaultValue: 0
    }
});

Flames = new Mongo.Collection("flames");
Flames.attachSchema(flameSchema);
