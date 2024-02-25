import axios from "axios";
import { useState } from "react";
import { useChatState } from "../context/chatContext";

export const useAxios = ({
  url,
  sendToken = true,
  method = "get",
  payload = {},
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setIsLoading] = useState(false);
  const { user } = useChatState();
  const authHeader = sendToken
    ? {
        Authorization: `Bearer ${user.token}`,
      }
    : {};
  async function fetchData(postPayload) {
    setIsLoading(true);
    axios({
      url,
      method: method || "get",
      data: postPayload || payload,
      headers: authHeader,
    })
      .then((response) => {
        setData(response.data);
        return response;
      })
      .catch((err) => setError(err))
      .finally(() => setIsLoading(false));
  }
  return { data, loading, error, fetchData };
};
