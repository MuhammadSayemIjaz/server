const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    }
})

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;