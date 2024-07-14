import cors from 'cors';
import Debug from 'debug';
import express from 'express';
// TODO : need to add
import connectPgSimple from 'connect-pg-simple';
import dbClient from './models/client.js';

// Suppression de l'importation inutile de express-session
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import passportConfig from './middlewares/passportConfig.js';
import userDocImplementation from './middlewares/swagger.doc.js';
import router from './routers/index.router.js';

const debug = Debug('WeekAway:app:index');
const app = express();
const oneMonthInMs = 30 * 24 * 60 * 60 * 1000;
app.use(cookieParser());

const allowedOrigins = process.env.CORSORIGIN.split(',');

const corsOptionsDelegate = (req, callback) => {
  let corsOptions;
  const origin = req.header('Origin');

  if (allowedOrigins.includes(origin)) {
    corsOptions = {
      origin: true,
      credentials: true,
    };
  } else {
    corsOptions = {
      origin: false,
    };
  }

  callback(null, corsOptions);
};

app.use(cors(corsOptionsDelegate));

app.options('*', cors(corsOptionsDelegate));

userDocImplementation(app);
app.use('/static', express.static('uploads'));

app.use((req, res, next) => {
  if (req.originalUrl === '/api/webhook') {
    next();
  } else {
    return express.json()(req, res, next);
  }
});

app.use(express.urlencoded({ extended: true }));
const PgSession = connectPgSimple(session);

// Session
app.use(
  session({
    store: new PgSession({
      pool: dbClient.originalClient, // Utilisation du pool importé de client.js
      tableName: 'session', // Nom de la table pour les sessions
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: oneMonthInMs }, // Durée de vie du cookie
  }),
);

// Passport middleware
passportConfig(passport);
app.use(passport.initialize());

app.use(passport.session());

// Routes
app.use(router);

export default app;
