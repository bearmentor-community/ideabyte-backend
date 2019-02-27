const index = {
  getHello: (req, res) => {
    res.send({
      message: 'Welcome to Idea Byte backend REST API',
      routes: ['/users', '/ideas']
    })
  }
}

module.exports = index
