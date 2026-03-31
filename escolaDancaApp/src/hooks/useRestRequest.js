import { useState } from "react";

export const useRestRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = async (requestCall) => {
    setLoading(true);
    setError(null);

    try {
      const result = await requestCall();
      setData(result.data);
      setLoading(false);
      return result;
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  return { data, error, loading, request, reset };
};
