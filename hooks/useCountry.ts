import { useEffect, useState } from 'react'

interface Country {
  name: string
  capital: string
  population: number
  // Agrega más propiedades según tus necesidades
}

const useCountry = () => {
  const [country, setCountry] = useState<Country | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchCountryData = async () => {
      try {
        const response = await fetch(
          `https://restcountries.com/v3/alpha/${countryCode}`,
        )
        if (!response.ok) {
          throw new Error('Error al obtener datos del país')
        }

        const data = await response.json()
        const countryData: Country = {
          name: data.name.common,
          capital: data.capital,
          population: data.population,
          // Agrega más propiedades según tus necesidades
        }

        setCountry(countryData)
        setLoading(false)
      } catch (error) {
        console.error(error)
        setLoading(false)
      }
    }

    fetchCountryData()
  }, [])

  return { country, loading }
}

export default useCountry
