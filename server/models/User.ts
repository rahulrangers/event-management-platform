import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    userId: string;
    name: string;
    email: string;
    password: string;
    role: string;
    myevents: string[];
}

const UserSchema: Schema = new Schema(
    {
        userId:{type:String, required:true},
        name: { type: String, required: true },
        role:{type: String, required: true,default: 'user'},
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        myevents: [{
            type:String,
            default:[],
        }]
    }
);

const User = mongoose.model<IUser>('User', UserSchema);

export default User;
