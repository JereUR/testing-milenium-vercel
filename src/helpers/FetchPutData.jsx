import routes from "../static/routes.json";

export const FetchPutData = async ({ path, data }) => {
  const token = localStorage.getItem("token");

  try {
    const resp = await fetch(`${routes.BASE_URL}${path}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Origin: routes.BASE_URL,
        "X-Requested-With": "XMLHttpRequest",
        credentials: "include",
        Authorization: `${token}`,
      },
      body: JSON.stringify(data),
      withCredentials: true,
    });

    if (!resp.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const dataRes = await resp.json();

    if (path === "login" || path === "signup") {
      if (dataRes.value) {
        if (dataRes.value === 0) {
          localStorage.setItem("token", resp.headers.get("Authorization"));
        }
      }
    }

    return dataRes;
  } catch (error) {
    return error;
  }
};
