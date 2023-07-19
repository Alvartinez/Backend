import express from "express";
import cors from "cors";
import routesCourse from "../routers/curso";
import routesPersona from "../routers/persona";
import { Course } from "./curso";
import { Person } from "./persona";
import sequelize from "../db/connection";
export class Server{

    private app: express.Application;
    private port: String;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "3006";   
        this.listen();
        this.middlewares();
        this.routers();
        this.dbConnect();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Aplicación corriendo " + this.port);
        });    
    }

    routers() {
        this.app.use("/api/cursos", routesCourse),
        this.app.use("/api/personas", routesPersona)
    }

    middlewares() {
        //Paseo body
        this.app.use(express.json());

        //Cors
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await sequelize.authenticate();
            console.log("Connection has been established successfully.")
        } catch (error) {
            console.error("Unable to connect to the database ", error);
        }
    }

}