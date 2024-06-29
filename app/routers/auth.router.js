import Debug from 'debug';
import { Router } from 'express';
import authController from '../controllers/auth.controller.js';
import controllerWrapper from '../middlewares/controller.wrapper.js';
import validation from '../middlewares/validation.middleware.js';
import * as schemaPost from '../schemas/app.post.schema.js';

const debug = Debug('WeekAway:router:auth');
/**
 * @typedef {object} ResponseError response error
 * @property {string} error the error string
 */

const authRouter = Router();

authRouter.post(
  '/api/login',
  validation(schemaPost.loginSchema, 'body'),
  controllerWrapper(authController.login),
);
/**

POST /api/login
@summary Post login infos to authenticate user
@tags Auth
@param {string} email - email of the user
@param {string} password - password of the user
* @param {UserInputLogin} request.body.required - user infos

*/

authRouter.post(
  '/api/register',
  validation(schemaPost.registerSchema, 'body'),
  controllerWrapper(authController.register),
);

/**
   * POST /api/register
   * @summary Register a new user
   * @tags Auth
   * @param {UserInput} request.body.required - user infos
   * - object with different personnailzed sentence parts

   */

authRouter.post('/api/logout', controllerWrapper(authController.logout));
// authRouter.post('/api/logout', function (req, res, next) {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     }
//     res.send('logout');
//   });
// });
/**
 * GET /api/logout
 * @summary disconnect an user
 * @tags Auth
 */

authRouter.post(
  '/api/contact',
  validation(schemaPost.contactSchema, 'body'),
  controllerWrapper(authController.sendMail),
);
export default authRouter;
