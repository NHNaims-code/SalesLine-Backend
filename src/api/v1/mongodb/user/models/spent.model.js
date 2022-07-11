import mongoose from "mongoose";

const SpentModel = new mongoose.Schema({
    item: {
      type: mongoose.Schema.Types.ObjectId,
        ref: 'expense',
        required: true
    },
    description: {
      type: String
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
    date_time: {
      type: Date,
      default: new Date()
    },
    cost_price: {
      type: Number,
      required: true
    },
    unit: {
      type: Number,
      required: true
    },
    date_time: {
      type: String,
      required: true
    }

}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_at' } } );

export default mongoose.model('SpentMoney', SpentModel);