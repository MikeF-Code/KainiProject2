let Job = require("../models/job.js");

module.exports = function(app) {

    app.get('/api/jobs/getall', function(req, res) {
        Job.findAll({
            where: {
                accountid: req.user.dataValues.id,
                archived: false
            }
        }).then(function(data){
            let responseObj = {
                data: data
            };
            res.json(responseObj);
        });
    });

    app.post("/api/jobs/create" , function(req, res){
        if (req.isAuthenticated()) {
            let createObj = {};
            for (let col in req.body) {
                createObj[`${col}`] = req.body[col];
            }
            createObj.accountid = req.user.dataValues.id;
            createObj.archived = false;
            Job.create(createObj)
            .then(function(result){
                res.json(result);
            })
            .catch(function(err) {
                console.log(err);
                res.status(500).json({error: 'Failed to create job.  Please double check your form has been filled out correctly and try again.'});
            });
        } else {
            res.status(401);
        }
    });

    app.get('/api/jobs/get/:id', function(req, res){
        if(req.isAuthenticated()) {
            Job.findOne({
                where: {
                    id: req.params.id,
                    accountid: req.user.dataValues.id
                }
            }).then(function(data){
                res.json(data);
            })
        }else{
            res.status(401);
        }
    })

    app.put("/api/jobs/update/:id" , function(req, res){
        if (req.isAuthenticated()) {
            let updateObj = {};
            for (let col in req.body) {
                updateObj[`${col}`] = req.body[col];
            };
            Job.update(updateObj, {
                where: {
                    id: req.params.id
                }
            })
            .then(function(data){
                res.json(data);
            }).catch(function(err) {
                console.log(err)
                res.status(500).json({error: 'Failed to update job. Please try again later.'});
            });
        } else {
            res.status(401);
        }
    });

    app.put("/api/jobs/archive/:id" , function(req, res){
        if (req.isAuthenticated()) {
            Job.update({
                archived: true
            }, {
                where: {
                    id: req.body.id
                }
            })
            .then(function(data){
                res.json(data);
            }).catch(function(err) {
                console.log(err);
                res.status(500).json({error: 'Failed to archive job. Please try again later.'});
            });
        } else {
            res.status(401);
        }
    });
};