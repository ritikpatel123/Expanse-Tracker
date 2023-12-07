import { View, Text } from 'react-native'
import React from 'react'
import axios from 'axios'

const   BACKEND_URL='https://task-manager-837a6-default-rtdb.firebaseio.com/'
export const storeExpanse = async (expanseData) => {
 const response= await axios.post(
    BACKEND_URL+'expanses.json',
    expanseData
    );
   const id= response.data.name;
  
   return id;
}

 export async function fetchExpanse(){
    const response = await axios.get(
        BACKEND_URL+'expanses.json',
    );

    const expanses=[];

    for(const key in response.data) {
        const expanseObj={
            id:key,
            amount:response.data[key].amount,
            date:new Date(response.data[key].date),
            description:response.data[key].description,
        }
        expanses.push(expanseObj)
    }

    return expanses;
}

export function updateExpense(id,expanseData) {
   return axios.put(BACKEND_URL+`/expanses/${id}.json`,expanseData)
}

export function deleteExpense(id) {
   return axios.put(BACKEND_URL+`/expanses/${id}.json`)
}


