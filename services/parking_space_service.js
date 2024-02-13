import { db } from "../database/pg-pool.js";
import format from "pg-format";


export class ParkingSpaceService {

    async createParkingSpace(data) {
        // console.log({ data });
        let insertedData = await db.query('INSERT INTO parking_space (address, total_spaces, slots_config) VALUES ($1, $2, $3) returning id;',
            [data.address, data.total_spaces, JSON.stringify(data.slots_config)]);
        if (!insertedData || insertedData?.rowCount == 0) {
            return { success: false, message: "Could not create a parking space, server failure"}
        }

        const parkingId = insertedData.rows[0].id

        const slotsConfig = data.slots_config;

        // console.log({ slotsConfig });

        let slots = []
        for (let floorNum = 1; floorNum <= 3; floorNum++) {
            const numSmall = slotsConfig[`floor_${floorNum}`]['s']
            for (let slotId = 1; slotId <= numSmall; slotId++ ) {
                slots.push([parkingId, slotId, floorNum, "s", false])
            }
            
            const numMedium = slotsConfig[`floor_${floorNum}`]['m']
            for (let slotId = 1; slotId <= numMedium; slotId++ ) {
                slots.push([parkingId, slotId + numSmall, floorNum, "m", false])
            }

            const numLarge = slotsConfig[`floor_${floorNum}`]['l']

            for (let slotId = 1; slotId <= numLarge; slotId++ ) {
                slots.push([parkingId, slotId + numSmall + numMedium, floorNum, "l", false])
            }

            const numXLarge = slotsConfig[`floor_${floorNum}`]['xl']
            for (let slotId = 1; slotId <= numXLarge; slotId++ ) {
                slots.push([parkingId, slotId + numSmall + numMedium + numLarge, floorNum, "xl", false])
            }
            
        }

        // console.log({ slots });
        const insertedSlots = (await db.query(format(`INSERT INTO slot (parking_id, slot_id, floor_num, size_type, taken) VALUES %L`, slots), [])).rowCount;
        // console.log({ insertedSlots });
        if (insertedSlots) {
            return { success: true}
        }
        return { success: false}
    }
}