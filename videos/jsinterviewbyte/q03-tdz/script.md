## Hook
SAM: What is the Temporal Dead Zone in JavaScript?
BYTE: It is a short period where a variable already exists, but you are not allowed to use it yet. Let us see why.

## Hoisting
BYTE: Before JavaScript runs your code, it reads through the scope, and creates a box in memory for every variable. This step is called hoisting.
BYTE: Only after that, it runs your lines, one at a time.

## var
BYTE: A {var} box is created early, and filled with {undefined}.
BYTE: So reading it too soon does not fail. You just get {undefined}.
BYTE: Then the line runs, and the box gets its real value.

## let
BYTE: A {let} box is also created early. But it is locked.
BYTE: It stays locked, until the line that declares it runs.
BYTE: Read it while it is locked, and JavaScript throws a ReferenceError.
BYTE: The message says: cannot access b before initialization.
BYTE: The time while the box is locked, is the Temporal Dead Zone.

## typeof
SAM: Does [typeof|type of|c] protect me?
BYTE: Not inside the dead zone. [typeof|type of|c] on a locked variable throws too.
BYTE: It only gives {undefined} for names that were never declared at all.

## Time
SAM: So is it about where the code is written?
BYTE: No. It is about when the program runs.
BYTE: This function reads x, and it works, because it runs after the declaration.

## Shadow
SAM: Any interview trap?
BYTE: Yes. Shadowing. An outer x exists, and the block declares its own x, using {let}.
BYTE: The whole block is now in the dead zone for that name, so reading x above the declaration throws.

## Wrap
BYTE: The same rule applies to {const}, and to {class} declarations.
BYTE: The dead zone turns silent bugs into loud errors. That is why {let} and {const} are safer than {var}.
SAM: Got it. Same variable, but with a guard.
