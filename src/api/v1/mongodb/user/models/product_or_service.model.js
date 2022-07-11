import mongoose from "mongoose";

const ProductOrServiceModel = new mongoose.Schema({
    name: {
      type: String,
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
    expire: {
      type: String
    }, 
    price: {
      type: Number,
      required: true
    },
    quantity: {
      type: Number,
      required: true
    },
    date_time: {
      type: Date,
      default: new Date()
    },
    unit: {
      type: String,
      required: true
    }

}, { timestamps: { createdAt: 'created_date', updatedAt: 'updated_at' } } );

export default mongoose.model('ProductOrService', ProductOrServiceModel);