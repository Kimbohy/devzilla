import { motion } from "framer-motion";

const SingIn = () => {
  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.75 }}
      action=""
      className="flex flex-col gap-3 "
    >
      <div className="flex flex-col gap-2">
        <label className="text-sm text-gray-600">E-mail/Phone</label>
        <input
          type="email"
          name="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-gray-600 text -sm">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5"
        />
      </div>
      <motion.div layoutId="bottom" className="flex flex-col gap-3">
        <input
          type="submit"
          value="Sing in"
          className="w-full p-2 mt-3 text-white rounded-lg h-11 bg-primary hover:bg-primary-dark"
        />
        <span className="text-sm text-gray-600 cursor-pointer">
          Forgot Password?
        </span>
      </motion.div>
    </motion.form>
  );
};

export default SingIn;
