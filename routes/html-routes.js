module.exports = function(app) {
    app.get("/" , function(req, res){
        if (req.isAuthenticated()) {
            res.render("index");
        } else {
            res.render("login");
        }
    });

    let Job = require("../models/job.js");

    app.get('/api/test/success', function(req, res) {
        res.render('success');
    });

    app.get('/api/test/fail', function(req, res) {
        res.render('fail');
    });
    
};
