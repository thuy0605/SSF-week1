import express from 'express';
import {
  checkToken,
  userDelete,
  userDeleteCurrent,
  userGet,
  userListGet,
  userPost,
  userPut,
  userPutCurrent,
} from '../controllers/userController';
import passport from '../../passport';
import {body, validationResult} from 'express-validator';
import {ContextRunner} from 'express-validator/src/chain';

const router = express.Router();

router
  .route('/')
  .get(userListGet)
  .post(
    body('user_name').notEmpty(),
    body('user_name').isLength({min: 3}),
    body('password').isLength({min: 5}),
    body('email').isEmail(),
    userPost
  )
  .put(passport.authenticate('jwt', {session: false}), userPutCurrent)
  .delete(passport.authenticate('jwt', {session: false}), userDeleteCurrent);

router.get(
  '/token',
  passport.authenticate('jwt', {session: false}),
  checkToken
);

router
  .route('/:id')
  .get(userGet)
  .put(passport.authenticate('jwt', {session: false}), userPut)
  .delete(passport.authenticate('jwt', {session: false}), userDelete);

export default router;
