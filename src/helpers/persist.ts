const set = (key: string, value: any) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

const get = (key: string) => {
  const value = window.localStorage.getItem(key);
  return value && JSON.parse(value);
};

const remove = (key: string) => {
  window.localStorage.removeItem(key);
};

export default {
  set,
  get,
  remove,
};
