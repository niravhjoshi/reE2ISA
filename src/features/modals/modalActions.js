import {MODAL_CLOSE,MODAL_OPEN} from './modalConstants';

export const OpenModal = (modalType,modalProps)=>{
    return{
        type:MODAL_OPEN,
        payload:{
            modalType,
            modalProps
        }

    }
}

export const CloseModal = () =>{
    return{
        type:MODAL_CLOSE
    }
}