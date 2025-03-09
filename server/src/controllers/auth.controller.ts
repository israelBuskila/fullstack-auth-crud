import express from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../utils/authUtils';
import { UserService } from '../services/user.service';
import { validateDTO } from '../dto/validateDTO';
import { CreateUserDto, LoginUserDto } from '../dto/user.dto';

const router = express.Router();
const userService = new UserService();

router.post('/register', async (req, res, next) => {
  try {
    const newUser = await validateDTO(CreateUserDto, req.body);
    const result = await userService.createUser(newUser);
    res.status(201).json({ message: 'User registered successfully', result });
  } catch (error) {
    next(error)
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = await validateDTO(LoginUserDto, req.body);

    const user = await userService.getUserByEmail(email);
    if (!user.length) {
       res.status(400).json({ message: 'No User Found!' });
    }

    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
       res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user[0].id.toString());
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
     res.json({ message: 'Login successful', token });
  } catch (error) {
    next(error)  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('jwt');
   res.json({ message: 'Logged out successfully' });
});

export default router;
