import dotenv from 'dotenv'
import {app} from './app.js'
import express from 'express'
import mySqlpool from './config/db.js'

dotenv.config({
    path : "./env"
})

app.use(express.json())

mySqlpool.query('SELECT 1').then(()=>{
    console.log('database connected successfully')
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`server connected on PORT ${process.env.PORT}`)
    })
}).catch((error)=>{
    console.error('Database connection error:', error)
    console.log(error)
})
