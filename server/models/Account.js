const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
    accountNumber: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    transactionType: {
        type: String,
        enum: ['deposit', 'withdrawal'],
        default: 'deposit',
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    balance: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model("Account", accountSchema);
