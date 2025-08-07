import {request , response} from "express";
import {userQueries} from "../queries/user.queries.js";
import {Payload} from "../helpers/payload.js";
import {Telegraf} from "telegraf";
import bcrypt from "bcrypt";


class UserController {

    static payload = new Payload()

    async sayHello(request, response) {
        return response.status(200).json ({
            ok: true,
            message: 'hello'
         } )
     }

    async processData (request, response ){
        const body = request.body ;
        console.log('data from fron t', body);
        return response.status( 403 ).json({ok: true, message: 'data received '});
    }

    async create (req, response){
        const body = req.body;
        const query =   await userQueries.perfil(body) ;
        if ( query.ok) {
            return response.status(200).json({ok: true,  data: query.data});
        }else {
            return   response.status(404).json({ok: false, message: 'error al crear perfil'});
        }
    }


    async find(req, res){
        const body = req.body;
        const condition = body.condition;
        // const id = body.id;
        const query = await userQueries.findOne(condition);
        if (query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    //CRUD PERFILES

    async login(req, res){
        const body = req.body;
        const query = await userQueries.findOne({
            correo: body.correo,
            password: body.password
        });

        if(query && query.ok){
            try {
                const token = UserController.payload.createToken(query.data);
                return res.status(200).send({
                    ok: true,
                    token: token,
                    data: query.data
                });
            } catch (e){
                return res.status(200).send({
                    ok: false,
                    data: null
                });
            }

        } else {
            return res.status(200).send({
                ok: false,
                data: null
            });
        }
    }

    async registros (req, res){
        const body = req.body;
        body.password = await bcrypt.hash(body.password, 8);
        const query =   await userQueries.registro(body);


        if(query.ok){
            try {
                const token = UserController.payload.createToken(query.data);
                return res.status(200).send({
                    ok: true,
                    token: token,
                    data: query.data
                });
            } catch (e){
                return res.status(200).send({
                    ok: false,
                    data: null
                });
            }

        } else {
            return res.status(200).send({
                ok: false,
                data: null
            });
        }
    }

    async encontrarPerfiles (req, res){
        const body = req.body;
        const query = await userQueries.encontrarPerfil({
            id: body.id,
        });
        if (query && query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async actualizarPerfiles(req,res) {
        const body = req.body;
        const query = await userQueries.actualizarPerfil({
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
            return res.status(200).json({ok: true, data: query.data});
        }else{
            return res.status(403).json({ok: false, message: 'No found'});
        }
    }

    // CRUD DE HABILIDADES

    async crearHabilidades (req, response){
        const body = req.body;
        const query =   await userQueries.crearHabilidad(body) ;
        if ( query.ok) {
            return response.status(200).json({ok: true,  data: query.data});
        }else {
            return   response.status(403).json({ok: false, message: 'error al crear la habilidad'});
        }
    }

    async encontrarHabilidades (req, res){
        const body = req.body;
        const query = await userQueries.encontrarHabilidad({
        });
        if (query.ok) {
            return res.status(200).json({ok: true, data: query.data});
        } else {
            return res.status(403).json({ok: false, message: 'Error on process request'});
        }
    }

    async actualizarHabilidades(req,res) {
        const body = req.body;
        const query = await userQueries.actualizarHabilidad({
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
        const query = await userQueries.eliminarHabilidad({
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
        const query =   await userQueries.crearEducacion(body);
        if ( query.ok) {
            return response.status(200).json({ok: true,  data: query.data});
        }else {
            return   response.status(403).json({ok: false, message: 'error en process'});
        }
    }

    async encontrarEducaciones (req, res){
        const body = req.body;
        const query = await userQueries.encontrarEducacion({
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
        const query = await userQueries.actualizarEducacion({
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
        const query = await userQueries.eliminarEducacion({
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
        const query =   await userQueries.crearExperiencia(body) ;
        if ( query.ok) {
            return response.status(200).json({ok: true,  data: query.data});
        }else {
            return   response.status(403).json({ok: false, message: 'error en process'});
        }
    }

    async encontrarExperiencias (req, res){
        const body = req.body;
        const query = await userQueries.encontrarExperiencia({
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
        const query = await userQueries.actualizarExperiencia({
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
        const query = await userQueries.eliminarExperiencia({
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

    async sendTelegramMessage(req,res){
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
    }

}

export const userController = new UserController();


