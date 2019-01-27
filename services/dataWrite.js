const fse = require('fs-extra')
const path = require('path')

const createDirectory = async ({ type }) => {
  const dirpath = path.join(__dirname, `../dist/${type}`)

  try {
    await fse.ensureDir(dirpath)
  } catch (err) {
    console.error(err)
  }
}

const writeFile = async ({ data, type, slug }) => {
  const filepath = path.join(__dirname, `../dist/${type}/${slug}.json`)

  try {
    await fse.writeJson(filepath, data)
    console.log(`Success! json written to file: ${filepath}`)
  } catch (err) {
    console.error(err)
  }
}

const createDirectoryAndWriteFile = async ({ data, type, slug }) => {
  try {
    await createDirectory({ type })
    await writeFile({ data, type, slug })
  } catch (error) {
    console.error(error)
  }
}

const setAllData = async (data = []) => {
  const promises = data.map(dataEntry => createDirectoryAndWriteFile(dataEntry))

  try {
    await Promise.all(promises)
  } catch (error) {
    console.error(error)
  }
}

module.exports = {
  setAllData,
}
