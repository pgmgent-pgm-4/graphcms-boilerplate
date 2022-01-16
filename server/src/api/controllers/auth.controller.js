import passport from 'passport';
import jwt from 'jsonwebtoken';

import settings from '../../config/settings';
import { handleHTTPError, HTTPError } from '../../utils';

const login = (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        throw err;
      }

      const userPayload = {
        id: user.id,
        username: user.username,
        email: user.email,
      };

      const token = jwt.sign({ user: userPayload }, settings.JWT_SECRET, {
        expiresIn: settings.JWT_EXPIRE,
      });

      const authenticated = {
        ...userPayload,
        token,
      };

      return res.status(200).json(authenticated);
    } catch (error) {
      console.log(error);
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
