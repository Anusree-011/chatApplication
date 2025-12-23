import bcryptjs from 'bcryptjs';
import User from '../DB/Models/userModels.js';
import jwtToken from '../utils/jwtwebToken.js';

export const userRegister = async (req, res) => {
    try {
        const { fullname, username, email, gender, password, profilepic } = req.body;
        const user = await User.findOne({ $or: [{ username }, { email }] });

        if (user)
            return res.status(400).send({ success: false, message: "Username or Email already exists" });

        const hashPassword = bcryptjs.hashSync(password, 10);
        const profileBoy = profilepic || `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`;
        const profileGirl = profilepic || `https://api.dicebear.com/9.x/adventurer/svg?seed=${username}`;

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashPassword,
            gender,
            profilepic: gender === "male" ? profileBoy : profileGirl
        });

        if (newUser) {
            await newUser.save();
            jwtToken(newUser._id, res)
        } else {
            res.status(400).send({
                success: false,
                message: "Invalid user data"
            });
        }

        res.status(201).send({
            _id: newUser._id,
            fullname: newUser.fullname,
            username: newUser.username,
            email: newUser.email,
            profilepic: newUser.profilepic
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(500).send({ success: false, message: "Email doesnt exist" })
        const comparePass = bcryptjs.compareSync(password, user?.password || "");

        if (!comparePass) {
            return res.status(400).send({ success: false, message: "Invalid email or password" });
        }

        jwtToken(user._id, res);

        res.status(200).send({
            _id: user._id,
            fullname: user.fullname,
            username: user.username,
            email: user.email,
            profilepic: user.profilepic,
            message: "Succesfylly Login"
        });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}

export const userLogout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).send({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).send({
            success: false,
            message: error.message
        });
        console.log(error);
    }
}