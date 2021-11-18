import { config } from "dotenv";
import { connectToDatabase } from "./utils/db.js";
import app from "./app.js"
config();

const port = process.env.PORT || 8080;

const closeServer = (server) => {
  if (server) {
    server.close(() => console.log('Server closed'));
  }
  process.exit(1);
};

const unexpectedErrorHandler = (server, error) => {
  console.log("ERROR : ", error);
  closeServer(server)
};
const initializeServer = async () => {
  try {
    let db = await connectToDatabase()
    console.log("Connected To Database");
    let server = app.listen(port, () => {
      console.log(`Server running at port ${port}`)
    });

    process.on('uncaughtException', (err) => unexpectedErrorHandler(server, server));
    process.on('unhandledRejection', (err) => unexpectedErrorHandler(server, server));

    process.on('SIGTERM', () => {
      logger.info('SIGTERM received');
      closeServer(server)
    });
  }
  catch (err) {
    console.log("UNEXPECTED ERROR : INITIALIZING SERVER");
  }
}




initializeServer()