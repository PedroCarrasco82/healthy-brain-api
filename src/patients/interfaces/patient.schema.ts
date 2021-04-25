import * as mongoose from 'mongoose';

export const PatientSchema = new mongoose.Schema(
  {
    phoneNumber: String,
    email: {
      type: String,
      unique: true,
    },
    birthdayDate: Date,
    name: String,
    password: {
      type: String,
      select: false,
    },
  },
  {
    timestamps: true,
    collection: 'patients',
  },
);
