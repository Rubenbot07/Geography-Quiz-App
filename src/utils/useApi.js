export const UseApi = async (level = 'easy') => {
    try {
        const response = await fetch(`https://the-trivia-api.com/api/questions?categories=geography&limit=10&difficulty=${level}`);
        const data = await response.json();
        return data
    } catch (error) {
        console.error(error);
    }
  };