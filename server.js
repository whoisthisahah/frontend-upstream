var express = require('express'),
    request = require('request'),
    errorHandler = require('errorhandler'),
    app = express();

var HOSTNAME = 'localhost',
    PORT = 8080,
    PUBLIC_DIR = __dirname + '/public_html';

app.use(function (req, res, next) {
    // Здесь нужно написать журналирование в формате
    // (журналирование - вывод в консоль)
    // [время] [номер запроса по счету]
    next();
});

app
    .use('/', express.static(PUBLIC_DIR))
    .use(errorHandler())
    .use('/api/*', function (req, res) {
        var url = 'http://private-4133d4-technopark.apiary-mock.com' + req.originalUrl;
        req.pipe(request(url)).pipe(res);
    });

app.listen(PORT, function () {
    console.log("Simple static server showing %s listening at http://%s:%s", PUBLIC_DIR, HOSTNAME, PORT);
});
