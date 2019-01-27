const axios = require('axios')
const env = require('dotenv').config()

const cmsAccessToken = env.parsed.DATO_CMS_READ_ONLY_API_TOKEN
const baseURL = process.env.NODE_ENV === 'production' ? 'https://graphql.datocms.com' : 'https://graphql.datocms.com/preview'
const headers = {
  Accept: 'application/json',
  Authorization: `Bearer ${cmsAccessToken}`,
  'Content-Type': 'application/json',
}

const axiosClient = axios.create({ baseURL, headers })

const getData = async (query) => {
  let data = null

  try {
    const { data: { data: res } } = await axiosClient({
      url: '/',
      method: 'POST',
      data: { query },
    })

    data = res
  } catch (error) {
    console.error(error)
  }

  return data
}

const getDataByType = async ({ query, type }) => {
  let dataByType = []

  try {
    const { [type]: data } = await getData(query)
    const entries = data.constructor === Array ? data : [data]

    dataByType = entries.map(entry => ({ data, slug: entry.slug, type }))
  } catch (error) {
    console.error(error)
  }

  return dataByType
}

const getAllData = async (queries = []) => {
  const promises = queries.map(query => getDataByType(query))
  let allData = []

  try {
    const dataByType = await Promise.all(promises)

    allData = dataByType.reduce((acc, dataEntry) => [...acc, ...dataEntry], [])
  } catch (error) {
    console.error(error)
  }

  return allData
}

module.exports = {
  getData,
  getDataByType,
  getAllData,
}
