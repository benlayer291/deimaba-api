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

const axiosGetData = async (query) => {
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

module.exports = axiosGetData
