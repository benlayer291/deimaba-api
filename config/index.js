const homeGql = require('../graphql/home')

const queries = [
  {
    query: homeGql,
    type: 'home',
  },
]

module.exports = {
  queries,
}
