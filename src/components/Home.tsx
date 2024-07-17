import SignList from './SignList';

import useFetch from '../useFetch';

const Home = (): JSX.Element => {
    
    const { data: horoscopes, isPending:horoscopesPending, isPending:horoscopesError } = useFetch('http://localhost:8000/horoscopes');

    return (

        <section>

            {horoscopesError && <p>{horoscopesError}</p>}
            {horoscopesPending && <p>Loading page1...</p>}
            {horoscopes && <SignList horoscopes={horoscopes} name={''} />}

        </section>

    );

};

export default Home;