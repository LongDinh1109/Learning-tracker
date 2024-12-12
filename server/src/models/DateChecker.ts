import mongoose, { Schema } from 'mongoose';
import { getDateAfter } from '../utils/getDate';

// TypeScript Types
type DateOfCheck = {
  date: Date;
  isChecked: boolean;
};
export type TimesOfCheck = 'first' | 'third' | 'seventh' | 'fourteenth';

interface IDateChecker extends Document {
  userId: Schema.Types.ObjectId;
  wordId: Schema.Types.ObjectId;
  createdAt: Date;
  dateOfCheck: Record<TimesOfCheck, DateOfCheck>
}

// Mongoose Sub-Schema for DateOfCheck
const DateOfCheckSchema = new Schema<DateOfCheck>({
  date: { type: Date, required: true },
  isChecked: { type: Boolean, required: true },
});

// Mongoose Schema for ICheck
const DateCheckSchema = new Schema<IDateChecker>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  wordId: { type: Schema.Types.ObjectId, ref: 'Word', required: true },
  createdAt: { type: Date, default: Date.now },
  dateOfCheck: {
    first: DateOfCheckSchema,
    third: DateOfCheckSchema,
    seventh: DateOfCheckSchema,
    fourteenth: DateOfCheckSchema,
  },
});

DateCheckSchema.pre('save', function (next) {
  this.dateOfCheck = {
    first: {
      date: getDateAfter(1),
      isChecked: false,
    },
    third: {
      date: getDateAfter(3),
      isChecked: false,
    },
    seventh: {
      date: getDateAfter(7),
      isChecked: false,
    },
    fourteenth: {
      date: getDateAfter(14),
      isChecked: false,
    },
  };

  next();
});

export default mongoose.model('DateChecker', DateCheckSchema);
