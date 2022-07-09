import { ProductOrServiceController } from "../../controllers/user";
import { userAuthentication } from "../../middlewares/user/auth.middleware";
import { tryCatchHandle } from "../../utils";

function ProductOrServiceRoutes(app) {
    app.post('/user/productOrService/',userAuthentication, tryCatchHandle(ProductOrServiceController().getAllProductOrServices));
    app.post('/user/productOrService/addProductOrService',userAuthentication, tryCatchHandle(ProductOrServiceController().addProductOrService));
    app.patch('/user/productOrService/updateProductOrService/:id',userAuthentication, tryCatchHandle(ProductOrServiceController().updateProductOrService));
    app.delete('/user/productOrService/deleteProductOrService/:id',userAuthentication, tryCatchHandle(ProductOrServiceController().deleteProductOrService));
}
export { ProductOrServiceRoutes };