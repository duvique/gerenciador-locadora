import axios from 'axios'

const url = process.env.REACT_APP_API_URL;
console.log({url});


export const LocadoraAPI =  axios.create({

    baseURL: process.env.REACT_APP_API_URL
})

