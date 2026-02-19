import { User } from '../models/user.model.js';
import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
export const register = async (req, res) => {
  try {
    console.log({ 'REQQQQQQQQ->': req.body });
    let { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return res
        .status(403)
        .json({ success: false, message: 'All fealds are required' });
    }
    // finding user exist with this Mail ID
    const user = await User.findOne({ email });
    if (!!user) {
      return res
        .status(403)
        .json({ success: false, message: 'this email id already registerd ' });
    }
    password = await bcrypt.hash(password, 10);
    await User.create({
      fullName,
      email,
      password,
    });

    return res.status(201).json({
      success: true,
      message: 'User Registerd successfully',
    });
  } catch (error) {
    console.log({ error });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log({ BODY: req.body });
    if (!email || !password) {
      return res
        .status(403)
        .json({ success: false, message: 'All fealds are required' });
    }
    const user = await User.findOne({ email });
    console.log('secoud check', user);

    if (!user) {
      return res
        .status(403)
        .json({ success: false, message: 'Incorrect Email or Password' });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    console.log('third check', isPasswordMatch);
    if (!isPasswordMatch) {
      return res
        .status(403)
        .json({ success: false, message: 'Incorrect Email or Password' });
    }
    const token = await JWT.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: '1d',
      }
    );

    return res
      .status(200)
      .cookie('token', token, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: `Welcome Back ${user.fullName}`,
      });
  } catch (error) {
    console.log({ error });
  }
};
export const logout = async (req, res) => {
  try {
    return res.status(200).cookie('token', '', { maxAge: 0 }).json({
      success: true,
      message: 'User logout successfully',
    });
  } catch (error) {
    console.log({ error });
  }
};
