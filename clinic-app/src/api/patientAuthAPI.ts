import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

export default function useAuthStatusPatient() {
  const { isLoading, error, data, isFetching } = useQuery({
    queryKey: ["authStatus"],
    queryFn: async () => {
      let token = localStorage.getItem("patientToken");
      console.log("querying local storage token", token);
      if (!token) {
        throw Error("You haven't logged in");
      }

      let decoded = jwtDecode(token);
      console.log("check decoded", decoded);
      return decoded;
    },
    retry: false,
  });

  if (isLoading || isFetching) {
    return { status: "loading" };
  } else if (error) {
    return { status: "error", message: error.message };
  } else if (!data) {
    return { status: "no data" };
  }

  return { status: "success", data: data };
}

export async function login(hkidInput: string, passwordInput: string) {
  console.log("authAPI try to log in");
  let res = await fetch(
    `${process.env.REACT_APP_API_SERVER}/patientAuth/patientLogin`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hkidInput, passwordInput }),
    }
  );

  let result = await res.json();

  return result.token as string;
}

export function logout() {
  console.log("remove token");
  localStorage.removeItem("patientToken");

  try {
    console.log("logout success");
    window.location.href = "/patientlogin";
  } catch (error) {
    console.error("logout failed", error);
  }
}
