const db = require('../db/models')


class Account{
    async createAccount(data){
        try{
            const newAccount = await db.Account.create(data);
            return newAccount;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async getAccountsFromUser(userName){
        try{
            const user = await db.User.findOne({
                where: {
                    email: userName
                }
            });
            const userAccounts = await db.Account.findAll({
                where: {
                    userId: user.id
                }
            });
            return userAccounts;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateAccount(userName, accountId, data){
        try{
            const user = await db.User.findOne({
                where: {
                    email: userName
                }
            });
            const modifiedAccount = await db.Account.update(
                {
                    ...data,
                },
                {
                    where: {
                        userId: user.id,
                        id: accountId
                    }
                }
            )
            return modifiedAccount;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteAccount(userName, accountId){
        try{
            const user = await db.User.findOne({
                where: {
                    email: userName
                }
            });
            const deletedAccount = await db.Account.destroy({
                where: {
                    userId: user.id,
                    id: accountId
                }
            })
            console.log(deletedAccount);
            return;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

const account = new Account();

module.exports = account;
