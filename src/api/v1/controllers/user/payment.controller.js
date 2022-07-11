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
              console.log("recieved data: ", req.body)
              if(req.user.isAdmin){
                const createdPayment = await Payment.create({...req.body, user_id:user_id})
                res.json(createdPayment)
              }else{
                const createdPayment = await Payment.create({organisation: req.body.organisation, amount: req.body.amount, invoice_no: req.body.invoice_no, note: req.body.note, user_id:user_id})          
                res.json(createdPayment)
              }
            } catch (error) {
              console.log("error: ", error)
              res.json(false)
            }
        },
        getAllPayments: async (req, res) => {
            try {
         
                const allPayments = await Payment.find({organisation: req.user.organisation}).populate('user_id').populate('customer').populate('product')
                res.json(allPayments)
             
            } catch (error) {
              res.json(false)
            }
        },
        updatePayment: async (req, res) => {
          console.log("log: 36 => hit")
            try {
              const updatedPayment = await Payment.findOneAndUpdate({_id: req.params.id}, req.body)
              console.log("update payment: ", updatedPayment)
              const allPayments = await Payment.find({organisation: req.user.organisation}).populate('customer').populate('product')
              res.json(allPayments)
            } catch (error) {
              console.log("log: 42 => ", error)
              res.json(false)
            }
        },
        deletePayment: async (req, res) => {
            try {
              const deletedPayment = await Payment.deleteOne({_id: req.params.id})
              const user_id = req.user._id;
              const allPayments = await Payment.find({organisation: req.user.organisation}).populate('customer').populate('product')
              res.json(allPayments)
            } catch (error) {
              res.json(false)
            }
        },

        
    }
}
export { PaymentController };