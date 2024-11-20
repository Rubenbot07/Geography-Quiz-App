const API_URL = 'https://opentdb.com/api.php?amount=10'

const useApi = () => {
  setTimeout(async() => { 
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data.results)
    } catch (error) {
      console.log(error)
    }
  }, 5000)
}
  
export default useApi