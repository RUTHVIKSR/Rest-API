import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email : { type: String, required: true, unique: true },
    authentication : {
        password : { type: String, required: true, select: false },
        salt : {type: String, select: false},
        sessionToken : {type: String, select: false},
    }
})

export const userModel = mongoose.model("User", userSchema);

export const getUsers = () => userModel.find();
export const findUserById = (id: string) => userModel.findById(id);
export const getUserByEmail = (email: string) => userModel.findOne({ email });
export const getUserBySessionToken = (sessionToken : string) => userModel.findOne({
    'authentication.sessionToken' : sessionToken,
}) 

export const createUser = (values: Record<string, any>) => new userModel(values)
.save().then((user) => user.toObject());

export const deleteUserById = (id: string) => userModel.findByIdAndDelete({_id: id});

export const updateUserById = (id: string, updates: Record<string, any>) => 
    userModel.findByIdAndUpdate(id, updates);