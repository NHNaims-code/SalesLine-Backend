import { error, generateToken, generateTokenTracker, passwordCompare, objectValidatorEscape } from "../../utils"
import jwt from 'jsonwebtoken'
import { config } from '../../../../config';
import { createUser, findUser, findUserByIDAndTokenUpdate } from "../../services/user";
import { userRegistrationValidation } from "../../validations/user/auth/register.validation";
import { Payment } from "../../mongodb/user";

function PaymentController() {
    return {

        addPayment: async (req, res) => {
            try {

              // const validation = PaymentValidation(req.body);
              // if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

              const user_id = req.user._id;
              const createdPayment = await Payment.create({...req.body, user_id:user_id})
              console.log("Log payment controller:",createdPayment)
              res.json(createdPayment)
            } catch (error) {
              console.log("error: ", error)
              res.json(false)
            }
        },
        getAllPayments: async (req, res) => {
            try {
              if(req.user.isAdmin){
                const allPayments = await Payment.find({}).populate('user_id').populate('customer').populate('product')
                res.json(allPayments)
              }else{
                const user_id = req.user._id;
                const allPayments = await Payment.find({user_id: user_id}).populate('customer').populate('product')
                res.json(allPayments)
              }
            } catch (error) {
              res.json(false)
            }
        },
        updatePayment: async (req, res) => {
          console.log("log: 36 => hit")
            try {
              const updatedPayment = await Payment.findOneAndUpdate({_id: req.params.id}, req.body)
              console.log("update payment: ", updatedPayment)
              res.json(updatedPayment)
            } catch (error) {
              console.log("log: 42 => ", error)
              res.json(false)
            }
        },
        deletePayment: async (req, res) => {
            try {
              const deletedPayment = await Payment.deleteOne({_id: req.params.id})
              const user_id = req.user._id;
                const allPayments = await Payment.find({user_id: user_id}).populate('customer').populate('product')
              res.json(allPayments)
            } catch (error) {
              res.json(false)
            }
        },

        
    }
}
export { PaymentController };