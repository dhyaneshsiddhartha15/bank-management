const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:[{
        type: String,
        enum: ['Customer', 'Banker'],
        required: true, 
    }],
    // balance:{
    //     type:Number,
    // }
}, {
    timestamps: true, 
});

module.exports = mongoose.model("User", userSchema);
