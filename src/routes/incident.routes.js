import { Router } from 'express'

import { 
    createIncident, 
    readIncident, 
    readIncidents, 
    updateIncident, 
    deleteIncident 
} from '../controllers/incident.controller.js'

import { authRequired } from '../middlewares/ValidateToken.js'
import { validateIncident } from '../middlewares/Validates/ValidateIncident.js'

const router = Router()

router.post('/incident', authRequired, validateIncident, createIncident)
router.get('/incident', authRequired, readIncidents)
router.get('/incident/:id', authRequired, readIncident)
router.put('/incident/:id', authRequired,validateIncident, updateIncident)
router.delete('/incident/:id', authRequired, deleteIncident)

export default router