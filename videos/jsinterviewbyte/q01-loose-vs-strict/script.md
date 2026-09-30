## Hook
SAM: What is the difference between [==|double equals|c] and [===|triple equals|c] in JavaScript?
BYTE: Both compare two values. But they follow different rules. Let us see how.

## Types
BYTE: Every value in JavaScript has a type. Numbers, strings, and booleans are three of them.
BYTE: The number one and the string one look almost the same. But they are different types.

## Strict
BYTE: [===|Triple equals|c] is strict. It asks two questions, in order. Same type? Then same value?
BYTE: If the types differ, the answer is {false}. It never even looks at the values.

## Loose
BYTE: [==|Double equals|c] is loose. If the types differ, it first converts one side. Then it compares.

## Demo one
BYTE: Take the string one, and the number one. With [==|double equals|c], the string is converted to a number. Now both are one, so the result is {true}.
BYTE: With [===|triple equals|c], the types are different. It stops at the first question. The result is {false}.

## Demo two
BYTE: Same idea for zero and {false}. Double equals converts {false} to the number zero, so they match.
BYTE: Triple equals sees a number and a boolean. Different types, so {false}.

## Special pair
BYTE: One special pair. {null} double equals {undefined} is {true}. But {null} triple equals {undefined} is {false}.

## NaN
SAM: What about not a number?
BYTE: [NaN|N a N|c] is the odd one. It is never equal to anything, not even itself.
BYTE: Both operators say {false}. To test for it, use [Number.isNaN|Number dot is N a N|c].

## Objects
BYTE: Arrays and objects are compared by reference, not by content.
BYTE: These two empty arrays look identical. But each one lives in its own place in memory.
BYTE: Both operators compare the places. Different places, so {false}.
BYTE: But two names that point at the same array are equal.

## Rule
BYTE: So the rule is simple. Use [===|triple equals|c] by default. It never surprises you.
BYTE: One common exception is [x == null|x double equals null|c]. It is {true} for {null} and for {undefined}, and nothing else.
SAM: Triple equals by default. Double equals only for null checks.
BYTE: Exactly. That is your interview answer.
