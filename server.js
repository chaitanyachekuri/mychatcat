'use strict';

const express = require('express');

const app = express();

const chatCat = require('./app');
const passport = require('passport');

app.set('port', process.env.PORT || 3000);
app.set('views', './views'); //not needed now, but if we want to use a diff folder this is the synt
app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(chatCat.session);// it hsould appear before using routes
app.use(passport.initialize());
app.use(passport.session());
app.use(require('morgan')('combined', {
    stream: {
        write: message => {
            chatCat.logger.log('info', message);
        }
    }
}));

app.use('/', chatCat.router);


chatCat.ioServer(app).listen(app.get('port'), () =>{
    console.log('app running on ', app.get('port'));
});
