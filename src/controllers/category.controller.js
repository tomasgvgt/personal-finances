const db = require('../db/models');

class Category{
    async createCategory(userId, name){
        try{
            const newCategory = await db.Category.create({
                name
            });
            const user = await db.User.findOne({where: {id: userId}});
            await newCategory.addUser(user);
            return newCategory;
        }catch(error){
            throw error;
        }
    }

    async deleteCategory(userID, categoryID){
            const isUserCategoryDeleted = await db.UserCategory.destroy({
                where: {
                    categoryId: categoryID,
                    userId: userID
                }
            });
            if(isUserCategoryDeleted === 0){
                const error = new Error('Cant delete category');
                error.name = "ValidationError";
                throw error;
            }
            const isCategoryDeleted = await db.Category.destroy({
                where: {
                    id: categoryID
                }
            });
            if(isCategoryDeleted === 0){
                const error = new Error('Cant delete category');
                error.name = "ValidationError";
                throw error;
            }
    }

    async updateCategory(userID, categoryID, categoryName){
        try{
            const category = await db.UserCategory.findOne({
                where: {
                    categoryId: categoryID,
                    userId: userID
                }
            });
            if(!category){
                const error = new Error('Cant update category');
                error.name = "ValidationError";
                throw error;
            }
            const isModified = await db.Category.update(
                {
                    name: categoryName,
                },
                {
                    where: {id: categoryID},
                }
            )
            if(isModified[0]===0){
                const error = new Error('Cant update category');
                error.name = "ValidationError";
                throw error;
            }
            return;
        }catch(error){
            throw error;
        }
    }

    async getUserCategories(userID){
        try{
            const categoriesFromUser = await db.sequelize.query(
                `SELECT category.id, category.name FROM category
                INNER JOIN user_category ON category.id = user_category.category_id
                INNER JOIN user ON ${userID} = user_category.user_id`
            )
            return categoriesFromUser;
        }
        catch(error){
            throw error;
        }
    }
}

const category = new Category();

module.exports = category;