import { customerController } from "../../controllers/user";
import { userAuthentication } from "../../middlewares/user/auth.middleware";
import { tryCatchHandle } from "../../utils";

function customerRoutes(app) {
    app.post('/user/customer/',userAuthentication, tryCatchHandle(customerController().getAllCustomers));
    app.post('/user/customer/addCustomer',userAuthentication, tryCatchHandle(customerController().addCustomer));
    app.patch('/user/customer/updateCustomer/:id',userAuthentication, tryCatchHandle(customerController().updateCustomer));
    app.delete('/user/customer/deleteCustomer/:id',userAuthentication, tryCatchHandle(customerController().deleteCustomer));
}

export { customerRoutes };