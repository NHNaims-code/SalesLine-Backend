import mongoose from "mongoose";

const ExpenseModel = new mongoose.Schema({
    item_name: {
      type: String,
      required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String
    },
    amount: {
      type: String,
      required: true
    }

}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_at' } } );

export default mongoose.model('expense', ExpenseModel);