import https from 'https';
import fs from 'fs';
import app from './app.js';

const options = {
  key: fs.readFileSync('./src/ssl/key.pem'),
  cert: fs.readFileSync('./src/ssl/cert.pem')
};

https.createServer(options, app).listen(3000, () => {
  console.log('Servidor HTTPS rodando na porta 3000');
});