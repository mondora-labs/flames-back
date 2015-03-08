/*
*   INSERT POLICIES
*
*   - only allow logged-in users to insert sparks
*
*/

Sparks.allow({
    insert: function (userId) {
        return !!userId;
    }
});

/*
*   UPDATE POLICIES
*
*   - no updates allowed
*
*/

/*
*   REMOVE POLICIES
*
*   - no removes allowed
*
*/
