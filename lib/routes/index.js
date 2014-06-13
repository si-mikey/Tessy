exports.index = function(req, res){
  res.render('index', { title: 'Tessy Management '});
};


exports.testcases = function(req, res){
  res.render('tests', { title: 'Tessy - Tests' });
}

exports.reports = function(req, res){
  res.render('reports', { title: 'Tessy - Reports' });
}

exports.manage = function(req, res){
  res.render('manage', { title: 'Tessy - Manage' });
}
