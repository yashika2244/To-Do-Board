// import jwt from 'jsonwebtoken';

// const protect = (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "No token" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = decoded;
//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Unauthorized" });
//   }
// };

// export default protect;
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js'; // ⬅️ important

const protect = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ✅ Fetch the full user using decoded.id
    const user = await userModel.findById(decoded.id).select('-password');
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user; // ✅ now this includes ._id, .name, etc.
    next();
  } catch (err) {
    console.error("Auth error:", err.message);
    res.status(401).json({ message: "Unauthorized" });
  }
};

export default protect;
