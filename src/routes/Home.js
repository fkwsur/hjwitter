import React, { useEffect, useState } from 'react';
import { dbService } from 'fbase';
import Hjweet from 'components/Hjweet';

const Home = ({userObj}) => {
    const [hjweet, setHjweet] = useState("");
    const [hjWeets, setHjweets] = useState([]);

    useEffect(() => {
        dbService.collection("hjWeets").onSnapshot(snapshot => {
            const hjWeetArray = snapshot.docs.map((doc) => ({
                id:doc.id,
                 ...doc.data(),
            }));
            setHjweets(hjWeetArray);
        })
    }, []);

    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("hjWeets").add({
            text: hjweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setHjweet("");
    };
    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setHjweet(value);
    };
    console.log(hjWeets);
    return(
    <div>
        <form onSubmit={onSubmit}>
            <input value={hjweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
            <input type="submit" value="HJweet" />
        </form>
        <div>
            {hjWeets.map((hjweet) => (
              <Hjweet 
                 key={hjweet.id} 
                 hjweetObj={hjweet} 
                 isOwner={hjweet.creatorId === userObj.uid} 
              />
            ))}
        </div>
    </div>
    );
};
export default Home;