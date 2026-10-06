const customerInitialState = {
  fullName: "",
  natoinalId: "",
  createdAt: "",
};

export default function customerReducer(state = customerInitialState, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        natoinalId: action.payload.natoinalId,
        createdAt: action.payload.createdAt,
      };
    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload,
      };
    default:
      return state;
  }
}


export function createCustomer(fullName, natoinalId) {
  return {
    type: "customer/createCustomer",
    payload: {
      fullName,
      natoinalId,
      createdAt: new Date().toISOString(),
    },
  };
}

export function updateName(fullName) {
  return { type: "customer/updateName", payload: fullName };
}