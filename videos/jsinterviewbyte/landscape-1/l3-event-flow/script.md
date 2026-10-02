## Hook
SAM: How do events travel through the page?
BYTE: When you click a button, the click does not only happen on the button. It travels through its parents too. This journey is called event flow.

## Setup
BYTE: Picture a button, inside a middle box, inside an outer box.
BYTE: A click starts at the very top, and walks down toward the button.

## Phases
BYTE: Phase one is capturing. The event goes down: outer, then middle.
BYTE: Phase two is the target. The event reaches the button you really clicked.
BYTE: Phase three is bubbling. The event goes back up, like a bubble: middle, then outer.

## Listeners
SAM: And where do my listeners run?
BYTE: By default, a listener runs during bubbling. Put one on each box, and a click prints button, middle, outer.
BYTE: To listen while capturing, pass {true} as the third argument to [addEventListener|add event listener|c].
BYTE: Now outer and middle run first, on the way down. Then the button.

## Stop
SAM: Can I stop the journey?
BYTE: Yes. Call [stopPropagation|stop propagation|c] on the event. Do it in the middle box, and the outer listener never runs.

## Delegation
BYTE: Bubbling gives us a great trick, called event delegation.
BYTE: Instead of a listener on every list item, put one listener on the list. Every click bubbles up to it.
BYTE: Then use [event.target|event dot target|c] to see which item was clicked. Items added later work automatically.

## Wrap
BYTE: Capturing goes down. Bubbling goes up. And listeners use bubbling, unless you pass {true}.
SAM: Down, target, up. Got it.
