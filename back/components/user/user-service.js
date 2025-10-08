require('dotenv').config();
const userModel = require('./user-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

class userService {

    async register(email, password){

        const existingUser = await userModel.findOne({ username: email });
        if (existingUser) {
            const error = new Error('This email already registered');
            error.statusCode = 400;
            throw error;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await userModel.create({
            username: email,
            password: hashedPassword
        });

        // Передаем user
        const { accessToken, refreshToken } = this.generateTokens(user);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    async login(email, password) {
        const user = await userModel.findOne({ username: email });
        if (!user) {
            const error = new Error('Wrong credentials');
            error.statusCode = 404;
            throw error;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Wrong credentials');
            error.statusCode = 404;
            throw error;
        }

        const { accessToken, refreshToken } = this.generateTokens(user);

        return {
            user,
            accessToken,
            refreshToken,
        };
    }

    generateTokens(user){
        const payload = { id: user._id, email: user.username };

        const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign(payload, process.env.RFR_SECRET, { expiresIn: '7d' });

        return { accessToken, refreshToken };
    }

    async sendResetPasswordLink(email) {
        const user = await userModel.findOne({ username: email });
        if (!user) {
            const error = new Error('If this email exists, a reset link will be sent'); 
            error.statusCode = 200; // чтобы не сливать, существует ли email
            throw error;
        }

        // Создаем токен
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 час
        await user.save();

        // Отправляем email
        const resetUrl = `${process.env.CLIENT_URL}/new-password?token=${resetToken}`;
        await this.sendEmail(user.username, resetUrl);

        return true;
    }

    async sendEmail(to, link) {
        const transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_HOST,
            port: process.env.MAILTRAP_PORT,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });

        await transporter.sendMail({
            from: `no-reply@demomailtrap.co`,
            to,
            subject: 'Reset your password',
            text: `Click ${link} to reset your password`
        });

        console.log('Email sent to:', to);
    }

    async resetPassword(token, newPassword) {
        const user = await userModel.findOne({ 
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) {
            const error = new Error('Token is invalid or expired');
            error.statusCode = 400;
            throw error;
        }

        user.password = await bcrypt.hash(newPassword, 10);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        return true;
    }
}

module.exports = new userService();