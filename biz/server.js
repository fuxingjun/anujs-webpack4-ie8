const Koa = require('koa');
const koaStatic = require('koa-static');
const route = require('koa-route');
const path = require('path');
const app = new Koa();
const argv = require('yargs').argv;
const fs = require('fs');

const server = app.listen(8082);
const column = argv.env === 'dev' ? '../devtmp' : '../dist';

app.use(koaStatic(path.resolve(__dirname, column)));

app.use(route.get('/*', (ctx, next) => {
    ctx.type = 'html';
    ctx.body = fs.createReadStream(path.resolve(__dirname, column + '/index.html'));
}));
