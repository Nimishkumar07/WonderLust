const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    // by default  Passport-Local Mongoose will add a username,the hashed password and the salt value.
})

userSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("User",userSchema)