import { roles } from "../../../middleware/auth.js";


export const endPoints = {
    getProfile:[roles.Admin , roles.HR],
    profilePic:[roles.User]
}