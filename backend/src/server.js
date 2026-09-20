import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import userRoutes from "./routes/user.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import authRoutes from "./routes/auth.route.js";
import "./database.js";

dotenv.config();


const app = express();



// Middlewares

app.use(
    cors({
        origin: "http://localhost:5173"
        , credentials: true

    })
);


app.use(express.json());


app.use(express.urlencoded({
    extended: true
}));



// Routes

app.use(
    "/api/users",
    userRoutes
);
app.use(
    "/api/dashboard",
    dashboardRoutes
);
app.use(
    "/api/auth",
    authRoutes
);
// Test

app.get("/", (req, res) => {

    res.json({

        message: "Radin Backend API is running",

        status: "success"

    });

});




// 404

app.use((req, res) => {

    res.status(404).json({

        message: "Route not found"

    });

});




// Error

app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({

        message: "Server Error"

    });

});



const PORT =
    process.env.PORT || 3000;



app.listen(PORT, () => {

    console.log(
        `🚀 Server running on http://localhost:${PORT}`
    );

});