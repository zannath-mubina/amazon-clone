export const initialState = {
    basket: [],
    user: null,
    city: '',
    pincode: ''
};

export const getBasketTotal = (basket) =>
    basket?.reduce((acc, x) => acc + x.price, 0);

const reducer = (state, action) => {
    switch(action.type) {
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket: [...state.basket, action.item],
            };
        case "REMOVE_FROM_BASKET":
            const newBasket = [...state.basket];
            const index = state.basket.findIndex((i) => i.id ===  action.id)
            if (index >= 0) newBasket.splice(index, 1);
            else console.warn(`Cannot remove product id (id: ${action.id}) as it is not in the basket`);
            return {
                ...state,
                basket: newBasket
            }
        case "SET_USER":
            return {
                ...state,
                user: action.user
            }

        case "EMPTY_BASKET":
            return {
                ...state,
                basket: []
            }

        case "SET_CITY":
            return {
                ...state,
                city: action.city,
            }

        case "SET_PINCODE":
            return {
                ...state,
                pincode: action.pincode,
            }
            
        default:
            return state;
    }
};

export default reducer;