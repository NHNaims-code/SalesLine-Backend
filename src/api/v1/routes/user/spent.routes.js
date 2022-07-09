import { SpentController } from "../../controllers/user";
import { userAuthentication } from "../../middlewares/user/auth.middleware";
import { tryCatchHandle } from "../../utils";

function SpentRoutes(app) {
    app.post('/user/spent/',userAuthentication, tryCatchHandle(SpentController().getAllSpents));
    app.post('/user/spent/addSpent',userAuthentication, tryCatchHandle(SpentController().addSpent));
    app.patch('/user/spent/updateSpent/:id',userAuthentication, tryCatchHandle(SpentController().updateSpent));
    app.delete('/user/spent/deleteSpent/:id',userAuthentication, tryCatchHandle(SpentController().deleteSpent));
}
export { SpentRoutes };