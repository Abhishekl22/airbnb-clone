// Save data to localStorage
export const setItemsInLocalStorage = (key, value) => {
  if (!key || !value) {
    return console.error('Cannot store in localStorage: Key and value are required');
  }
  const valueToStore = typeof value !== 'string' ? JSON.stringify(value) : value;
  localStorage.setItem(key, valueToStore);
};

// Get data from localStorage
export const getItemFromLocalStorage = (key) => {
  if (!key) {
    console.error('Cannot get value from localStorage: Key is required');
    return null;
  }
  const value = localStorage.getItem(key);
  try {
    return JSON.parse(value);
  } catch (e) {
    return value;
  }
};

// Remove item from localStorage
export const removeItemFromLocalStorage = (key) => {
  if (!key) {
    return console.error('Cannot remove item from localStorage: Key is required');
  }
  localStorage.removeItem(key);
};

// Clear all user-related data from localStorage
export const clearAuthData = () => {
  removeItemFromLocalStorage('user');
  removeItemFromLocalStorage('token');
  // Add any other auth-related items you want to clear
};
