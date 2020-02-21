const express = require('express')
const app = express()
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config/config');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: '500kb' }));
app.use(bodyParser.json({ limit: '500kb' }));


require('./router/router')(app);

const server = app.listen(config.port, function (err) {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.info('App listening on port ' + config.port);
});

function stop() {
    server.close(() => {
        console.info('Server closed');
        process.exit();
    });
}

process.on('SIGINT', () => {
    console.info('Closing server...');

    stop();

    // Force close server after 5 secs
    setTimeout((e) => {
        console.warn('Forcing server close', e);
        process.exit(1);
    }, 5001);
});

module.exports = app;
module.exports.stop = stop;