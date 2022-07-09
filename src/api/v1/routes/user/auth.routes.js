import { authController } from "../../controllers/user";
import { tryCatchHandle } from "../../utils";

function authRoutes(app) {
    app.post('/user/login', tryCatchHandle(authController().login));
    app.post('/user/register', tryCatchHandle(authController().register));
    app.get('/user/authenticate', tryCatchHandle(authController().authenticate));
}
export { authRoutes };