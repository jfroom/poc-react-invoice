const initialState =
{
  nextInvoiceId: 3,
  invoices: [
    {
      id: 1,
      title: "Hoyt Residence Kitchen Remodel",
      status: "due",
      total: 7000, // TODO: compute this dynamically with Reselect
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
      title: "Lovejoy Bathroom Remodel",
      status: "overdue",
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

const invoice = (state, action) => {
  switch (action.type) {
    case 'ADD_INVOICE':
      return {
        id: action.id,
        desc: action.desc,
        status: action.status
      }
    case 'EDIT_INVOICE':
      if (state.id !== action.id) {
        return state
      }
      break

    default:
      return state
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_INVOICE':
      return [
        ...state,
        invoice(undefined, action)
      ]
    case 'DELETE_INVOICE':

      return state
    case 'EDIT_INVOICE':
      return state.map(t =>
        invoice(t, action)
      )
    default:
      return state
  }
}

export default reducer
