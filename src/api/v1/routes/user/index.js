import { authRoutes } from "./auth.routes";
import { customerRoutes } from "./customer.routes";
import { ExpenseRoutes } from "./expense.routes";
import { PaymentRoutes } from "./payment.routes";
import { ProductOrServiceRoutes } from "./productOrService.routes";
import { SpentRoutes } from "./spent.routes";
import { AllUserRoutes } from "./user.routes";

function UserRoutes(app) {
  authRoutes(app)
  customerRoutes(app)
  ExpenseRoutes(app)
  PaymentRoutes(app)
  ProductOrServiceRoutes(app)
  SpentRoutes(app)
  AllUserRoutes(app)
}
export { UserRoutes };