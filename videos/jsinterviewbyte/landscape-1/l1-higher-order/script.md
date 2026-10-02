## Hook
SAM: What is a higher order function?
BYTE: It is a function that works with other functions. Let us see what that means.

## Values
BYTE: In JavaScript, a function is a value, just like a number or a string.
BYTE: You can store it in a variable, put it in an array, and call it later.

## Rule one
BYTE: Rule one. A higher order function can accept a function as an argument.
BYTE: Here [applyTwice|apply twice|c] takes a function, and calls it two times. Double of three is six. Double of six is twelve.
BYTE: The function that you pass in, is called a callback.

## Rule two
BYTE: Rule two. It can return a function.
BYTE: The [multiplier|multiplier|c] function remembers the number three, and hands back a new function.
BYTE: Call that new function with five, and you get fifteen.

## Built in
SAM: Do I already use these?
BYTE: Every day. [map|map|c], [filter|filter|c], and [reduce|reduce|c] are all higher order functions.
BYTE: [map|Map|c] runs your callback on every item, and builds a new array: two, four, six, eight.
BYTE: [filter|Filter|c] keeps only the items where the callback returns {true}.
BYTE: [reduce|Reduce|c] folds the whole array into one value. Here, the sum: ten.

## Wrap
BYTE: A function that neither takes nor returns a function, is called a first order function.
BYTE: So: accepts a function, or returns a function, or both, and it is higher order.
SAM: Got it. Functions in, functions out.
