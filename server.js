require('dotenv').config();
const express = require('express');
const server = express();
const connectDB = require('./Config/database.config')

connectDB();

server.use(express.urlencoded());
server.use(express.json());
server.use(express.static('./public'));

server.use('/', require('./Routes/index.routes'))
server.use('/admin', require('./Routes/admin.routes'));
server.use('/blog', require('./Routes/blog.routes'));

server.listen(process.env.PORT, () => {
    console.log(`Server Running at Port ${process.env.PORT}`)
})