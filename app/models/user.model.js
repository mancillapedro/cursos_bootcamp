import sequelize from './../config/db.config.js';
import { DataTypes } from 'sequelize';

const User = sequelize.define('users', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true }
    }
})

User.addScope('excludeTimestamp', {
    attributes: { exclude: ['createdAt', 'updatedAt'] },
    include: {
        all: true,
        through: { attributes: [] },
        attributes: { exclude: ['createdAt', 'updatedAt'] }
    }
})

export default User;
