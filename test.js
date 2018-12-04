const assert = require('assert');
const createPages = require('./functions/createPages');

Object.freeze(assert);

const bufferedVideos = [];
bufferedVideos.length = 30;

describe('createPages', () => {
  it('Create Pages 1', () => {
    assert.deepEqual(createPages(3, bufferedVideos), 10);
  });
});

describe('createPages', () => {
  it('Create Pages 2', () => {
    assert.deepEqual(createPages(30, bufferedVideos), 1);
  });
});

describe('createPages', () => {
  it('Create Pages 3', () => {
    assert.deepEqual(createPages(1, bufferedVideos), 30);
  });
});

describe('createPages', () => {
  it('Create Pages 4', () => {
    assert.deepEqual(createPages(80, bufferedVideos), 1);
  });
});

describe('createPages', () => {
  it('Create Pages 5', () => {
    assert.deepEqual(createPages(14, bufferedVideos), 3);
  });
});
