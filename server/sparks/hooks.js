Sparks.before.insert(function (userId, spark) {
    // Set (or overwrite) userId and date
    spark.userId = userId;
    spark.date = Date.now();
});
