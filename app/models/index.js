import sequelize from "../config/db.config.js";
import Bootcamp from "./bootcamp.model.js";
import User from "./user.model.js";

const BootcampUser = sequelize.define('bootcamps_users')

Bootcamp.belongsToMany(User, { through: BootcampUser })
User.belongsToMany(Bootcamp, { through: BootcampUser })
