const AuthService = require('./authService');
const config = require('../../config')();
const AuthUserWriter = require('../services/auth/authUserWriter');

module.exports = async (req, res, next) => {
  if (
    (!req.headers.authorization ||
      !req.headers.authorization.startsWith('Bearer ')) &&
    !(req.cookies && req.cookies.__session)
  ) {
    const defaultUser =
      config.tokens && config.tokens.defaultUser;

    if (defaultUser) {
      try {
        const authUser = await AuthService.getUserByEmail(
          defaultUser,
        );

        console.log(
          `Authenticated with default user: ${defaultUser}`,
        );

        const currentUser = await AuthUserWriter.findOrCreateFromAuth(
          authUser.uid,
        );

        if (currentUser.disabled) {
          throw new Error(
            `User '${currentUser.email}' is disabled`,
          );
        }

        req.currentUser = currentUser;

        return next();
      } catch (error) {
        console.error(
          `Error while authenticating with default user: ${defaultUser}:`,
          error,
        );

        res.status(403).send('Unauthorized');
        return;
      }
    }

    return next();
  }

  let idToken;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer ')
  ) {
    // Read the ID Token from the Authorization header.
    idToken = req.headers.authorization.split('Bearer ')[1];
  } else if (req.cookies) {
    // Read the ID Token from cookie.
    idToken = req.cookies.__session;
  } else {
    return next();
  }

  try {
    const { uid } = await AuthService.verifyIdToken(
      idToken,
    );

    const currentUser = await AuthUserWriter.findOrCreateFromAuth(
      uid,
    );

    if (currentUser.disabled) {
      throw new Error(`User '${currentUser.email}' is disabled`);
    }

    req.currentUser = currentUser;

    return next();
  } catch (error) {
    console.error(
      'Error while verifying Firebase ID token:',
      error,
    );

    res.status(403).send('Unauthorized');
  }
};
