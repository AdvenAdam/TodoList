const { user } = require('../models');

exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await user.create({ username, password });
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Login route
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ where: { username, password } });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
