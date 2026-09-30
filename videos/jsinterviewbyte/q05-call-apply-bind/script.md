## Hook
SAM: What is the difference between [call|call|c], [apply|apply|c], and [bind|bind|c]?
BYTE: All three let you choose what {this} means inside a function. The difference is when the function runs, and how you pass the arguments.

## this
BYTE: First, {this}. Inside a function, {this} is the object the function is working on.
BYTE: Here is a function that reads [this.name|this dot name|c]. And two objects, john and jimmy.

## Call
BYTE: [call|Call|c] plugs an object into {this}, and runs the function right now. Arguments go in one by one.

## Apply
BYTE: [apply|Apply|c] does the same. But the arguments come in as an array.
BYTE: A trick to remember: call is for commas, apply is for arrays.

## Bind
BYTE: [bind|Bind|c] does not run anything. It returns a new function, with {this} fixed for good.
BYTE: You can preset arguments too. Here Hi is already filled in.

## Twist
SAM: What if I call a bound function with a different {this}?
BYTE: It is ignored. A bound function keeps its first {this}.
BYTE: And bind returns a new function. The original stays untouched.

## Real use
SAM: Why do people use bind in real code?
BYTE: Because a method loses its {this} when you pass it around as a callback.
BYTE: Take the method out of the object, call it, and this dot name is {undefined}.
BYTE: Bind it to the object first, and it works again.

## Wrap
BYTE: So call and apply run now. Bind gives you a function for later.
SAM: Got it. Call, apply, now. Bind, later.
