import React from 'react';
import { useSelector } from "react-redux";
import { Card } from 'reactstrap';
import TheSpinner from "../../layout/TheSpinner";
import UserGridView from './UserGridView';
import UserListView from './UserListView';

const UsersList = ({type}) => {
     const userGridView = useSelector((state) => state.ui.userGridView);
    const accounts = useSelector((state) => state.users.filteredUsers);
    const loading = useSelector((state) => state.ui.usersLoading);
console.log(accounts)
    if (loading) {
      return <TheSpinner />;
    } else if (accounts.length < 1) {
      return (
        <div className="w-full">
          <p className="mx-auto">Sorry, no accounts matched your search.</p>
        </div>
      );
    }

    if (userGridView) {
      return <UserGridView accounts={accounts} type= {type}/>;
    }
    return (
      <Card>
        <UserListView accounts={accounts} />
      </Card>
    );
};

export default UsersList;