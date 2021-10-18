import Users from "../../models/userData.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const getUserData = async (req, res) => {
	const{ email, password } = req.body;
	try{	
		console.log("controll");	
		const user = await Users.findOne( {email} );
		console.log("controll");
		if(!user) return res.status(404).json( { message: "User does not exist" });
		console.log("controll");
		const checkPassword = await bcrypt.compare( password, user.password);
		console.log("controll");		
		if(!checkPassword) return res.status(404).json( { message: "Password is incorrect" });
		console.log("controll");	
		const token = jwt.sign({ email: user.email, id: user._id }, 'xyz', { expiresIn: '1hr' });
		console.log("controll");	
		res.status(200).json({ result: user, token});
		console.log("user data send from server");

	} catch(error){
		res.status(404).json({ message: error.message });
		res.send(error);
	}
}

export const createUser = async (req, res) => {
	
	const {email, password, confirmPassword, firstname, lastname, _id, college, branch, enrollmentNumber, year, phoneNumber} = req.body;


	try{
		// console.log(Users);
		// const userCheck = await Users.findOne( {email} );
		// console.log(userCheck);
		// if (userCheck) {res.status(404).json( { message: "User already exist" })};
		// // (password != confirmPassword) && (res.status(404).json( { message: "Passwords does not match" }));
		// console.log("controller");
		const hashedPassword = await bcrypt.hash(password, 12);
		const result = await Users.create({ email, password:hashedPassword, firstname, lastname, college, branch, enrollmentNumber, year, phoneNumber })
		const token = jwt.sign({ email: email, id: _id }, 'xyz', {expiresIn: "1hr"} );
		res.status(201).json({result, token});
		console.log("new user created and logged In");
	} catch(error){
		res.status(409).json({ message: error.message });
		res.send(error);
	}
}