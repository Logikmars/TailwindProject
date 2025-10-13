const userModel = require('./user-model');
const userService = require('./user-service');
require('dotenv').config();
const jwt = require('jsonwebtoken');

const isProduction = process.env.NODE_ENV === 'production';

const cookieOptions = {
  httpOnly: true,
  secure: isProduction ? true : false,
  sameSite: isProduction ? 'None' : 'Lax',
  path: '/',
};

class userController {

    async register(req, res, next){
        try {
            const { email, password } = req.body;
            const { user, accessToken, refreshToken } = await userService.register(email, password);

            const userObject = user.toObject();
            delete userObject.password; // убираем пароль

            res.cookie('refreshToken', refreshToken, cookieOptions);

            return res.json({ user: userObject, accessToken });
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next){
        try {
            const { email, password } = req.body;
            const {
                user,
                accessToken,
                refreshToken,
            } = await userService.login(email, password);
            const userObject = user.toObject();
            delete userObject.password;
            res.cookie('refreshToken', refreshToken, cookieOptions);

            return res.json({ user: userObject, accessToken });

        } catch (e) {
            next(e);
        }
    }

    async resetPassword(req, res, next) {
        try {
            const { email } = req.body;
            await userService.sendResetPasswordLink(email);
            return res.json({ message: 'If this email exists, a reset link will be sent' });
        } catch (err) {
            next(err);
        }
    }

    async setNewPassword(req, res, next) {
        try {
            const { token, newPassword } = req.body;
            await userService.resetPassword(token, newPassword);
            return res.json({ message: 'Password updated successfully' });
        } catch (err) {
            next(err);
        }
    }

    async refresh(req, res, next){
        try {
            const { refreshToken } = req.cookies;
            if (!refreshToken) return res.status(401).json({ message: 'No token' });

            const payload = jwt.verify(refreshToken, process.env.RFR_SECRET);

            const user = await userModel.findById(payload.id);
            if (!user) return res.status(404).json({ message: 'User not found' });

            const { accessToken, refreshToken: newRefreshToken } = userService.generateTokens(user);

            res.cookie('refreshToken', newRefreshToken, cookieOptions);

            const userObject = user.toObject();
            delete userObject.password;

            return res.json({ user: userObject, accessToken });
        } catch (err) {
            next(err);
        }
    }

    async logout(req, res, next) {
    try {
        console.log('Call logout');
        
        res.clearCookie('refreshToken', cookieOptions);
        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (err) {
        next(err);
    }
    }
}

module.exports = new userController();