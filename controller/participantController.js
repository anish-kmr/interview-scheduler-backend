import Participant from "../models/participant.js"
import { config } from "dotenv";
config();

const getParticipants = async (req, res) => {
    console.log("[participantController] : getParticipants ");
    try {
        let participants = await Participant.find()
        return res.status(200).json({ success: true, participants })
    }
    catch (err) {
        console.log("ERROR : [participantController] : createParticipant: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }

}

const getParticipantById = async (req, res) => {
    console.log("[participantController] : getParticipantById : ", req.params.id)
    let id = req.params.id
    try {
        let participant = await Participant.findOne({ _id: id })
        return res.status(200).json({ success: true, participant })
    }
    catch (err) {
        console.log("ERROR : [participantController] : createParticipant: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }
}

const createParticipant = async (req, res) => {
    console.log("[participantController] : createParticipant : ", req.body)
    let { name, email, phone } = req.body
    try {
        let newParticipant = await Participant.create({ name, email, phone })
        return res.status(200).json({ success: true, participant: newParticipant })
    }
    catch (err) {
        console.log("ERROR : [participantController] : createParticipant: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }
}

const updateParticipant = async (req, res) => {
    console.log("[participantController] : updateParticipant : ", req.body)
    let participantId = req.params.id
    let { name, email, phone } = req.body

    try {
        let updatedParticipant = await Participant.findOneAndUpdate(
            { _id: participantId },
            { name, email, phone },
            { new: true })
        return res.status(200).json({ success: true, participant: updatedParticipant })
    }
    catch (err) {
        console.log("ERROR : [participantController] : updateParticipant: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }
}



export default {
    getParticipants,
    getParticipantById,
    createParticipant,
    updateParticipant,
}