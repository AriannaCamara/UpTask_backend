import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
    origin: function(origin, callback) {
        const whitelist = [process.env.FRONTEND_URL]; // Tu URL de Vercel

        // Permitir peticiones internas con --api
        if(process.argv[2] === '--api') {
            whitelist.push(undefined);
        }

        if(!origin || whitelist.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Error de CORS'));
        }
    },
    credentials: true // necesario si usas cookies o Authorization
};
