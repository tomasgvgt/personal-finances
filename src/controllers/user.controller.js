const db = require('../db/models');
const hashPassword = require('../auth/hash.auth')

class User {
    async getAllUsers(){
        const allUsers = await db.User.findAll();
        console.log(allUsers);
        return allUsers;
    }
    
    async getUser(userId){
        const user = await db.User.findOne({
            where:
            {
                id: userId
            }
        })
        console.log(user);
        delete user.dataValues.password;
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
        if(isModified[0]===0) throw new Error('User wasn`t modified');
    }

    async deleteUser(userId){
        let isDeleted = await db.User.destroy({
            where:
            {
                id: userId,
            }
        })
        if (isDeleted === 0) throw new Error('User Couldnt be deleted');
        return;
    }
}

const user = new User();

module.exports = user;
