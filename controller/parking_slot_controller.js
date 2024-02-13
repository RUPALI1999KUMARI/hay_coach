import { ParkingSlotService } from "../services/parking_slot_service.js";

const parkingController = {}

parkingController.getSlot = async function(req, res, next) {
    const body = req.body;
    if (!body.parkingId || !body.size) {
        return res.send({ success: false, message: "Body should have parkingId and size" })
    }
    const { parkingId, size } = body;
    const parkingSlotService = new ParkingSlotService(parkingId)

    const data = await parkingSlotService.getSlot(size);
    if (data.success) {
        return res.status(200).send({ success: true, token: data.token })
    }
    return res.send({ success: false, message: "Could not find space for your car" })
}

parkingController.freeSlot =  async function (req, res, next) {
    const body = req.body;
    if (!body.parkingId || !body.token) {
        return res.send({ success: false, message: "Body should have parkingId and token" })
    }
    const { parkingId, token } = body;
    const parkingSlotService = new ParkingSlotService(parkingId)

    const data = await parkingSlotService.freeSlot(token);
    if (data.success) {
        return res.status(200).send({ success: true, token: data.token })
    }
    return res.send({ success: false, message: "Internal Server Error" })
}

export default parkingController;