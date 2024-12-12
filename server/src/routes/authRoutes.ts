import express from 'express';
import { registerUser, authUser } from '../controllers/authController';

const router = express.Router();

router.post('/register', registerUser as express.RequestHandler);
router.post('/login', authUser as express.RequestHandler);
router.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Error logging out' });
    } else {
      res.status(200).json({ message: 'Logged out successfully' });
    }
  });
});

export default router;
