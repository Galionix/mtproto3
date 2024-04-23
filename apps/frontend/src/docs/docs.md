# TODO

- [x] Ananlyze again scripting, for response we can use | to separate responses, it will be much intuitive

# Scenarios

## Quick prototyping scenario with scripting

b(N) - indicates that new branch started

c(N) - indicates that new choice started.

__All branches should have at least one choice, even end.__

q:(some text) - here we define the question (aka request), it can be divided by commas

r:(some text) - here we define the response, it can be divided by |, it can be one or more

n:b(N) - here we define the next branch id

