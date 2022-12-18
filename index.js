import { curryN, sort, find, propEq, descend, prop, compose, head } from 'ramda';

export const widowBest = curryN(2, ([min, max], count) => {
  if (count <= min) return min;
  const possible_remainders = [...[...Array((max+1)-min).keys()].map(i => i+min)].map(candidate => ({ l: candidate, r: (count % candidate) }));
  const perfect = find(propEq('r', 0))(sort(descend(prop('l')))(possible_remainders.filter(d => d.l > 1)));
  if (perfect) return perfect.l;
  return possible_remainders ? compose(head, sort(descend(prop('r'))))(possible_remainders).l : max;
});