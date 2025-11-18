'use server'

export async function fetchWatherAction({ search }: { search?: string }) {


  console.log(search)
  try {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${process.env.WEATHER_API}&q=${search || 'tamworth'}&alerts=yes`)

    if (!response.ok) {
      throw new Error('No response from api')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error(`${error}`)
  }
}
