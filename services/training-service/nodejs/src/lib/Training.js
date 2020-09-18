const { utils, orm } = require('@coveros/codeveros-ms');

const schema = new orm.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    min: 0,
    max: 5,
    required: true
  },
  type: {
    type: String,
    enum: ['presentation', 'workshop', 'course'],
    required: true
  }
}, {
  toJSON: {
    versionKey: false
  }
});

module.exports = utils.loadModel('Training', schema);
