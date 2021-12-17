import settings from '../../config/settings';
import { handleHTTPError, HTTPError } from '../../utils';

const index = (req, res, next) => {
  res.status(200).send('User Home Route');
};

export default {
  index,
};
