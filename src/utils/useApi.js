export const UseApi = async () => {
    try {
        const response = await fetch('https://the-trivia-api.com/api/questions?categories=geography&limit=10&difficulty=easy');
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
  };