require('dotenv').config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors")
const UserModel = require("./model/Users")
app.use(express.json())
app.use(cors())

const DB = process.env.DATABASE;
mongoose.connect(DB,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log('connection start'))

app.get("/getUsers", (request, response) => {
    UserModel.find({}, (err, result) => {
        if (!err) {
            response.json(result)
        } else {
            response.json(err)
        }
    })
})
app.post("/createUsers", async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save()

    res.json(user)
})

app.put("/updateUser", (req, res) => {

    const { id, userName, email, age , mobileNo } = req.body

    try {
        UserModel.findById(id, (err, user) => {
            console.log(user)
            user.userName = userName
            user.email = email
            user.mobileNo = mobileNo
            user.age = age
            user.save()
            res.send("User has been successfully updated in DB")
        })
    }
    catch (err) {
        res.send("Getting error from server")
    }
})

app.delete("/deleteUser/:id", async (req, res) => {
    const id = req.params.id

    await UserModel.findByIdAndRemove(id).exec()
    res.send("User has been successfully deleted from DB")
})

const PORT = process.env.PORT || '8000'
app.listen(PORT, () => {
    console.log(`Server is running perfectly on port ${PORT}`)
})