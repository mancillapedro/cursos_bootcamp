import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'db_bootcamp',
    'postgres',
    'postgres',
    {
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
    }
)

export default sequelize;
