import fs from 'fs';
import jwt from 'jsonwebtoken';
import {JsonResponse} from "../enums/jsonResponse.js";
import Cryptr from "cryptr";


export class validateToken {

    static validateJWT(req, res, next){
        const token = req.get('Authorization');

        if (!token) {
            return res.status(JsonResponse.UNAUTHORIZED).json({
                ok: false,
                errors: [{ message: 'No existe token de autenticación.' }]
            });
        }

        try{
            let public_key = null;
            let cryptr = new Cryptr(process.env.CRYPTR_KEY)

            if (process.env.MODE != 'dev'){
                public_key = fs.readFileSync(process.env.PUBLIC_KEY, 'utf8')
            } else {
                public_key = fs.readFileSync('./keys/public.pem', 'utf8')
            }

            let decoded = jwt.verify(token, public_key);

            if (!decoded.id) {
                return res.status(JsonResponse.FORBIDDEN).json({
                    ok: false,
                    errors: [{ message: 'No tienes la autenticación necesaria' }]
                })
            }
            // Decrypt the user ID
            let id = cryptr.decrypt(decoded.id);

            req.body.id_token = +id;

        } catch (e) {
            return res.status(JsonResponse.UNAUTHORIZED).json({
                ok: false,
                errors: [{ message: 'Existe el siguiente problema con la cabecera: ' + e}]
            });
        }
        next();
    }

    static middelwareRunning(request, response, next){
        console.log(request.body);
        console.log('middleware running');
        next();
    }

}
