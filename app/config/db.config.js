import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
    'db_bootcamp',
    'postgres',
    'postgres',
    {
        // host: '',
        dialect: 'postgres',
    }
)

export default sequelize;
