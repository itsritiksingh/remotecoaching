const router = require('express').Router();
const meetingModel = require('../schema').meetingModel;
const {meetingController} = require('../controllers/meetingController');
const query = require("querymen").middleware;

router.put("/meeting/:id", new meetingController(meetingModel).Update);
router.post("/meeting", new meetingController(meetingModel).Create);
router.delete("/meeting/:id/:userId", new meetingController(meetingModel).Delete);
router.get("/meeting/:id", new meetingController(meetingModel).GetElementById);
router.get("/meeting", query(), new meetingController(meetingModel).GetELement);

module.exports = router;