const { Controller } = require('./genericController')

class userController extends Controller {
    constructor(model) {
        super(model);
        this.model = model;
        this.pullUpdate = this.pullUpdate.bind(this);
        this.pushUpdate = this.pushUpdate.bind(this);
        this.getUserMeeting = this.getUserMeeting.bind(this);
    }

    //push _id(questionid) to array find by uploadedBy
    pushUpdate(req, res) {
        this.model
            .updateOne(
                { _id: req.body.userId },
                {
                    $push: {
                        meeting: req.params._id
                    }
                }
            )
            .then(() => {
                res.send(req.body);
            })
            .catch((e) => {
                res.status(400).send(e);
                console.log(e);
            });
    }

    //pull _id(questionid) to array find by uploadedBy
    pullUpdate(req, res) {
        this.model
            .updateOne(
                { _id: req.body.userId },
                { $pull: { meeting: req.params._id } }
            )
            .then((response) => {
                res.send("Ok");
                console.log(response);
            })
            .catch((e) => {
                res.status(400).send(e);
                console.log(e);
            });
    }
    getUserMeeting(req, res) {
        this.model.findOne({ _id: req.params.id }).populate("meeting").then(data => {
            res.json(data)
        }).catch((e) => {
            res.status(400).send(e);
            console.log(e);
        });
    }



}

exports.userController = userController;