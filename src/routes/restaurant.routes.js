import { Router } from 'express'
import { createRestaurant, readRestaurant, readRestaurants, updateRestaurant, deleteRestaurant } from '../controllers/restaurant.controllers.js'
import { authRequired } from '../middlewares/ValidateToken.js'
import { validateRestaurant } from '../middlewares/Validates/ValidateRestaurant.js'

const router = Router()

router.post('/restaurant', authRequired, validateRestaurant, createRestaurant)
router.get('/restaurant', authRequired, readRestaurants)
router.get('/restaurant/:id', authRequired, readRestaurant)
router.put('/restaurant/:id', authRequired,validateRestaurant, updateRestaurant)
router.delete('/restaurant/:id', authRequired, deleteRestaurant)

export default router