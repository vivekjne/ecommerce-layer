## Hook
SAM: What is the difference between [call|call], [apply|apply], and [bind|bind]?
BYTE: All three let you choose the value of [this|this]. The difference is when the function runs, and how you pass arguments.

## Setup
BYTE: Here is a function that reads [this.name|this dot name], and two objects.

## Call
BYTE: [call|Call] runs the function immediately. You pass the arguments one by one.

## Apply
BYTE: [apply|Apply] also runs immediately, but you pass the arguments as an array.
BYTE: A trick to remember: call is for commas, apply is for arrays.

## Bind
BYTE: [bind|Bind] does not run anything. It returns a new function with [this|this] fixed.
BYTE: You can preset arguments too. Here Hi is already filled in.

## Twist
SAM: What if I call a bound function with a different [this|this]?
BYTE: It is ignored. A bound function keeps its first [this|this] for good.
BYTE: And bind returns a new function. The original stays untouched.

## Real use
SAM: Why do people use bind in real code?
BYTE: Because a method loses its [this|this] when you pass it around as a callback.
BYTE: Take the method out of the object, call it, and this dot name is undefined.
BYTE: Bind it to the object first, and it works again.

## Wrap
BYTE: So call and apply run now. Bind gives you a function for later.
SAM: Got it. Call, apply, now. Bind, later.
