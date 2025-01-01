import json
from channels.generic.websocket import AsyncWebsocketConsumer
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken
from .models import Messages
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from asgiref.sync import sync_to_async

class ChatConsumer(AsyncWebsocketConsumer):
   
    # async def connect(self):
       
    #     self.room_name = 'chat_room'
    #     self.room_group_name = f"chat_{self.room_name}"

    #     #Join room group
    #     try:
    #         await self.channel_layer.group_add(
    #             # self.room_name,
    #             self.room_group_name,
    #             self.channel_name,
    #         )
    #         print("CONNECTED TO REDISS AND WEBSOCKET SERVER")
    #         await self.accept()
    #     except Exception as e:
    #         print("Error",e)

    async def connect(self):
        self.user = None
        try:
            token = self.scope['query_string'].decode().split('=')[1]
            validated_token = await sync_to_async(JWTAuthentication().get_validated_token)(token)
            self.user = await sync_to_async(JWTAuthentication().get_user)(validated_token)
            print("User: ",self.user.username,"\nID: ",self.user.id)
        except Exception as e:
            print("Error in connecting: ", e)
            self.user = AnonymousUser()
        
        if not self.user.is_authenticated:
            await self.close()
            return
        
        self.room_name  = "chat_room"
        self.room_group_name = f"chat_{self.room_name}_{self.user.id}"

        await self.channel_layer.group_add(
            self.room_group_name,
            self.channel_name,
        )
        
        await self.accept()


    # async def disconnet(self):
    #     print("DISCONNECTED TO REDISS AND WEBSOCKET SERVER")
    #     #Leave room group
    #     await self.channel_layer.group_discard(
    #         self.room_name,
    #         self.channel_name,
    #     )

    async def disconnet(self):
        if self.user.is_authenticated:
            await self.channel_layer.group_discard(
                self.room_group_name,
                self.channel_name,
            )

    async def receive(self, text_data):   
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        user = text_data_json['user']
        recipientId =  text_data_json['recipientId']
        print("Recipient ID: ", recipientId)
        # Send message to room group
        try:
            await self.channel_layer.group_send(
                f"chat_chat_room_{recipientId}",                     # Edit Here to specify to who is the recipient's ID ++++++++++
                
                # self.room_group_name,
                {
                    'type':'chat_message',
                    'message':message,
                    'user':user,
                }
            )
            print("MESSAGE RECEIVED")
            print(message)  
            print(user)

            # await self.send(text_data=json.dumps({
            # 'message':message
            # }))
            # print("Message sent")
        except Exception as e:
            print("Error:",e)
        

    async def chat_message(self,event):
        print("MESSAGE SENT")
        message = event['message']
        user = event['user']

        #Send message to Websocket
        await self.send(text_data=json.dumps({
            'message':message,
            'user':user,
        }))



    