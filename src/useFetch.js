import { useEffect, useState } from "react";
import apiRequest from './apiRequest'
const axios = require("axios");

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);

  const fetchData = async (url) => {
    setIsError(null);
    setIsLoading(true);
    try {
      const res = await axios.get(url, {
        params: {
          api_key: apiRequest.api_key,
        },
      });
      setIsLoading(false);
      setData(res.data);
    } catch (error) {
      setIsLoading(false);
      setIsError(error);
    }
  };

  useEffect(() => {
    fetchData(url);
  }, []);

  return { data, isLoading, isError, fetchData };
};

export default useFetch;
