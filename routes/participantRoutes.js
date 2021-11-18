import express from "express"
import participantController from "../controller/participantController.js"



import routes from './routes.js';
const { participant } = routes;

const router = express.Router();

router.get(participant.getParticipants, participantController.getParticipants)

router.get(participant.getParticipantById, participantController.getParticipantById)

router.post(participant.createParticipant, participantController.createParticipant)

router.put(participant.updateParticipant, participantController.updateParticipant)


export default router