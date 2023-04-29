import routes from "../static/routes.json";

export const FetchPostImage = async ({ path, data }) => {
  const token = localStorage.getItem("token");

  // console.log({data})

  try {
    const resp = await fetch(`${routes.BASE_URL}${path}`, {
      method: "POST",
      headers: {
        Authorization: `${token}`,
      },
      body: data,
    });

    if (!resp.ok) {
      throw new Error("Error en la respuesta del servidor");
    }

    const dataRes = await resp.json();
    return dataRes;
  } catch (error) {
    return error;
  }
};
