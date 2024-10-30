import { CARTTYPE } from "./cart.type";

// Helper fucntion

const removeCartItemByID = (items, toRemoveId) =>
  items.filter((eachItem) => eachItem._id !== toRemoveId);

const incrementCartItemCountByID = (items, toIncrementId) =>
  items.map((eachItem) => {
    if (eachItem.productId === toIncrementId) {
      return {
        ...eachItem,
        count: eachItem.count + 1,
      };
    }
    return eachItem;
  });

// TODO BUG HERE ITEM Below 1 should be deleted from list
const deleteItemFromList = (list, id) => {
  let removedItems = [];
  console.log("List deletion");
  list.forEach((element) => {
    if (element.id != id) {
      removedItems.push(element);
    }
  });
  return removedItems;
};

const decrementCartItemCountByID = (items, toDecrementId) =>
  items.map((eachItem) => {
    if (eachItem.productId === toDecrementId) {
      if (eachItem.count > 1) {
        return {
          ...eachItem,
          count: eachItem.count - 1,
        };
      }
    }

    return eachItem;
  });

// Reducer Definition />

// const INITIAL_STATE = {
//     cartItemsIds : []
// }

const INITIAL_STATE = [];
export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CARTTYPE.SETCARTITEMS:
      return [
        ...payload, //objects
      ];

    case CARTTYPE.ADDCARTITEM:
      return [
        ...state, //old objects
        payload, //object
      ];
    case CARTTYPE.REMOVECARTITEM:
      const removedItemList = removeCartItemByID(state, payload); //payload = itemID
      return [...removedItemList];

    case CARTTYPE.INCREMENTCARTITEM:
      const incrementedItemList = incrementCartItemCountByID(state, payload); //payload = itemID
      return [...incrementedItemList];

    case CARTTYPE.DECREMENTCARTITEM:
      const decrementedItemList = decrementCartItemCountByID(state, payload); //payload = itemID
      return [...decrementedItemList];

    case CARTTYPE.RESETCARTITEMS:
      return INITIAL_STATE;

    default:
      return state;
  }
};
