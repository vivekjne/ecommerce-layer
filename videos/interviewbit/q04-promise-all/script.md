## Hook
SAM: Does [Promise.all|Promise dot all] cancel the other promises when one of them fails?
BYTE: No. It only rejects right away. The other promises keep running.
BYTE: Let us prove it.

## Demo
BYTE: Three tasks. A takes three hundred milliseconds, one fails after one hundred, and C takes two hundred.
BYTE: At one hundred, [Promise.all|Promise dot all] rejects, and we print rejected.
BYTE: But look. C and A still finish afterward. Nothing was cancelled.

## Why
SAM: Why can it not cancel them?
BYTE: A promise has no cancel method. It only represents a result that will arrive.
BYTE: Cancelling means stopping the work behind the promise, and that is up to the work itself.

## Fix
BYTE: The standard tool is [AbortController|abort controller]. Give every task the same signal.
BYTE: When one fails, call abort, and each task can stop its own work.
BYTE: Now only rejected is printed. A and C never finish.

## Settled
SAM: And if I want to wait for everything?
BYTE: Use [Promise.allSettled|Promise dot all settled]. It never rejects, and it reports every result.
BYTE: Remember: [Promise.all|Promise dot all] combines results. It does not cancel work.
