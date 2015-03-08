Flames.before.insert(function (userId, flame) {
    // Set (or overwrite) userId and date
    flame.userId = userId;
    flame.date = Date.now();
});
