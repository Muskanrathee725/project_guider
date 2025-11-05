import React from 'react';
import SurveyForm from '../components/SurveyForm'; // Survey form ko import karo

function HomePage() {
  // Local storage se user data nikalo
  const user = JSON.parse(localStorage.getItem('user'));

  // YEH HAI NAYA LOGIC
  // Check karo ki user hai aur surveyCompleted flag true hai ya nahi
  const isSurveyDone = user?.surveyCompleted; 
  // user? ka matlab hai, agar 'user' null nahi hai toh hi aage check karo

  return (
    <div className="p-4">
      {isSurveyDone ? (
        // AGAR SURVEY HO GAYA HAI: Dashboard dikhao
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back to your Dashboard, {user.name}!
          </h1>
          <p className="mt-4">Your personalized learning path is loading...</p>
          <p>Your chosen stack: <strong>{user.techStack}</strong></p>
          <p>Your skill level: <strong>{user.skillLevel}</strong></p>
        </div>
      ) : (
        // AGAR SURVEY NAHI HUA HAI: Survey form dikhao
        <div>
          <h1 className="text-3xl font-bold text-center">
            Welcome, {user.name}!
          </h1>
          <SurveyForm />
        </div>
      )}
    </div>
  );
}

export default HomePage;