/* 
CREATE TABLE parking_space(id SERIAL PRIMARY KEY, address TEXT NOT NULL);

*/

import { getPool } from "./database/pg-pool.js";
import format from "pg-format";

import * as yup from 'yup';

export const registerParkingSchema = yup
    .object({
        address: yup.string().required().trim(),
        total_spaces: yup.number().required(),
        slots_config: yup.object().shape({
            floor_1: yup.object().shape({
                s: yup.number().required(),
                m: yup.number().required(),
                l: yup.number().required(),
                xl: yup.number().required()
            }),
            floor_2: yup.object().shape({
                s: yup.number().required(),
                m: yup.number().required(),
                l: yup.number().required(),
                xl: yup.number().required()
            }),
            floor_3: yup.object().shape({
                s: yup.number().required(),
                m: yup.number().required(),
                l: yup.number().required(),
                xl: yup.number().required()
            }),
        })

    })
    .required();

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}


export async function populate() {
    const pool = getPool();
    // let data = (await pool.query(`select * from parking_space`)).rows;
    // console.log(data)


    let slots = []
    for (let i = 1; i <= 1200; i++) {
        for (let s = 1; s <= 100; s++) {
            let floor = 1
            slots.push(
                [i, s, floor, "s", false]
            )
            slots.push(
                [i, 100 + s, floor, "m", false]
            )
            slots.push(
                [i, 200 + s, floor, "l", false]
            )
            slots.push(
                [i, 300 + s, floor, "xl", false]
            )
            floor = 2
            slots.push(
                [i, s, floor, "s", false]
            )
            slots.push(
                [i, 100 + s, floor, "m", false]
            )
            slots.push(
                [i, 200 + s, floor, "l", false]
            )
            slots.push(
                [i, 300 + s, floor, "xl", false]
            )

            floor = 3
            slots.push(
                [i, s, floor, "s", false]
            )
            slots.push(
                [i, 100 + s, floor, "m", false]
            )
            slots.push(
                [i, 200 + s, floor, "l", false]
            )
            slots.push(
                [i, 300 + s, floor, "xl", false]
            )

        }
    }

    pool.query(format('INSERT INTO slot (parking_id, slot_id, floor_num, size_type, taken) VALUES %L', slots.slice(1, 2)),[], (err, result)=>{
        console.log(err, "ERRR");
        console.log(result, "NICE");
      });





}













/* 

TO add 1200 parking spaces

const jsonData = {
        address: makeid(10),
        total_spaces: 1200,
        slots_config: {
            floor_1: {
                s: 100,
                m: 100,
                l: 100,
                xl: 100
            },
            floor_2: {
                s: 100,
                m: 100,
                l: 100,
                xl: 100
            },
            floor_3: {
                s: 100,
                m: 100,
                l: 100,
                xl: 100
            },
        }
    }

    let parking_values = []
    let slots = []
    for (let index = 0; index < 1200; index++) {
        const value = [jsonData.address, jsonData.total_spaces, JSON.stringify(jsonData.slots_config)]
        parking_values.push(value)
        // let slot = [i+1, ]

    }
    // console.log(parking_values);

    pool.query(format('INSERT INTO parking_space (address, total_spaces, slots_config) VALUES %L', parking_values),[], (err, result)=>{
        console.log(err, "ERRR");
        console.log(result, "NICE");
      });
*/