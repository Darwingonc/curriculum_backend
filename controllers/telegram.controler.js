import {Telegraf} from "telegraf";

class TelegramController{

    async sendTelegramMessages(req, res){
        console.log('SendTelegramMessage', req.body);
        console.log('bot token', process.env.BOT_TOKEN);
        const body = req.body;
        const message = body.message;
        try{
            const bot = new Telegraf(process.env.BOT_TOKEN);

            console.log('bot', bot);

            await bot.telegram.sendMessage( 645447466, message);

            return res.status(200).send({
                ok: true,
                data: null
            });
        }catch (e) {
            console.log('Error on Telegram Bot', e);
            return res.status(400).send({
                ok: false,
                data: null
            });
        }
    }

}
export const telegramController = new TelegramController();
