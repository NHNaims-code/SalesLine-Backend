import { error, generateToken, generateTokenTracker, passwordCompare, objectValidatorEscape } from "../../utils"
import jwt from 'jsonwebtoken'
import { config } from '../../../../config';
import { createUser, findUser, findUserByIDAndTokenUpdate } from "../../services/user";
import { userRegistrationValidation } from "../../validations/user/auth/register.validation";
import { User } from "../../mongodb/user";

function authController() {
    return {

        login: async (req, res) => {
            const { email, password } = req.body;
            console.log("test: ", req.body)
            // Validate all information
            // const validation = loginValidation(req.body);
            // if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a customer using email
            const user = await findUser({ email: email });
            console.log("log: ", user)
            if (!user) return error().resourceError(res, 'Invalid Credentials', 401);

            

            const passwordMatch = await passwordCompare(password, user);
            console.log("log2: ", passwordMatch)
            if (!passwordMatch) return error().resourceError(res, 'Invalid Credentials.', 401);


            const verifyTokenTracker = await generateTokenTracker();
            const token = generateToken(user, verifyTokenTracker);

            await findUserByIDAndTokenUpdate({_id : user._id}, { token: verifyTokenTracker });
            return res.status(200).json({ token: token, user: {...user} });
        },

        register: async (req, res) => {
            // De-Structure data from req.body
            const { username, email, password } = req.body;

            console.log(req.body)
            // Validate all information
            const validation = userRegistrationValidation(req.body);
            if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

            //find a customer is assigned to the same email
            const user = await findUser({ email });
            if (user) return error().resourceError(res, 'Email already exists. Please choose a different Email', 409);

            //malicious data refactor
            const refactor_data = await objectValidatorEscape(req.body);

            console.log("register data: ", refactor_data)
            console.log("register data body: ", req.body)

            if(req?.body?.isAdmin == 'true'){
                if(req?.body?.secret_code == process.env.ADMIN_SECRET_CODE){
                    await createUser({...refactor_data, isAdmin: true});
                    console.log("admin created")
                    return res.status(201).json({message : 'Register Successful', secret_code: true});
                }else{
                    return res.json({secret_code: false})
                }
            }else{
                await createUser({...refactor_data, isAdmin: false});
                return res.status(201).json({message : 'Register Successful', secret_code: null});
            }
            // save into mongo db
            
        },

         //Cookie Authentication
         authenticate: async (req, res) => {

            console.log("hitt: ", req.header('Authorization'))
            const token = req.header('Authorization');
            if(!token){
                console.log("log: ", token)
                return res.json(false);
            }else{
                console.log("log2: ", token)
            }
            if (!token) return res.status(403).json(false);
            
            try {
                const verify_token = jwt.verify(token, config?.jwt?.key);
                const user = await findUser({ $and: [{ _id: verify_token._id }, { token: verify_token?.verifyToken }] })
                if (!user) return res.status(401).json(false);
                return res.status(200).json(true);
            } catch (err) {
                console.log(err)
                return res.status(401).json(false);
            }

        },
       
    }
}
export { authController };