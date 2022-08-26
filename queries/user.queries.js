 import {UserModel} from "../models/user.model.js"
 import {HabilidadesModel} from "../models/habilidades.model.js";
 import {EducacionModel} from "../models/educacion.model.js";
 import {ExperienciaModel} from "../models/experiencia.model.js";


 class UserQueries {

    async perfil( user ){
         try    {
             const query  = await UserModel.create(user) ;
             if (query) {
                 return {ok: true, data: query};
              }
         }catch (e) {
                console.log(' error  al ejecutar query',e );
                return {ok: false, data: null  }
         }
     }

     //CRUD PERFIL

     async registro(user){
         try    {
             const query  = await UserModel.create(user) ;
             if (query) {
                 return {ok: true, data: query};
             }
         }catch (e) {
             console.log(' error  al ejecutar query',e );
             return {ok: false, data: null  }
         }
     }

     async encontrarPerfil(condition = {}){
         try {
             const query = await UserModel.findOne({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async actualizarPerfil(condition = {}){
         try {
             const query = await UserModel.update({
                 nombre: condition.nombre,
                 apellido: condition.apellido,
                 telefono: condition.telefono,
                 correo: condition.correo,
                 nacimiento: condition.nacimiento,
                 genero: condition.genero,
                 nacionalidad: condition.nacionalidad,
                 ocupacion: condition.ocupacion,
                 descripcion: condition.descripcion,
                 pais: condition.pais,
                 estado: condition.estado,
                 ciudad: condition.ciudad
             },{ where: {
                     id: condition.id,
                 }});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }


     // CRUD DE HABILIDADES
     async crearHabilidad( user ){
         try    {
             const query  = await HabilidadesModel.create(user) ;
             if (query) {
                 return {ok: true, data: query};
             }
         }catch (e) {
             console.log(' error  al ejecutar query',e );
             return {ok: false, data: null  }
         }
     }

     async encontrarHabilidad(condition = {}){
         try {
             const query = await HabilidadesModel.findAll({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async actualizarHabilidad(condition = {}){
         try {
             const query = await HabilidadesModel.update({
                 nombre_habilidades: condition.nombre_habilidades,
                 porcentage: condition.porcentage
             },{ where: {
                     id: condition.id,
                     id_perfil: condition.id_perfil
                 }});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async eliminarHabilidad(condition = {}){
         try {
             const query = await HabilidadesModel.destroy({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     // CRUD DE EDUCACION

     async crearEducacion( user ){
         try    {
             const query  = await EducacionModel.create(user) ;
             if (query) {
                 return {ok: true, data: query};
             }
         }catch (e) {
             console.log(' error  al ejecutar query',e );
             return {ok: false, data: null  }
         }
     }

     async encontrarEducacion(condition = {}){
         try {
             const query = await EducacionModel.findAll({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async actualizarEducacion(condition = {}){
         try {
             const query = await EducacionModel.update({
                 nombre_escuela: condition.nombre_escuela,
                 nivel: condition.nivel,
                 descripcion: condition.descripcion,
                 pais: condition.pais,
                 estado: condition.estado,
                 ciudad: condition.ciudad,
                 fecha_inicio: condition.fecha_inicio,
                 fecha_final: condition.fecha_final
             },{ where: {
                     id: condition.id,
                     id_perfil: condition.id_perfil
                 }});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async eliminarEducacion(condition = {}){
         try {
             const query = await EducacionModel.destroy({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }


     // CRUD DE EXPERIENCIAS

     async crearExperiencia( user ){
         try    {
             const query  = await ExperienciaModel.create(user) ;
             if (query) {
                 return {ok: true, data: query};
             }
         }catch (e) {
             console.log(' error  al ejecutar query',e );
             return {ok: false, data: null  }
         }
     }

     async encontrarExperiencia(condition = {}){
         try {
             const query = await ExperienciaModel.findAll({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async actualizarExperiencia(condition = {}){
         try {
             const query = await ExperienciaModel.update({
                 nombre_trabajo: condition.nombre_trabajo,
                 descripcion: condition.descripcion,
                 lugar: condition.lugar,
                 pais: condition.pais,
                 estado: condition.estado,
                 ciudad: condition.ciudad,
                 fecha_inicio: condition.fecha_inicio,
                 fecha_final: condition.fecha_final
             },{ where: {
                     id: condition.id,
                     id_perfil: condition.id_perfil
                 }});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async eliminarExperiencia(condition = {}){
         try {
             const query = await ExperienciaModel.destroy({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }


     async find(condition={}) {
         try {
             const query = await UserModel.findAll({ where: condition } );
             console.log(query, 'query del find');
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }

     async findOne(condition = {}){
         try {
             const query = await UserModel.findOne({ where: condition});
             if(query) {
                 return { ok: true, data: query };
             }
         } catch (e) {
             console.log('Error al ejecutar query', e);
             return { ok: false, data: null };
         }
     }
 }

 export const userQueries = new UserQueries();
