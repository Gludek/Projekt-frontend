import { useForm } from "react-hook-form";
import { ApiClient, queryClient } from "../../../API/apiClient";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useGetUser } from "../../../API/hooks/UserHooks";
import { useGetPermissions } from "../../../API/hooks/PermissionHooks";
import { Permission, User } from "../../../API/types/user";

export default function EditUser() {
  const id = useLoaderData() as number;
  const user = useGetUser(id).data?.data as User;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: user,
  });
  const navigate = useNavigate();
  const permissions = useGetPermissions();
  const onSubmit = (data: User) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    data.permission_ids = data.permissions;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ApiClient.updateUser(data.id, data).then((res) => {
      console.log(res);
      if (res.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["user", data.id] });
        queryClient.invalidateQueries({ queryKey: ["users"] });
        navigate(`/users/${data.id}`);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        Name:
        <input type="text" {...register("name", { required: true })} />
        {errors.name && <span>This field is required</span>}
      </label>
      <label>
        Email:
        <input type="email" {...register("email", { required: true })} />
        {errors.email && <span>This field is required</span>}
      </label>
      <label>
        Permissions:
        <select {...register("permissions", { required: true })} multiple>
          {permissions.isFetched &&
            permissions.data?.data.map((permission: Permission) => (
              <option
                key={permission.id}
                value={permission.id}
                selected={user.permissions
                  .map((p) => p.value)
                  .includes(permission.value)}
              >
                {permission.name}
              </option>
            ))}
        </select>
        {errors.permissions && <span>This field is required</span>}
      </label>
      <button type="submit">Save</button>
    </form>
  );
}
