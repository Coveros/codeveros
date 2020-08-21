jest.unmock('@coveros/codeveros-ms');

const routes = require('../src/lib/routes');
const controller = require('../src/lib/controller');
const { defaultController } = require('@coveros/codeveros-ms');

describe('Routes', () => {
  test('The expected number of routes exist', () => {
    expect(routes.length).toEqual(7);
  });

  test('Query users route is correctly configured', () => {
    const path = 'GET /user';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.find);
  });

  test('Find one user route is correctly configured', () => {
    const path = 'GET /user/:id';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.findOne);
  });

  test('Create user route is correctly configured', () => {
    const path = 'POST /user';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.create);
  });

  test('Update user route is correctly configured', () => {
    const path = 'PUT /user/:id';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.update);
  });

  test('Delete user route is correctly configured', () => {
    const path = 'DELETE /user/:id';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.deleteOne);
  });

  test('Login route is correctly configured', () => {
    const path = 'POST /user/login';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(controller.login);
  });

  test('Logout route is correctly configured', () => {
    const path = 'POST /user/logout';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(controller.logout);
  });
});
