//server.js
import express from 'express';
import authRoute from './routes/auth.routes.js';
import messageRoute from './routes/message.routes.js';
import userRoute from './routes/user.Routes.js'
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

const app = express();
const PORT = process.env.PORT || 5000;
const uri = 'mongodb+srv://tshepangmathlore:TzNeKoFVZE25Ls3H@cluster0.br4aanh.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=Cluster0'
// Middleware to parse JSON
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.use('/api/auth', authRoute);
app.use('/api/messages', messageRoute);
app.use('/api/users', userRoute);



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
