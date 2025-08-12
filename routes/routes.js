import express from "express";
import {userController} from '../controllers/user.controller.js'
import {validateToken} from "../middlewares/accessToken.middleware.js";
import {telegramController} from "../controllers/telegram.controler.js";



export class  Routes   {

    routes(app =  express.application)  {
        app.get('/', (req, res) => {
            res.send(" hola mundo");
        }) ;

         app.route('/find_user', userController.find)
             .post([validateToken.validateJWT], userController.find);

         //RUTAS PERFILES

        app.route('/login').post(userController.login);

        app.route('/registro').post(userController.registros);

        app.route('/encontrar_perfil').post(userController.encontrarPerfiles)

        app.route('/actualizar_perfil').patch([validateToken.validateJWT], userController.actualizarPerfiles);

         //RUTAS HABILIDADES

         app.route('/crear_habilidades').post([validateToken.validateJWT], userController.crearHabilidades);

         app.route('/encontrar_habilidades').post(userController.encontrarHabilidades);

        app.route('/actualizar_habilidades').patch([validateToken.validateJWT], userController.actualizarHabilidades);

        app.route('/eliminar_habilidades').post([validateToken.validateJWT], userController.eliminarHabilidades);

         //RUTAS EDUCACION

         app.route('/crear_educacion').post([validateToken.validateJWT], userController.crearEducaciones);

        app.route('/encontrar_educaciones').post(userController.encontrarEducaciones);

        app.route('/actualizar_educaciones').patch([validateToken.validateJWT], userController.actualizarEducaciones);

        app.route('/eliminar_educaciones').post([validateToken.validateJWT], userController.eliminarEducaciones);

         //RUTAS EXPERIENCIA

         app.route('/crear_experiencia').post([validateToken.validateJWT], userController.crearExperiencias);

         app.route('/encontrar_experiencias').post(userController.encontrarExperiencias);

         app.route('/actualizar_experiencias').patch([validateToken.validateJWT], userController.actualizarExperiencias);

         app.route('/eliminar_experiencias').post([validateToken.validateJWT], userController.eliminarExperiencias);

        app.post('/mensajes', telegramController.sendTelegramMessages);

    }
}
