import { expect } from 'chai';
import { widowBest } from './index.js';

describe('widowBest', () => {
  it('should determine the best grid layout denominator given a range', () => {

    const layout4 = widowBest([1, 4]);

    expect(layout4(1)).to.equal(1);
    expect(layout4(2)).to.equal(2);
    expect(layout4(3)).to.equal(3);
    expect(layout4(4)).to.equal(4);

    // once we have more than one row in a grid,
    // everything is divisible by 1, so 
    // we ignore any layouts that might result
    // in 1 column and assume the minimum is 2.
    // (otherwise we don't have a grid,
    // and this entire utility is pointless).
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

    // this is somewhat subjective:
    // there are some cases where it's impossible to NOT have a widow.
    // the remainders of 7 / 2 or 7 / 3 are both 1.
    // in this case, we opt to use the smaller allowed layout
    // (a grid of 2, where a widow is less noticeable, 
    // v.s. a grid of 3, where the widow is more obvious).
    expect(layout3(7)).to.equal(2);

    // another example of a case where it's impossible to NOT have a widow:
    // a layout of 4 and 1009 items, where all the remainders of 
    // 1009 / 2, 1009 / 3, and 1009 / 4 are 1.
    // since 2 columns is an allowed layout in the range, use that.
    expect(layout4(1009)).to.equal(2);

    const layout6 = widowBest([1, 6]);
    expect(layout6(7)).to.equal(4);

    // a more real-world example:
    // we have a bunch of items, and
    // want a layout that spreads no less than 5 per row
    // and no more than 7 across per row.
    const layout5to7 = widowBest([5, 7]);
    expect(layout5to7(5)).to.equal(5);
    expect(layout5to7(6)).to.equal(6);
    expect(layout5to7(7)).to.equal(7);
    expect(layout5to7(8)).to.equal(5);
    expect(layout5to7(15)).to.equal(5);
    expect(layout5to7(23)).to.equal(6);
    expect(layout5to7(57)).to.equal(6);
    expect(layout5to7(89)).to.equal(6);
    expect(layout5to7(101)).to.equal(6);

  });

  it('should respect minimum range', () => {

    const layout4WithMinimum2 = widowBest([2, 4]);
    expect(layout4WithMinimum2(1)).to.equal(2);

  });

  it('should return a function if not all arguments have been provided', () => {

    expect(widowBest).to.be.a('function').with.lengthOf(2);
    expect(widowBest([1, 2])).to.be.a('function').with.lengthOf(1);
    expect(widowBest([1, 2], 2)).to.be.a('number');

  });

});