# TODO

- [x] Ananlyze again scripting, for response we can use | to separate responses, it will be much intuitive

# Scenarios

## Quick prototyping scenario with scripting

b(N) - indicates that new branch started

c(N) - indicates that new choice started.

__All branches with should have at least one choice and marked correctly with c(N)__

the ending branch should not have any choices

q:(some text) - here we define the question (aka request), it can be divided by commas

r:(some text) - here we define the response, it can be divided by |, it can be one or more

n:b(N) - here we define the next branch id

Here is an example of a simple scenario:

b1

c1

q:*

r:what?|what you mean?


c2

q:hello

r:hello there

n:b2


b2

c1

q:*

r:what?|what you mean?


c2

q:how are you,how do you do

r:im fine|im good, thanks

n:b3


b3

c1

q:*

r:okay i need to go, bye!|sorry, im in hurry. bye!

n:b4


b4