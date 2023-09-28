import * as yup from 'yup'; 
import {sendResponse, sendError} from './index';
export const ValidateCreateUser = async (req,res,next)=>{
    let schema = yup.object().shape({
        phoneNumber:yup.number(),
        name:yup.string().required(),
        email:yup.string().required(),
        profilePic:yup.string()
    })
    await validate(schema, req.body,res,next);

};

export const ValidateLogin = async (req,res,next)=>{
    const schema=yup.object().shape({
        phoneNumber:yup.number().required(),
        password:yup.string().required()
    });
    await validate(schema,req.body,res,next);
};
export const ValidateGetChannelList= async (req,res,next)=>{
    const schema= yup.object().shape({
        // users:yup.array().of(yup.object().shape({
        //     email:yup.string().required(),
        //     name:yup.string().required(),
        //     profilePic:yup.string(),
        // })).required(),
        "email":yup.string().required()
    })
    await validate(schema,req.body,res,next);
};

export const ValidateSearchUser = async (req,res,next) =>{
    const schema = yup.object().shape({
        email:yup.string().required()
    });
    await validate(schema, req.query,res,next);
};
export const ValidateCreateChannel = async (req,res,next)=>{
    const schema = yup.object().shape({
        channelUsers:yup.array().of(yup.object().shape({
            email:yup.string().required(),
            name:yup.string().required(),
            profilePic:yup.string(),
        })).length(2).required(),
    });
    await validate(schema,req.body,res,next);
};
export const ValidateAddMessage = async (req,res,next)=>{
    const schema=yup.object().shape({
        channelId:yup.string().required(),
        messages:yup.object().shape({
            senderEmail:yup.string().required(),
            message:yup.string().required()
        }),
    });
    await validate(schema,req.body,res,next);
};



const validate = async (schema,reqData,res,next)=>{
    try{
        await schema.validate(reqData,{abortEarly:false}).then((valid)=>{
            if(valid){next();}
        }).catch((err)=>{
            const errors= err.inner.map(({path,message,value})=>({
                path,message,value,
            }));
            sendError(res,errors,"Invalid Request");
        })
    }
    catch(e){
        const errors= e.inner.map(({path,message,value})=>({
            path,message,value,
        }));
        sendError(res,errors,"Invalid Request");
    }
}