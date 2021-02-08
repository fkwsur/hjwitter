import React, { useState } from "react";
import { dbService } from "fbase";

const Hjweet = ({hjweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newWeet, setNewWeet] = useState(hjweetObj.text);

    const onDeleteClick = async () => {
      const ok = window.confirm("Are you sure you want to delete this hjweet?");
      console.log(ok);
      if(ok){
        await dbService.doc(`hjWeets/${hjweetObj.id}`).delete();
      }
  };
  const toggleEditing = () => setEditing((prev) => !prev);

  const onSubmit = async (event) => {
      event.preventDefault();
      console.log(hjweetObj, newWeet);
      await dbService.doc(`hjWeets/${hjweetObj.id}`).update({
      text: newWeet,
      });
      setEditing(false);
  };

  const onChange = (event) => {
      const {
          target: { value },
        } = event;
        setNewWeet(value);
  };
    
  return(
    <div>
        {editing ? (
        <>
          {isOwner && <>
          <form onSubmit={onSubmit}>
              <input 
                 type="text" 
                 value={newWeet} 
                 placeholder="Edit your HJWeet" 
                 required 
                 onChange={onChange}
              />
              <input type="submit" value="Update Hjweet" />
          </form>
          <button onClick={toggleEditing}>Cancel</button>
          </>
          }
        </>
        ) : (
        <>
         <h4>{hjweetObj.text}</h4>
         {hjweetObj.attachmentUrl && (
            <img src={hjweetObj.attachmentUrl} width="50px" height="50px"  />
         )}
         {isOwner && (
          <>
           <button onClick={onDeleteClick}>Delete HJweet</button>
           <button onClick={toggleEditing}>Edit HJweet</button>
          </>
          )}
        </>
        )}
    </div>
  );
};

export default Hjweet;