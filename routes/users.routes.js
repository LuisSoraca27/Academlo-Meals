const express = require('express');

// controllers
const { createUser, 
        updateUser,
        deleteUser,
        login,
        getAllOrdersUser,
        getOrderbyid,
 } = require('../controllers/users.controllers');

// middlewares
const { userExist,
} = require('../middlewares/users.middlewares');

const { protectSession, protectUsersAccount } = require('../middlewares/auth.middlewares')

//validators
const { createUserValidators } = require('../middlewares/validators.middlewares')


const usersRouter = express.Router();

usersRouter.post('/signup', createUserValidators, createUser);

usersRouter.post('/login', login)

usersRouter.use(protectSession)

usersRouter.get('/orders',getAllOrdersUser)

usersRouter.get('/orders/:id', getOrderbyid)

usersRouter.patch('/:id', userExist, protectUsersAccount, updateUser)

usersRouter.delete('/:id', userExist, protectUsersAccount, deleteUser)


module.exports = {
        usersRouter,
}