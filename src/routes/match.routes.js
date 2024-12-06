import { Router } from 'express'
import { createMatch, readMatch, readMatchs, updateMatch, deleteMatch } from '../controllers/match.controllers.js'
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateMatch } from '../middlewares/Validates/ValidateMatch.js'

const router = Router()

router.post('/match', authRequired, validateMatch, createMatch)
router.get('/match', authRequired, readMatchs)
router.get('/match/:id', authRequired, readMatch)
router.put('/match/:id', authRequired,validateMatch, updateMatch)
router.delete('/match/:id', authRequired, deleteMatch)

export default router