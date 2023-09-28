import Cookies from 'universal-cookie';
const cookies= new Cookies();

const setcookie = (cookie_name,userInfo)=>{
    cookies.set(cookie_name,JSON.stringify(userInfo),{path:'/'});
}
const removecookie= (cookie_name)=>{
    return(cookies.remove(cookie_name));
}
const getcookie = (cookie_name)=>{
    return(cookies.get(cookie_name));
} 

export const cookieManager={
    setcookie,
    getcookie,
    removecookie
} 