import settings from '../../config/settings';
import { handleHTTPError, HTTPError } from '../../utils';

const index = (req, res, next) => {
  res.status(200).json(req.user);
};

export default {
  index,
};
