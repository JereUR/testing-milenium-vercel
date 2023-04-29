import routes from "../static/routes.json";

export const FetchDeleteData = async ({ path }) => {
  const token = localStorage.getItem("token");
  try {
    const resp = await fetch(`${routes.BASE_URL}${path}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Origin: routes.BASE_URL,
        "X-Requested-With": "XMLHttpRequest",
        credentials: "include",
        Authorization: `${token}`,
      },
      withCredentials: true,
    });

    if (!resp.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    localStorage.removeItem("token");

    const dataRes = await resp.json();
    return dataRes;
  } catch (error) {
    return error;
  }
};
