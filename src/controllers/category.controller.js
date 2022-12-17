const db = require('../db/models');

class Category{
    async createCategory(userId, categoryName){
        try{
            console.log(categoryName);
            const newCategory = await db.Category.create({
                name: categoryName
            });
            const user = await db.User.findOne({where: {id: userId}});
            newCategory.addUser(user);
            return newCategory;
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async deleteCategory(categoryID){
        try{
            const isUserCategoryDeleted = await db.UserCategory.destroy({
                where: {
                    categoryId: categoryID
                }
            })
            const isCategoryDeleted = await db.Category.destroy({
                where: {
                    id: categoryID
                }
            });
            if(isUserCategoryDeleted === 0 || isCategoryDeleted === 0) throw new Error("Category wasn't Deleted")
        }catch(error){
            console.log(error);
            throw error;
        }
    }

    async updateCategory(categoryId, categoryName){
        try{
            const isModified = await db.Category.update(
                {
                    name: categoryName,
                },
                {
                    where: {
                        id: categoryId,
                    }
                }
            )
            if(isModified[0]===0) throw new Error('Category wasn`t modified');
            return;
        }catch(error){
            console.log(error);
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
            console.log(error);
            throw error;
        }
    }
}

const category = new Category();

module.exports = category;