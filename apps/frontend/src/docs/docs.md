# TODO

- [x] Ananlyze again scripting, for response we can use | to separate responses, it will be much intuitive

- [ ] make instrumentary to find event when bot sent to group spam and after that it has been banned in this chat. It is important to know, because we can use this information to improve the bot.

# Scenarios

- [ ] Add ability to edit scenario

There is an issue that you can right now edit scenario and save it under same name. It will create a new scenario with the new name. It should be fixed. Be aware when editing scenario.

## Editing\creating scenario

This is heavy loaded page. It serves many purposes. It is used to create new scenario, edit existing scenario, testing it etc.

## Creating new scenario

__Description__ - When you create new scenario, you should provide the description (aka name) of the scenario. It should be unique for readability purposes. Technically it can be the same, but it will be hard to find it in the list.

__Database Name__ - this field is for providing database name. Bots can use different databases, so you can provide the name of the database here. It is required field, default value is `base`.

__Max Conversation Length__ - this field is for providing the maximum length of the conversation. Meaning, if there is an endless loop in conversation, this value is used to terminate it. Currently its untested, but it should work. Default value is `100`.

__Markup__ - this button will open the modal window with the markup editor. You can use it to create text scenarios. It is very simple and intuitive. You can use the keyboard shortcuts to insert the boilerplate. The editor will also provide you with the preview of the scenario. See __Quick prototyping scenario with scripting__ for more information about scripting syntax.

__Clear Scenario__ - this button will clear the scenario. It is useful when you want to start from scratch. It __will not__ delete the scenario from the database, __will not__ erase markup script, __will not__ erase arbitrary data field.

__Test Scenario__ - this button will open on side panel for testing the scenario. You can test the scenario with the provided input. It will show you the conversation between the bot and the user. It is useful for debugging purposes. Here you can switch up to 3 tabs with desired user input.

## Quick prototyping scenario with scripting

__Parse Instructions__ button will parse the scenario and prepare it for inserting into main scenario editor. After that you will observe __Set arbitrary data__ section. See __Creating new scenario__ for more information about fields.

__Restore__ - damn, I really need to be more specific about naming buttons. This button restores previously entered script, after page reload. It is useful when you accidentally reload the page.

__Close__ - closes the modal window without applying changes.

__use Ctrl+Enter to insert boilerplate instructions__

b(N) - indicates that new branch started

c(N) - indicates that new choice started.

__All branches with should have at least one choice and marked correctly with c(N)__

the ending branch should not have any choices

q:(some text) - here we define the question (aka request), it can be divided by commas

r:(some text) - here we define the response, it can be divided by | or \\\\, it can be one or more, but you cant use both separators in one response

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