import express, { Express } from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import cors from 'cors';
import {connectDB} from '../config/db';
import appRoutes from "./routes";
import {CitiesList} from "./data/cities";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3500;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());

app.use('/api', appRoutes);

connectDB().then(
    async () => {
        await CitiesList.loadCities();
        app.listen(port, () => {
            console.log(`Server is running at port ${port}`);
        });
    }
)
