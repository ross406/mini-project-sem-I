import cookie from "react-cookies";

export function setValue(key, value) {
  let currentDate = new Date();
  let expireDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate()+1, 0,0, 0);
  return cookie.save(key, value, { path: "/", expires: expireDate});
}

export function getValue(key) {
  return cookie.load(key);
}

export function removeValue(key) {
  return cookie.remove(key, { path: "/" });
}

