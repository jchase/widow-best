## Install

Install with [npm](https://www.npmjs.com/):

```sh
$ npm install --save widow-best
```

## Usage

```js
import { widowBest } from 'widow-best';

// we want a grid layout with a minimum of 1 column and a maximum of 4 columns
const layout4 = widowBest([1, 4]);

// pretend we have 5 items in an array
const items = [{}, {}, {}, {}, {}];

// to prevent widows, each item should have a width of 1/3 of its grid container.
const gridLayoutPerItem = '1/' + layout4(items.length); // 1/3
```