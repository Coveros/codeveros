const codeverosMs = {
  utils: {
    getModel: jest.fn(),
    loadModel: jest.fn()
  },
  orm: jest.fn(),
  defaultController: {
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    deleteOne: jest.fn(),
    create: jest.fn()
  }
};

module.exports = codeverosMs;
