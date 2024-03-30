/* eslint-disable linebreak-style */
import cors from 'cors';
import Debug from 'debug';
import express from 'express';
// Suppression de l'importation inutile de express-session
import cookieParser from 'cookie-parser';
import session from 'express-session';
import passport from 'passport';

import passportConfig from './middlewares/passportConfig.js';
import userDocImplementation from './middlewares/swagger.doc.js';
import router from './routers/index.router.js';

const debug = Debug('WeekAway:app:index');

passportConfig(passport);

const app = express();

app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  }),
);

userDocImplementation(app);
app.use('/static', express.static('uploads'));

const corsOptions = {
  origin: process.env.CORSORIGIN || 'http://localhost:4200',
  methods: ['GET', 'POST'],
  credentials: true,
};

app.use(cors(corsOptions));

app.use(cookieParser());
// Middleware pour récupérer un body au format JSON
app.use(express.json());
// Possibilité d'utiliser les deux formats (JSON et URL-encoded) dans la même app
app.use(express.urlencoded({ extended: true }));

// Passport middleware pour l'authentification

app.use(passport.initialize());

// Routes
app.use(router);

export default app;
