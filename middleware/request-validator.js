/* Request validator middleware code here */

import * as yup from 'yup';

const registerParkingSchema = yup
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

function registerationValidators(body) {
    try {
        const data = registerParkingSchema.validateSync(body, { abortEarly: false, stripUnknown: true, strict: true })
        return [true, ""]
    } catch (e) {
        console.log({ errors: e.errors }, e);
        return [false, e.errors]
    }
}

export function validateRegistrationBody(req, res, next) {
    const [success, errors] = registerationValidators(req.body)
    if (success) {
        return next()
    } else {
        return res.status(401).json({ message: "Request Body Invalid", error: errors})
    }
}