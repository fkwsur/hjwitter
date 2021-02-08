import React, { useState } from 'react'; 
import { dbService, storageService } from "fbase";
import { v4 as uuidv4 } from "uuid";

const HjweetFactory = ({userObj}) => {
    const [hjweet, setHjweet] = useState("");
    const [attachment, setAttachment] = useState("")
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if (attachment != "") {
            const attachmentRef = storageService
                .ref()
                .child(`${userObj}/${uuidv4()}`);
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const hjweetObj = {
            text: hjweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl,
        };
        await dbService.collection("hjWeets").add(hjweetObj);
            setHjweet("");
            setAttachment("");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setHjweet(value);
    };

    const onFileChange = (event) => {
        const {
            target: { files },
        } = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {
                currentTarget: {result},
            } = finishedEvent;
            setAttachment(result);
        };
        reader.readAsDataURL(theFile);
    };
    const onClearAttachment = () => setAttachment(null)

    return(
        <form onSubmit={onSubmit}>
        <input 
            value={hjweet} 
            onChange={onChange} 
            type="text" 
            placeholder="What's on your mind?" 
            maxLength={120}
         />
        <input type="file" accept="image/*" onChange={onFileChange} />
        <input type="submit" value="HJweet" />
        {attachment && (
           <div>
            <img src={attachment} width="50px" height="50px" />
            <button onClick={onClearAttachment}>Clear</button>
           </div>
        )}
    </form>
    )
}
export default HjweetFactory;

