import { Request, Response } from "express";
import nodemailer from "nodemailer";
import { google } from "googleapis";

export const enviarMensajeInsideServer = async ( usuarioDestino: any, asunto: string ) => {
    
    let mailOptions, info;

    const CLIENTD_ID = "877162813446-785knmt5drhn9urrq3nrmck4jpfme4t6.apps.googleusercontent.com"
    const CLIENT_SECRET = "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"
    const REDIRECT_URI = "https://developers.google.com/oauthplayground"
    const REFRESH_TOKEN = 
    "1//04wQ9rM-g9Nj5CgYIARAAGAQSNwF-L9IruClXXes-upfd7CU7m5TImyphbUOzMe8RZEs6kLjhacuVVQexsnTLphhZ2idDe6vQpRc"
    const oAuth2Client = new google.auth.OAuth2(process.env.CLIENTD_ID || CLIENTD_ID, process.env.CLIENT_SECRET || CLIENT_SECRET, process.env.REDIRECT_URI || REDIRECT_URI);

    oAuth2Client.setCredentials({refresh_token: REFRESH_TOKEN});

    try{

        const accessToken:any = await oAuth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                type: "OAuth2",
                user: "alvaro.martinezudes2@gmail.com",
                clientId: process.env.CLIENTD_ID || CLIENTD_ID,
                clientSecret: process.env.CLIENT_SECRET || CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        switch (asunto) {

            //Cuenta usuario registrado
            case "Usuario registrado":
                mailOptions = {
                    from: "HealthTrain <alvaro.martinezudes2@gmail>",
                    to: usuarioDestino.email,
                    subject: "Cuenta creada exitosamente",
                    html: 
                    `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>HealthTrain - Cuenta creada</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                border: 1px solid #ccc;
                                background-color: #f9f9f9;
                            }
                            .title {
                                font-size: 24px;
                                font-weight: bold;
                                margin-bottom: 10px;
                            }
                            .content {
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
                            .list-item {
                                margin-bottom: 5px;
                                marigin-left: 20px;
                                list-style: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="title">HealthTrain - Cuenta creada</div>
                            <div class="content">
                                <p>
                                  Hola <b> ${usuarioDestino.nombre}</b>,
                                </p>
                                <p>
                                    Tu cuenta de usuario ha sido creada con éxito. Aquí están los detalles de tu cuenta:
                                </p>
                                <ul>
                                  <li class="list-item"><b>Username:</b> ${usuarioDestino.username}</li>
                                  <li class="list-item"><b>Contraseña:</b> ${usuarioDestino.password}</li>
                                </ul>
                            </div>
                        </div>
                    </body>
                    </html>`
                }
        
                info = await transporter.sendMail(mailOptions);
                break;

            //Cuenata docente creada
            case " Cuenta docente creada":
                mailOptions = {
                    from: "HealthTrain <alvaro.martinezudes2@gmail>",
                    to: usuarioDestino.email,
                    subject: "Cuenta docente creada exitosamente",
                    html: 
                    `<!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>HealthTrain - Cuenta creada</title>
                        <style>
                            body {
                                font-family: Arial, sans-serif;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                border: 1px solid #ccc;
                                background-color: #f9f9f9;
                            }
                            .title {
                                font-size: 24px;
                                font-weight: bold;
                                margin-bottom: 10px;
                            }
                            .content {
                                font-size: 16px;
                                margin-bottom: 20px;
                            }
                            .list-item {
                                margin-bottom: 5px;
                                marigin-left: 20px;
                                list-style: none;
                            }
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <div class="title">HealthTrain - Cuenta docente creada</div>
                            <div class="content">
                                <p>
                                  Hola <b> ${usuarioDestino.nombre}</b>,
                                </p>
                                <p>
                                    Tu cuenta de docente ha sido creada con éxito. Aquí están los detalles de tu cuenta:
                                </p>
                                <ul>
                                  <li class="list-item"><b>Username:</b> ${usuarioDestino.username}</li>
                                  <li class="list-item"><b>Contraseña:</b> ${usuarioDestino.password}</li>
                                </ul>
                            </div>
                        </div>
                    </body>
                    </html>`
                }
        
                info = await transporter.sendMail(mailOptions);
                break;

            default:
                break;

        }

        console.log(info);

    }catch(error){
        console.log(error);
    }

}