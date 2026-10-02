## Hook
SAM: What is currying?
BYTE: Currying turns one function that takes many arguments, into a chain of functions that each take just one.

## Normal
BYTE: Here is a normal function. It takes three arguments, a, b, and c, and adds them. Call it with one, two, three, and you get six.

## Curried
BYTE: The curried version takes only a, and returns a function.
BYTE: That function takes b, and returns another. The last one takes c, and does the adding.

## Calls
BYTE: Call it with one. You get back a function, waiting for b.
BYTE: Give it two. Another function, waiting for c. Give it three, and you finally get the answer: six.

## Closure
SAM: How does it remember a and b?
BYTE: With closures. Each inner function keeps the arguments of the functions around it, in its backpack.

## Use
BYTE: The payoff is partial application. Fix the first argument once, and reuse the result.
BYTE: [discount|discount|c] takes a percent. Give it ten, and you get a new function, [tenOff|ten off|c].
BYTE: Ten off of two hundred is one eighty. Ten off of fifty is forty five.

## Wrap
BYTE: Currying means one argument at a time, using closures. And partial application is the payoff.
SAM: Got it. One argument, one function.
