import { useSelector } from "react-redux";
import { FILE_URL } from "../config/api";

const customPrice = (value, currency = true) => {
  if (!value) {
    return "По запросу";
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

const convertColor = (color, opacity) => {
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};

const convert = (value) => (value > 0 && value < 1 ? Math.round(Number(value) * 1000) : value);

const customWeight = (value) => {
  if (!value) {
    return null;
  }

  value = convert(value);

  let weight = value > 1000 ? (value / 1000) + "кг" : value + "г";

  return weight;
};

const statusData = {
  processing: {
    text: "Обработка",
    statusBg: "rgba(0,0,0,0.05)",
  },
  reservation: {
    text: "Предзаказ",
    statusBg: "rgba(0,0,0,0.05)",
  },
  new: { text: "Принят", statusBg: "rgba(0,0,0,0.05)" },
  preparing: {
    text: "Готовится",
  },
  prepared: {
    text: "Готов к выдаче",
  },
  delivery: {
    text: "Доставляется",
  },
  done: { text: "Завершен", statusBg: "rgba(0,0,0,0.05)" },
  canceled: { statusBg: "transparent", text: "Отменен" },
};

const deliveryData = {
  delivery: "Доставка",
  pickup: "Самовывоз",
};

const paymentData = {
  card: "Банковской картой",
  online: "Онлайн оплата",
  cash: "Наличными",
};

const getSettings = (name) => {
  const settings = useSelector((state) => state?.settings?.options);
  let option = settings ? settings[name] ?? false : false;
  return option;
};

const getCount = (cart) => {
  if (cart && cart.length > 0) {
    let value = 0;
    cart.map((item) => item?.cart?.count && (value += Number(item.cart.count)));
    return value;
  }
};

const declination = (value, data, view = true) => {
  value = Number(Math.abs(Number(value)) % 100);
  var num = value % 10;
  if (value > 10 && value < 20) return view ? value + " " + data[2] : data[2];
  if (num > 1 && num < 5) return view ? value + " " + data[1] : data[1];
  if (num == 1) return view ? value + " " + data[0] : data[0];
  return view ? value + " " + data[2] : data[2];
};

const setCssColor = (name, value) => {
  document.documentElement.style.setProperty(name, value);
}

const childrenArray = (data, idProp, parentProp) => {
  const tree = Object.fromEntries(data.map(n => [n[idProp], { ...n, children: [] }]));

  return Object
    .values(tree)
    .filter(n => !(tree[n[parentProp]] && tree[n[parentProp]].children.push(n)));
}

const generateUrl = (str) => {
  var url = str.replace(/[\s]+/gi, '-');
  url = translit(url);
  url = url.replace(/[^0-9a-z_]+/gi, '').toLowerCase();
  return url;
}

const translit = (str) => {
  var ru = ("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")
  var en = ("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")
  var res = '';
  for (var i = 0, l = str.length; i < l; i++) {
    var s = str.charAt(i), n = ru.indexOf(s);
    if (n >= 0) { res += en[n]; }
    else { res += s; }
  }
  return res;
}
export {
  generateUrl,
  childrenArray,
  setCssColor,
  customPrice,
  getImageURL,
  convertColor,
  customWeight,
  statusData,
  deliveryData,
  paymentData,
  getSettings,
  getCount,
  declination,
};
