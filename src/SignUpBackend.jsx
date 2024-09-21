// SignUpBackend.js
const SignUpBackend = {
  submitSignUpCredential: async (profileData, handleSignUp, setSignUpError) => {
    try {
      const response = await fetch(
        "https://nicksrestapi-plan-sea-linux.azurewebsites.net/profile/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(profileData),
        }
      );

      const data = await response.json();

      if (response.ok) {
        handleSignUp(data);
        return data;
      } else {
        throw new Error(data.detail || "Failed to create profile");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setSignUpError(error.message || "An error occurred during sign up");
      throw error;
    }
  },
};

export default SignUpBackend;
