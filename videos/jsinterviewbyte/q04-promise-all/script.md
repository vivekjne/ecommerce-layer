## Hook
SAM: Does [Promise.all|Promise dot all|c] cancel the other promises when one of them fails?
BYTE: No. It only rejects right away. The other promises keep running. Let us prove it.

## Promise
BYTE: First, what is a promise? Think of it as a receipt for a result that will arrive later.
BYTE: It starts as pending. Later it becomes fulfilled with a value, or rejected with an error.

## All
BYTE: [Promise.all|Promise dot all|c] takes several promises, and gives you one promise back. It waits until every one is fulfilled.
BYTE: But if any one of them is rejected, the combined promise is rejected immediately.

## Demo
BYTE: Here are three tasks. [A|A|c] takes three hundred milliseconds. One fails after one hundred. And [C|C|c] takes two hundred.
BYTE: At one hundred milliseconds, the combined promise is rejected, and we print rejected.
BYTE: But look. [C|C|c] and [A|A|c] still finish afterward. Nothing was cancelled.

## Why
SAM: Why can it not cancel them?
BYTE: A promise has no cancel method. It is only the receipt.
BYTE: Cancelling means stopping the work behind the promise, and that is up to the work itself.

## Fix
BYTE: The standard tool is [AbortController|abort controller|c]. Give every task the same signal.
BYTE: When one fails, call [abort|abort|c]. Each task hears the signal, and can stop its own work.
BYTE: Now only rejected is printed. [A|A|c] and [C|C|c] never finish.

## Settled
SAM: And if I want to wait for everything?
BYTE: Use [Promise.allSettled|Promise dot all settled|c]. It never rejects, and it reports every result.
BYTE: Remember: [Promise.all|Promise dot all|c] combines results. It does not cancel work.
