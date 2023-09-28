import {SearchContainer,SearchInput,ChatBox, Container, ProfileHeader, ProfileImage, Emoji, MessageContainer, MessageDiv, Message, MessageTime, SendButton, SendButtonSign,ContactName,ProfileInfo} from './../styles/ConversationComponent'
import EmojiPicker from 'emoji-picker-react';
import { useState,useEffect,useRef } from 'react';
import {httpManager} from './../managers/httpManager';
import {io} from 'socket.io-client';
import gettime from '../managers/time';
let socket;
const CONNECTION_PORT = "localhost:3001/"
socket = io(CONNECTION_PORT);

export const  ConversationComponent = (props) => {
    const bottomRef = useRef(null);
    const { selectedChat, userinfo, refreshContactList } = props;
    const [text, setText] = useState("");
    const [pickerVisible, togglePicker] = useState(false);
    const [messageList, setMessageList] = useState([]);
    const [room,setRoom] = useState(userinfo.name);
    const [OtheruserName,setOtherUserName] = useState();
  useEffect(()=>{
    bottomRef.current?.scrollIntoView({block:'end',behavior: 'smooth'});
    console.log(bottomRef.current);
    bottomRef.current.scrollIntoView()
  },[messageList] );


    useEffect(()=>{
      console.log("room",room);
      socket.emit('join_room',room);
    },[]);
    // useEffect(()=>{
      socket.on("msg_rcv",(data)=>{
        let msgReqData = {
          "senderEmail": selectedChat.otherUser.email,
          "message":data,
          "addedOn":gettime()
      };
      console.log("Data:",data)
      setMessageList(messageList => [...messageList, msgReqData]);
      console.log(messageList);
      refreshContactList();  
    })
      
    // },[]);

    useEffect(()=>{
        socket = io(CONNECTION_PORT)
    },[CONNECTION_PORT]);

    useEffect(() => {
      setMessageList(selectedChat.channelData.messages);
      setOtherUserName(selectedChat.otherUser.name);
    }, [selectedChat]);

    const SendMessagetoRoom =(msg)=>{
      socket.emit("message",{"room":OtheruserName,"msg":msg});
      refreshContactList(); 
    }
    const onEnterPress = async (event) => {

      let channelId = selectedChat.channelData._id;
      if (event.key === "Enter") {
        if (!messageList || !messageList.length) {
          const obj={ 
          "channelUsers" : [
            {
              email: userinfo.email,
              name: userinfo.name,
              profilePic: userinfo.imageUrl,
            },
            {
              email: selectedChat.otherUser.email,
              name: selectedChat.otherUser.name,
              profilePic: selectedChat.otherUser.profilePic,
            },
          ],
          "messages":[
            {
            "senderEmail": userinfo.email,
            "message":text,
            "addedOn":gettime()
          }
          ]
        };
          const channelResponse = await httpManager.createChannel(obj);
          channelId = channelResponse.data.responseData._id;
        }
        refreshContactList();

        const messages = (messageList?.length>0)?[...messageList]:[];
     
        const msgReqData = {
            "senderEmail": userinfo.email,
            "message":text,
            "addedOn":gettime()
        };
        // if(messageList?.length)
        // { 
          const messageResponse = await httpManager.SendMessage({
            channelId,
            messages: msgReqData,
          });
        // }
        // connectToRoom();
        SendMessagetoRoom(text);
        messages.push(msgReqData);
        setMessageList(messages);
        // setMessageList(messageList => [...messageList, msgReqData]);
        setText("");
      }
    };
    return (
      <Container>
        <ProfileHeader>
          <ProfileInfo>
            <ProfileImage src={selectedChat.otherUser.profilePic} />
            <ContactName>{selectedChat.otherUser.name}</ContactName>
          </ProfileInfo>
        </ProfileHeader>
        <MessageContainer >
          {messageList?.map((messageData,index) => (
            <MessageDiv key={index} isYours={messageData.senderEmail === userinfo.email}>
              <Message isYours={messageData.senderEmail === userinfo.email}>
                <span>{[messageData.message]}</span>
                <MessageTime key={index}>
                            <span>
                                {messageData.addedOn}
                            </span>
                </MessageTime>
              </Message>
            </MessageDiv>
          ))}
          <div ref={bottomRef} />
        </MessageContainer>
  
        <ChatBox>
          <SearchContainer>
            {pickerVisible && (
              <EmojiPicker
                pickerStyle={{ position: "absolute", bottom: "60px" }}
                onEmojiClick={(e, emoji) => {
                  setText(text + emoji.emoji);
                  togglePicker(false);
                }}
              />
            )}
            <Emoji
              src={"/data.svg"}
              onClick={() => togglePicker((pickerVisible) => !pickerVisible)}
            />
            <SearchInput
              placeholder="Type a message"
              value={text}
              onKeyDown={onEnterPress}
              onChange={(e) => setText(e.target.value)}
            />
          </SearchContainer>
        </ChatBox>
      </Container>
    );
  }
  
  