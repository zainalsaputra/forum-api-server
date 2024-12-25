const Hapi = require('@hapi/hapi');

const init = async () => {
    const server = Hapi.Server({
        host: 'localhost',
        port: 3000,
    });

    await server.start();
    console.log('Server running on %s', server.info.uri);

    server.ext('onRequest', (request, h) => {
        if (request.info.remoteAddress === '127.0.0.1') {
            return h.response('You cant make request').code(403).takeover();
        }

        return h.continue;
    });

    server.route({
        method: 'GET',
        path: '/home',
        handler: (request, h) => {
            // if (request.info.remoteAddress === '127.0.0.1') {
            //     return h.response('You cant make request').code(403);
            // }
            return h.response('Selamat Datang di Home').code(200)
        }
    });
};

init();

