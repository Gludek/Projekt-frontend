import { ApiClient } from "@/API/apiClient";
import { useState } from "react";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

function HandleCofnrimation() {
  const [params] = useSearchParams();
  const [ready, setReady] = useState(false);
  ApiClient.confirmRegistration(params.get("confirmation_token")!).then(
    (res) => {
      console.log(res);
      setReady(true);
    }
  );
  if (!ready) return <div>loading...</div>;
  return <Navigate to={"/"} replace={true} />;
}

export default HandleCofnrimation;
