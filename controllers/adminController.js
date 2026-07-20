import Admin from "../models/Admin.js";
import generateToken from "../utils/generateToken.js";

export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Email:", email);
    console.log("Password:", password);

    const admin = await Admin.findOne({ email });

    console.log("Admin:", admin);

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await admin.matchPassword(password);

    console.log("Password Match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    res.json({
  _id: admin._id,
  username: admin.username,
  email: admin.email,
  role: admin.role,
  token: generateToken(admin._id),
});

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};