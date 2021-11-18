import express from "express"
import meetingController from "../controller/meetingController.js"



import routes from './routes.js';
const { meeting } = routes;

const router = express.Router();

router.get(meeting.getMeetings, meetingController.getMeetings)

router.get(meeting.getAdminMeetings, meetingController.getAdminMeetings)

router.get(meeting.getMeetingById, meetingController.getMeetingById)

router.post(meeting.createMeeting, meetingController.createMeeting)

router.put(meeting.updateMeeting, meetingController.updateMeeting)

router.put(meeting.updateMeetingStatus, meetingController.updateMeetingStatus)

export default router