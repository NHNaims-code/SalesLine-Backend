import { error, generateToken, generateTokenTracker, passwordCompare, objectValidatorEscape } from "../../utils"
import jwt from 'jsonwebtoken'
import { config } from '../../../../config';
import { createUser, findUser, findUserByIDAndTokenUpdate } from "../../services/user";
import { userRegistrationValidation } from "../../validations/user/auth/register.validation";
import { Spent } from "../../mongodb/user";

function SpentController() {
    return {

        addSpent: async (req, res) => {
          console.log("hit")
            try {

              // const validation = SpentValidation(req.body);
              // if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

              const user_id = req.user._id;
              const createdSpent = await Spent.create({...req.body, user_id:user_id})
              console.log("created: ", createdSpent)
              res.json(createdSpent)
            } catch (error) {
              console.log(error)
              res.json(false)
            }
        },
        getAllSpents: async (req, res) => {
          console.log("hittt")
            try {
              const user_id = req.user._id;
              const allSpents = await Spent.find({user_id: user_id}).populate('item')
              res.json(allSpents)
            } catch (error) {
              console.log(error)
              res.json(false)
            }
        },
        updateSpent: async (req, res) => {
            try {
              const updatedSpent = await Spent.findOneAndUpdate({_id: req.params.id}, req.body)
              res.json(updatedSpent)
            } catch (error) {
              res.json(false)
            }
        },
        deleteSpent: async (req, res) => {
            try {
              const deletedSpent = await Spent.deleteOne({_id: req.params.id})
              res.json(deletedSpent)
            } catch (error) {
              res.json(false)
            }
        },

        todaySpent: async (req, res) => {
          try {
            
            var now = new Date();
            var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            const todaysData = await Spent.find({created_on: {$gte: startOfToday}});
            res.json(todaysData);

          } catch (error) {
            res.json(false)
          }
        },
        yesterdaySpent: async (req, res) => {
          try {
            
            var now = new Date();
            const yesterday = now.setDate(now.getDate()-1);
            var st = new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate());
            const todaysData = await Spent.find({created_on: {$gte: startOfToday, $lte: start}});
            res.json(todaysData);

          } catch (error) {
            res.json(false)
          }
        }
        
    }
}
export { SpentController };