const db = require('../db/models');
const {hashPassword} = require('../auth/hash.auth');
const { badData } = require('@hapi/boom');

class User {
    async getAllUsers(){
        const allUsers = await db.User.findAll();
        return allUsers;
    }
    
    async getUser(userId){
        const user = await db.User.findOne({
            where:
            {
                id: userId
            }
        })
        delete user.dataValues.password;
        return user
    }
    async getUserByUserName(username){
        const user = await db.User.findOne({
            where: {userName: username}
        });
        return user
    }
    async updateUser(userId, data){
        if(data.password) data.password = await hashPassword(data.password);
        let isModified = await db.User.update({
            ...data
        }, {
            where: {
                id: userId
            }
        })
        if(isModified[0]===0){
            const error = new Error('User not found');
            error.name = "NotFoundError";
            throw error;
        }
    }

    // async deleteUser(userId){
    //     let isDeleted = await db.User.destroy({
    //         where:
    //         {
    //             id: userId,
    //         }
    //     })
    //     if (isDeleted === 0){
    //         const error = new Error('User not found');
    //         error.name = "NotFoundError";
    //         throw error;
    //     }
    //     return;
    // }
}

const user = new User();

module.exports = user;
