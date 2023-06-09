export const FetchPostData = async ({ path, data }) => {
  const token = localStorage.getItem('token')
  let headers = {}

  if (
    path === import.meta.env.VITE_SIGN_UP ||
    path === import.meta.env.VITE_LOGIN
  ) {
    headers = {
      'Content-Type': 'application/json',
      Origin: import.meta.env.VITE_BASE_URL,
      'X-Requested-With': 'XMLHttpRequest',
      credentials: 'include'
    }
  } else {
    if (path === import.meta.env.VITE_RECOVER) {
      headers = {
        'Content-Type': 'application/json',
        Origin: import.meta.env.VITE_BASE_URL,
        'X-Requested-With': 'XMLHttpRequest',
        credentials: 'include',
        Authorization: `${data.user.reset_password_token}`
      }
    } else {
      headers = {
        'Content-Type': 'application/json',
        Origin: import.meta.env.VITE_BASE_URL,
        'X-Requested-With': 'XMLHttpRequest',
        credentials: 'include',
        Authorization: `${token}`
      }
    }
  }

  try {
    const resp = await fetch(`${import.meta.env.VITE_BASE_URL}${path}`, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(data),
      withCredentials: true
    })

    if (!resp.ok) {
      if (resp.status === 422) {
        throw new Error(`El email ingresado no existe en la base de datos.`)
      }

      if (resp.status === 401) {
        throw new Error(`Usuario y/o contraseña incorrectas.`)
      }

      throw new Error('Error en la respuesta del servidor')
    }

    if (
      path === import.meta.env.VITE_LOGIN ||
      path === import.meta.env.VITE_SIGN_UP
    ) {
      localStorage.setItem('token', resp.headers.get('Authorization'))
    }

    const dataRes = await resp.json()
    return dataRes
  } catch (error) {
    return error
  }
}
