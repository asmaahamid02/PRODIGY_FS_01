import mongoose, { Document, Model } from 'mongoose'

export interface IUser {
  email: string
  password: string
  name: string
  role: string
}

export interface IUserDocument extends IUser, Document {
  createdAt: Date
  updatedAt: Date
}

const userSchema = new mongoose.Schema<IUserDocument>(
  {
    email: { type: String, required: true, unique: true, maxlength: 50 },
    password: { type: String, required: true },
    name: { type: String, required: true, minlength: 5, maxlength: 50 },
    role: { type: String, required: true, default: 'user' },
  },
  { timestamps: true }
)

const User: Model<IUserDocument> =
  mongoose.models.User || mongoose.model('User', userSchema)

export default User
