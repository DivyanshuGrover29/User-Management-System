import mongoose, {Document, Schema} from "mongoose";
import { v4 as uuidv4 } from 'uuid';

//Interface for TypeScript typing
export interface User extends Document{
    id: string;
    username: string;
    age:number;
    hobbies:string[];
}

const userSchema: Schema= new Schema({
     id: { 
        type: String, 
        default: uuidv4,
        unique: true,//Ensure the UUID is unique
    },
     username: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    hobbies: {
        type:[String],
        required:true,
        default: [],
    },
},{timestamps: true});

export default mongoose.model<User>('User', userSchema);