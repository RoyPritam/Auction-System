import React, {createContext, useState, useContext, useEffect} from 'react';

const UserContext =  createContext([]);

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [sidebarVal, setsidebarVal] = useState('Home')
    const [userType, setuserType] = useState(null)
  
    return (
        <UserContext.Provider 
            value={{sidebarVal,setsidebarVal, user, setUser, userType, setuserType}}>
            {children}</UserContext.Provider>
    );
};
export default UserContextProvider;

export const UserState = () =>{
    return useContext(UserContext);
};