import express from 'express';
import authRoute from './routes/auth.routes.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 5000;
const uri = 'mongodb+srv://tshepangmathlore:TzNeKoFVZE25Ls3H@cluster0.br4aanh.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0'
// Middleware to parse JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.use('/api/auth', authRoute);

// MongoDB connection setup with Mongoose
mongoose.connect(uri)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('Error connecting to MongoDB:', err.message);
  process.exit(1);
});
