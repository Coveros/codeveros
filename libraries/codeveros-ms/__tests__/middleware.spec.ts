import * as middleware from '../src/middleware';

describe('Middleware', () => {
  test('should have timer function export', () => {
    expect(middleware).toHaveProperty('timer');
  });
});
