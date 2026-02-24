// Import the database models we need to work with
import User from '../models/User.js';
import Patient from '../models/Patient.js';

// LOGIN FUNCTION: Handles user sign-in
// 'req' is the request (contains email/password), 'res' is how we send a response
export const login = async (req, res) => {
  try {
    // Extract email and password from the data the user sent
    const { email, password } = req.body;

    // Reliability check: Ensure both fields were provided
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password required' });
    }

    // Try to find a user in the database that matches this email
    // .populate('patientProfile') also brings in their medical profile if they have one
    const user = await User.findOne({ email }).populate('patientProfile');

    // If no user was found, tell them the login failed
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the one in the database
    // (Note: In a professional app, we would use encryption here)
    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // If everything is correct, send back a success message and user data
    res.json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
        role: user.role,
        patientId: user.patientProfile?._id // Include their Patient ID if it exists
      },
      // Create a temporary session token (would be a real JWT in production)
      token: 'valid_session_token_' + Date.now()
    });
  } catch (error) {
    // If a server error happens (like database crash), send back the error message
    res.status(500).json({ error: error.message });
  }
};

// REGISTER FUNCTION: Handles creating a brand new account
export const register = async (req, res) => {
  try {
    // Extract the information the user provided in the signup form
    const { name, email, password } = req.body;

    // Basic check: Make sure no fields were left blank
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if an account already exists with this email address
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // STEP 1: Create the new Login account (User)
    const newUser = await User.create({
      name,
      email,
      password,
      role: 'patient' // New signups are always 'patients' by default
    });

    // STEP 2: Automatically create a dedicated medical profile (Patient) for this user
    // We split the full name into a First and Last name for the medical database
    const names = name.split(' ');
    const firstName = names[0];
    const lastName = names.slice(1).join(' ') || 'Patient';

    // Create the patient record and link it back to the User's ID
    const newPatient = await Patient.create({
      firstName,
      lastName,
      email,
      phone: 'Not updated', // Placeholder until the user fills their profile
      user: newUser._id
    });

    // STEP 3: Save the link to the patient profile back into the original User record
    newUser.patientProfile = newPatient._id;
    await newUser.save();

    // Send back a final success response
    res.status(201).json({
      success: true,
      message: 'Registration successful',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        patientId: newPatient._id
      }
    });
  } catch (error) {
    // If something goes wrong, report the error
    res.status(500).json({ error: error.message });
  }
};

// LOGOUT FUNCTION: Simply confirmation that the user is logged out
export const logout = async (req, res) => {
  try {
    // In a stateless system, the frontend just deletes its token. 
    // This server response just confirms the action was requested.
    res.json({ success: true, message: 'Logged out' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
