import { useForm, SubmitHandler } from "react-hook-form";
import { UserLogin, userLoginSchema } from "../../../API/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { ApiClient } from "../../../API/apiClient";
import { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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
function Login() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>({ resolver: zodResolver(userLoginSchema) });
  const onSubmit: SubmitHandler<UserLogin> = (data, event) => {
    console.log(data);
    const user = {
      ...data,
    };
    ApiClient.login(user).then((res) => {
      console.log(res, "res");
      if (res.code === 200) {
        console.log(res.data);
        setError("Login successful");
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
        {/* include validation with required or other standard HTML validation rules */}
        <label>Password</label>
        <input {...register("password")} type="password" />
        {/* errors will return when field validation fails  */}
        {errors.password?.message && <p>{errors.password?.message}</p>}
        <input type="submit" />
      </form>
      <Link to="/register">Register</Link>
      {error && <p>{error}</p>}
    </Div>
  );
}

export default Login;
