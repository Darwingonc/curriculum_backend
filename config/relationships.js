import {UserModel} from "../models/user.model.js";
import {HabilidadesModel} from "../models/habilidades.model.js";
import {EducacionModel} from "../models/educacion.model.js";
import {ExperienciaModel} from "../models/experiencia.model.js";


export default class Relationship {
    static init() {


        UserModel.hasMany(HabilidadesModel, {
            foreignKey: 'id_perfil',
            as: 'Habilidades'
        });

        UserModel.hasMany(EducacionModel, {
            foreignKey: 'id_perfil',
            as: 'Educaciones'
        });

        UserModel.hasMany(ExperienciaModel, {
            foreignKey: 'id_perfil',
            as: 'Experiencias'
        });

        HabilidadesModel.belongsTo(UserModel, {
            foreignKey: 'id_perfil',
            as: 'perfil'
        });

        EducacionModel.belongsTo(UserModel, {
            foreignKey: 'id_perfil',
            as: 'perfil'
        });

        ExperienciaModel.belongsTo(UserModel, {
            foreignKey: 'id_perfil',
            as: 'perfil'
        });
    }
}