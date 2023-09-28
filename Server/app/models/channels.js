import mongoose, { mongo } from 'mongoose';
// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}
const channelSchema = new mongoose.Schema({
    channelUsers : [
        {
        email:{type:String,default:""},
        name:{type:String,default:""},
        profilePic:{type:String,default:""},
        },
    ],
    messages:[
        {
        senderEmail:{type:String,default:""},
        message:{type:String,default:""},
        addedOn:{type:String,default:String(((new Date()).timeNow()))}
        },
    ],
    addedOn:{type:String,default:(new Date()).timeNow()}
});

channelSchema.method({
    saveData:async function (){
        return(this.save())
    }
});
channelSchema.static({
    findData: function (findObj){
        return(this.find(findObj));
    },
    findOneData:function (findObj){
        return( this.find(findObj))
    },
    findOneAndUpdateData:function(findObj,updateObj){
        return( this.findOneAndUpdate(findObj,updateObj),{
            upsert:true,
            new:true,
            setDefaultOnInsert:true
        })
    }
});


export default mongoose.model('wc-channel',channelSchema);