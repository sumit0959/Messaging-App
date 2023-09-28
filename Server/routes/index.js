import * as Controller from './../app/controllers';
import * as Validation from './../utility/validations'
const applyRoutes = (app)=>{
    app.get('/',(req,res)=>{
        res.status(200).send('Api is running fine')
    })
// create-user, login ,channel, searchuser,channel list API,send-messages
    app.post('/user',Validation.ValidateCreateUser ,Controller.createUser);
    app.post('/login',Validation.ValidateLogin,Controller.loginUser);
    app.post('/channel',Validation.ValidateCreateChannel,Controller.createChannel);
    app.get('/search-user',Validation.ValidateSearchUser, Controller.searchUser);
    app.post('/channel-list',Validation.ValidateGetChannelList,Controller.getChannelList);
    app.post('/message',Validation.ValidateAddMessage,Controller.sendMessage);
};

export default applyRoutes;