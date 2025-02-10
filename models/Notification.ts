import mongoose, { models, Schema, model } from "mongoose";

// Define a TypeScript interface for the Notification model
export interface INotification {
  from: mongoose.Schema.Types.ObjectId; // Reference to the user who sent the notification
  to: mongoose.Schema.Types.ObjectId; // Reference to the user who received the notification
  type: "like" | "comment" | "follow"; // Allowed notification types
  read?: boolean; // Optional field to track if the notification is read (default: false)
}

// Define the Mongoose schema for the Notification model
const notificationSchema = new Schema<INotification>(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId, // Stores a user ID (foreign key)
      ref: "User", // Reference to the User model
      required: true, // This field is mandatory
    },
    to: {
      type: mongoose.Schema.Types.ObjectId, // Stores a user ID (foreign key)
      ref: "User", // Reference to the User model
      required: true, 
    },
    type: {
      type: String, // Stores the notification type as a string
      required: true, 
      enum: ["like", "comment", "follow"], // Restrict values to specific types
    },
    read: {
      type: Boolean, // Boolean value to check if the notification is read
      default: false, // Default value is false (unread)
    },
  },
  { timestamps: true } // Automatically adds 'createdAt' and 'updatedAt' timestamps
);

// Check if the model already exists to avoid redefinition errors
const Notification =
  models.Notification || model<INotification>("Notification", notificationSchema);

// Export the model so it can be used in other parts of the project
export default Notification;
