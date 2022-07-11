import mongoose from "mongoose";

const CustomerModel = new mongoose.Schema({
    customer_name: {
      type: String,
      required: true
    },
    organisation: {
        type: String,
        required: true,
        trim: true,
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    description: {
      type: String
    },
    address: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    date_time: {
      type: Date,
      default: new Date()
    },
    type: {
      type: String,
      required: true
    }

}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_at' } } );

export default mongoose.model('Customer', CustomerModel);