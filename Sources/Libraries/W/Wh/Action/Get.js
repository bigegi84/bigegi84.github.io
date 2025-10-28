export const Get = async (url, query) => {
  const params = new URLSearchParams(query)
  const response = await fetch(`${url}?${params}`, {
    method: 'Get',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  return response
}
