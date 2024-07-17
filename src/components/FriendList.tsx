
import React from 'react';

import useFetch from '../useFetch';
import { Link, useNavigate } from 'react-router-dom';

const HomeFriend = (): JSX.Element => {
    const { data: friends, isPending: friendsPending, error: friendsError } = useFetch('http://localhost:8000/friends');

    return (
        <section>
            {friendsError && <p>{friendsError}</p>}
            {friendsPending && <p>Loading page3...</p>}
            {friends && <FriendList friends={friends} name={''} />}
        </section>

    );

};

interface Friend {
    id:number;
    name: string;
    sign: string;
    signID: number;
    birthday: string;
}

interface FriendListProps {
    friends: Friend[];
    name: string;
}


const FriendList: React.FC<FriendListProps > = ({ friends }) => {

    const navigate = useNavigate();

    // Delete method
    const handleClick =(id: number) => {
        fetch('http://localhost:8000/friends/'+id,{
            method:'DELETE'
        }).then(()=>{
            navigate(0);    
        })
    }
    return (

        <>
            <section>
                <div id='container'>
                    <div className='top'>
                        <button className='backToPrivPage'>
                            <Link to={`/`}>&lt;</Link>
                        </button>
                        <button id ='button'>
                            <Link to={`/register`}>Add Friends</Link>
                        </button>
                    </div>
                        <h1 id='title'>Friends</h1>
                        <section className='friendContainer'>
                        <table>
                            <tbody>
                                {friends.map((friend) => (
                                    <tr key={friend.id}>
                                        <td className='zodiacSign'>
                                            <Link to={`/horoscopes/${friend.signID}`}>
                                                <img src={`/data/images/${friend.signID}.png`} alt={`${friend.sign} sign`} />
                                            </Link>
                                        </td>
                                        <td id='sign_name'>{friend.sign}</td>
                                        <td>{friend.name}</td>
                                        <td className='bd'>{friend.birthday}</td>
                                        <td>
                                            <button onClick={() => navigate(`/edit/${friend.id}`)}><i className="fa-solid fa-pencil"></i></button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleClick(friend.id)}><i className="fa-solid fa-trash"></i></button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>

                    
                </div>
            </section>

        </>
    );
};

export default HomeFriend; FriendList;

