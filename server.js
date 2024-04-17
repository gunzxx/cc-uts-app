const userRouter = require('./routers/user')
const express = require('express')


const app = express()
const port = 3000

app.listen(port, ()=>{
    console.log(`Server connected on port http://localhost:${port}`);
});

app.get('/', async (req,res) =>{    
    res.json({
        message: 'hello world',
    });
});

app.use(userRouter);

app.get('*', (req,res) =>{
    res.json({
        message: 'path not found',
    });
});
