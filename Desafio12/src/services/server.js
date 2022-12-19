import express from 'express';
import mainRouter from'../router/index.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const ttlSeconds = 6000;

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: 'mongodb+srv://IgnacioBastis:bot7JS8kJ2Ts04Ao@cluster0.3ntoz7i.mongodb.net/coderhouse?retryWrites=true&w=majority',
  }),
  secret: 'secretString', 
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: ttlSeconds * 1000,
  },
};

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session(StoreOptions));
app.use('/api', mainRouter);

export default app; 
