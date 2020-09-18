jest.unmock('@coveros/codeveros-ms');

const routes = require('../src/lib/routes');
const controller = require('../src/lib/controller');

describe('Routes', () => {
  test('The expected number of routes exist', () => {
    expect(routes.length).toEqual(2);
  });

  test('Verify route is correctly configured', () => {
    const path = 'POST /auth/verifyToken';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(controller.verifyToken);
  });

  test('Sign route is correctly configured', () => {
    const path = 'POST /auth/signToken';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(controller.signToken);
  });
});
