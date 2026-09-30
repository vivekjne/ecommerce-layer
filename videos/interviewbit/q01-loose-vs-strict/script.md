## Hook
SAM: What is the difference between [==|double equals] and [===|triple equals] in JavaScript?
BYTE: [==|Double equals] converts the types first, then compares. [===|Triple equals] never converts.
BYTE: Watch what happens.

## Basics
BYTE: When the types differ, [==|double equals] converts them first, usually to numbers.
BYTE: Zero [==|double equals] false is true, because false is converted to the number zero.
BYTE: With [===|triple equals], a number and a boolean are different types, so the answer is false.
BYTE: The same happens with the string one and the number one.
BYTE: And null [==|double equals] undefined is true, but with [===|triple equals] it is false.

## NaN and objects
SAM: So is triple equals always safe?
BYTE: Not quite. [NaN|Not a number] is never equal to anything, not even itself, with either operator.
BYTE: To check for it, use [Number.isNaN|Number dot is N a N], or [Object.is|Object dot is].
BYTE: Objects are compared by reference, so two separate empty arrays are never equal.

## Trap
SAM: Is there a classic trap?
BYTE: Yes. Null [==|double equals] zero is false, but null [>=|greater than or equal to] zero is true.
BYTE: The comparison operators convert null to zero. But [==|double equals] treats null in a special way.

## Rule
BYTE: So use [===|triple equals] by default.
BYTE: The one common exception is [x == null|x double equals null].
BYTE: It is true for null and for undefined, and nothing else.
SAM: So, triple equals, and double equals only for null checks.
BYTE: Exactly. That is your interview answer.
