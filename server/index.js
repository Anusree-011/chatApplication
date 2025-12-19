import express from "express"
import dotenv from "dotenv"
import dbconnect from "./DB/dbconnect.js";
import authRouter from "./rout/authUser.js"
import messageRouter from "./rout/messageRoute.js"
import cookieParser from "cookie-parser";
import userRouter from "./rout/userRout.js";
const app = express();

dotenv.config();
app.use(express.json());
app.use(cookieParser)

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user',userRouter);

app.get("/", (req, res) => {
    res.send("server is running")
})


// Catch-all route for debugging
app.use((req, res) => {
    res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
});
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    dbconnect();
    console.log(`Server is running on ${PORT} port`)

})