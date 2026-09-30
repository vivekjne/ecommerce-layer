## Hook
SAM: What is the Temporal Dead Zone in JavaScript?
BYTE: It is the time between the start of a scope and the line where a [let|let] or [const|const] variable is declared.
BYTE: During that time the variable exists, but you cannot touch it.

## var
BYTE: Start with [var|var]. It is hoisted and set to undefined, so reading it early gives undefined.

## let
BYTE: Now [let|let]. The same early read throws a ReferenceError.
BYTE: The message says: cannot access b before initialization.

## typeof
SAM: Does [typeof|type of] protect me?
BYTE: Not inside the dead zone. [Typeof|Type of] on a variable that is still in it throws too.
BYTE: [Typeof|Type of] only gives undefined for names that were never declared at all.

## Time
SAM: So is it about where the code is written?
BYTE: No. It is about when the program runs.
BYTE: This function reads x, and it works, because it runs after the declaration.

## Shadow
SAM: Any interview trap?
BYTE: Yes. Shadowing. An outer x exists, and the block declares its own x, using [let|let].
BYTE: The whole block is now in the dead zone for that name, so reading x above the declaration throws.

## Wrap
BYTE: The same rule applies to [const|const], and to class declarations.
BYTE: The dead zone turns silent bugs into loud errors. That is why [let|let] and [const|const] are safer than [var|var].
SAM: Got it. Same variable, but with a guard.
