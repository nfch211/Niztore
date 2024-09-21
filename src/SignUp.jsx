import React, { useState } from "react";
import SignUpBackend from "./SignUpBackend";
import "./SignUp.css";

const SignUp = ({
  HandleSignUpEmail,
  HandleSignUpPassword,
  HandleSignUpName,
  SignUpEmail,
  SignUpPassword,
  SignUpName,
  SubmitSignUpCredentials,
  SignUpError,
  SignUpSuccess,
  handleSignUp,
  setSignUpError,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [contactError, setContactError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    let isValid = true;
    setPasswordError("");
    setContactError("");
    setAddressError("");

    if (SignUpPassword !== confirmPassword) {
      setPasswordError("Passwords do not match");
      isValid = false;
    }

    if (SignUpPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
      isValid = false;
    }

    if (!/^\d{8}$/.test(contact)) {
      setContactError("Contact must be exactly 8 digits");
      isValid = false;
    }

    if (!address.trim()) {
      setAddressError("Address is required");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const profileData = {
      email: SignUpEmail,
      password: SignUpPassword,
      name: SignUpName,
      gender,
      age,
      contact,
      address,
    };

    try {
      await SubmitSignUpCredentials(profileData);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8"
        style={{ width: "100%" }}
      >
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              style={{ padding: "30px" }}
            >
              <div>
                <label
                  htmlFor="signUpEmail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="signUpEmail"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={SignUpEmail}
                    onChange={HandleSignUpEmail}
                  />
                </div>
              </div>

              <div style={{ paddingTop: "20px" }}>
                <label
                  htmlFor="signUpName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full name
                </label>
                <div className="mt-1">
                  <input
                    id="signUpName"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={SignUpName}
                    onChange={HandleSignUpName}
                  />
                </div>
              </div>

              <div style={{ paddingTop: "20px" }}>
                <label
                  htmlFor="signUpPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="signUpPassword"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={SignUpPassword}
                    onChange={HandleSignUpPassword}
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    autoComplete="new-password"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </div>
              {passwordError && (
                <p className="mt-2 text-sm text-red-600">{passwordError}</p>
              )}

              <div style={{ paddingTop: "20px" }}>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div style={{ paddingTop: "20px" }}>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age
                </label>
                <div className="mt-1">
                  <input
                    id="age"
                    name="age"
                    type="number"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ paddingTop: "20px" }}>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact
                </label>
                <div className="mt-1">
                  <input
                    id="contact"
                    name="contact"
                    type="tel"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
                {contactError && (
                  <p className="mt-2 text-sm text-red-600">{contactError}</p>
                )}
              </div>

              <div style={{ paddingTop: "20px" }}>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <div className="mt-1">
                  <textarea
                    id="address"
                    name="address"
                    rows="3"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  ></textarea>
                </div>
                {addressError && (
                  <p className="mt-2 text-sm text-red-">{addressError}</p>
                )}
              </div>

              <div style={{ paddingTop: "20px", textAlign: "center" }}>
                <button
                  disabled={isLoading}
                  type="submit"
                  style={{ backgroundColor: "gray" }}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isLoading ? (
                    <div className="loading-overlay">
                      <div className="loading-content">
                        <div className="spinner"></div>
                        <p>Loading...</p>
                      </div>
                    </div>
                  ) : null}
                  {isLoading ? "Signing up" : "Sign Up"}
                </button>
              </div>
            </form>

            <div
              className="bg-red-50 border-l-4 border-red-400 p-4 mb-6"
              role="alert"
              style={{ display: "flex", justifyContent: "center" }}
            >
              {SignUpError && (
                <p className="text-sm text-red-700">
                  <strong style={{ color: "red" }}>{SignUpError}</strong>
                </p>
              )}
              {SignUpSuccess && (
                <p className="text-sm text-red-700">
                  <strong style={{ color: "green", textAlign: "center" }}>
                    Sign up sucessfully!
                  </strong>
                </p>
              )}
              {!SignUpError && !SignUpSuccess && (
                <p className="text-sm text-red-700"></p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
