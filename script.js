const searchUrl = 'https://api.nps.gov/api/v1/parks';
const apiKey = '3ufkvNZu8hdwyhlBB3xkvvtbR4kA90Yrdg4NdBjx';


function formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  function displayResults(responseJson) {
    console.log(responseJson);
    $('#results-list').empty();
    for (let i=0; i<responseJson.data.length; i++) {
      $('#results-list').append(`
      <li><h3>${responseJson.data[i].fullName}</h3>
      <a href='${responseJson.data[i].url}'>${responseJson.data[i].url}</a>
      <p>${responseJson.data[i].description}</p>
      <p>${responseJson.data[i].directionsInfo}</p>
      <p>${responseJson.data[i].latLong}</p>
      <a href='${responseJson.data[i].directionsUrl}'>Click Here for more detailed directions</a>
      </li>
      `)
    };
    $('#results').removeClass('hidden');
  }

  function getNationalParkInfo(query,limit=10) {
    const params = {
      api_key: apiKey,
      q: query,
      limit: limit-1,
    };
    const queryString = formatQueryParams(params)
    const url = searchUrl + '?' + queryString;
    console.log(url);
  
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error(response.statusText);
      })
      .then(responseJson => displayResults(responseJson))
      .catch(err => {
        $('#js-error-message').text(`Something went wrong: ${err.message}`);
      });
  }

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const searchTerm = $('#js-search-term').val();
      const limit = $('#js-max-results').val();
      getNationalParkInfo(searchTerm,limit);
    });
  }
  
  $(watchForm);