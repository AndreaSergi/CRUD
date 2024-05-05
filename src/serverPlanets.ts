import express from "express";
import "express-async-errors";
import morgan from "morgan";
import multer from "multer";



import {
    getAll,
    getOneById,
    create,
    updateById,
    deleteById,
    createImage
} from "./Controllers/planetsController.js"

import { logIn, signUp, logOut } from "./Controllers/users.js"
import authorize from "./authorize.js"
import "./passport.js"

const storage = multer.diskStorage({
    destination : (req, file, cb) => {
        cb(null, "./uploads")
    },
    filename : (req, file, cb) => {
        cb(null, file.originalname)
    }
})
const upload = multer({storage})

let app = express();
const port = 3000;

app.use("/uploads", express.static("uploads"))
app.use("/static", express.static("static"))

app.use(morgan('dev'));
app.use(express.json());

app.get("/", (req:any, res:any) => {
    res.json("Hello, I'm the JSON")
});



app.get("/api/planets", getAll)

app.get("/api/planets/:id", getOneById)

app.post("/api/planets", create)

app.put("/api/planets/:id", updateById);

app.delete("/api/planets/:id", deleteById)

app.post("/api/planets/:id/image", upload.single("image"), createImage)

app.post("/api/users/login", logIn)
app.post("/api/users/signup", signUp)
app.get("/api/users/logut", authorize, logOut)


app.listen(port,()=>{
    console.log(`I'm listening on port http://localhost:${port}`)
});