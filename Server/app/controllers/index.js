// Business logic for APIs
import UserModel from './../models/users';
import ChannelModel from './../models/channels';
import {sendResponse,sendError} from './../../utility/index'
import { string } from 'yup';
module.exports={
    createUser: async (req,res)=>{
        const requestData = req.body;
        const isUserExist = await UserModel.findOneData({
            email: requestData.email, //currently is email because of google authentication
          });
          if (isUserExist)
            return sendResponse(res,isUserExist,"User fetched successfully",true,200);
        
        const userObj=  new UserModel(req.body);
        await userObj.saveData();
        // await userObj.save()
        sendResponse(res,userObj,"User added Successfully",true,201);
    },
    loginUser:async (req,res)=>{
        const requestData = req.body;
        const isUserExist=await UserModel.findOneData({
            phoneNumber:requestData.phoneNumber
        });
        if(!isUserExist){
            sendError(res,isUserExist,"Invalid credentials")
        }
        else{
            sendResponse(res,isUserExist,"User logged in successfully",true,200);
        }
    },
    createChannel:async (req,res)=>{
        // To add - send different response if channel exist previously
        const channelUsers = req.body.channelUsers;
        const firstUser = channelUsers[0];
        const secondUser = channelUsers[1];
        let ischannelAlreadyExist = false;
        let channelModel;
        const channelList = await ChannelModel.findData({
            "channelUsers.email":firstUser.email
        })
        
        if( channelList && channelList.length){
            channelList.forEach((channel)=>{
                ischannelAlreadyExist = channel.channelUsers.find((user)=>user.email== secondUser.email)
                if(ischannelAlreadyExist){channelModel = channel}
            })
        }
        if(ischannelAlreadyExist){
            return( sendResponse(res,channelModel,"Channel fetched Successfully",true,200));
        }
        
        channelModel = new ChannelModel(req.body);
        await channelModel.saveData();
        sendResponse(res,channelModel,"Channel created Successfully",true.valueOf,201);
    },
    getChannelList:async (req,res)=>{
        const requestData = req.body;
        const channels =await ChannelModel.findData({
           "channelUsers.email":requestData.email
        })
        sendResponse(res,channels, "Channel List fetched",true,200);
    },
    searchUser:async (req,res)=>{
        const requestData = req.query;
        const isUserExist = await UserModel.findOneData({
            // Google Authentication
            email:requestData.email
            // phoneNumber:requestData.phone,
        });
        if(!isUserExist)
            ( sendError(res,{},"No User Found"));
        else{
            sendResponse(res,isUserExist,"User Found Successfully",true,200);
        }
    },
    sendMessage:async (req,res)=>{
        const requestData = req.body;
        console.log(requestData)
        let obc = await ChannelModel.findOne({"_id":requestData.channelId});
        if(obc!=null){
        obc.messages.push(requestData.messages);
        await ChannelModel.updateOne({"_id":requestData.channelId},{messages:obc.messages});   
        sendResponse(res,{},"Message sent successfully",true,200);}
        else{
            sendResponse(res,{},"Message Failed to send",false,400);
        }
    },
}   