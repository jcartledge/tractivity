(function() {

    'use strict';

    var pivotal = require('pivotal'),
        pivotalToken = process.env.PIVOTAL_TRACKER_TOKEN,
        pivotalProject = process.env.PIVOTAL_TRACKER_PROJECT_ID;

    pivotal.useToken(pivotalToken);

    exports.index = function(req, res) {
        pivotal.getProjectActivities(pivotalProject, req.query, function (err, ret) {
            if (!err) {
                res.render(req.xhr ? '_items' : 'index', {
                    items: ret.activity ? [].concat(ret.activity) : []
                });
            } // else error
        });
    };
}());
