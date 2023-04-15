const morgan = require('morgan'); //library simulation middleware fn 
const express = require('express');
const userRouter = require(`${__dirname}/routes/userRoutes`)
const AppError = require(`${__dirname}/utils/appError`)
const globalErrorHandler = require(`${__dirname}/controllers/errorController`)


const app = express();

app.use(express.json()); // add json fn in our middleware stack 
if(process.env.NODE_ENV === "development"){
  app.use(morgan('dev'))
}

app.use(express.static(`${__dirname}/public`))

app.use((req,res,next)=>{

  req.requestTime = new Date().toISOString()
  next()
})

app.use('/users',userRouter);

app.all('*',(req,res,next)=>{
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404))
})

// instead of html error and repeated this block in all ops
app.use(globalErrorHandler)

module.exports = app