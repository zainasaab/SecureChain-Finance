/**
 * @param {number} amount 
 * @param {string} [currencySymbol='$'] 
 * @param {number} [decimals=2] 
 * @return {string} 
 */
export const formatCurrency = (amount, currencySymbol = '$', decimals = 2) => {
    return `${currencySymbol}${amount.toFixed(decimals)}`;
  };
  
  /**
   * @param {string} address 
   * @return {boolean} 
   */
  export const isValidEthereumAddress = (address) => {
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  };
  
  /**
   * @param {number} timestamp 
   * @param {string} [format='YYYY-MM-DD'] 
   * @return {string} 
   */
  export const formatDate = (timestamp, format = 'YYYY-MM-DD') => {
    const date = new Date(timestamp * 1000); 
    const year = date.getFullYear();
    const month = (`0${date.getMonth() + 1}`).slice(-2);
    const day = (`0${date.getDate()}`).slice(-2);
  
    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`;
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`;
      default:
        return `${year}-${month}-${day}`;
    }
  };
  
  /**
   * @param {string} str 
   * @param {number} [length=10] 
   * @return {string} 
   */
  export const truncateString = (str, length = 10) => {
    if (str.length <= length) return str;
    return `${str.substring(0, length)}...`;
  };
  
  