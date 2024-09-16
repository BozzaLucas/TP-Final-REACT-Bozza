const express = require('express');
const app = express();
const empleadosRouter = require('./routes/empleados');

app.use(express.json());
app.use('/api', empleadosRouter); // Asegúrate de que la ruta coincida con la URL en el frontend

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));