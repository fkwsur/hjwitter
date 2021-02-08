import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { authService } from 'fbase';

export default ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const {
            target: {value},
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };
    return (
    <>
    <form onSubmit={onSubmit}>
        <input 
            onChange={onChange}
            type="text" 
            placeholder="Display name" 
            value={newDisplayName}
        />
        <input type="submit" value="Update Profile" />
    </form>
        <button onClick={onLogoutClick}>Log Out</button>
    </>
    );
}