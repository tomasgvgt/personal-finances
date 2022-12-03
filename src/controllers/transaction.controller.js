const db = require('../db/models');

class Transaction{
    async createTransaction(data){
        try{
            console.log("hey");
            const newTransaction = await db.Transaction.create(data);
            return newTransaction;
        }catch(error){
            console.log(error);
            return error
        }
    }

    async getTransactionsFromUser(userName){
        try{
            const user = await db.User.findOne({
                where: {
                    email: userName
                }
            });
            const userTransactions = await db.Transaction.findAll({
                where: {
                    userId: user.id
                }
            })
            return userTransactions;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getTransactionsFromAccount(userName, accountID){
        try{
            const user = await db.User.findOne({
                where: {
                    email: userName
                }
            });
            const transactions = db.Transaction.findOne({
                where: {
                    accountId: accountID,
                    userId: user.id
                }
            });
            return transactions;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

const transaction = new Transaction();

module.exports = transaction;
