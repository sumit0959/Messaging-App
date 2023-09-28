import styled from 'styled-components';

export const Container = styled.div`
    display:flex;
    flex-direction:column;
    width:100%;
    background-color:#eae6df;
    height:100vh;
`;

export const Header = styled.div`
    color:white;
    width:100%;
    font-weight:bold;
    background-color:#2c8fb0;
    padding:50px 50px 140px;
`;
export const CardView = styled.div`
    box-shadow:0 4px 8px 0 rgba(0,0,0,0.2);
    padding:30px 50px;
    margin-left:auto;
    margin-right:auto;
    margin-top:-80px;
    background-color:white;
    display:flex;
    flex-direction:row;
    justify-content:space-evenly;
    gap:40px;
    flex-wrap:wrap;
`;
export const Instructions = styled.div`
    padding:20px;
    font-size:16px;
    header{
        font-size:24px;
        color:#525252;
    };
    ol{
        margin:40px 0px;
    }
    ol *{
        margin:15px;
    }
`;

export const QRCode = styled.img        `
    width:264px;
    height:264px;
    background-color:white;
`;

export const SearchResults= styled.div`
    width:100%;]
    height:200px;
`;