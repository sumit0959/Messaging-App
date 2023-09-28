import React, { useState } from "react";
import styled from "styled-components";
import {ContactListComponent} from "./components/ContactListComponent";
import {ConversationComponent} from "./components/ConversationComponent";

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  flex-direction: row;
  align-items: center;
  background: #f8f9fb;
`;

const ChatPlaceholder = styled.img`
  width: 240px;
  height: 240px;
  border-radius: 50%;
  object-fit: contain;
`;
const Placeholder = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  gap: 10px;
  color: rgba(0, 0, 0, 0.45);

  span {
    font-size: 32px;
    color: #525252;
  }
`;

function App(props) {
  const { userinfo } = props;
  const [selectedChat, setChat] = useState();
  const [refreshContactList, toggleRefreshContactList] = useState(false);

  return (
    <Container>
      <ContactListComponent
        setChat={setChat}
        userinfo={userinfo}
        refreshContactList={refreshContactList}
      />
      {selectedChat ? (
        <ConversationComponent
          selectedChat={selectedChat}
          userinfo={userinfo}
          refreshContactList={() =>
            toggleRefreshContactList(!refreshContactList)
          }
        />
      ) : (
        <Placeholder>
          <ChatPlaceholder src="/welcome-placeholder.jpeg" />
          <span>  Interact with anyone in real-time!  
          </span>
          MessageMail connects to your email to sync messages.
        </Placeholder>
      )}
    </Container>
  );
}

export default App;
