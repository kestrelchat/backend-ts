import { strict as assert } from 'assert';

describe('example test', () => {
  it('should pass trivially', () => {
    const value = 2 + 2;
    assert.equal(value, 4);
  });

  it('should fail if something is wrong', () => {
    const text = 'kestrel';
    assert.equal(text.toUpperCase(), 'KESTREL');
  });
});
