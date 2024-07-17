
import React, {useState} from 'react';

// import useFetch from '../useFetch';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

// https://www.youtube.com/watch?v=IkMND33x0qQ&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d&index=27

const zodiacSigns: string[] = [
    "Aries",
    "Taurus",
    "Gemini",
    "Cancer",
    "Leo",
    "Virgo",
    "Libra",
    "Scorpio",
    "Sagittarius",
    "Capricorn",
    "Aquarius",
    "Pisces"
];


// ChatGPT create this functionarity to set the zodiac sign based on the user input birthday
const getZodiacSign = (date: Date): string => {
    const day = date.getDate();
    const month = date.getMonth() + 1; // 

    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) {
        return 'Aquarius';
    } else if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) {
        return 'Pisces';
    } else if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) {
        return 'Aries';
    } else if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) {
        return 'Taurus';
    } else if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) {
        return 'Gemini';
    } else if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) {
        return 'Cancer';
    } else if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) {
        return 'Leo';
    } else if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) {
        return 'Virgo';
    } else if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) {
        return 'Libra';
    } else if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) {
        return 'Scorpio';
    } else if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) {
        return 'Sagittarius';
    } else if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) {
        return 'Capricorn';
    }
    return '';
};


function getZodiacId(sign: string): number {
    const signID = zodiacSigns.indexOf(sign) + 1;
    return signID;
}

const Register = () => {
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const navigate = useNavigate();


    // AI generate template submittion then I modify
    const submitFunction = (e: React.FormEvent) => {
        e.preventDefault();
        const birthDate = new Date(birthday);
        const sign = getZodiacSign(birthDate);
        var signID = getZodiacId(sign);
        const newFriend = {name, sign, birthday, signID};

        fetch('http://localhost:8000/friends', {
            method: 'POST',
            headers: {'Content-type':'application/json'},
            body: JSON.stringify(newFriend)
        }).then(() => {
            console.log('new friend added')
            navigate(`../friends`);
        })
    }
    
    return (

        <>
            <section>
            <div id='container'>
                <div className='top'>
                    <button className='backToPrivPage'>
                        <Link to={`/friends`}>&lt;</Link>
                    </button>
                </div>
                <h1 id='title' style={{ fontSize: '50px' }}>Add Friend Data</h1>
                <div className='form_container'>
                    <form onSubmit={submitFunction}>
                        <div className='inputs'>
                        <label htmlFor="nameInput">Name: </label>
                        <input 
                            type="text" 
                            value= {name} 
                            onChange={(e) => setName(e.target.value)} 
                            placeholder='Name' 
                            required />
                        </div>
                        
                        <div className='inputs'>
                        <label htmlFor="birthdayInput">Birth Day: </label>
                        <input 
                            type="date" 
                            value= {birthday} 
                            onChange={(e) => setBirthday(e.target.value)} 
                            placeholder='Birthday' 
                            required />
                        </div>
                        <button type="submit">Submit</button>
                    </form>
                </div>
            </div>
                
            </section>
        </>
    );
};

export default Register;





