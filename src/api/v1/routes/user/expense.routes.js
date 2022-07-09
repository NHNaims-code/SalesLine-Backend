import { ExpenseController } from "../../controllers/user";
import { userAuthentication } from "../../middlewares/user/auth.middleware";
import { tryCatchHandle } from "../../utils";

function ExpenseRoutes(app) {
    app.post('/user/expenseItem/',userAuthentication, tryCatchHandle(ExpenseController().getAllExpenses));
    app.post('/user/expenseItem/addExpenseItem',userAuthentication, tryCatchHandle(ExpenseController().addExpense));
    app.patch('/user/expenseItem/updateExpenseItem/:id',userAuthentication, tryCatchHandle(ExpenseController().updateExpense));
    app.delete('/user/expenseItem/deleteExpenseItem/:id',userAuthentication, tryCatchHandle(ExpenseController().deleteExpense));
}
export { ExpenseRoutes };