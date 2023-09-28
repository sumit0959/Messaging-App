import mongoose, { mongo } from 'mongoose';
// For the time now
Date.prototype.timeNow = function () {
    return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

const UserSchema = new mongoose.Schema({
    name:{type:String,default:""},
    email:{type:String,default:""}, //google authentication
    phoneNumber:{type:String,default:""},
    profilePic:{type:String,default:""},
    addedOn:{type:String,default:String(new Date().timeNow())}
});

UserSchema.method({
    saveData: async function () {
        return this.save()
    }
});
UserSchema.static({
    // NOte: here 'this' will not work
    // findData: (findObj)=>{
    //     return(this.find(findObj));
    // }
    findData: function (findObj) {
        return this.find(findObj)
    },
    findOneData: function (findObj) {
        return this.findOne(findObj)
    },
    findOneAndUpdateData: function (findObj, updateObj) {
        return this.findOneAndUpdate(findObj, updateObj, {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
        })
    },
});


export default mongoose.model('wc-user',UserSchema);