const dataFetch = require('./services/dataFetch')
const dataWrite = require('./services/dataWrite')

const config = require('./config')

const build = async () => {
  const { queries } = config

  try {
    console.log('Build start')
    const allData = await dataFetch.getAllData(queries)
    await dataWrite.setAllData(allData)
    console.log('Build finish')
  } catch (error) {
    console.error(error)
  }
}

build()
