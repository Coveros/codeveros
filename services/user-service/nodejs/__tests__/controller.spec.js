const controller = require('../src/lib/controller');
const codeverosMs = require('@coveros/codeveros-ms');

describe('Controller', () => {
  let ctx;
  let userMock;

  beforeEach(() => {
    jest.resetModules();
    ctx = {
      params: {},
      body: null,
      request: {
        body: null
      },
      query: {},
      throw: jest.fn((status, msg) => { throw new Error(msg); }),
      codeveros: {
        logger: {
          verbose: jest.fn(),
          error: jest.fn(),
          info: jest.fn()
        }
      }
    };

    userMock = {
      find: jest.fn(),
      findOne: jest.fn(),
      findById: jest.fn(),
      create: jest.fn(),
      findByIdAndUpdate: jest.fn(),
      findByIdAndRemove: jest.fn()
    };
  });

  describe('login', () => {
    test('should throw a 400 error when the username is missing', async () => {
      codeverosMs.utils.getModel.mockReturnValueOnce(userMock);
      ctx.request.body = { password: '123' };
      expect.assertions(1);
      try {
        await controller.login(ctx);
      } catch (e) {}
      expect(ctx.throw).toBeCalledWith(400, 'Missing username or password');
    });

    test('should throw a 400 error when the password is missing', async () => {
      codeverosMs.utils.getModel.mockReturnValueOnce(userMock);
      ctx.request.body = { username: '123' };
      expect.assertions(1);
      try {
        await controller.login(ctx);
      } catch (e) {}
      expect(ctx.throw).toBeCalledWith(400, 'Missing username or password');
    });

    test('should throw a 401 if user not found', async () => {
      userMock.findOne.mockResolvedValueOnce(null);
      codeverosMs.utils.getModel.mockReturnValueOnce(userMock);
      ctx.request.body = { username: '123', password: '123' };
      expect.assertions(1);
      try {
        await controller.login(ctx);
      } catch (e) {}
      expect(ctx.throw).toBeCalledWith(401, 'Invalid username or password');
    });

    test('should throw a 401 if user does not have a password', async () => {
      userMock.findOne.mockResolvedValueOnce({ username: '123' });
      codeverosMs.utils.getModel.mockReturnValueOnce(userMock);
      ctx.request.body = { username: '123', password: '123' };
      expect.assertions(1);
      try {
        await controller.login(ctx);
      } catch (e) {}
      expect(ctx.throw).toBeCalledWith(401, 'Invalid username or password');
    });

    test('should throw a 401 if password is invalid', async () => {
      const actualPassword = '123';
      const submittedPassword = '234';

      const user = {
        username: '123',
        password: actualPassword,
        validatePassword: jest.fn()
      };

      user.validatePassword.mockResolvedValueOnce(false);
      userMock.findOne.mockResolvedValueOnce(user);
      codeverosMs.utils.getModel.mockReturnValueOnce(userMock);
      ctx.request.body = { username: '123', password: submittedPassword };
      try {
        await controller.login(ctx);
      } catch (e) {}
      expect(user.validatePassword).toBeCalledWith(submittedPassword);
      expect(ctx.throw).toBeCalledWith(401, 'Invalid username or password');
    });

    test('should set body to user if login valid', async () => {
      const username = '123';
      const password = '123';

      const user = {
        username,
        password,
        validatePassword: jest.fn()
      };
      user.validatePassword.mockResolvedValueOnce(true);
      userMock.findOne.mockResolvedValueOnce(user);
      codeverosMs.utils.getModel.mockReturnValueOnce(userMock);
      ctx.request.body = { username, password };
      await controller.login(ctx);
      expect(user.validatePassword).toBeCalledWith(password);
      expect(ctx.body).toEqual(user);
    });
  });

  describe('logout', () => {
    test('should return status 200', async () => {
      await controller.logout(ctx);
      expect(ctx.status).toEqual(200);
    });
  });
});
