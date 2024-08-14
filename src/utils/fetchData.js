

export const exerciseOptions = {
    method: 'GET',
    headers: {
      'x-rapidapi-key': "5af4972005msh8912d6aad04cf04p18538ajsnbb5142a9e2a1",
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
    }
};

export const youtubeOptions = {
  method: 'GET',
  headers: {
    'x-rapidapi-key': '5af4972005msh8912d6aad04cf04p18538ajsnbb5142a9e2a1',
    'x-rapidapi-host': 'youtube-search-and-download.p.rapidapi.com'
  }
};

export const fetchData = async (url , options) => {
    const response = await fetch(url , options);
    const data = await response.json();
    return data;
}