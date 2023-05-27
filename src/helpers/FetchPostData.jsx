import routes from "../static/routes.json";

export const FetchPostData = async ({ path, data }) => {
  const token = localStorage.getItem("token");
  let headers = {};

  if (path === routes.SIGN_UP || path === routes.LOGIN) {
    headers = {
      "Content-Type": "application/json",
      Origin: routes.BASE_URL,
      "X-Requested-With": "XMLHttpRequest",
      credentials: "include",
    };
  } else {
    if (path === routes.RECOVER) {
      headers = {
        "Content-Type": "application/json",
        Origin: routes.BASE_URL,
        "X-Requested-With": "XMLHttpRequest",
        credentials: "include",
        Authorization: `${data.user.reset_password_token}`,
      };
    }
    else{
      headers = {
        "Content-Type": "application/json",
        Origin: routes.BASE_URL,
        "X-Requested-With": "XMLHttpRequest",
        credentials: "include",
        Authorization: `${token}`,
      };
    }
  }

  try {
    const resp = await fetch(`${routes.BASE_URL}${path}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
      withCredentials: true,
    });

    if (!resp.ok) {
      if (resp.status === 422) {
        throw new Error(`El email ingresado no existe en la base de datos.`);
      }

      if (resp.status === 401) {
        throw new Error(`Usuario y/o contraseña incorrectas.`);
      }
      
      throw new Error("Error en la respuesta del servidor");  
    }

    if (path === routes.LOGIN || path === routes.SIGN_UP) {
      localStorage.setItem("token", resp.headers.get("Authorization"));
    }

    const dataRes = await resp.json();
    return dataRes;
  } catch (error) {
    return error;
  }
};
