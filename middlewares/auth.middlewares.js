const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { AppError } = require('../utils/AppError.utils')
const { catchAsync } = require('../utils/catchAsync.utils')

dotenv.config({ path: './config.env' });

// Models
const { User } = require('../models/users.models');

const protectSession = catchAsync(async (req, res, next) => {

	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith('Bearer')
	) {
		token = req.headers.authorization.split(' ')[1]; // -> [Bearer, token]
	}

	if (!token) {
		return next(new AppError('Invalid session', 403))
	}

	const decoded = jwt.verify(token, process.env.JWT_SECRET);

	const user = await User.findOne({
		where: { id: decoded.id, status: 'active' },
	});

	if (!user) {
		next(new AppError('The owner of the session is no longer active', 404))
	}

	req.sessionUser = user;
	next();
})

const protectUsersAccount = (req, res, next) => {
	const { sessionUser, user } = req;

	if (sessionUser.id !== user.id) {
		return next(new AppError('You are not the owner of this account.', 403))
	}
	next();
};

const protectReviewOwner = (req, res, next) => {

	const { sessionUser, review} = req;

	if (sessionUser.id !== review.userId) {
		return next(new AppError('You are not the owner of this account.',403))
	}
	next();
}

const protectAdmin = (req, res, next) => {
	
	const { sessionUser } = req;

	if(sessionUser.role !== 'admin') {
		return next(new AppError('you do not have the access level for this data', 403))
	}
	next()
}


module.exports = {
    protectSession,
    protectUsersAccount,
	protectReviewOwner,
	protectAdmin,
}