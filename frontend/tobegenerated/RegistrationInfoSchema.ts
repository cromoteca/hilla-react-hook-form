import RegistrationInfo from "Frontend/generated/com/example/application/endpoints/hookform/RegistrationEndpoint/RegistrationInfo.js";
import { ObjectSchema, boolean, object, string } from "yup";

const RegistrationInfoSchema: ObjectSchema<RegistrationInfo> = object({
    name: string().required(),
    email: string().email().required(),
    phone: string().matches(/^[0-9]*$/).optional(),
    country: string().min(2).max(3).required(),
    terms: boolean().oneOf([true]).required(),
});

export default RegistrationInfoSchema;
