const { Controller } = require('./genericController')
const { userModel } = require("../schema");
const { userController } = require('./userController');

class meetingController extends Controller {
    constructor(model) {
        super(model);
        this.model = model;
        this.Create = this.Create.bind(this);
        this.GetELement = this.GetELement.bind(this);
        this.Delete = this.Delete.bind(this);
    }

    Create(req, res) {
        console.log(req.body)
        const newQuestion = this.model(req.body);
        newQuestion.save().then((ques) => {
            req.params._id = ques._id;
            req.body.userId = ques.startedBy;
            //just req. by frontend
            req.body._id = ques._id;
            new userController(userModel).pushUpdate(req, res);
        });
    }
    //you need to pass querymen as middleware to this route
    //refer to npm querymen for urlquery
    //it has it own imlement for query you need to enter q as search string and
    //seach query into which attribute q will be searched
    GetELement(req, res) {
        this.model
            .find({ [req.query.search]: new RegExp(req.query.q, "i") }, req.querymen.select, req.querymen.cursor)
            .populate({ path: req.query.populate, select: { "password": 0 } }).then((data) => res.json(data))
            .catch((err) => res.status(400).send(err));
    }
    Delete(req, res) {
        this.model
            .deleteOne({ _id: req.params.id })
            .then(() => {
                req.params._id = req.params.id;
                req.body.userId = req.params.userId;
                new userController(userModel).pullUpdate(req, res);
            })
            .catch((err) => res.status(400).send(err));

    }
}
exports.meetingController = meetingController;

