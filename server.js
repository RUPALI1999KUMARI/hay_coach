import dotenv from 'dotenv';
dotenv.config();
// import { populate } from './populate.js';
import parkingController from './controller/parking_slot_controller.js';
import parkingSpaceController from './controller/parking_space_controller.js';
import { validateRegistrationBody } from './middleware/request-validator.js';
import express from 'express';
import { loggerMiddleware, errorHandlerMiddleware } from './middleware/index.js';

const app = express();

// Register logger middleware
app.use(loggerMiddleware);

app.use(express.json());

// Define app routes
app.get('/ping', (req, res) => {
    res.send('pong!');
});
app.post('/create_parking_space', validateRegistrationBody, parkingSpaceController.createParkingSpace);

app.patch('/get_parking_space', parkingController.getSlot);
app.patch('/free_parking_space', parkingController.freeSlot);

// Register error handling middleware
app.use(errorHandlerMiddleware);

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
