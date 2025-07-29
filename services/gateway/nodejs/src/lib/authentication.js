module.exports = opts => {
  async function signToken (payload) {
    try {
      const tokenRes = await fetch(`${opts.authServiceUrl}/api/auth/signToken`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ payload })
      });
      if (!tokenRes.ok) {
        console.log(`Error received attempting to sign JWT token: ${tokenRes.status}-${tokenRes.statusText}`);
        return;
      }
      const data = await tokenRes.json();
      if (!data?.token) {
        console.log('Failed to retrieve JWT from Auth Service');
      } else {
        return data.token;
      }
    } catch (err) {
      console.error('Failed to obtain JWT', err);
    }
  }

  const Authentication = {};

  Authentication.register = async (req, res) => {
    const { username } = req.body;

    const sendError = ({ status = 500, msg = 'Failed to register' } = {}) => {
      console.log(`Sending Registration Error Response: ${status} - ${msg}`);
      return res.status(status).send(msg);
    };

    console.log(`Attempting to register ${username}`);

    let createUserRes;
    try {
      createUserRes = await fetch(`${opts.userServiceUrl}/api/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body)
      });
    } catch (err) {
      console.error('Failed to create user record in User service: ', err);
      return sendError();
    }

    if (!createUserRes.ok) {
      console.log('Error received attempting to create user record: ' +
        `${createUserRes.status}-${createUserRes.statusText}`);
      return sendError();
    }

    const user = await createUserRes.json();

    if (!user?._id) {
      console.log('Failed attempting to create user record, did not receive the created user.');
      return sendError();
    }

    const token = await signToken({ _id: user._id });

    if (!token) {
      return sendError({ msg: 'Created User, but unable to sign token.' });
    }

    console.log(`Registration completed for ${username}`);
    res.status(200).send({ token, user });
  };

  Authentication.login = async (req, res) => {
    const sendLoginError = () => res.status(401).send('Invalid username or password');

    const { username, password } = req.body;

    if (!username || !password) {
      console.log('login attempted, missing username or password field');
      return res.status(400).send('Missing username or password');
    }

    try {
      const loginRes = await fetch(`${opts.userServiceUrl}/api/user/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!loginRes.ok) {
        console.log(`Failed on login: ${username}, received ${loginRes.status}`);
        return sendLoginError();
      }

      const userData = await loginRes.json();

      if (!userData?._id) {
        console.log(`User not returned with login for ${username}`);
        return sendLoginError();
      }

      const token = await signToken({ _id: userData._id });
      if (!token) {
        return res.status(500).send('Unable to sign token');
      }

      // return token and user information to user
      res.status(200).send({ token, user: userData });
    } catch (err) {
      console.error(`Error logging in for ${username}: `, err);
      return sendLoginError();
    }
  };

  Authentication.logout = (req, res) => {
    // call authservice invalidate token
    res.status(200).send();
  };

  Authentication.verifyToken = async (req, res, next) => {
    const sendTokenError = () => res.status(401).send('Unable to verify token');

    const authHeader = req.get('Authorization');

    if (!authHeader) {
      return sendTokenError();
    }

    const splitAuth = authHeader.split(' ');
    if (Array.isArray(splitAuth) && splitAuth.length >= 2 && splitAuth[0] === 'Bearer') {
      try {
        const tokenRes = await fetch(`${opts.authServiceUrl}/api/auth/verifyToken`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token: splitAuth[1] })
        });

        if (tokenRes.ok) {
          const jwtPayload = await tokenRes.json();
          if (jwtPayload) {
            req.jwtPayload = jwtPayload;
            return next();
          }
        }
        return sendTokenError();
      } catch (err) {
        return sendTokenError();
      }
    } else {
      return sendTokenError();
    }
  };

  Authentication.loggedin = async (req, res) => {
    if (!req.jwtPayload) {
      return res.status(200).send();
    }

    try {
      const userRes = await fetch(`${opts.userServiceUrl}/api/user/${req.jwtPayload._id}`);

      if (!userRes.ok) {
        console.log('Failed to retrieve user from JWT');
        return res.status(200).send();
      }

      const user = await userRes.json();

      if (!user?._id) {
        console.log('Failed to retrieve user from JWT');
        return res.status(200).send();
      }

      return res.status(200).send(user);
    } catch (err) {
      console.error('Error retrieving user from JWT: ', err);
    }
  };

  return Authentication;
};
