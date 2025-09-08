import express from 'express';
import http from 'http';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import router from './router';
import { setupSwagger } from './config/swagger';

dotenv.config();

const app = express();
app.use(cors({
        credentials : true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
    console.log('Server is running on http://localhost:8080/');
});

const MONGO_URL = process.env.MONGO_URL;

if (!MONGO_URL) {
    throw new Error('MONGO_URL environment variable is not defined');
}

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL)
mongoose.connection.on('error', (error) => {
    console.error('MongoDB connection error:', error);
});
mongoose.connection.on('connected', () => {
    console.log('Successfully connected to MongoDB');
});

// Setup Swagger documentation
setupSwagger(app);

app.use('/', router());