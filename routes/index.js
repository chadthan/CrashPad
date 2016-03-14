var express = require('express');
var router = express.Router();
var ProfileController = require('../controllers/ProfileController');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/:page', function(req, res, next) {

	var data = null;
	if (req.params.page == 'account'){
		if (req.session.user != null){
			ProfileController.getById(req.session.user, function(err, result){
				if (err){

				}

			    res.render(req.params.page, result);
			    return;
			});
			return;
		}

	}

    res.render(req.params.page, data);
});

module.exports = router;
