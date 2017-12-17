import bunyan from 'bunyan'

var log = bunyan.createLogger({
  name: `${process.env.NODE_ENV}`,
  streams: [
    {
      name: 'stdout',
      stream: process.stdout,
      level: 'trace'
    },
    {
      name: 'stderr',
      stream: process.stderr
    }
  ],
  serializers: {
    ...bunyan.stdSerializers,
    mongooseQuery: function (data) {
      let query = JSON.stringify(data.query)
      let options = JSON.stringify(data.options || {})

      return `db.${data.coll}.${data.method}(${query}, ${options});`
    }
  },
  src: true

  // Any other fields are added to all log records as is.
})

export default log
