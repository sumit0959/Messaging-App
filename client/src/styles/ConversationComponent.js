import styled from "styled-components"

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    flex:3 1 0;
    background-color:#f6f7f8;
    align-content:flex-end; 
`
export const ProfileHeader=styled.div`
    display:flex;
    flex-direction :row;
    background-color:#ededed;
    padding:10px;
    align-items:center;
    gap:10px;
`;
export const ProfileInfo = styled.div`
  display: flex;
  flex-direction: row;
  background: #ededed;
  align-items: center;
  gap: 10px;
`;
export const ProfileImage = styled.img`
    border-radius:50%;
    width:32px;
    height:32px;
`;
export const ContactName = styled.span`
  font-size: 16px;
  color: black;
`;

export const ChatBox=styled.div`
    display:flex;
    background:#f0f0f0;
    padding:10px;
`;
export const SearchContainer = styled.div`
position:relative;
    display:flex;
    flex-direction:row;
    background-color:white;
    border-radius:16px;
    padding: 5px 10px;
    width:100%;
`
export const SearchInput = styled.input`
    width:100%;
    outline:none;
    border:none;  
    font-size:15px;
    padding-left:4px; 
    margin-left:10px;
`
export const Emoji = styled.img`
    width:26px;
    height:26px;
    opacity:0.4;
    cursor:pointer;
`;
export const MessageContainer = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    background:url('/chat-background.png');
    background-color:rgba(0,0,0,0.8);
    overflow:auto;
`; 
export const MessageDiv = styled.div`
    justify-content:${(props)=> props.isYours?'flex-end':'flex-start'};
    display:flex;
    margin: 5px 15px;
`;

export const Message = styled.div`
    background-color:${(props)=>props.isYours?"#a7e5fa":'white'};
    max-width:50%;
    color:#030303;
    padding:8px 10px;
    font-size:14px;
    font-family:Helvetica Neue ;
    border-radius:4px;
    flex-wrap:wrap;
    position:relative;
    word-break: break-all;
    word-wrap: break-word;
    span{
        flex:9 0 1; 
    }
    gap:2px;
`;

export const MessageTime=styled.div`
    font-size:65%;
    flex:4 0 1;
    span{
       float:right;
       color:rgba(0,0,0,0.8);
    }
`;
export const SendButton = styled.div`
    display:flex;
    align-items:center;
`;
export const SendButtonSign= styled.img`
    width:26px;
    height:26px;
    cursor:pointer;
    margin-left:5px;

`;