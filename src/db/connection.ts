import { Sequelize } from "sequelize"

const sequelize = new Sequelize("healthTrain", "postgres", "123", {
    host: "localhost",
    port: 5432,
    dialect: "postgres"
});

export default sequelize;