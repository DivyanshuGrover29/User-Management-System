import express, {Application} from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectDB from "./config/dbConfig";
import userRoutes from "./routes/userRoutes";

dotenv.config();

//Typescript static type definition
const app: Application = express();
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions = {
   origin:'http://localhost:5173',
   credentials:true
};
app.use(cors(corsOptions));

//Routes
app.use('/api', userRoutes);

// Handle unknown routes
app.use((req, res) => {
    res.status(404).json({ 
        message: 'Endpoint not found',
        success:false,
    });
  });

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.status(500).json({ message: err.message });
  });

//Connect to database
connectDB();
app.listen(PORT, ()=> {
    console.log(`Server running at the port ${PORT}`);
});