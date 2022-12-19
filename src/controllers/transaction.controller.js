const db = require('../db/models');

class Transaction{
    async createTransaction(data){
        try{
            const newTransaction = await db.Transaction.create(data);
            return newTransaction;
        }catch(error){
            next(error);
            //console.log(error);
            return error
        }
    }

    async getTransactionsFromUser(userID, categoryID){
        try{
            let transactions;
            if(categoryID){
                console.log(categoryID);
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
            return transactions;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async getTransactionsFromAccount(accountID, categoryID){
        try{
            let transactions;
            if(categoryID){
                console.log(categoryID);
                transactions = await db.sequelize.query(
                    `SELECT transaction.id, transaction.type, account.name, transaction.amount 
                    FROM transaction
                    INNER JOIN account ON ${accountID} = transaction.account_id
                    WHERE transaction.category_id = ${categoryID}`
                )
            }else{
                transactions = await db.sequelize.query(
                    `SELECT transaction.id, transaction.type, account.name, transaction.amount
                    FROM transaction
                    INNER JOIN account ON ${accountID} = transaction.account_id`
                );
            }
            return transactions;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateTransaction(transactionId, data){
        try{
            const isModified = await db.Transaction.update(
                {
                    ...data,
                },
                {
                    where: {
                        id: transactionId,
                    }
                }
            )
            if(isModified[0]===0) throw new Error('Transaction wasn`t modified');
            return;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteTransaction(transactionID){
        try{
            const isTransactionDeleted = await db.Transaction.destroy({
                where: {
                    id: transactionID
                }
            });
            if(isTransactionDeleted === 0) throw new Error("Transaction wasn't Deleted")
        }catch(error){
            console.log(error);
            throw error;
        }
        
    }
}

const transaction = new Transaction();

module.exports = transaction;
