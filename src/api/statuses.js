const statusSchemas = [
  {
    id: 1,
    title: 'Generic Hot/Cold',
    description: 'Generic set of statuses if other statuses are not' +
    ' suitable. There are "Hot", "Warm" and "Cold" statuses. Hot - means' +
    ' very close to what you are looking for. Cold - means too far.',
    statuses: [
      {name: 'Hot', color: '#FF8000', default: false},
      {name: 'Warm', color: '#63C94F', default: true},
      {name: 'Cold', color: '#70A2FF', default: false}
    ]
  },
  {
    id: 2,
    title: 'Used Cars',
    description: 'Statuses for buying a used car. There are "Interesting", ' +
    '"Ready to contact seller", "Ready for visit"' +
    ' and "Sold out" statuses.',
    statuses: [
      {name: 'Interesting', color: '#70A2FF', default: true},
      {name: 'Ready to contact seller', color: '#63C94F', default: false},
      {name: 'Ready for visit', color: '#FF8000', default: false},
      {name: 'Sold out', color: '#9a9a9a', default: false}
    ]
  },
  {
    id: 3,
    title: 'Clothes',
    description: 'Statuses for buying clothes. There are "Interesting", ' +
    '"Ready to buy" and "Garbage" statuses.',
    statuses: [
      {name: 'Interesting', color: '#70A2FF', default: true},
      {name: 'Ready to buy', color: '#FF8000', default: false},
      {name: 'Garbage', color: '#9a9a9a', default: false}
    ]
  },
  {
    id: 4,
    title: 'Used Stuff',
    description: 'Statuses for buying a used stuff. There are' +
    ' "Interesting", "Ready to contact seller", ' +
    '"Ready to buy" and "Garbage" statuses.',
    statuses: [
      {name: 'Interesting', color: '#70A2FF', default: true},
      {name: 'Ready to contact seller', color: '#63C94F', default: false},
      {name: 'Ready to buy', color: '#FF8000', default: false},
      {name: 'Garbage', color: '#9a9a9a', default: false}
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
