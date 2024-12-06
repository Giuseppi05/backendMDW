import { Router } from 'express'
import {getStats, graphicLine, graphicBar, graphicArea, graphicPie} from '../controllers/graphic.controller.js'
import { authRequired } from '../middlewares/ValidateToken.js'

const router = Router()

router.get('/stats', authRequired, getStats)
router.get('/graphicLine', authRequired, graphicLine)
router.get('/graphicBar', authRequired, graphicBar)
router.get('/graphicArea', authRequired, graphicArea)
router.get('/graphicPie', authRequired, graphicPie)

export default router