
import {createReducer} from '../../app/common/utils/reducerUtils';
import { CREATE_PERSON, UPDATE_PERSON, DELETE_PERSON } from './personsConstants';

const initState =[
    {
        id: '1',
        FullName: 'Peter Joshi',
        BirthDate: '2018-03-27',
        Sex: 'Male',
        Email:'mark@facebook.com',
        ImageURL: 'https://randomuser.me/api/portraits/men/20.jpg',
        subperson:
        [
        {
        id: '100',
        FullName: 'Jar Head',
        BirthDate: '2011-07-15',
        Sex: 'Female',
        Email:'jar@amazon.com',
        ImageURL: 'https://randomuser.me/api/portraits/men/36.jpg',

        },
        {
        id: '101',
        FullName: 'Virgo Hole',
        BirthDate: '2012-12-11',
        Sex: 'Male',
        Email:'vir@amazon.com',
        ImageURL: 'https://randomuser.me/api/portraits/men/57.jpg',

        }
        ]

    },
    {
        id: '2',
        FullName: 'Agent Smith',
        BirthDate: '2011-03-27',
        Sex: 'Female',
        Email:'Jeff@amazon.com',
        ImageURL: 'https://randomuser.me/api/portraits/men/10.jpg',
        subperson:
        [
        {
        id: '200',
        FullName: 'Foo Bar',
        BirthDate: '2011-03-15',
        Sex: 'Male',
        Email:'Fool@amazon.com',
        ImageURL: 'https://randomuser.me/api/portraits/men/15.jpg',

        },
        {
        id: '201',
        FullName: 'Alpha Go',
        BirthDate: '2012-12-15',
        Sex: 'Female',
        Email:'Kabae@amazon.com',
        ImageURL: 'https://randomuser.me/api/portraits/men/19.jpg',

        }
        ]


    }
   ];

const createPerson = (state,payload) =>{
    return [...state,payload.person]
}

const updatePerson = (state,payload) =>{
    return [
        ...state.filter(person => person.id !== payload.person.id),payload.person
    ]
}


const deletePerson = (state,payload) =>{
    return [
        ...state.filter(person => person.id !== payload.personId)
    ]
}

export default createReducer(initState,{
    [CREATE_PERSON]: createPerson,
    [UPDATE_PERSON]: updatePerson ,
    [DELETE_PERSON]: deletePerson
} )