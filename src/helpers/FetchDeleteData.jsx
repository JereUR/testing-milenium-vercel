export const FetchDeleteData = async ({ path }) => {
  const token = localStorage.getItem('token')
  try {
    const resp = await fetch(`${import.meta.env.VITE_BASE_URL}${path}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Origin: import.meta.env.VITE_BASE_URL,
        'X-Requested-With': 'XMLHttpRequest',
        credentials: 'include',
        Authorization: `${token}`
      },
      withCredentials: true
    })

    if (!resp.ok) {
      throw new Error('Error en la respuesta del servidor')
    }

    if (path === import.meta.env.VITE_LOGOUT) {
      localStorage.removeItem('token')
    }

    const dataRes = await resp.json()
    return dataRes
  } catch (error) {
    return error
  }
}
