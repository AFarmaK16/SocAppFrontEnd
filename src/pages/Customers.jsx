import React, { useEffect } from "react";

import PageHero from "../layout/PageHero";
import OrdersList from "../components/orders/OrdersList";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import UsersList from "../components/users/UsersList";
import { getUsers } from "../store/actions/user-action";

const containerVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.3 },
  },
  exit: {
    x: "-100vw",
    transition: { ease: "easeInOut" },
  },
};

const Accounts = () => {
  const dispatchAccounts = useDispatch();
  useEffect(() => {
    dispatchAccounts(getUsers());
  }, [dispatchAccounts]);

  const accounts = useSelector((state) => state.users.filteredUsers);
  console.log(accounts)

  return (
    <div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <PageHero title="Comptes"  />
      <div className=" mx-auto">
        <UsersList />
      </div>
    </div>
  );
};

export default Accounts;
