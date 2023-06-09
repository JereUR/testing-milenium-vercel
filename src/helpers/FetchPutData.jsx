export const FetchPutData = async ({ path, data }) => {
  const token = localStorage.getItem('token')

  try {
    const resp = await fetch(`${import.meta.env.VITE_BASE_URL}${path}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Origin: import.meta.env.VITE_BASE_URL,
        'X-Requested-With': 'XMLHttpRequest',
        credentials: 'include',
        Authorization: `${token}`
      },
      body: JSON.stringify(data),
      withCredentials: true
    })

    if (!resp.ok) {
      if (resp.status === 422) {
        throw new Error(`La contraseña actual es incorrecta.`)
      }

      throw new Error('Error en la respuesta del servidor')
    }

    const dataRes = await resp.json()

    if (
      path === import.meta.env.VITE_LOGIN ||
      path === import.meta.env.VITE_SIGN_UP
    ) {
      if (dataRes.value) {
        if (dataRes.value === 0) {
          localStorage.setItem('token', resp.headers.get('Authorization'))
        }
      }
    }

    return dataRes
  } catch (error) {
    return error
  }
}
