
const Account = require("../models/Account");
const User = require("../models/User");




exports.deposit = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body;
        const userId = req.user.id;

        const depositAmount = parseFloat(amount);


        if (isNaN(depositAmount) || depositAmount <= 0) {
            return res.status(400).json({
                success: false,
                message: 'Invalid amount provided'
            });
        }

        let account = await Account.findOneAndUpdate(
            { accountNumber, userId },
            { $inc: { balance: depositAmount }, $setOnInsert: { userId, accountNumber, amount: depositAmount } },
            { new: true, upsert: true }
        );

        return res.status(200).json({
            success: true,
            message: 'Cash deposited successfully',
            amount: depositAmount,
            balance: account.balance
        });

    } catch (error) {
        console.error('Deposit error:', error);
        return res.status(500).json({ message: 'Something went wrong' });
    }
};


exports.withdraw = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body;
        const userId = req.user.id;
        if (amount <= 0) {
            return res.status(400).json({ message: 'Withdrawal amount must be greater than zero' });
        }
        let account = await Account.findOneAndUpdate(
            { accountNumber, userId, balance: { $gte: amount } }, 
            { $inc: { balance: -amount }, $set: { userId, accountNumber } },
            { new: true }
        );


        if (!account) {
            return res.status(404).json({ message: 'Account not found or insufficient balance' });
        }

        return res.status(200).json({
            success: true,
            message: 'Withdrawal successful',
            transactionType: 'withdrawal',
            account,
        });

    } catch (error) {
        console.error('Withdrawal error:', error);
        return res.status(500).json({ message: 'Unexpected error occurred' });
    }
};

exports.getAccounts=async (req,res)=>{
    try{
const getAccount=await Account.find();
return res.status(200).json({
    success:true,
    message:"Account Details fetched Successfully",
    getAccount,
})
    }catch(error){
return res.status(500).json({
    success:false,
    message:"Unexpected Error",
})
    }
}
exports.getAllTransactions = async (req, res) => {
    try {
        const userId = req.user.id; 
        console.log("User id",userId);
        const transactions = await Account.find({userId});
        return res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            transactions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.getAccountsByUserId = async (req, res) => {
    try {
        const { userId } = req.params;

        const accounts = await Account.find({ userId: userId });

        if (!accounts.length) {
            return res.status(404).json({
                success: false,
                message: "No accounts found for this user",
            });
        }

        let totalDeposits = 0;
        let totalWithdrawals = 0;
        let balance = 0;
        let accountDetails = [];

        accounts.forEach(account => {
            if (account.transactionType === 'deposit') {
                totalDeposits += account.amount;
            } else if (account.transactionType === 'withdrawal') {
                totalWithdrawals += account.amount;
            }
            balance = account.balance;
            accountDetails.push({
                accountNumber: account.accountNumber,
                transactionType: account.transactionType,
                amount: account.amount,
                createdAt: account.createdAt
            });
        });

        return res.status(200).json({
            success: true,
            message: "Accounts summary fetched successfully",
            summary: {
                totalDeposits,
                totalWithdrawals,
                balance,
                accountDetails 
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};


exports.getAllTransactionsBank = async (req, res) => {
    try {

        const transactions = await Account.find();
        return res.status(200).json({
            success: true,
            message: "Transactions fetched successfully",
            transactions,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
exports.profile=async (req,res)=>{
    try{
const user=await User.findById(req.user?.id).select("-password");
console.log("Profile User is",user);
if(user){
    return res.status(200).json({
        success:true,
        message:"User Fetched Successfully",
        user,
    });
}else{
    return res.status(400).json({
        success:false,
        message:"User does not exits",
    })
}
    }catch(error){
        console.log(error);
return res.status(500).json({
    success:false,
    message:"Unexpected Error",
  
})
    }
}