import { error, generateToken, generateTokenTracker, passwordCompare, objectValidatorEscape } from "../../utils"
import jwt from 'jsonwebtoken'
import { config } from '../../../../config';
import { createUser, findUser, findUserByIDAndTokenUpdate } from "../../services/user";
import { userRegistrationValidation } from "../../validations/user/auth/register.validation";
import { ProductOrService } from "../../mongodb/user";

function ProductOrServiceController() {
    return {

        addProductOrService: async (req, res) => {
            try {

              // const validation = ProductOrServiceValidation(req.body);
              // if (validation.error) return error().resourceError(res, validation.error?.details[0].message, 422);

              const user_id = req.user._id;
              const createdProductOrService = await ProductOrService.create({...req.body, user_id:user_id})
              res.json(createdProductOrService)
            } catch (error) {
              console.log(error)
              res.json(false)
            }
        },
        getAllProductOrServices: async (req, res) => {
            try {
              const allProductOrServices = await ProductOrService.find({organisation: req.user.organisation}).populate('user_id')
              res.json(allProductOrServices)
            } catch (error) {
              console.log(error)
              res.json(false)
            }
        },
        updateProductOrService: async (req, res) => {
            try {
              const updatedProductOrService = await ProductOrService.findOneAndUpdate({_id: req.params.id}, req.body)
              const updatedList = await ProductOrService.find({organisation: req.user.organisation})
              res.json(updatedList)
            } catch (error) {
              res.json(false)
            }
          },
          deleteProductOrService: async (req, res) => {
            try {
              const deletedProductOrService = await ProductOrService.deleteOne({_id: req.params.id})
              const updatedList = await ProductOrService.find({organisation: req.user.organisation})
              res.json(updatedList)
            } catch (error) {
              res.json(false)
            }
        },

        
    }
}
export { ProductOrServiceController };