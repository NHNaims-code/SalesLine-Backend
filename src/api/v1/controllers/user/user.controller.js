import { User } from "../../mongodb/user";

function UserController() {
    return {

        getAllUsers: async (req, res) => {
    
          try {
            if(req.user.isAdmin){
              const allUsers = await User.find({organisation: req.user.organisation});
              res.json(allUsers)
            }
          } catch (error) {
            res.json(false)
          }
        },
        deleteUser: async (req, res) => {
          try {
            if(req.user.isAdmin){
              const deletedUser = await User.deleteOne({_id: req.params.id})
              const allUsers = await User.find({organisation: req.user.organisation});
              res.json(allUsers)
            }
          } catch (error) {
              console.log(error)
            res.json(false)
          }
      },

        // updateSpent: async (req, res) => {
        //     try {
        //       const updatedSpent = await Spent.findOneAndUpdate({_id: req.params.id}, req.body)
        //       res.json(updatedSpent)
        //     } catch (error) {
        //       res.json(false)
        //     }
        // },
        // deleteSpent: async (req, res) => {
        //     try {
        //       const deletedSpent = await Spent.deleteOne({_id: req.params.id})
        //       res.json(deletedSpent)
        //     } catch (error) {
        //       res.json(false)
        //     }
        // },
        
    }
}
export { UserController };