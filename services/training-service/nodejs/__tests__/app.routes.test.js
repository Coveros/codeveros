jest.unmock('@coveros/codeveros-ms');

const routes = require('../src/lib/routes');
const { defaultController } = require('@coveros/codeveros-ms');

describe('Routes', () => {
  test('Find one route is correctly configured', () => {
    const path = 'GET /training/:id';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.findOne);
  });

  test('Query route is correctly configured', () => {
    const path = 'GET /training';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.find);
  });

  test('Create route is correctly configured', () => {
    const path = 'POST /training';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.create);
  });

  test('Update route is correctly configured', () => {
    const path = 'PUT /training/:id';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.update);
  });

  test('Delete route is correctly configured', () => {
    const path = 'DELETE /training/:id';
    const foundRoute = routes.find(route => route.path === path);
    expect(foundRoute.path).toBe(path);
    expect(foundRoute.action).toEqual(defaultController.deleteOne);
  });
});
