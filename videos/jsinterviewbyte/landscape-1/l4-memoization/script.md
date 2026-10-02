## Hook
SAM: What is memoization?
BYTE: It means remembering the result of a function call, so the same call never has to be worked out twice.

## Idea
BYTE: Think of a calculator with a notepad. Before calculating, check the notepad. If the answer is there, just read it.

## Code
BYTE: Here is a function, [square|square|c]. It prints compute, whenever it really does the work.
BYTE: The [memo|memo|c] function wraps it. It creates a cache, a [Map|map|c], that lives in a closure.
BYTE: Inside, it first asks: does the cache already have this input? If {true}, return the saved answer.
BYTE: Otherwise, run the real function, save the result in the cache, and return it.

## Run
BYTE: Call it with nine. A cache miss. It prints compute, and returns eighty one.
BYTE: Call it with nine again. A cache hit. No compute, same answer, instantly.
BYTE: Now four. A new input, so a miss. Compute, sixteen.

## Fibonacci
SAM: When does it really matter?
BYTE: Recursion. Fibonacci of twenty, done the plain way, calls the function twenty one thousand, eight hundred and ninety one times.
BYTE: With a cache, the same answer takes just twenty one calls.

## Caveat
BYTE: The trade is memory for speed.
BYTE: Use it only for pure functions, which always return the same output for the same input.

## Wrap
SAM: So, check the notepad first.
BYTE: Exactly. A closure for the cache, and a pure function inside.
