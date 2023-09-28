import {MessageText ,ContactName,ContactInfo, Container,ProfileIcon,ProfileImage,ProfileInfoDiv, SearchBox, SearchContainer, SearchIcon, SearchInput, ContactItem, MessageTime} from './../styles/ContactListComponent'
// import { contactLists } from '../mockData';
import { GoogleLogout } from 'react-google-login';
import { useCookies,removecookie  } from 'react-cookie';
import { useEffect, useState } from 'react';
import { utility } from '../utility';
import { httpManager } from '../managers/httpManager';
import { SearchResults } from '../styles/LoginComponent';

const ContactComponent = (props) => {
    const { userData, setChat, userinfo } = props;
    const [searchResult, setSearchResult] = useState();
    const [cookies,setCookie,removecookie] = useCookies(['user-info']);
    useEffect(()=>{},[userData]);
    const otherUser =
      userData.channelUsers?.find(
        (userObj) => userObj.email !== userinfo.email
      ) || userData;
  
    const lastMessage =
      (userData.messages && userData.messages.length)
        ? userData.messages[userData.messages.length - 1]
        : {};
        
    return (
      <ContactItem onClick={() => setChat({ channelData: userData, otherUser })}>
        <ProfileIcon src={otherUser?.profilePic} />
        <ContactInfo>
          <ContactName>{otherUser?.name}</ContactName>
          <MessageText>{lastMessage?.message}</MessageText>
        </ContactInfo>
        <MessageTime>
          {" "}
          {lastMessage &&  (lastMessage?.addedOn)}
        </MessageTime>
      </ContactItem>
    );
  };
  
  export const ContactListComponent=(props)=>{
    const { userinfo, refreshContactList } = props; 
    const [searchString, setSearchString] = useState("");
    const [searchResult, setSearchResult] = useState("");
    const [ contactList, setContactList] = useState([]);
    const [cookies,setCookie,removecookie] = useCookies(['user-info']);
  
    const refreshContacts = async () => {
      const contactListData = await httpManager.getChannelList(userinfo.email);
      setContactList(contactListData.data.responseData);
      setSearchString();
      setSearchResult();
    };
  
    useEffect(() => {
      refreshContacts();
    }, [refreshContactList]);
  
    const onSearchTextChanged = async (searchText) => {
      setSearchString(searchText);
        if (!utility.validateEmail(searchText)) return;
      const userData = await httpManager.searchUser(searchText);
      if (userData.data?.success) setSearchResult(userData.data.responseData);
    };
    const logout =(res)=>{
        removecookie('user-info');
     }
    return (
      <Container>
        <ProfileInfoDiv>
          <ProfileImage
            src={userinfo.imageUrl || "/profile/theindiandev.jpeg"}
          />
          <GoogleLogout clientId="54320360431-veja7a87jmltvaegkm10jfnthn6omksp.apps.googleusercontent.com" buttonText='Sign Out' onLogoutSuccess={logout} />
        </ProfileInfoDiv>
        <SearchBox>
          <SearchContainer>
            <SearchIcon src={"/search-icon.svg"} />
            <SearchInput
              placeholder="Search or start new chat"
              value={searchString}
              onChange={(e) => onSearchTextChanged(e.target.value)}
            />
          </SearchContainer>
        </SearchBox>
        {searchResult && (
          <SearchResults>
            <ContactComponent userData={searchResult} setChat={props.setChat} />
          </SearchResults>
        )}
        {contactList.map((userData,index) => (
          <ContactComponent 
          key={index}
            userData={userData}
            setChat={props.setChat}
            userinfo={userinfo}
          />
        ))}
      </Container>
    );
  }
  
  