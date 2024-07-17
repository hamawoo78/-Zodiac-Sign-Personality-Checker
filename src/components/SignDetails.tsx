import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import useFetch from '../useFetch';
import './style.css';
import { useNavigate } from 'react-router-dom';
// import { fetchToken, fetchDailyPrediction } from './APIcall';
import { fetchDailyPrediction } from './APIcall';

interface DailyPrediction {
    sign_name: string;
    prediction: string;
}

const SignDetails = () => {
    const { id } = useParams();
    const { data: horoscope, error, isPending } = useFetch("http://localhost:8000/horoscopes/" + id);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [dailyPrediction, setDailyPrediction] = useState<DailyPrediction | null>(null); // State to hold daily prediction data
    // const [token, setToken] = useState<string | null>(null); // State to hold the API token
    const token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJlNjk4OWEyNC1lYTc5LTQ3OTctYmU2Mi03NjgzZjkzMDc0MTYiLCJqdGkiOiI1Yjg1MjMzNzRjMzU1Mzk1NjFlMGFmZTlhNmNhYjgwNDkxYjgwY2VkNGU5OGNjZTk4NzAyMGQ2Y2MyNGE2ODI5ZTVhNjYxYzE5OGUyZDRmOSIsImlhdCI6MTcxODcyODQ0OC44MDg5NTEsIm5iZiI6MTcxODcyODQ0OC44MDg5NTMsImV4cCI6MTcxODczMjA0OC44MDg4NSwic3ViIjoiOWY3YWY5YjgtNmQ1OS00ODE0LTk5MmItMWE4OGUyYWUzMTI1Iiwic2NvcGVzIjpbXSwiY3JlZGl0c19yZW1haW5pbmciOjUwMDAsInJhdGVfbGltaXRzIjpbeyJyYXRlIjo1LCJpbnRlcnZhbCI6NjB9XX0.f3n6dUZ8ix72_GH_XM6vQPEDEAdT6rtHXui_iJQzoP-rHX2Y846LqIHNwGiKZY1E5DMB7706O03e5pY3ULRENqGttQwiKi_uU_o4OChaTyfDugOqcjTUiVjif6MKM9ad1XIV-nQ4wUiTkeVmrrdIW-OlJoezAZF9BHL0TkZbuKSDo2Amnt622ZnDE57yFgTvr416kYypXFWhiQGr5o9HtWsQ25wKnADca0AkeMSj7IEqpDL0MgR_Ju3XUq6qp0gRdsmd3Cw7VeMSZW9GTX5tIRGAzKS8JbPaG0LoBRFCLFG6Q5B2SJkxgrPjhgpZmUnMSqC2Pn8aN7NoRiRdrAHDKQ";

    // Below AI generate to make side pannel in one page
    // if horoscope is not yet loaded
    const sections = horoscope ? [
        { title: 'Work', content: horoscope.work },
        { title: 'Love', content: horoscope.love_relationship },
        { title: 'Money', content: horoscope.money },
    ] : [
        { title: 'Work', content: '' },
        { title: 'Love', content: '' },
        { title: 'Money', content: '' },
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + sections.length) % sections.length);
    };

    const getSectionClassName = (title: string) => {
        switch (title) {
            case 'Work':
                return 'work-section';
            case 'Love':
                return 'love-section';
            case 'Money':
                return 'money-section';
            default:
                return '';
        }
    };

    const navigate = useNavigate();

    const goBack = () => {
        navigate(-1);
    };

    // useEffect(() => {
    //     const clientId = 'e8fba86b-bead-47ba-a70e-9b0848fd2934';
    //     const clientSecret = 'eTXGdziFGTNdfLe8xjV2M2apkhyqz0kHcjt49oWO';

    //     // Fetch the token
    //     const getToken = async () => {
    //         try {
    //             const token = await fetchToken(clientId, clientSecret);
    //             setToken(token);
    //         } catch (error) {
    //             console.error('Error fetching token', error);
    //         }
    //     };
    //     getToken();
    // }, []);

    useEffect(() => {
        
        const getDailyPrediction = async () => {
            if (!token || !horoscope) return;
            try {
                const dailyPrediction = await fetchDailyPrediction(token, horoscope.sign);
                setDailyPrediction(dailyPrediction);
            } catch (error) {
                console.error('Error fetching daily prediction', error);
            }
        };

        getDailyPrediction();
    }, [token, horoscope]);


    return (
        <section>
            {isPending && <p>Loading horoscope details...</p>}
            {error && <p>{error}</p>}
            {horoscope && (
                <div id='container'>
                    <button className='backToPrivPage' onClick={goBack}> &lt; </button>

                    <h1>{horoscope.sign}'s Personality</h1>
                    <h3>{horoscope.date}</h3>
                    <img src={`/data/images/${horoscope.id}.png`} alt={`${horoscope.sign}`} />

                    <h3>Type: {horoscope.type}</h3>
                    <h2>{horoscope.general}</h2>

                    {/* AI helped me to create this slide pannel to display multipe items in one page like instagram multiple picture */}
                    <div className="carousel">
                        <button onClick={prevSlide} className="prevDetail">&lt;</button>
                        <div className={`content ${getSectionClassName(sections[currentIndex].title)}`}>
                            <h3>{sections[currentIndex].title}</h3>
                            <p>{sections[currentIndex].content}</p>
                        </div>
                        <button onClick={nextSlide} className="nextDetail">&gt;</button>
                    </div>

                    {/* API return function display */}
                    <div className='dairyPrediction'>
                        <h3>Today's {horoscope.sign}</h3>
                        {dailyPrediction && ( 
                        <>
                            <p className='prediction'>{dailyPrediction.prediction}</p>
                        </>
                        )}
                    </div>
                </div>
            )}
        </section>
        
    );
};

export default SignDetails;
