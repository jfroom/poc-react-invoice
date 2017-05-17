const initialState = {
  invoices: {
    nextId: 4,
    invoices: [
      {
        id: 1,
        title: 'Hoyt Residence Kitchen Remodel',
        date: '1/1/2020',
        status: 'Unpaid',
        total: 7000,
        items: [
          {
            text: 'Quartz Counters',
            price: 5000,
          },
          {
            text: 'Subway Tile Backsplash',
            price: 2000,
          },
        ],
        notes: 'Thank you for your business!',
      },
      {
        id: 2,
        title: 'Lovejoy Residence Bathroom Remodel',
        date: '5/1/2017',
        status: 'Paid',
        total: 3000.99,
        items: [
          {
            text: 'Soaker tub',
            price: 1000.99,
          },
          {
            text: 'Tile work',
            price: 2000,
          },
        ],
        notes: 'Payment due net-30.',
      },
      {
        id: 3,
        title: 'Glisan Residence Living Room Remodel',
        date: '5/10/2017',
        status: 'Unpaid',
        total: 3090.99,
        items: [
          {
            text: 'Hardwood Floors',
            price: 1090.99,
          },
          {
            text: 'Ceiling Fan',
            price: 2000,
          },
        ],
        notes: 'Enjoy!',
      },
    ],
  },
}
export default initialState
