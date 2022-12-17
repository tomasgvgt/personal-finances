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

    async getAccountsFromUser(userId){
        try{
            const user = await db.User.findOne({
                where: {
                    id: userId,
                },
                include: db.Account
            });
            console.log(user);
            return user;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateAccount(accountId, data){
        try{
            const isModified = await db.Account.update(
                {
                    ...data,
                },
                {
                    where: {
                        id: accountId
                    }
                }
            )
            if (isModified[0] === 0) throw new Error('Account wasn`t modified');
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteAccount(accountId){
        try{
            const isDeleted = await db.Account.destroy({
                where: {
                    id: accountId
                }
            })
            if (isDeleted === 0) throw new Error('Account Couldnt be deleted');
            return;
        }catch(error){
            console.log(error);
            throw error;
        }
    }
}

const account = new Account();

module.exports = account;
