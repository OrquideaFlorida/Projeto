
//index.js
(async () => {
    const database = require('../db');
    const Pessoa = require('./cdpessoa');

    try {
        const resultado = await database.sync();
        console.log(resultado);
    } catch (error) {
        console.log(error);
    }
})();