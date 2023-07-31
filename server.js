import sequelize from './app/config/db.config.js';
import './app/models/index.js';
import userController from './app/controllers/user.controller.js';
import bootcampController from './app/controllers/bootcamp.controller.js';

const users = [
    { firstName: "Mateo", lastName: "Díaz", email: "mateo.diaz@correo.com" },
    { firstName: "Santiago", lastName: "Mejías", email: "santiago.mejias@correo.com" },
    { firstName: "Lucas", lastName: "Rojas", email: "lucas.rojas@correo.com" },
    { firstName: "Facundo", lastName: "Fernandez", email: "facundo.fernandez@correo.com" }
]

const bootcamps = [
    {
        title: "Introduciendo El Bootcamp De React.",
        cue: 10,
        description: "React es la librería más usada en JavaScript para el desarrollo de interfaces."
    },
    {
        title: "Bootcamp Desarrollo Web Full Stack.",
        cue: 12,
        description: "Crearás aplicaciones web utilizando las tecnologías y lenguajes más actuales y populares, como: JavaScript, nodeJS, Angular, MongoDB, ExpressJS."
    },
    {
        title: "Bootcamp Big Data, Inteligencia Artificial & Machine Learning.",
        cue: 18,
        description: "Domina Data Science, y todo el ecosistema de lenguajes y herramientas de Big Data, e intégralos con modelos avanzados de Artificial Intelligence y Machine Learning."
    }
]

const bootcampsUsers = [
    { bootcampIndex: 0, usersIndexes: [0, 1] },
    { bootcampIndex: 1, usersIndexes: [0] },
    { bootcampIndex: 2, usersIndexes: [0, 1, 2] }
]

sequelize
    .sync({ force: true, alter: true })
    // .sync()
    // .then(async () => {

    //     const all = await userController.findAll()
    //     console.log(all)
    // })
    .then(async () => {
        console.log("BD sincronizada");

        /**
         *
         */
        const usersDB = []
        for (const newUser of users) {
            const user = await userController.createUser(newUser)
            usersDB.push(user.id)
            console.log(user)
        }

        /**
         *
         */
        const bootcampsDB = []
        for (const newBootcamp of bootcamps) {
            const bootcamp = await bootcampController.createBootcamp(newBootcamp)
            bootcampsDB.push(bootcamp.id)
            console.log(bootcamp)
        }

        /**
         *
         */
        for (const { bootcampIndex, usersIndexes } of bootcampsUsers) {
            for (const userIndex of usersIndexes) {
                const bootcampUser = await bootcampController.addUser({
                    bootcampId: bootcampsDB[bootcampIndex],
                    userId: usersDB[userIndex]
                })
                console.log(bootcampUser)
            }
        }

    })
