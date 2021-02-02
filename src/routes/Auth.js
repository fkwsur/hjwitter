import React from 'react';

const Auth = () => {
 return (
    <div>
      <form>
        <input type="text" placeholder="Email" required/>
        <input type="password" placeholder="Password" required/>
      </form>
      <div>
        <button>Continue with Google</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};


export default Auth;