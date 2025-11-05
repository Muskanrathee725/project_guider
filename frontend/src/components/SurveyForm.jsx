import { useState } from 'react';
import axios from 'axios';

function SurveyForm() {
  const [techStack, setTechStack] = useState('');
  const [skillLevel, setSkillLevel] = useState('zero'); // Default value

  const onSubmit = async (e) => {
    e.preventDefault();

    // 1. Local storage se user data (aur token) lo
    const { token } = JSON.parse(localStorage.getItem('user'));

    // 2. Request bhej ne ke liye config object banao
    const config = {
      headers: {
        Authorization: `Bearer ${token}`, // Yahan token bhej rahe hain
      },
    };

    // 3. Data object banao
    const surveyData = { techStack, skillLevel };

    try {
      // 4. PUT request bhejo backend ko
      const response = await axios.put(
        'http://localhost:5000/api/users/survey',
        surveyData,
        config // Config ko 3rd argument mein pass karo
      );

      // 5. Success hone par, naye user data ko local storage mein update karo
      localStorage.setItem('user', JSON.stringify(response.data));
      alert('Survey submitted! Welcome!');

      // 6. Page ko reload karo taaki HomePage naya data dekh sake
      window.location.reload(); 

    } catch (error) {
      console.error('Error!', error.response.data.message || error.message);
      alert('Error: ' + (error.response.data.message || 'Something went wrong'));
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg mx-auto mt-10">
      <h2 className="text-2xl font-bold text-center mb-6">
        Tell us about yourself!
      </h2>
      <p className="text-center text-gray-600 mb-6">
        This will help us personalize your learning path.
      </p>
      <form onSubmit={onSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="techStack">
            What do you want to learn?
          </label>
          <input
            type="text"
            id="techStack"
            placeholder="e.g., MERN Stack, Data Science, Java..."
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2" htmlFor="skillLevel">
            What is your current skill level?
          </label>
          <select
            id="skillLevel"
            className="w-full p-2 border border-gray-300 rounded-lg"
            value={skillLevel}
            onChange={(e) => setSkillLevel(e.target.value)}
          >
            <option value="zero">Just Started (Zero)</option>
            <option value="basic">I know the basics (Basic)</option>
            <option value="medium">I've built projects (Medium)</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Start My Journey
        </button>
      </form>
    </div>
  );
}

export default SurveyForm;