import { error, generateToken, generateTokenTracker, passwordCompare, objectValidatorEscape } from "../../utils"
import jwt from 'jsonwebtoken'
import { config } from '../../../../config';
import { createUser, findUser, findUserByIDAndTokenUpdate } from "../../services/user";
import { userRegistrationValidation } from "../../validations/user/auth/register.validation";
import { Expense } from "../../mongodb/user";

function ExpenseController() {
    return {

        addExpense: async (req, res) => {
            try {

              // const validation = ExpenseValidation(req.body);
              // if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

              const user_id = req.user._id;
              const createdExpense = await Expense.create({...req.body, user_id:user_id})
              res.json(createdExpense)
            } catch (error) {
              res.json(false)
            }
        },
        getAllExpenses: async (req, res) => {
            try {
              if(req.user.isAdmin){
                const allExpenses = await Expense.find({}).populate('user_id')
                res.json(allExpenses)
              }else{
                const user_id = req.user._id;
                const allExpenses = await Expense.find({user_id: user_id})
                res.json(allExpenses)
              }
            } catch (error) {
              console.log(error)
              res.json(false)
            }
        },
        updateExpense: async (req, res) => {
            try {
              const updatedExpense = await Expense.findOneAndUpdate({_id: req.params.id}, req.body)
              const updatedList = await Expense.find({})
              res.json(updatedList)
            } catch (error) {
              res.json(false)
            }
        },
        deleteExpense: async (req, res) => {
            try {
              const deletedExpense = await Expense.deleteOne({_id: req.params.id})
              const updatedList = await Expense.find({})
              res.json(updatedList)
            } catch (error) {
              res.json(false)
            }
        },

        
    }
}
export { ExpenseController };