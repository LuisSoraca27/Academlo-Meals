const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

// Models
const { User } = require('../models/users.models');

const protectSession = async (req, res, next) => {
    try {

	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]; // -> [Bearer, token]
	}

	if (!token) {
		return res.status(403).json({
			status: 'error',
			message: 'Invalid session',
		});
	}

	const decoded = jwt.verify(token, 'secret');

	const user = await User.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		return res.status(403).json({
			status: 'error',
			message: 'The owner of the session is no longer active',
		});
	}

	req.sessionUser = user;
	next();
    } catch (error) {
        console.log(error)
    }
}

const protectUsersAccount = (req, res, next) => {
	const { sessionUser, user } = req;

	if (sessionUser.id !== user.id) {
		return res.status(403).json({
			status: 'error',
			message: 'You are not the owner of this account.',
		});
	}
	next();
};

const protectReviewOwner = (req, res, next) => {

	const { sessionUser, review} = req;

	if (sessionUser.id !== review.userId) {
		return res.status(403).json({
			status: 'error',
			message: 'You are not the owner of this account.',
		});
	}
	next();
}

const protectAdmin = (req, res, next) => {
	
	const { sessionUser } = req;

	if(sessionUser.role !== 'admin') {
		return res.status(403).json({
			status: 'error',
			message: 'you do not have the access level for this data'
		})
	}

	next()

}


module.exports = {
    protectSession,
    protectUsersAccount,
	protectReviewOwner,
	protectAdmin,
}