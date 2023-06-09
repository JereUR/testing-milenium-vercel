export const FetchPostImage = async ({ path, data }) => {
  const token = localStorage.getItem('token')

  // console.log({data})

  try {
    const resp = await fetch(`${import.meta.env.VITE_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`
      },
      body: data
    })

    if (!resp.ok) {
      throw new Error('Error en la respuesta del servidor')
    }

    const dataRes = await resp.json()
    return dataRes
  } catch (error) {
    return error
  }
}
