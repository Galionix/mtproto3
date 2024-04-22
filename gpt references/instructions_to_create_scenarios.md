i have instructions for you to create special object. this object contains branches here is how branches look like:
{
  "description": "Create meaningful description based in meaning of conversation",
  "branches": [
    {

        "id": "eb69deac-1bad-3ed9-b6b5-e2988cc6327e",
        "choices": [
            {

                "id": "254168f1-6996-4906-be66-460095c27393",
                "request": [],
                "nextBranchId": "e020b7e7-e89a-3018-bf7e-08e71a77652e",
                "responses": [
                    {

                        "text": "и тебе приветик",

                    }
                ]
            }
        ]
    },
    {

        "id": "e020b7e7-e89a-3018-bf7e-08e71a77652e",
        "choices": [
            {

                "id": "a2c35599-3222-431d-b8a5-66800b00c352",
                "request": [],
                "nextBranchId": "3dc83b06-3882-3f83-8ed8-99bac56c87e9",
                "responses": [
                    {

                        "text": "ну ладно как скажешь",

                    }
                ]
            }
        ]
    },
    {

        "id": "3dc83b06-3882-3f83-8ed8-99bac56c87e9",
        "choices": [
            {

                "id": "46491db7-55aa-4027-819e-a637fd9ed010",
                "request": [],
                "nextBranchId": "7a190e3b-e1ef-3a55-9d27-1236ec01bfb6",
                "responses": [
                    {

                        "text": "ага, хорошо.",

                    }
                ]
            }
        ]
    },
    {
        "id": "7a190e3b-e1ef-3a55-9d27-1236ec01bfb6",
        "choices": []
    }
],
  "maxConversationLength": 100,
  "db_name": "base"
}


your objective will be to create such object, when I provide prompt. prompt for this structure would be:

b1
c1
q*
r:и тебе приветик
n:b2

b2
c1
q*
r:ну ладно как скажешь
n:b3

b3
c1
q*
r:ага, хорошо.
n:b4

b4

where:
 b(N) - indicates that new branch started
 c(N) - indicates that new choice started
 q(* or :some text) - for field request. if no text provided and star specified, this means that request is empty. if text provided, it would be divided by commas, you split some,text to "some", "text" and put it in request.
 r(N) - for field response. it can be one or more. each r(N) represents one element of array.
 n(* or number) - if *, put in nextBranchId for each response in this branch. otherwise, if it has number - put in specific response in nextBranchId

 you need to make all ids short and readeable, meaningful indicating the content inside, in snake_case
 you dont put b3 b4 as ids. i need meaningful ids, representing responses meanings inside
 each id should be unique across all branches

 each branch and choice should have field index:number starting from 0. in each branch answers count start from 0.




////////////
b1
c1
q*
r:а ты что думал, в сказку попал?
n:b2

b2
c1
q*
r1:ого а ты у нас самый умный?
r2:что правда?
r3:ого ладно
n*:b3

b3