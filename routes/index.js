
/*
 * GET home page.
 */

var pivotal = require("pivotal"),
    pivotalToken = process.env.PIVOTAL_TRACKER_TOKEN,
    pivotalProject = process.env.PIVOTAL_TRACKER_PROJECT_ID;

console.log('pivotalToken', pivotalToken);
console.log('pivotalProject', pivotalProject);

pivotal.useToken(pivotalToken);

exports.index = function(req, res) {

  console.log(req.get('since'));
  pivotal.getProjectActivities(pivotalProject, req.get, function (err, ret) {
    console.log(err, ret);
    if (!err) {
      if(req.xhr) {
        res.json(ret.activity);
      } else {
        res.render('index', {activities: ret.activity});
      }
    }
  });

};
