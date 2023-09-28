import { CardView, Container, Header, Instructions, QRCode } from "./../../styles/LoginComponent";
import {GoogleLogin } from 'react-google-login';
import {gapi} from "gapi-script";
import {useCookies} from 'react-cookie';
import App from "../../App";
import axios from 'axios';
import { httpManager } from "../../managers/httpManager";



export const LoginComponent =()=>{
    
    const [cookies,setCookie] = useCookies(['user-info']);
    const responseGoogle=async (res)=>{
        console.log(res);
        setCookie('user-info',res.profileObj);
        httpManager.createUser(
            {   
                email:res.profileObj.email,
                name:res.profileObj.name,
                profilePic:res.profileObj.imageUrl
            })
    }



    // to enable connection to google APIs
    gapi.load("client:auth2", () => {
        gapi.client.init({
          clientId:
            "54320360431-veja7a87jmltvaegkm10jfnthn6omksp.apps.googleusercontent.com",
          plugin_name: "chat",
        });
      });
      
    return(
        <>
        {cookies["user-info"]!=="undefined" && cookies["user-info"]?  <App userinfo= { cookies['user-info']} />:
        <Container>
            <Header>
                MessageMail
            </Header>
            <CardView>
                <Instructions>
                    <header>To use MessageMail on your computer:</header>
                    <ol>
                        <li>You need to Signin using your Google Account</li>
                        <li>You can anytime logout from the Web</li>
                        <li>Click on Signin button to continue using MessageMail</li>
                    </ol>
                    <GoogleLogin clientId="54320360431-veja7a87jmltvaegkm10jfnthn6omksp.apps.googleusercontent.com" buttonText="Sign in with Google" onSuccess={responseGoogle} onFailure={responseGoogle}  cookiePolicy={'single_host_origin'} />
                </Instructions>
                <QRCode src="placeholder.png"/>
            </CardView>
        </Container>}
        </>
    )
};