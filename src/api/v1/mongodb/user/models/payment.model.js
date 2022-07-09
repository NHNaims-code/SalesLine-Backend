import mongoose from "mongoose";

const PaymentModel = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductOrService',
        required: true
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: String
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    invoice_no: {
      type: Number,
    },
    note: {
      type: String
    }

}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_at' } } );

export default mongoose.model('Payment', PaymentModel);