// below commented out, it is about getting access token for calling API but It is still not woking.
// export const fetchToken = async (clientId: string, clientSecret: string): Promise<string> => {
//     const data = `grant_type=client_credentials&client_id=${clientId}&client_secret=${clientSecret}`;
//     const response = await fetch('https://api.prokerala.com/token', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: data,
//     });

//     if (!response.ok) {
//         throw new Error(`Failed to fetch token: ${response.status}`);
//     }

//     const responseData = await response.json();
//     console.log(responseData.access_token);
//     return "Yes";
// };

const formatDateTime = (date: Date): string => {
  const isoString = date.toISOString();
  return isoString.replace(/:/g, '%3A').replace(/\+/g, '%2B');
};


// I had API call functionality in Python, and asked AI to rewirte in TypeScript. then I modify to fit thsi code

export const fetchDailyPrediction = async (token: string, sign: string): Promise<any> => {
    const date = new Date();
    const formattedDate = formatDateTime(date);
    // const formattedDate = "2024-06-15T15%3A19%3A21%2B05%3A30";  // Debug
    const formattedSign = sign.toLowerCase();
  
    try {
      const response = await fetch(`/api/v2/horoscope/daily?datetime=${formattedDate}&sign=${formattedSign}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
    //   console.log('Response:', response); //Debug
  
      if (!response.ok) {
        throw new Error(`Failed to fetch daily prediction: ${response.status}`);
      }
  
      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const responseData = await response.json();
        return responseData.data.daily_prediction;
      } else {
        throw new Error('Received non-JSON response');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error; // Re-throw the error to be handled by the caller
    }
  };