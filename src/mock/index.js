import Mock from 'mockjs'

Mock.setup({
  timeout: 500
})
const mockFiles = require.context('./modules', true, /\.js$/)
mockFiles.keys().forEach(mockPath => {
  const value = mockFiles(mockPath)
  value.default.forEach(api => {
    Mock.mock(api.url, api.type, api.response)
  })
})
