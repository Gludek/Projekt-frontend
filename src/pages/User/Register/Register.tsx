import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { ApiClient } from "../../../API/apiClient";
import { UserRegister, userRegisterSchema } from "../../../API/types/user";

const Div = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;
function Register() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserRegister>({ resolver: zodResolver(userRegisterSchema) });
  const onSubmit: SubmitHandler<UserRegister> = (data, event) => {
    console.log(data);
    event?.preventDefault();
    event?.stopPropagation();
    const user = {
      ...data,
    };
    ApiClient.register(user).then((res) => {
      console.log(res);
      if (res.status === 200) {
        setError("Regustration successful");
        navigate("/");
      } else {
        setError(res.data);
      }
    });
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <Div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <label>Email</label>
        <input {...register("email")} />
        {errors.email?.message && <p>{errors.email?.message}</p>}

        <label>Name</label>
        <input {...register("name")} />
        {errors.name?.message && <p>{errors.name?.message}</p>}
        {/* include validation with required or other standard HTML validation rules */}
        <label>Password</label>
        <input {...register("password")} type="password" />
        {errors.password?.message && <p>{errors.password?.message}</p>}

        <input {...register("password_confirmation")} type="password" />
        {errors.password_confirmation?.message && (
          <p>{errors.password_confirmation?.message}</p>
        )}
        {/* errors will return when field validation fails  */}
        <input type="submit" />
      </form>
      <Link to="/register">Register</Link>
      {error && <p>{error}</p>}
    </Div>
  );
}

export default Register;
