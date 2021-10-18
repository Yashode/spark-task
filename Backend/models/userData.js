import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
        "firstname":String,
        "lastname":String,
        "college":String,
        "enrollmentNumber":String,
        "branch":String,
        "year":String,
        "phoneNumber":String,
		"email" : String,
        "password": String
});

const Users = mongoose.model('Users', userSchema);

export default Users;