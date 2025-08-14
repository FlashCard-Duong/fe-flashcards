import usePrivateHttpClient from "../hooks/http-hook/private-http-hook";

const useAccountServices = () => {
  const { privateRequest } = usePrivateHttpClient();

  const login = async (username, password) => {
    try {
      const response = await privateRequest(
        "/accounts/login",
        "post",
        { username: username, password: password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      return response?.data;
    } catch (err) {
      throw err;
    }
  };

  const getLoginAccount = async () => {
    try {
      const response = await privateRequest("/accounts/");

      return response?.data;
    } catch (err) {
      throw err;
    }
  };

  return { login, getLoginAccount };
};

export const signUp = async (signUpForm, sendRequest) => {
  try {
    const response = await sendRequest("/accounts/signup", "post", signUpForm, {
      headers: { "Content-Type": "application/json" },
    });
    if (response.status !== 201) throw new Error(response?.data?.message);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export const getOtpSignUp = async (username, email, sendRequest) => {
  try {
    const response = await sendRequest(`/accounts/signup/${username}/${email}`);
    return response?.data;
  } catch (err) {
    throw err;
  }
};

export default useAccountServices;
