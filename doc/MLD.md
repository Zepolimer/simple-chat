# Model Logique de Données

```mermaid
classDiagram
  direction LR
  user --|> channel
  channel --|> user_channel
  user_channel --|> channel_message
  user --|> user_conversation
  user_conversation --|> conversation_message
   
  class user{
    username
    firstname
    lastname
    email
    password
    role
    created_at
    updated_at
    (PK) USER ID
  }

  class channel {
    name
    private
    creator
    created_at
    updated_at
    (PK) CHANNEL ID
    (FK) USER ID
  }

  class user_channel{
    created_at
    updated_at
    (PK) USER_CHANNEL ID
    (FK) USER_ID
    (FK) CHANNEL_ID
  }

  class channel_message{
    message
    created_at
    updated_at
    (PK) CHANNEL_MESSAGE ID
    (FK) USER_ID
    (FK) CHANNEL_ID
  }

  class user_conversation{
    blocked
    created_at
    updated_at
    (PK) USER_CONVERSATION ID
    (FK) USER_ID_FROM
    (FK) USER_ID_TO
  }

  class conversation_message{
    message
    created_at
    updated_at
    (PK) CONVERSATION_MESSAGE ID
    (FK) USER_CONVERSATION ID
    (FK) USER_ID_FROM
    (FK) USER_ID_TO
  }
```

[Voir sur l'éditeur de mermaid.js](https://mermaid.live/edit#pako:eNqlVMtuwjAQ_BXLp1aCH8ihEiqhRYWkSmhPkSzXXiAisZEdqCrKv9dOjOKIh5Ry252MZ2d3HR8wkxxwgFlBtR7ndKVomQmEeK6AVbkUaJbYfKdBoeHw9wmxNRUCCgu6sMEtg3gf_bxzkpSgNV1BV7ahS7EHpakt3Gp4oBPyEF8N1aZsJ_XJQ43VoaBlw0DLXOmqTQ3Zy6CkedGEW6PyLRVvMiULR2EKaAWc0Mqpb3knf3h_e0QfaZig6dgix0y0rk7jcM7awluV742MV0KqHvWeX0dRFM5cSQNObpjwF3Po2RS5Wol0EEcj12dw2ptz4G-xV89kHqbp6CW8w9HZLXOevgrJNsB7jyiOPsMkHS2mcXTRFZkk8fwCvIjPh3Xhpv9_Yp6xG2O71z8e4BKU-ZO4eVdqsxmu1mCuOg5MyKnaZDgTlkd3lUx_BMNBpXYwwI1t9wzhYEkLDcc_RBx42Q)