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

## Why do I need this?

In design, there are often times you'll want to lay out items into a grid, but the number of items within the grid may vary.

Let's say you've defined a static layout of 6 columns.  Each item would be 1/6 the width of its container.  So far, so good.

```
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │ │     │ │     │
│     │ │     │ │     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘  
```

But then, someone adds a 7th item.  Naturally, the layout would look like this:

```
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │ │     │ │     │
│     │ │     │ │     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
┌─────┐                                        
│     │                                        
│     │  < A widow, all by itself.             
└─────┘                                        
```

It looks even worse if the intended layout is to have items on a new row centered, e.g.:

```
┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
│     │ │     │ │     │ │     │ │     │ │     │
│     │ │     │ │     │ │     │ │     │ │     │
└─────┘ └─────┘ └─────┘ └─────┘ └─────┘ └─────┘
                    ┌─────┐                    
                    │     │                    
                    │     │                    
                    └─────┘                    
```

What's needed to resolve this is for the denominator of each item's width to be dynamic, based on how many items exist within a container.  For instance, given 7 items and an allowed range of 1-6 columns, a more pleasing layout might be in 1/4s:

```
        ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐
        │     │ │     │ │     │ │     │
        │     │ │     │ │     │ │     │
        └─────┘ └─────┘ └─────┘ └─────┘
            ┌─────┐ ┌─────┐ ┌─────┐    
            │     │ │     │ │     │    
            │     │ │     │ │     │    
            └─────┘ └─────┘ └─────┘     
```

If you've ever written code that even remotely looks like this:
```
if (items.length == 2) {
  width = '50%';
} else if (items.length == 3) {
  width = '33.333%';
} else if (items.length == 4) {
  width = '25%';
} else if (items.length == 5) {
  width = '33.333%';
} else if (items.length == 6) {
  width = '33.333%';
}
// etc, etc.
```
You'll instantly know why I wrote this utility :)

## More usage examples

Basic example.  Given a minimum and maximum number of columns, attempt to calculate the best denominator for each item:

```js
// pretend we have 7 items.
const howManyItems = 7;

// we want a layout with a minimum of 1 equal column (meaning, 
// if we only have 1 item, spread that item across the full
// width of the container),
// and a maximum of 6 columns before we need to add new rows.
const denominator = widowBest([1, 6], howManyItems); // => 4
```

`widowBest` accepts 2 arguments, 1) the range (array) of minimum, maximum columns, and 2) the number of items we have.
`widowBest` is curried, so if the 2nd argument is not provided, it will return a function you can call later.

```js
// we don't know how many items we have yet, we just know we want
// columns of 6
const bestLayoutFor6 = widowBest([1, 6]); // returns a function we can call later

// call the function with the number of items we actually have
const denominator = bestLayoutFor6(7); // now returns a number
```

Or, we can just define a layout on-the-fly and call everything at once:

```js
const denominator = widowBest([1, 4], 4); // => 4
```

You may have a situation where you still want empty columns for the first row. In that case:

```js
// we need a minimum of 2 columns, but only have 1 item at this point.
const denominator = widowBest([2, 4], 1); // => 2 - as in, 
// the 1 item would be 1/2 width, and we've have a 2nd empty column / white space.
```

## What's a widow?

In copywriting and print terminology, a "widow" is a single word that, due to a given column spacing and layout, happens to appear on its own line, all by itself.  Designers tend to try to avoid such layouts by either moving the preceding word to the next line as well, or adjusting things like tracking (letter-spacing), etc.
