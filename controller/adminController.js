import Admin from "../models/admin.js"
import crypto from "crypto"
import { config } from "dotenv";
config();



const hashPassword = (password) => {
    const hash = crypto.createHash('sha256').update(password).digest('base64');
    return hash
}

const matchPassword = (password, encPassword) => {
    const hash = crypto.createHash('sha256').update(password).digest('base64');
    return hash === encPassword
}

const createAdmin = async (req, res) => {
    console.log("[adminController] : createAdmin : ", req.body)
    let { name, email, password } = req.body
    try {
        let encPassword = hashPassword(password)
        // let newAdmin = { name, email, password: encPassword }
        let newAdmin = await Admin.create({ name, email, password: encPassword })
        return res.status(200).json({ success: true, admin: newAdmin })
    }
    catch (err) {
        console.log("ERROR : [adminController] : createAdmin: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }
}

const login = async (req, res) => {
    console.log("[adminController] : loginAdmin : ", req.body)
    let { email, password } = req.body
    try {
        let admin = await Admin.findOne({ email })

        if (!admin) {
            console.log("[adminController] : loginAdmin : Email Invalid");
            return res.status(200).json({ success: false, err: "Invalid Email Id " })
        }
        if (!matchPassword(password, admin.password)) {
            console.log("[adminController] : loginAdmin : WRONG PASSWORD");
            return res.status(200).json({ success: false, err: "Password Incorrect" })
        }

        return res.status(200).json({ success: true, admin })
    }
    catch (err) {
        console.log("ERROR : [adminController] : loginAdmin: ", err)
        return res.status(500).json({ success: false, err: err.message })
    }
}

export default {
    createAdmin,
    login
}