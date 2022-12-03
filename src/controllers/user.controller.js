const db = require('../db/models');

class User {
    async getUser(userName){
        const user = await db.User.findOne({
            where:
            {
                email: userName
            }
        })
        console.log(user);
        delete user.dataValues.password;
        return user
    }

    async updateUser(data){
        let user = await db.User.findOne({
            where:
            {
                email: data.userName
            }
        })
        user.set({
            ...user,
            ...data
        })
        user.save();
        delete user.dataValues.password;
        return user
    }

    async deleteUser(userName){
        let data = await db.User.destroy({
            where:
            {
                email: userName
            }
        })
        return data;
    }
}

const user = new User();

module.exports = user;
