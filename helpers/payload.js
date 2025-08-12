import jwt from "jsonwebtoken";
import fs from "fs";
import Cryptr from "cryptr";

export class Payload {

    createToken(data){
        try{
            let private_key = null;

            if (process.env.MODE != 'dev') {
                private_key = fs.readFileSync(process.env.PRIVATE_KEY, 'utf8')
            } else {
                private_key = fs.readFileSync('./keys/private.pem', 'utf8')
            }

            let cryptr = new Cryptr(process.env.CRYPTR_KEY)

            const user_id = cryptr.encrypt((data.id))

            let token = jwt.sign({
                id:user_id
            }, private_key, { algorithm: 'RS256', expiresIn: '9h'})

            return {
                ok: true,
                data: token
            }
        }
        catch (e) {
            console.log('Error al crear token', e);
            return { ok: false }
        }

    }
}

