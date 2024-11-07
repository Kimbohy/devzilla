import axios from "axios";
import { motion } from "framer-motion";
import { redirect } from "next/navigation";
import { useState } from "react";

const SingUp = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    passwordOne: "",
    passwordTwo: "",
  });

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
    if (formData.passwordOne !== formData.passwordTwo) {
      alert("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post<{
        success: boolean;
        message: string;
        data: {
          _id: string;
          nom: string;
          email: string;
          type: string;
        };
      }>("http://localhost:8080/users/signup", {
        nom: formData.nom,
        email: formData.email,
        password: formData.passwordOne,
      });
      console.log(response.data);
      redirect("/Profile");
    } catch (error) {
      console.error("There was an error signing up!", error);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      onSubmit={handleSubmit}
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Nom</label>
        <input
          type="text"
          name="nom"
          id="nom"
          value={formData.nom}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Mot de passe</label>
        <input
          type="password"
          name="passwordOne"
          id="passwordOne"
          value={formData.passwordOne}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">
          Confirmer votre mot de passe
        </label>
        <input
          type="password"
          name="passwordTwo"
          id="passwordTwo"
          value={formData.passwordTwo}
          onChange={handleChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <motion.div layoutId="bottom" className="flex flex-col gap-3 my-3">
        <input
          type="submit"
          value="Join Now"
          className="w-full p-2 text-white rounded-lg bg-primary hover:bg-primary-dark h-11"
        />
      </motion.div>
    </motion.form>
  );
};

export default SingUp;
