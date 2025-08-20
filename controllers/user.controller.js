import {request, response} from "express";
import {Payload} from "../helpers/payload.js";
import {Telegraf} from "telegraf";
import bcrypt from "bcrypt";
import {UserQueries} from "../queries/user.queries.js";
import {JsonResponse} from "../enums/jsonResponse.js";
import validator from "validator";
import * as validator_1 from "validator";


class UserController {

    static payload = new Payload()
    static userQueries = new UserQueries()

    async registros (req, res){
        const body = req.body;
        body.password = await bcrypt.hash(body.password, 9);

        const resultado = await UserController.userQueries.registro({
            nombre: body.nombre,
            apellido: body.apellido,
            telefono: body.telefono,
            correo: body.correo,
            password: body.password,
            nacimiento: body.nacimiento,
            genero: body.genero,
            nacionalidad: body.nacionalidad,
            ocupacion: body.ocupacion,
            descripcion: body.descripcion,
            pais: body.pais,
            estado: body.estado,
            ciudad: body.ciudad
        })

        if(resultado.ok === false){
            return res.status(JsonResponse.INTERNAL_SERVER_ERROR).json({ok: false, message: 'Error del servidor al registrar usuario'});
        }

        if(resultado.ok){
            try {
                const token = UserController.payload.createToken(resultado.data);
                return res.status(JsonResponse.OK).send({
                    ok: true,
                    token: token,
                    data: resultado.data
                });
            } catch (e){
                return res.status(JsonResponse.INTERNAL_SERVER_ERROR).send({
                    ok: false,
                    mensaje: 'Error del servidor al generar token, inicie sesion',
                });
            }
        } else {
            return res.status(JsonResponse.INTERNAL_SERVER_ERROR).send({
                ok: false,
                mensaje: 'Error al crear usuario, intente de nuevo',
            });
        }
    }

    async login(req, res){
        const errors = [];
        const body = req.body;

        let correo = (body.correo == null || validator.isEmpty(body.correo) === true) ?
            (errors.push({ message: 'El correo electrónico es obligatorio.' }), null) : body.correo;

        let password = (body.password == null || validator.isEmpty(body.password) === true) ?
            (errors.push({ message: 'La contraseña es obligatorio.' }), null) : body.password;

        if (correo != null && !validator.isEmail(correo)) {
            errors.push({ message: 'Favor de respetar la nomemclatura del correo electrónico.' })
        }

        if (errors.length > 0) {
            return res.status(JsonResponse.BAD_REQUEST).json({ ok: false, errors });
        }

        const result = await UserController.userQueries.findOne({
            correo: body.correo,
        });

        if (result.ok === false) {
            return res.status(JsonResponse.INTERNAL_SERVER_ERROR).json({ ok: false,
                errors: [{ message: 'Error interno al buscar el usuario.' }]
            });
        }

        if (!result.data) {
            return res.status(JsonResponse.NOT_FOUND).json({
                ok: false,
                errors: [{ message: 'Usuario no encontrado.' }]
            });
        }

        const validPassword = bcrypt.compareSync(password, result.data.password);

        if (!validPassword) {
            return res.status(JsonResponse.BAD_REQUEST).json({
                ok: false,
                errors: [{ message: 'Credenciales inválidas.' }]
            });
        }

        const tokenResult = UserController.payload.createToken({ id: result.data.id });

        if (tokenResult.ok === false) {
            return res.status(JsonResponse.INTERNAL_SERVER_ERROR).json({
                ok: false,
                errors: [{ message: 'Error al generar token.' }]
            });
        }

        return res.status(JsonResponse.OK).json({
            ok: true,
            message: 'Usuario inició sesión exitosamente',
            token: tokenResult.data,
            data: result.data
        });
    }

    //CRUD PERFILES
    async encontrarPerfil (req, res){
        const user_id = req.body.id_token;
        const query = await UserController.userQueries.encontrarPerfil({id: user_id,});
        if (query && query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(JsonResponse.FORBIDDEN).json({ok: false, message: 'Error al buscar datos del perfil'});
        }
    }

    async actualizarPerfiles(req,res) {
        const body = req.body;
        const query = await UserController.userQueries.actualizarPerfil({
            id: body.id,
            nombre: body.nombre,
            apellido: body.apellido,
            telefono: body.telefono,
            correo: body.correo,
            nacimiento: body.nacimiento,
            genero: body.genero,
            nacionalidad: body.nacionalidad,
            ocupacion: body.ocupacion,
            descripcion: body.descripcion,
            pais: body.pais,
            estado: body.estado,
            ciudad: body.ciudad
        });
        if(query.ok){
            return res.status(200).json({ok: true, message: 'Perfil actualizado exitosamente', data: query.data});
        }else{
            return res.status(JsonResponse.BAD_REQUEST).json({ok: false, message: 'No found'});
        }
    }

