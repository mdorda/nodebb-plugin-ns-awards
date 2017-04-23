(function (Filter) {
    'use strict';

    var constants  = require('./constants'),
        controller = require('./controller');

    /**
     * Hook to render a user profile.
     * 'userData' will be used as payload in hook handler.
     *
     * @param {object} params payload {userData: userData, uid: callerUID}
     * @param {function} callback
     */
    Filter.account = function (params, callback) {
        //Load all awards
        controller.getUserAwards(params.userData.uid, -1, function (error, awards) {
            if (error) {
                return callback(error);
            }

            params.userData.awards = awards;
            callback(null, params);
        })
    };

    Filter.menuAdmin = function (header, callback) {
        header.plugins.push({
            route: '/plugins/awards',
            icon : 'fa-trophy',
            name : 'Awards'
        });
        callback(null, header);
    };

    Filter.navigation = function (items, callback) {
        items.push({
            route    : constants.CLIENT_PAGE_PATH,
            title    : 'Awards',
            enabled  : true,
            iconClass: 'fa-trophy',
            textClass: 'visible-xs-inline',
            text     : 'Awards'
        });
        callback(null, items);
    };

    /**
     * Hook to render a topic thread
     *
     * @param {object} payload fields: {posts: posts, uid: uid}
     * @param {function} callback
     */
    Filter.getPosts = function (payload, callback) {
        controller.getPostsWithRewards(payload.posts, function (error, posts) {
            if (error) {
                return callback(error);
            }
            payload.posts = posts;
            callback(null, payload);
        });
    };

})(module.exports);
