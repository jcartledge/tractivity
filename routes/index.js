
/*
 * GET home page.
 */

pivotal = require("pivotal");

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};
