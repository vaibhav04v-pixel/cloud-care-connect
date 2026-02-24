// Import the 'mongoose' library which helps us define the structure of our database records
import mongoose from 'mongoose';

// Define the 'User' structure (Schema)
// This is like a blueprint for what a User record looks like in our database
const userSchema = new mongoose.Schema({
    // Store the email address
    email: {
        type: String, // Data must be text
        required: true, // This field cannot be empty
        unique: true, // No two users can have the same email
        lowercase: true, // Automatically convert email to lowercase before saving
        trim: true // Remove any accidental spaces at the beginning or end
    },
    // Store a link to the Patient profile (if the user is a patient)
    // This allows us to connect a Login account to actual Medical data
    patientProfile: {
        type: mongoose.Schema.Types.ObjectId, // This is a special ID that points to another record
        ref: 'Patient' // It specifically points to a record in the 'Patient' collection
    },
    // Store the password
    password: {
        type: String, // Data must be text
        required: true // This field cannot be empty
    },
    // Store the user's role (what they are allowed to do)
    role: {
        type: String, // Data must be text
        enum: ['admin', 'doctor', 'patient'], // It MUST be one of these three options
        default: 'admin' // If not specified, they start as an 'admin'
    },
    // Store the user's display name
    name: {
        type: String, // Data must be text
        required: true // This field cannot be empty
    }
}, {
    // Automatically add 'createdAt' and 'updatedAt' timestamps to every record
    timestamps: true
});

// Create and export the 'User' model based on the schema blueprint above
// This model will be used in our code to Create, Read, Update, and Delete users
export default mongoose.model('User', userSchema);
