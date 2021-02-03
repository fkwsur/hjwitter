import { authService } from 'fbase';
import React, {useHistory} from 'react';

export default () => {
    const history = useHistory();
    const onLogoutClick = () => {
        authService.signOut();
        history.push("/");
    };
    return (
    <>
        <button onClick={onLogoutClick}>Log Out</button>
    </>
    );
}