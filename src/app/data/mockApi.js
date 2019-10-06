import PersonsampleData from './PersonsampleData'
import EarningTypeSampleData from './EarningTypesampleData';


const delay =(ms) =>{
    return new Promise(resolve => setTimeout(resolve,ms))
}

//This method will fetch data for persons from mock API.
export const fetchPersonSampleData =() =>{
    return delay(1000).then(() =>{
        return Promise.resolve(PersonsampleData);
    })
}

//This method will fetch data for EarningTypes from mock API.
export const fetchEarningTypeSampleData =() =>{
    return delay(1000).then(() =>{
        return Promise.resolve(EarningTypeSampleData);
    })
}