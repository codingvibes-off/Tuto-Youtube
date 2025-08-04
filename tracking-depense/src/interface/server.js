const express = require('express');
const mongoose = require('mongoose');
const depenseRoutes = require('./routes/depenseRoutes');

const app = express();
const port = 3000;

app.use(express.json());

app.use('/depenses', depenseRoutes);

app.get('/', (req, res) => {
    res.send('API Tracking de Dépenses opérationnelle !');
});

mongoose.connect('mongodb+srv://codingvibesofficiel:PkTw8wTJdrIr4HYg@tracking-cluster.bvkthvp.mongodb.net/tracking_db?retryWrites=true&w=majority&appName=Tracking-cluster', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connecté à MongoDB');
    app.listen(port, () => {
        console.log(`Serveur démarré sur http://localhost:${port}`);
    });
})
.catch(err => console.error(' Erreur Mongo:', err));
