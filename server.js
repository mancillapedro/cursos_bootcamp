import sequelize from './app/config/db.config.js';
import './app/models/index.js';
import userController from './app/controllers/user.controller.js';
import bootcampController from './app/controllers/bootcamp.controller.js';

const userCreation = async () => {
    const
        users = [
            { firstName: "Mateo", lastName: "Díaz", email: "mateo.diaz@correo.com" },
            { firstName: "Santiago", lastName: "Mejías", email: "santiago.mejias@correo.com" },
            { firstName: "Lucas", lastName: "Rojas", email: "lucas.rojas@correo.com" },
            { firstName: "Facundo", lastName: "Fernandez", email: "facundo.fernandez@correo.com" }
        ],
        usersInDB = []

    for (const newUser of users) {
        const user = await userController.createUser(newUser)
        usersInDB.push(user.id)
        console.log('>> Se ha creado el usuario: ', user)
    }

    return usersInDB
}

const bootcampsCreation = async () => {
    const
        bootcamps = [
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
        ],
        bootcampsInDB = []

    for (const newBootcamp of bootcamps) {
        const bootcamp = await bootcampController.createBootcamp(newBootcamp)
        bootcampsInDB.push(bootcamp.id)
        console.log('>> Creado el bootcamp: ', bootcamp)
    }

    return bootcampsInDB
}

const AddUsersToBootcamps = async (users, bootcamps) => {
    const bootcampsUsers = [
        { bootcampIndex: 0, usersIndexes: [0, 1] },
        { bootcampIndex: 1, usersIndexes: [0] },
        { bootcampIndex: 2, usersIndexes: [0, 1, 2] }
    ]

    for (const { bootcampIndex, usersIndexes } of bootcampsUsers) {
        for (const userIndex of usersIndexes) {
            const bootcampUser = await bootcampController.addUser({
                bootcampId: bootcamps[bootcampIndex],
                userId: users[userIndex]
            })
            console.log(
                '\n***************************\n' +
                `Agregado el usuario id=${bootcampUser.userId} al bootcamp con id=${bootcampUser.bootcampId}` +
                '\n***************************\n'
            )
        }
    }
}








sequelize
    .sync({ force: true, alter: true })
    // .sync()
    .then(async () => {
        console.log("BD sincronizada");

        const
            users = await userCreation(), // Creación usuarios
            bootcamps = await bootcampsCreation() // Creación bootcamps 

        await AddUsersToBootcamps(users, bootcamps) // Agregar usuarios a Bootcamps

        // Consultando el Bootcamp por id, incluyendo los usuarios.
        console.log(await bootcampController.findById(1))

        // Listar todos los Bootcamp con sus usuarios.
        console.log(await bootcampController.findAll())

        // Consultar un usuario por id, incluyendo los Bootcamp.
        console.log(await userController.findUserById(1))

        // Listar los usuarios con sus Bootcamp.
        console.log(await userController.findAll())

        // Actualizar el usuario según su id; por ejemplo: actualizar el usuario con id=1 por Pedro Sánchez.
        console.log(await userController.updateUserById(1, { firstName: 'Pedro', lastName: 'Sánchez' }))

        // Eliminar un usuario por id; por ejemplo: el usuario con id=1.
        await userController.deleteUserById(1)

    })
