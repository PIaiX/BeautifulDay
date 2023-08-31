// value - цена, currency - выводить валюту (true|false))
import { LiaRubleSignSolid } from "react-icons/lia";
import { FILE_URL } from "../config/api";

const customPrice = (value, currency = true) => {

  if (!value) {
    return 0 + "\u00A0₽";
  }
  value = parseInt(value).toLocaleString();
  if (currency) {
    return value + "\u00A0₽";
  }
  return value;
};

const getImageURL = ({ path = "", size = "mini", type = "product" }) => {
  if (path && Array.isArray(path) && path?.length > 0) {
    if (size == "mini") {
      return FILE_URL + "/" + type + "/mini/" + path[0].media;
    } else {
      return FILE_URL + "/" + type + "/" + path[0].media;
    }
  } else if (path && path?.length > 0) {
    if (size == "mini") {
      return FILE_URL + "/" + type + "/mini/" + path;
    } else {
      return FILE_URL + "/" + type + "/" + path;
    }
  } else if (!type || type == "product" || type == "sale") {
    return "/images/empty-product-image.png";
  } else if (type == "user") {
    return "/images/avatar-full.png";
  }
};

export { customPrice, getImageURL };
