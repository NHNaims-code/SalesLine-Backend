import { PaymentController } from "../../controllers/user";
import { userAuthentication } from "../../middlewares/user/auth.middleware";
import { tryCatchHandle } from "../../utils";

function PaymentRoutes(app) {
    app.post('/user/payment',userAuthentication, tryCatchHandle(PaymentController().getAllPayments));
    app.post('/user/payment/addPayment',userAuthentication, tryCatchHandle(PaymentController().addPayment));
    app.patch('/user/payment/updatePayment',userAuthentication, tryCatchHandle(PaymentController().updatePayment));
    app.delete('/user/payment/deletePayment',userAuthentication, tryCatchHandle(PaymentController().deletePayment));
}
export { PaymentRoutes };