const statusSchemas = [
  {
    id: 1,
    title: 'Hot Cold',
    statuses: [
      {name: 'Hot', color: '#FF8000', default: false},
      {name: 'Warm', color: '#63C94F', default: true},
      {name: 'Cold', color: '#70A2FF', default: false}
    ]
  },
  {
    id: 2,
    title: 'Used Cars',
    statuses: [
      {name: 'Booked appointment', color: '#FF8000', default: false},
      {name: 'Interesting', color: '#63C94F', default: true},
      {name: 'Sold out', color: '#70A2FF', default: false}
    ]
  }
]

export default {
  getStatusSchemas () {
    return statusSchemas
  },
  getPossibleStatuses (schemaId) {
    const schema = statusSchemas.find(s => s.id === schemaId)
    if (schema) {
      return schema.statuses
    }
    return []
  }
}
