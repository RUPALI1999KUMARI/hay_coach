import { db } from "../database/pg-pool.js";

export class ParkingSlotService {

    constructor(parkingId) {
        this.parkingId = parkingId;
    }

    async getSlot(size) {
        const sizeMap = {
            's' : 1,
            'm' : 2,
            'l' : 3,
            'xl': 4
        }
        const sizeVal = sizeMap[size]

        const availableSpace = (await db.query(`select * from slot
        where parking_id = $1 and taken = false
         and (case size_type
                 when 's' then 1
                 when 'm' then 2
                 when 'l' then 3
                 when 'xl' then 4
                 end) > $2
        order by (case size_type
                 when 's' then 1
                 when 'm' then 2
                 when 'l' then 3
                 when 'xl' then 4
                 end)
        limit 1;`, [this.parkingId, sizeVal])).rows[0];

        console.log({ availableSpace });
        const { floor_num, slot_id } = availableSpace;
        if (!availableSpace) {
            return {success: false, message: "No slots available"};
        }
        const spaceToken = `${floor_num}:${slot_id}`
        let success = await this.updateParkingSlotAvailablity(floor_num, slot_id, true)
        return { success, token: spaceToken};
    }


    async updateParkingSlotAvailablity(floorNum, slotId, updateTo) {
        const data = (await db.query(`update slot
        set taken = $1
        where parking_id = $2 and floor_num = $3 and slot_id = $4;`,
        [updateTo, this.parkingId, floorNum, slotId])).rowCount;
        console.log({data});
        if (data) {
            return true
        }
        return false
    }

    async freeSlot(spaceToken) {
        let [floorNum, slotId] = spaceToken.split(":")
        floorNum = parseInt(floorNum)
        slotId = parseInt(slotId)
        let success = await this.updateParkingSlotAvailablity(floorNum, slotId, false)
        return { success }
    }
}