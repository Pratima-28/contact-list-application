
const initialState=[]
export const contacts = (state= initialState, action) =>{

    switch(action.type){
        case 'FETCH_CONTACTS':
            return action.data
        case 'ADD_CONTACT':
            return [...state, action.data]
        case 'EDIT_CONTACT':
            const editContacts = state.map(contact => contact.id === action.data.id ? action.data: contact);
            state= editContacts;
            return state;
        case 'DELETE_CONTACT':
            const filterContacts = state.filter(contact => contact.id !== action.id && contact);
            return filterContacts;
        default:        
            return state;
    }
}