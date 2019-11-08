export const createNewPerson = (user,photoURL,person) =>{

    return {
        ...person,
        createdUID : user.uid,
        CreatorName: user.displayName,
        ImageURL: photoURL || '/assets/images/user.png',
        created : new Date(),

    }
}