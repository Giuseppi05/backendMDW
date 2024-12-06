import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import restaurantRoutes from './routes/restaurant.routes.js'
import userRoutes from './routes/user.routes.js'
import offerRoutes from './routes/offers.routes.js'
import incidentRoutes from './routes/incident.routes.js'
import graphicRoutes from './routes/graphic.routes.js'

const app = express()

app.use(cors({
    origin: ['http://localhost:5173', 'https://giuseppi05.github.io'], 
    credentials: true, 
}));

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next();
});


app.use('/api/auth',authRoutes)
app.use('/api/restaurant',restaurantRoutes)
app.use('/api/user',userRoutes)
app.use('/api/offer',offerRoutes)
app.use('/api/incident',incidentRoutes)
app.use('/api/graphic', graphicRoutes)

export default app