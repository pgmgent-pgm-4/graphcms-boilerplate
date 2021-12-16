import passport from 'passport';
import jwt from 'jsonwebtoken';

import { handleHTTPError, HTTPError } from '../../utils';

const login = (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        throw new HTTPError(info, 401);
      }     

      const userPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
      }

      const token = jwt.sign(userPayload, 'SECRET', {
        expiresIn: '24h',
      });

      const authenticated = {
        ...userPayload,
        token: token,
      }; 

      return res.status(200).json(authenticated);
    } catch (error) {
      return handleHTTPError(error, next);
    }
  })(req, res, next);
};

// export const logoff = (req, res, next) => {
//   try {
//     // Get query parameters
//     const { itemsPerPage, currentPage } = req.query;
//     // Get users from service
//     const users = dataService.getUsers(itemsPerPage, currentPage);
//     // Send response
//     res.status(200).json(users);
//   } catch (error) {
//     handleHTTPError(error, next);
//   }
// };

export default {
  login,
};
