import mongoose from 'mongoose';

// Define the Subscription schema
const subscriptionSchema = new mongoose.Schema(
  {
    name: {
      type: String, // Name of the subscription
      required: [true, 'Name is required'], // This field is mandatory
      trim: true, // Automatically trim whitespace
      minLength: 2, // Minimum length for the name
      maxLength: 100, // Maximum length for the name
    },
    price: {
      type: Number, // Price of the subscription
      required: [true, 'Price is required'], // This field is mandatory
      min: [0, 'Price must be greater than 0'], // Minimum price validation
    },
    currency: {
      type: String, // Currency for the subscription price
      enum: ['USD', 'EUR', 'GBP'], // Allowable values for currency
      default: 'USD', // Default currency
    },
    frequency: {
      type: String, // Payment frequency (how often the user pays)
      enum: ['daily', 'weekly', 'monthly', 'yearly'], // Allowable frequency values
    },
    category: {
      type: String, // Category of the subscription
      enum: [
        // List of supported categories
        'sports',
        'news',
        'entertainment',
        'lifestyle',
        'technology',
        'finance',
        'politics',
        'other',
      ],
      required: true, // This field is mandatory
    },
    paymentMethod: {
      type: String, // Payment method used for the subscription
      required: true, // This field is mandatory
      trim: true, // Automatically trim whitespace
    },
    status: {
      type: String, // Status of the subscription
      enum: ['active', 'cancelled', 'expired'], // Valid statuses
      default: 'active', // Default status
    },
    startDate: {
      type: Date, // Subscription start date
      required: true, // This field is mandatory
      validate: {
        validator: value => value <= new Date(), // Ensure the start date is in the past
        message: 'Start date must be in the past', // Error message for validation failure
      },
    },
    renewalDate: {
      type: Date, // Renewal date for the subscription
      validate: {
        // Ensure the renewal date is after the start date
        validator: function (value) {
          return value > this.startDate;
        },
        message: 'Renewal date must be after the start date', // Error message for validation failure
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId, // Reference to the associated user
      ref: 'User', // Reference to the 'User' model
      required: true, // This field is mandatory
      index: true, // Add an index for faster queries
    },
  },
  { timestamps: true }, // Automatically add `createdAt` and `updatedAt` fields
);

// Pre-save middleware to set the renewal date and update subscription status
subscriptionSchema.pre('save', function (next) {
  // If no renewal date is provided, calculate it based on the start date and frequency
  if (!this.renewalDate) {
    const renewalPeriods = {
      daily: 1, // Renewal period in days for daily subscriptions
      weekly: 7, // Renewal period in days for weekly subscriptions
      monthly: 30, // Renewal period in days for monthly subscriptions
      yearly: 365, // Renewal period in days for yearly subscriptions
    };

    // Calculate the renewal date
    this.renewalDate = new Date(this.startDate);
    this.renewalDate.setDate(
      this.renewalDate.getDate() + renewalPeriods[this.frequency],
    );
  }

  // If the renewal date is in the past, set the subscription status to 'expired'
  if (this.renewalDate < new Date()) {
    this.status = 'expired';
  }

  next(); // Continue with the save operation
});

// Create the Subscription model using the schema
const Subscription = mongoose.model('Subscription', subscriptionSchema);

export { Subscription }; // Export the Subscription model for use in other parts of the application
