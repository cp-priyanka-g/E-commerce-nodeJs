var express = require('express');
var router = express.Router();
var db  = require('../database/config.js');


router.post('/mail', (req, res) => {
    // res.sendFile(path.join(__dirname + '/contact-us.html'));
    //TODO
    //send email here
    const { name, subject, email, text } = req.body;
    console.log('Data: ', req.body);

    sendMail(name, email, subject, text, function(err, data) {
        if (err) {
            res.status(500).json({ message: 'Internal Error' });
        } else {
            res.status({ message: 'Email sent!!!' });
        }
    });
    // res.json({ message: 'Message received!!!' })
});
