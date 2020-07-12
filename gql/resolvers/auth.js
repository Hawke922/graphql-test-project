const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../../models/user');

module.exports = {
    createUser: async args => {
        try {
            const existingUserCheck = await User.findOne({email: args.userInput.email})

            if(existingUserCheck) {
                throw new Error('Email in use.')
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12)

            const user = new User({
                email: args.userInput.email,
                password: hashedPassword
            });

            const result = await user.save();

            return { ...result._doc, password: null}
        } catch (error) {
            throw error;
        }
    },
    login: async ({ email, password }) => {
        try {
            const user = await User.findOne({ email: email });
            if(!user) {
                throw new Error('User does not exist!');
            }
            const passwordCheck = await bcrypt.compare(password, user.password);
            if(!passwordCheck) {
                throw new Error('Password is incorrect!');
            }
            const token = jwt.sign(
                {userId: user.id, email: user.email},
                'secretkey',
                {expiresIn: '1h'}
            );
            return { userId: (await user).id, token: token, tokenExpiration: 1}
        } catch (error) {
            throw error;
        }
    }
};
