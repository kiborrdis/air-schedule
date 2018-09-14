import React from 'react';

function fetchSchedule() {
  return fetch('http://api.tvmaze.com/schedule?country=US').then((response) => {
    console.log(response.json().then((res => console.log(res))));
  });
}

const Test = () => (
  <div>
    {console.log(fetchSchedule())}
    Test212
  </div>
);

export default Test;
