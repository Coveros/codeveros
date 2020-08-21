const { utils } = require('@coveros/codeveros-ms');

exports.login = async ctx => {
  const User = utils.getModel('User');
  const logger = ctx.codeveros.logger;
  const { username, password } = ctx.request.body;

  logger.verbose(`Requesting login from ${username}`);
  if (!username || !password) {
    logger.verbose('Login failed, missing username and/or password');
    ctx.throw(400, 'Missing username or password');
  }

  const user = await User.findOne({ username });
  if (!user || !user.password) {
    logger.error(`Login failed for ${username}, record not found`);
    ctx.throw(401, 'Invalid username or password');
  }
  const isValid = await user.validatePassword(password);
  if (!isValid) {
    logger.error(`Login failed for ${username}, password mismatch`);
    ctx.throw(401, 'Invalid username or password');
  }
  logger.verbose(`Login succeeded for ${username}`);
  ctx.body = user;
};

exports.logout = async ctx => {
  const logger = ctx.codeveros.logger;
  logger.verbose('Logging out');
  // Why does this do nothing? Shouldn't it invalidate the token or something
  ctx.status = 200;
};
