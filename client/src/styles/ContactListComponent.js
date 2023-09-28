import styled from "styled-components"

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    flex:1.6 1 0;
    overflow:auto;
`
export const ProfileInfoDiv = styled.div`
    display:flex;
    flex-direction:row;
    background-color:#2c8fb0;
    padding:10px;
    justify-content:space-between;
`
export const ProfileImage = styled.img`
    border-radius:50%;
    width:32px;
    height:32px;
`
export const SearchBox=styled.div`
    background-color:#f6f6f6;
    padding:10px;
`
export const SearchContainer = styled.div`
    display:flex; 
    flex-direction:row;
    background-color:white;
    border-radius:16px;
    padding: 5px 10px;
`
export const SearchIcon = styled.img`
    width:28px;
    height:28px;
`

export const SearchInput = styled.input`
    width:100%;
    outline:none;
    border:none;  
    font-size:15px;
    padding-left:4px;  
`
export const ContactItem = styled.div`
    display:flex;
    flex-direction:row
    width:100%;
    border:1px solid #f2f2f2;
    cursor:pointer;
    padding:15px 12px;
    :hover{
        background:#ebebeb;
    }
`;
export const ProfileIcon = styled(ProfileImage)`
    width:38px;
    height:38px;    
`;
export const ContactInfo = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;   
    margin:0 12px;
`;
export const ContactName = styled.span`
    width:100%;
    font-size:15px;
    color:black;
    font-weight:bold;
`;
export const MessageText = styled.span`
    width:100%;
    font-size:14px;
    margin-top:3px;
    color:rgba(0,0,0,0.8);
`;

export const MessageTime= styled.span`
    font-size:13px;
    color:rgba(0,0,0,0.8);
    white-space:nowrap;
    margin-right:10px;
    margin-top:15px;
`
