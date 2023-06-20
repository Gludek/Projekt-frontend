import { useLoaderData } from "react-router-dom";
import { useGetUser } from "../../../API/hooks/UserHooks";

const Show = () => {
  const id = useLoaderData() as number;
  const user = useGetUser(id);
  console.log(user);
  return (
    <div>
      {user.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          <h1>{user.data?.data.name}</h1>
          <div>Email:{user.data?.data.email}</div>
        </div>
      )}
    </div>
  );
};

export default Show;
