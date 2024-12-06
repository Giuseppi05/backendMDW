import { Router } from 'express'
import { register, login, logout, profile, checkSession} from '../controllers/auth.controllers.js'
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateAuth } from '../middlewares/Validates/ValidateAuth.js'
import { requestLogger } from '../middlewares/RequestLogger.js'

const router = Router()

router.post('/register', validateAuth, register)
router.post('/login', validateAuth, requestLogger, login)
router.post('/logout', logout)
router.get('/profile', authRequired, profile)
router.get('/session', checkSession)

export default router