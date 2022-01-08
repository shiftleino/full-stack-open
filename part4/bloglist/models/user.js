const mongoose = require("mongoose")
const uniqueValidator = require("mongoose-unique-validator")
const config = require("../utils/config")
const logger = require("../utils/logger")

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info("Connected to MongoDB")
    })
    .catch((error) => {
        logger.error("Error connecting to MongoDB:", error.message)
    })

const userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true, minLength: 3 },
    name: String,
    passwordHash: String,
    blogs: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog"
    }
    ],
})

userSchema.plugin(uniqueValidator)

userSchema.set("toJSON", {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User