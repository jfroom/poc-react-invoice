const initialState =
{
  invoices: {
    nextId: 3,
    invoices: [
      {
        id: 1,
        title: "Hoyt Residence Kitchen Remodel",
        status: "Unpaid",
        total: 7000,
        items: [
          {
            text: 'Quartz Counters',
            price: 5000
          },
          {
            text: 'Subway Tile Backsplash',
            price: 2000
          }
        ],
        notes: "Thank you for your business!"
      },
      {
        id: 2,
        title: "Lovejoy Residence Bathroom Remodel",
        status: "Paid",
        total: 7000.99,
        items: [
          {
            text: 'Soaker tub',
            price: 1000.99
          },
          {
            text: 'Tile work',
            price: 2000
          }
        ],
        notes: "Payment due net-30."
      }
    ]
  }
}
export default initialState
