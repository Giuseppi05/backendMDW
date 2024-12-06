import { Router } from 'express'
import { createOffer, readOffer, readOffers, updateOffer, deleteOffer } from '../controllers/offers.controller.js'
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateOffer } from '../middlewares/Validates/ValidateOffer.js'

const router = Router()

router.post('/offer', authRequired, validateOffer, createOffer)
router.get('/offer', authRequired, readOffers)
router.get('/offer/:id', authRequired, readOffer)
router.put('/offer/:id', authRequired,validateOffer, updateOffer)
router.delete('/offer/:id', authRequired, deleteOffer)

export default router