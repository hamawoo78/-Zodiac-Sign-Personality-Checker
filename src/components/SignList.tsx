import React from 'react';

import { Link } from 'react-router-dom';

interface Sign {
    id: number;
    sign: string;
    date:string
}

interface SignListProps {
    horoscopes: Sign[];
    name: string;
}


const SignList: React.FC<SignListProps> = ({ horoscopes }) => {

    return (

        <>
            <section>
                <div id='container'>
                    <h1 id='title'> Zodiac Personality</h1>
                    <h3 id='title'> Click on a Sign to Explore!</h3>
                    <section className='signContainer'>
                        {horoscopes.map((horoscope) => (
                            <div className='zodiacSign' key={horoscope.id}>
                                <Link to={`/horoscopes/${horoscope.id}`}>
                                    <img src={`/data/images/${horoscope.id}.png`} />
                                    <p id='sign_name'>{horoscope.sign}</p>
                                    <p id='date'>{horoscope.date}</p>
                                </Link>
                            </div>
                        ))}
                    </section>
                    <button id ='button'>
                        <Link to={`/friends`}>Find Your Friend’s Personality</Link>
                    </button>
                </div>
            </section>

        </>
    );
};

export default SignList;