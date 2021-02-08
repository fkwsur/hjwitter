import React, { useState } from "react";
import { dbService } from "fbase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
    <div className="nweet">
        {editing ? (
        <>
          {isOwner && <>
          <form onSubmit={onSubmit} className="container nweetEdit">
              <input 
                 type="text" 
                 value={newWeet} 
                 placeholder="Edit your HJWeet" 
                 required
                 autoFocus
                 onChange={onChange}
                 className="formInput"
              />
              <input type="submit" value="Update Hjweet" className="formBtn" />
          </form>
          <span onClick={toggleEditing} className="formBtn cancelBtn">
            Cancel
          </span>
          </>
          }
        </>
        ) : (
        <>
         <h4>{hjweetObj.text}</h4>
         {hjweetObj.attachmentUrl && <img src={hjweetObj.attachmentUrl} />
         }
         {isOwner && (
          <div class="nweet__actions">
            <span onClick={onDeleteClick}>
              <FontAwesomeIcon icon={faTrash} />
            </span>
            <span onClick={toggleEditing}>
              <FontAwesomeIcon icon={faPencilAlt} />
            </span>
          </div>
          )}
        </>
        )}
    </div>
  );
};

export default Hjweet;