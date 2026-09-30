## Hook
SAM: What is a closure in JavaScript?
BYTE: A closure is a function that remembers the variables around it, even after the outer code has finished.
BYTE: That sounds abstract. So let us watch one happen.

## Scope
BYTE: First, a quick idea. Every {function} gets its own private box of variables. That box is called its scope.
BYTE: Normally, when the function finishes, the box is thrown away. And the variables inside are gone.

## Counter
BYTE: Look at [makeCounter|make counter|c]. It creates a variable with {let}, called [count|count|c], starting at zero. Then it will {return} an inner function.
BYTE: The outer function ends, so its box should vanish. But the inner function still needs [count|count|c].
BYTE: So JavaScript keeps the box alive, and attaches it to the inner function, like a backpack. That backpack is the closure.

## Calls
BYTE: Now call [counter|counter|c]. It opens the backpack, adds one to [count|count|c], and returns one.
BYTE: Call it again, and the same backpack is used. Now [count|count|c] is two.
BYTE: Make a second counter, and it gets a brand new backpack. Its count starts again at one.
BYTE: And outside code cannot touch a backpack. Asking for [typeof|type of|c] count gives undefined.

## Loop trap
SAM: What about the famous loop question?
BYTE: With {var}, the loop has just one shared variable, named [i|i|c]. All three timers hold the same backpack.
BYTE: When the timers finally run, the loop has finished, and [i|i|c] is three. So you see three, three, three.
BYTE: With {let}, every turn of the loop gets its own fresh variable. Each timer keeps its own copy: zero, one, two.

## Factory
SAM: Where would I use this in real code?
BYTE: In function factories. [makeAdder|make adder|c] remembers the number you gave it.
BYTE: Add five to three is eight. Add ten to three is thirteen. Each function carries its own backpack.

## Wrap
BYTE: Closures give you private state, function factories, and callbacks that remember their context.
SAM: So a closure is a function, plus the backpack of variables it remembers.
BYTE: Exactly. That is your interview answer.
