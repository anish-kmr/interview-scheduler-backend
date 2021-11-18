import Meeting from "../models/meeting.js"
import Participant from "../models/participant.js"
import sendEmail from "../utils/emailService.js"
import { config } from "dotenv";

config();

const getMeetings = async (req, res) => {
    console.log("[meetingController] : getMeetings ");
    try {
        let meetings = await Meeting.find()
        return res.status(200).json({ success: true, meetings })
    }
    catch (err) {
        console.log("ERROR : [meetingController] : createMeeting: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }

}
const getAdminMeetings = async (req, res) => {
    console.log("[meetingController] : getAdminMeetings : ", req.params.id);
    let adminId = req.params.id
    try {
        let meetings = await Meeting.find({ adminId: adminId }).populate("participants")
        // console.log(meetings);
        return res.status(200).json({ success: true, meetings })
    }
    catch (err) {
        console.log("ERROR : [meetingController] : getAdminMeetings: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }

}

const getMeetingById = async (req, res) => {
    console.log("[meetingController] : getMeetingById : ", req.params.id)
    let id = req.params.id
    try {
        let meeting = await Meeting.findOne({ _id: id })
        return res.status(200).json({ success: true, meeting })
    }
    catch (err) {
        console.log("ERROR : [meetingController] : createMeeting: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }
}

const createMeeting = async (req, res) => {
    console.log("[meetingController] : createMeeting : ", req.body)
    let meeting = req.body
    if (meeting.participants.length < 2) {
        return res.status(400).json({ success: false, err: "At least 2 participants required for a meeting" })
    }

    try {
        let busy = await checkAvailability(meeting.participants, meeting.startTime, meeting.endTime)
        if (busy > 0) {
            return res.status(400).json({ success: false, err: "Participants not available in seleted Time Range" })
        }
        let newMeeting = await Meeting.create(meeting)
        let participants = await Participant.find({ _id: { $in: meeting.participants } })
        await sendEmail(newMeeting, participants)
        return res.status(200).json({ success: true, meeting: newMeeting })
    }
    catch (err) {
        console.log("ERROR : [meetingController] : createMeeting: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }
}

const updateMeeting = async (req, res) => {
    console.log("[meetingController] : updateMeeting : ", req.body)
    let meetingId = req.params.id
    let meeting = req.body
    if (meeting.participants.length < 2) {
        return res.status(400).json({ success: false, err: "At least 2 participants required for a meeting" })
    }

    try {
        let busy = await checkAvailability(meeting.participants, meeting.startTime, meeting.endTime)
        if ((busy.includes(meetingId) && busy.length > 1)) {
            return res.status(400).json({ success: false, err: "Participants not available in seleted Time Range" })
        }
        console.log("meetid", meetingId);
        let updatedMeeting = await Meeting.findOneAndUpdate({ _id: meetingId }, meeting, { new: true })
        console.log(updatedMeeting);
        return res.status(200).json({ success: true, meeting: updatedMeeting })
    }
    catch (err) {
        console.log("ERROR : [meetingController] : updateMeeting: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }
}


const updateMeetingStatus = async (req, res) => {
    console.log("[meetingController] : updateMeetingStatus  ")
    let meeting = req.body
    try {
        await Meeting.findOneAndUpdate({ _id: meeting._id }, { status: meeting.status }, { new: true })
        return res.status(200).json({ success: true })

    }
    catch (err) {
        console.log("ERROR : [meetingController] : updateMeetingStatus: ", err.message)
        return res.status(500).json({ success: false, err: err.message })

    }

}

const checkAvailability = async (pids, startTime, endTime) => {
    console.log(pids);
    let meetings = await Meeting.find({
        "participants": { $in: pids },
        "startTime": { $lte: endTime },
        "endTime": { $gt: startTime }
    })
    let mids = meetings.map(m => m._id.toString())
    // console.log(mids)
    return mids
}
export default {
    getMeetings,
    getAdminMeetings,
    getMeetingById,
    createMeeting,
    updateMeeting,
    updateMeetingStatus
}