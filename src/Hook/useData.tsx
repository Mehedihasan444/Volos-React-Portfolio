import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";

const useData = () => {
  const [data, setData] = useState({});
  useEffect(() => {
    axios
      .get(
        "https://portfolio-backend-30mp.onrender.com/api/v1/get/user/65b3a22c01d900e96c4219ae"
      )
      .then((response) => setData(response.data));
  }, []);

  return data;
};

export default useData;
