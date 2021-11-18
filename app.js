import { config } from "dotenv";
import express from 'express';

config();

import cors from "cors"
import bodyParser from "body-parser"

import routes from "./routes/routes.js"
const { main } = routes;
import meetingRoutes from "./routes/meetingRoutes.js"
import participantRoutes from "./routes/participantRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
const app = express();


app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!')
});
app.use(main.meeting, meetingRoutes)
app.use(main.participant, participantRoutes)
app.use(main.admin, adminRoutes)

export default app