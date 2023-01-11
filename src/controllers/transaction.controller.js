const db = require('../db/models');

class Transaction{
    async createTransaction(data){
        try{
            const newTransaction = await db.Transaction.create(data);
            return newTransaction;
        }catch(error){
            next(error);
            return error
        }
    }

    async getTransactionsFromUser(userID, categoryID){
        try{
            let transactions;
            if(categoryID){
                transactions = await db.sequelize.query(
                    `SELECT transaction.id, transaction.type, transaction.amount
                    FROM transaction
                    INNER JOIN user ON ${userID} = transaction.user_id
                    WHERE transaction.category_id = ${categoryID}`
                )
            }else{
                transactions = await db.sequelize.query(
                    `SELECT transaction.id, transaction.type, transaction.amount 
                    FROM transaction
                    INNER JOIN user ON ${userID} = transaction.user_id`
                );
            }
            if(!transactions){
                const error = new Error('Cant get transactions');
                error.name = "ValidationError";
                throw error;
            }
            return transactions;
        }catch(error){
            throw error;
        }
    }

    async getTransactionsFromAccount(userID, accountID, categoryID){
        try{
            let transactions;
            if(categoryID){
                transactions = await db.sequelize.query(
                    `SELECT transaction.id, transaction.type, account.name, transaction.amount 
                    FROM transaction
                    INNER JOIN account ON ${accountID} = transaction.account_id
                    WHERE transaction.category_id = ${categoryID} AND  transaction.user_id = ${userID}`
                )
            }else{
                transactions = await db.sequelize.query(
                    `SELECT transaction.id, transaction.type, account.name, transaction.amount
                    FROM transaction
                    INNER JOIN account ON ${accountID} = transaction.account_id
                    WHERE transaction.user_id = ${userID}`
                );
            }
            return transactions;
        }catch(error){
            throw error;
        }
    }

    async updateTransaction(userID, transactionId, data){
            const isModified = await db.Transaction.update(
                {
                    ...data,
                },
                {
                    where: {
                        userId: userID,
                        id: transactionId,
                    }
                }
            )
            if(isModified[0]===0){
                const error = new Error('Cant delete transaction');
                error.name = "ValidationError";
                throw error;
            }
    }

    async deleteTransaction(userID, transactionID){
        try{
            const isTransactionDeleted = await db.Transaction.destroy({
                where: {
                    id: transactionID,
                    userId: userID
                }
            });
            if(isTransactionDeleted === 0) throw new Error("Transaction wasn't Deleted")
        }catch(error){
            throw error;
        }
        
    }
}

const transaction = new Transaction();

module.exports = transaction;
