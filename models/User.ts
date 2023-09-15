import mongoose, { Schema, Document } from 'mongoose'

export interface User extends Document {
  name: string
  email: string
  password: string
  role: string
  image: string
  emailVerified: boolean
  defaultPaymentMethod: string
  address: Address[]
  wishlist: Wishlist[]
}

export interface Address extends Document {
  firstName: string
  lastName: string
  phoneNumber: string
  address1: string
  address2: string
  city: string
  zipCode: string
  state: string
  country: string
  active: boolean
}

export interface Wishlist extends Document {
  product: mongoose.Types.ObjectId
  style: string
}

const addressSchema = new Schema<Address>({
  firstName: String,
  lastName: String,
  phoneNumber: String,
  address1: String,
  address2: String,
  city: String,
  zipCode: String,
  state: String,
  country: String,
  active: {
    type: Boolean,
    default: false,
  },
})

const wishlistSchema = new Schema<Wishlist>({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product',
  },
  style: String,
})

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: 'Please enter your full name.',
    },
    email: {
      type: String,
      required: 'Please enter your email address.',
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: 'Please enter a password.',
    },
    role: {
      type: String,
      default: 'user',
    },
    image: {
      type: String,
      default:
        'https://res.cloudinary.com/dmhcnhtng/image/upload/v1664642478/992490_b0iqzq.png',
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    defaultPaymentMethod: {
      type: String,
      default: '',
    },
    address: [addressSchema],
    wishlist: [wishlistSchema],
  },
  {
    timestamps: true,
  },
)

const User = mongoose.models.User || mongoose.model<User>('User', userSchema)

export default User
