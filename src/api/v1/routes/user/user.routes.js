import { SpentController, UserController } from "../../controllers/user";
import { userAuthentication } from "../../middlewares/user/auth.middleware";
import { tryCatchHandle } from "../../utils";

function AllUserRoutes(app) {
    app.post('/user/getAllUsers',userAuthentication, tryCatchHandle(UserController().getAllUsers));
    // app.patch('/user/spent/updateSpent/:id',userAuthentication, tryCatchHandle(SpentController().updateSpent));
    // app.delete('/user/spent/deleteSpent/:id',userAuthentication, tryCatchHandle(SpentController().deleteSpent));
}
export { AllUserRoutes };