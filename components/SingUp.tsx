import axios from "axios";
import { motion } from "framer-motion";
import { useState } from "react";

const SingUp = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (formData.passwordOne !== formData.passwordTwo) {
      setError("Passwords do not match");
      return;
    }

    try {
      await axios.post("http://localhost:8080/users/signup", {
        nom: formData.nom,
        email: formData.email,
        password: formData.passwordOne,
      });

      setSuccess(true);
      console.log(formData);
      // Optional: Reset form or redirect
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message ||
            "An error occurred. Please try again."
        );
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {error && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-green-50 border border-green-300 text-green-700 px-4 py-2 rounded-lg">
          Registration successful! You can now sign in.
        </div>
      )}

      <div>
        <label
          htmlFor="nom"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Name
        </label>
        <input
          type="text"
          id="nom"
          name="nom"
          value={formData.nom}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter your name"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter your email"
        />
      </div>

      <div>
        <label
          htmlFor="passwordOne"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Password
        </label>
        <input
          type="password"
          id="passwordOne"
          name="passwordOne"
          value={formData.passwordOne}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Enter your password"
        />
      </div>

      <div>
        <label
          htmlFor="passwordTwo"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Confirm Password
        </label>
        <input
          type="password"
          id="passwordTwo"
          name="passwordTwo"
          value={formData.passwordTwo}
          onChange={handleChange}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          placeholder="Confirm your password"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-dark transition-colors"
      >
        Sign Up
      </button>
    </motion.form>
  );
};

export default SingUp;
