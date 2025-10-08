import React, { useEffect, useState } from "react";

const API_KEY = "2bf4af9501c7bdfb26cf7c139b7f3bf7";

function useFetch(query) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    query &&
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => setData(data))
        .catch((err) => setError(err));
  }, [query]);

  return { data, error };
}

export default useFetch;
