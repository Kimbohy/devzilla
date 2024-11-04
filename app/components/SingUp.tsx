import { motion } from "framer-motion";

const SingUp = () => {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      action=""
      className="flex flex-col gap-3"
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Your first name</label>
        <input
          type="text"
          name="firstName"
          id="firstName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Your last name</label>
        <input
          type="text"
          name="lastName"
          id="lastName"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Password</label>
        <input
          type="password"
          name="password"
          id="passwordOne"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">Confirm the Password</label>
        <input
          type="password"
          name="password"
          id="passwordTow"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <motion.div layoutId="bottom" className="flex flex-col gap-3 mt-3">
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