    // CRUD DE HABILIDADES

    async crearHabilidades (req, response){
        const body = req.body;
        const query =   await UserController.userQueries.crearHabilidad(body) ;
        if ( query.ok) {
            return response.status(200).json({ok: true,  data: query.data});
        }else {
            return   response.status(403).json({ok: false, message: 'error al crear la habilidad'});
        }
    }

    async encontrarHabilidades (req, res){
        const body = req.body;
        const query = await UserController.userQueries.encontrarHabilidad(body.id_perfil);
        if (query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async actualizarHabilidades(req,res) {
        const body = req.body;
        const query = await UserController.userQueries.actualizarHabilidad({
            id: body.id,
            id_perfil: body.id_perfil,
            nombre_habilidades: body.nombre_habilidades,
            porcentage: body.porcentage
        });
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async eliminarHabilidades (req, res){
        const body = req.body;
        const query = await UserController.userQueries.eliminarHabilidad({
            id: body.id,
            id_perfil: body.id_perfil
        });

        if (query && query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }


    // CRUD DE EDUCACION
    async crearEducaciones (req, response){
        const body = req.body;
        const query =   await UserController.userQueries.crearEducacion(body);
        if ( query.ok) {
            return response.status(200).json({ok: true,  data: query.data});
        }else {
            return   response.status(403).json({ok: false, message: 'error en process'});
        }
    }

    async encontrarEducaciones (req, res){
        const body = req.body;
        const query = await UserController.userQueries.encontrarEducacion({
            id_perfil: body.id_perfil,
        });
        if (query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async actualizarEducaciones(req,res) {
        const body = req.body;
        const query = await UserController.userQueries.actualizarEducacion({
            id: body.id,
            id_perfil: body.id_perfil,
            nombre_escuela: body.nombre_escuela,
            nivel: body.nivel,
            descripcion: body.descripcion,
            pais: body.pais,
            estado: body.estado,
            ciudad: body.ciudad,
            fecha_inicio: body.fecha_inicio,
            fecha_final: body.fecha_final,
        });
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async eliminarEducaciones (req, res){
        const body = req.body;
        const query = await UserController.userQueries.eliminarEducacion({
            id: body.id,
            id_perfil: body.id_perfil
        });

        if (query && query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }


    // CRUD DE EXPERIENCIAS

    async crearExperiencias (req, response){
        const body = req.body;
        const query =   await UserController.userQueries.crearExperiencia(body) ;
        if ( query.ok) {
            return response.status(200).json({ok: true,  data: query.data});
        }else {
            return   response.status(403).json({ok: false, message: 'error en process'});
        }
    }

    async encontrarExperiencias (req, res){
        const body = req.body;
        const query = await UserController.userQueries.encontrarExperiencia({
            id_perfil: body.id_perfil,
        });
        if (query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async actualizarExperiencias(req,res) {
        const body = req.body;
        const query = await UserController.userQueries.actualizarExperiencia({
            id: body.id,
            id_perfil: body.id_perfil,
            nombre_trabajo: body.nombre_trabajo,
            descripcion: body.descripcion,
            lugar: body.lugar,
            pais: body.pais,
            estado: body.estado,
            ciudad: body.ciudad,
            fecha_inicio: body.fecha_inicio,
            fecha_final: body.fecha_final,
        });
        if(query.ok){
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    async eliminarExperiencias (req, res){
        const body = req.body;
        const query = await UserController.userQueries.eliminarExperiencia({
            id: body.id,
            id_perfil: body.id_perfil
        });

        console.log('query result', query)
        if (query && query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    /*async sendTelegramMessage(req,res){
        console.log('sendTelegramMessage', req.body);
        console.log('bot token', process.env.BOT_TOKEN)
        try {
            const bot = new Telegraf(process.env.BOT_TOKEN);
            console.log('bot', bot)
            await bot.telegram.sendMessage(5422494858, 'Hello world');
            return res.status(200).send({
                ok: true,
                data: null
            });
        } catch (e){
            console.log('error telegram', e)
            return res.status(400).send({
                ok: false,
                data: null
            })
        }
    }*/

}

export const userController = new UserController();


