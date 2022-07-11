import { error, generateToken, generateTokenTracker, passwordCompare, objectValidatorEscape } from "../../utils"
import jwt from 'jsonwebtoken'
import { config } from '../../../../config';
import { createUser, findUser, findUserByIDAndTokenUpdate } from "../../services/user";
import { userRegistrationValidation } from "../../validations/user/auth/register.validation";
import { Customer } from "../../mongodb/user";
import { customerValidation } from "../../validations/user/customer.validation";

function customerController() {
    return {

        addCustomer: async (req, res) => {
            try {

              // const validation = customerValidation(req.body);
              // if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

              const user_id = req.user._id;
              const createdCustomer = await Customer.create({...req.body, user_id:user_id})
              res.json(createdCustomer)
            } catch (error) {
              res.json(false)
            }
        },
        getAllCustomers: async (req, res) => {
          console.log("log hit------------")
            try {
              if(req.user.isAdmin){
                const allCustomers = await Customer.find({}).populate('user_id')
                res.json(allCustomers)
              }else{
                const user_id = req.user._id;
                const allCustomers = await Customer.find({user_id: user_id})
                res.json(allCustomers)
              }
              
            } catch (error) {
              res.json(false)
            }
        },
        updateCustomer: async (req, res) => {
            try {
              const updatedCustomer = await Customer.findOneAndUpdate({_id: req.params.id}, req.body)
              const updatedCustomerList = await Customer.find({})
              res.json(updatedCustomerList)
            } catch (error) {
              res.json(false)
            }
        },
        deleteCustomer: async (req, res) => {
            try {
              const deletedCustomer = await Customer.deleteOne({_id: req.params.id})
              const updatedCustomerList = await Customer.find({})
              res.json(updatedCustomerList)
            } catch (error) {
              res.json(false)
            }
        },

        
    }
}
export { customerController };