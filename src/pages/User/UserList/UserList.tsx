import { useGetUsers } from "../../../API/hooks/UserHooks";
import Table from "../../../components/Table/Table";

const UserList = () => {
  const userList = useGetUsers();

  console.log(userList.data);
  console.warn("----------------------");
  return userList.isLoading ? (
    <div>Loading...</div>
  ) : (
    <Table data={userList.data.data} />
  );
};

export default UserList;
