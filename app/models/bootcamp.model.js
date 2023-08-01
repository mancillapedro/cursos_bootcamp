import sequelize from "../config/db.config.js";
import { DataTypes } from "sequelize";

const Bootcamp = sequelize.define('bootcamps', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cue: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 5,
            max: 20
        }
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

Bootcamp.addScope('excludeTimestamp', {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
        all: true,
        through: { attributes: [] },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
})

export default Bootcamp