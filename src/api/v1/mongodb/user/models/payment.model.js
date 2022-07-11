import mongoose from "mongoose";

const PaymentModel = new mongoose.Schema({
    product: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductOrService',
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    organisation: {
      type: String,
      required: true,
      trim: true,
    },
    amount: {
      type: String
    },
    date_time: {
      type: Date,
      default: new Date()
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
    },
    invoice_no: {
      type: String,
    },
    note: {
      type: String
    }

}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_at' } } );

export default mongoose.model('Payment', PaymentModel);