import { useCallback, useState } from "react";
import api from "../../../utils/api";

const useGetCovidCountries = () => {
  const [state, setState] = useState([])

  const fetchCovidCountries = useCallback(async (date) => {
    try {
      const {data} = await api.get(`/covid?date=${date}`);
      setState(data)
    } catch (error) {
        console.error(error)
    } 
  }, []);

  return [state,fetchCovidCountries]
};

export default useGetCovidCountries;
