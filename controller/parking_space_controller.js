import { ParkingSpaceService } from "../services/parking_space_service.js";

const parkingSpaceController = {}

parkingSpaceController.createParkingSpace = async function(req, res, next) {
    const body = req.body;

    const parkingSpaceService = new ParkingSpaceService()

    const data = await parkingSpaceService.createParkingSpace(body);
    if (data.success) {
        return res.status(200).send({ success: true })
    }
    return res.send({ success: false, message: "Could not ceeate a new parking space" })
}

export default parkingSpaceController;
