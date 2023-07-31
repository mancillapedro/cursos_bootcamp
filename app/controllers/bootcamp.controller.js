import Bootcamp from "../models/bootcamp.model.js"
import User from "../models/user.model.js";

export default {
    createBootcamp: async (newBootcamp) => {
        const { title, cue, description } = newBootcamp
        try {
            const bootcamp = await Bootcamp.create({ title, cue, description })
            return bootcamp.dataValues
        }
        catch (error) { return console.log(error.message), null; }
    },

    addUser: async ({ bootcampId, userId }) => {
        try {
            const user = await User.findByPk(userId)
            if (!user) throw new Error(`User id: ${userId} no encontrado`)
            const bootcamp = await Bootcamp.findByPk(bootcampId)
            if (!bootcamp) throw new Error(`Bootcamp id: ${bootcampId} no encontrado`)
            const bootcampUser = await bootcamp.addUser(user)
            return bootcampUser[0].dataValues
        } catch (error) { return console.log(error.message), null; }
    },

    findById: async (bootcampId) => {
        try {
            const bootcamp = await Bootcamp.findByPk(bootcampId, {
                raw: true,
                include: {
                    all: true,
                    through: { attributes: [] }
                }
            })
            if (!bootcamp) throw new Error('Bootcamp no encontrado');
            return bootcamp
        } catch (error) { return console.log(error.message), null; }
    },

    findAll: async () => {
        try {
            return await Bootcamp.findAll({
                include: {
                    all: true,
                    through: { attributes: [] }
                }
            })
        } catch (error) { return console.log(error.message), null; }
    }
}