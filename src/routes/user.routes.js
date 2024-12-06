import { Router } from 'express'
import { createUser, readUser, readUsers, updateUser, deleteUser } from '../controllers/user.controllers.js'
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateUser } from '../middlewares/Validates/ValidateUser.js'

const router = Router()

router.post('/user', authRequired, validateUser, createUser)
router.get('/user', authRequired, readUsers)
router.get('/user/:id', authRequired, readUser)
router.put('/user/:id', authRequired, validateUser, updateUser)
router.delete('/user/:id', authRequired, deleteUser)

export default router