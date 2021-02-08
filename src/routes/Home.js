import React, { useEffect, useState } from 'react';
import { dbService, storageService } from 'fbase';
import Hjweet from 'components/Hjweet';
import HjweetFactory from 'components/HjweetFactory';

const Home = ({userObj}) => {
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
    return(
        <div className="container">
                <HjweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
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