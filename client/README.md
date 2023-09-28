# Messaging App - FullStack Project

### Libraries used:
-   styled-components
-   Axios 
-   react-scripts
-   emoji-picker-react


## Notes
- I have used cookies to store login info of the user.

### Cookies documentation 
- **< CookieProvider />** => wrapper , allow us to store cookies in the wrapped component
- **withCookies()** =>when exporting a component using cookies, it allows to export the cookies as props i.e. this.props.cookies
- **useCookie(['cookie-name1','cookie-name2'])** => to set cookie variables. **usecookies** is imported from **'react-cookie'**
    let: 
    ```
    const [cookies,setCookie] = useCookies(['user-info']);
    so now we can use it like this:
    setCookie('user-info',res.profileObj);    
    ```
- To access any cookie value , we use: **cookies['cookie-name']**, here **cookies** is the varibale we defined in state 
