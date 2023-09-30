import { ApiClient } from "@/API/apiClient";
import { Navigate, useParams, useSearchParams } from "react-router-dom";

function HandleCofnrimation() {
  const [params] = useSearchParams();
  ApiClient.confirmRegistration(params.get("confirmation_token")!);
  return <Navigate to={"/"} replace={true} />;
}

export default HandleCofnrimation;
