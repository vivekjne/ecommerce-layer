## Hook
SAM: What is a closure in JavaScript?
BYTE: A closure is a function that remembers the variables from the place where it was created.
BYTE: It keeps them even after the outer function has finished. Let us build one.

## Counter
BYTE: The function [makeCounter|make counter] creates a variable called count.
BYTE: It returns an inner function that changes count, and returns it.
BYTE: When [makeCounter|make counter] finishes, you would expect count to disappear.
BYTE: But the inner function still holds a reference to it. That is the closure.
BYTE: Call it once and you get one. Call it again and you get two.
BYTE: Each call to [makeCounter|make counter] creates a new closure, with its own count.
BYTE: And the outside cannot reach count at all. It is private.

## Loop trap
SAM: What about the famous loop question?
BYTE: With [var|var], all three callbacks share one variable. When the timers fire, i is already three.
BYTE: With [let|let], every iteration gets its own copy, so you get zero, one, two.

## Factory
SAM: Where would I use this in real code?
BYTE: Function factories. [makeAdder|make adder] remembers the number you gave it.
BYTE: Add five to three is eight. Add ten to three is thirteen. Each function remembers its own number.

## Wrap
BYTE: Closures give you private state, function factories, and callbacks that remember their context.
SAM: So a closure is a function, plus the scope it remembers.
BYTE: Exactly. That is your interview answer.
