import { UserTypes } from '../../helpers/user-types-enum';
import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema(
  {
    phoneNumber: String,
    email: {
      type: String,
      unique: true,
      required: true,
    },
    birthdayDate: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    userType: {
      type: String,
      enum: UserTypes,
      required: true,
    },
    professionalHealthRegisterCode: {
      registerCodeType: String,
      code: String,
    },
    healthArea: String,
    officeAddress: String,
    formationType: String,
    description: String,
  },
  {
    timestamps: true,
    collection: 'users',
  },
);
