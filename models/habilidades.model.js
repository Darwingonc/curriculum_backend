import  {Model, DataTypes} from "sequelize";
import {DatabaseConfig} from "../config/database.js";

export class HabilidadesModel extends Model {}

HabilidadesModel.init( {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            comment: "null",
            autoIncrement: true
        },
        id_perfil: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nombre_habilidades:  {
            type: DataTypes.STRING(40) ,
            allowNull: true
        },
        porcentage:  {
            type: DataTypes.INTEGER,
            allowNull: true
        },
    }, {
        sequelize: DatabaseConfig,
        tableName: 'habilidades',
        timestamps: false
    }
);
