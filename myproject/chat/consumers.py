import json
from channels.generic.websocket import AsyncWebsocketConsumer


class ChatConsumer(AsyncWebsocketConsumer):
   
    async def connect(self):
       
        self.room_name = 'chat_room'
        self.room_group_name = f"chat_{self.room_name}"

        #Join room group
        try:
            await self.channel_layer.group_add(
                # self.room_name,
                self.room_group_name,
                self.channel_name,
            )
            print("CONNECTED TO REDISS AND WEBSOCKET SERVER")
            await self.accept()
        except Exception as e:
            print("Error",e)

    
    async def disconnet(self):
        print("DISCONNECTED TO REDISS AND WEBSOCKET SERVER")
        #Leave room group
        await self.channel_layer.group_discard(
            self.room_name,
            self.channel_name,
        )

    
    async def receive(self, text_data):
       
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        
        # Send message to room group
        try:
            await self.channel_layer.group_send(
                self.room_group_name,
                {
                    'type':'chat_message',
                    'message':message
                }
            )
            print("MESSAGE RECEIVED")
            print(message)  

            # await self.send(text_data=json.dumps({
            # 'message':message
            # }))
            # print("Message sent")
        except Exception as e:
            print("Error:",e)
        

    async def chat_message(self,event):
        print("MESSAGE SENT")
        message = event['message']

        #Send message to Websocket
        await self.send(text_data=json.dumps({
            'message':message
        }))



    