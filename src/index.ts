import express from 'express'
import userRoutes from './routes/userRoutes'
import tweetRoutes from './routes/tweetRoutes'
import authRoutes from './routes/authRoutes'

const app = express();
app.use(express.json()) //parse all data(eg: string) as json
app.use('/user', userRoutes);
app.use('/tweet', tweetRoutes);
app.use('/auth', authRoutes);


//app.METHOD(PATH, HANDLER) Hander is a function
app.get('/', (req, res) =>{
    res.send("Hello World");
});




app.listen(3000, ()=>{
    console.log("Server ready at localhost:3000")
});