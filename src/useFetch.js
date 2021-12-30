import { useEffect, useState } from "react";
const axios = require("axios");

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const fetchData = async (url) => {
    setIsError(null);
    setIsLoading(true);
    try {
      const res = await axios.get(url);
      setIsLoading(false);
      setData(res.data);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      setIsError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return { data, isLoading, isError, fetchData };
};

export default useFetch;
