import { expect } from 'chai';
import { widowBest } from './index.js';

describe('widowBest', () => {
  it('should determine the best grid layout denominator given a range', () => {

    const layout4 = widowBest([1, 4]);

    expect(layout4(1)).to.equal(1);
    expect(layout4(2)).to.equal(2);
    expect(layout4(3)).to.equal(3);
    expect(layout4(4)).to.equal(4);
    expect(layout4(5)).to.equal(3);
    expect(layout4(6)).to.equal(3);
    expect(layout4(7)).to.equal(4);
    expect(layout4(8)).to.equal(4);
    expect(layout4(9)).to.equal(3);
    expect(layout4(20)).to.equal(4);
    expect(layout4(40)).to.equal(4);
    expect(layout4(89)).to.equal(3);

    const layout3 = widowBest([1, 3]);

    expect(layout3(1)).to.equal(1);
    expect(layout3(2)).to.equal(2);
    expect(layout3(3)).to.equal(3);
    expect(layout3(4)).to.equal(2);
    expect(layout3(5)).to.equal(3);
    expect(layout3(6)).to.equal(3);
    expect(layout3(7)).to.equal(2);

  });
});