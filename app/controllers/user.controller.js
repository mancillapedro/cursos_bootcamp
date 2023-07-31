import User from "../models/user.model.js";

export default {

    createUser: async (newUser) => {
        const { firstName, lastName, email } = newUser
        try {
            const user = await User.create({ firstName, lastName, email })
            return user.dataValues
        } catch (error) { return console.log(error.message), null; }
    },

    findUserById: async (userId) => {
        try {
            const user = await User.scope('excludeTimestamp').findByPk(userId)
            if (!user) throw new Error('User no encontrado');
            return JSON.parse(JSON.stringify(user))
        } catch (error) { return console.log(error.message), null; }
    },

    findAll: async () => {
        try {
            const users = await User.scope('excludeTimestamp').findAll()
            return JSON.parse(JSON.stringify(users))
        } catch (error) { return console.log(error.message), null; }
    },

    updateUserById: async (userId, userFields) => {
        const fields = ["firstName", "lastName", "email"]
        try {
            const user = await User.findByPk(userId)
            if (!user) throw new Error(`User no encontrado, id:${userId}`)
            fields.forEach(field => userFields.hasOwnProperty(field) && (user[field] = userFields[field]))
            return await user.save()
        } catch (error) { return console.log(error.message), null; }
    },

    deleteUserById: async (userId) => {
        try {
            const user = await User.findByPk(userId)
            if (!user) throw new Error('User no encontrado')
            await user.destroy()
        } catch (error) { return console.log(error.message), null; }
    }

}