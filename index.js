const axios = require('axios')
const env = require('dotenv').config()
const fse = require('fs-extra')

/**
 * Service
 */
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

/**
 * Routes
 */

const homeGql = require('./graphql/home')

const getDataByType = async ({ query, type }) => {
  let routes = []

  try {
    const { [type]: data } = await axiosGetData(query)
    const entries = data.constructor === Array ? data : [data]

    routes = entries.map(entry => ({ data, slug: entry.slug, type }))
  } catch (error) {
    console.error(error)
  }

  return routes
}

const getAllData = async () => {
  let allRoutes = []

  try {
    const routesByType = await Promise.all([
      getDataByType({ query: homeGql, type: 'home' }),
    ])

    allRoutes = routesByType.reduce((acc, routes) => [...acc, ...routes], [])
  } catch (error) {
    console.error(error)
  }

  return allRoutes
}

/**
 * Write Data to file
 */

const createDirectory = async ({ type }) => {
  const dirpath = `${__dirname}/dist/${type}`

  try {
    await fse.ensureDir(dirpath)
    console.log(`Success, directory: ${dirpath}`)
  } catch (err) {
    console.error(err)
  }
}

const writeFile = async ({ data, type, slug }) => {
  const filepath = `${__dirname}/dist/${type}/${slug}.json`

  try {
    await fse.writeJson(filepath, data)
    console.log(`Success, file: ${filepath}`)
  } catch (err) {
    console.error(err)
  }
}

const createDirectoryAndWriteFile = async ({ data, type, slug }) => {
  await createDirectory({ type })
  await writeFile({ data, type, slug })
}

const setAllData = async (data = []) => {
  const promises = data.map(dataEntry => createDirectoryAndWriteFile(dataEntry))

  try {
    await Promise.all(promises)
  } catch (error) {
    console.error(error)
  }
}

const build = async () => {
  try {
    console.log('Build start')
    const allData = await getAllData()
    await setAllData(allData)
    console.log('Build finish')
  } catch (error) {
    console.error(error)
  }

  // deploy to netlify
  console.log('DEPLOY TO NETLIFY')
}

build()
