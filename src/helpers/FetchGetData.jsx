import routes from "../static/routes.json";

export const FetchGetData = async (path) => {
  const token = localStorage.getItem("token");
  let headers = {};

  if (token === null) {
    headers = {
      Origin: routes.BASE_URL,
      "X-Requested-With": "XMLHttpRequest",
    };
  } else {
    headers = {
      Origin: routes.BASE_URL,
      "X-Requested-With": "XMLHttpRequest",
      Authorization: `${token}`,
    };
  }

  try {
    return await fetch(`${routes.BASE_URL}${path}`, {
      credentials: "include",
      headers: headers,
      withCredentials: true,
    });
  } catch (error) {
    return error;
  }
};
