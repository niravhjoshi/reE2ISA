export const createNewPerson = (user,photoURL,person) =>{

    return {
        ...person,
        createdUID : user.uid,
        CreatorName: user.displayName,
        ImageURL: photoURL || '/assets/images/user.png',
        created : new Date(),

    }
}

export const ObjectToArray =(object) =>{
    if(object){
        return Object.entries(object).map(e => Object.assign({},e[1],{id:e[0]}))
    }
}