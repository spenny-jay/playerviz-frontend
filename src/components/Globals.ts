export async function GetAsync<Type>(endpoint: string): Promise<Type> {
  const res = await fetch(
    `http://${process.env.REACT_APP_BACKEND_API}/${endpoint}`,
    {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    }
  );
  const data: Type = await res.json();

  return data;
}

export async function PostAsync<T, U>(endpoint: string, body: U): Promise<T> {
  const res = await fetch(
    `http://${process.env.REACT_APP_BACKEND_API}/${endpoint}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
      body: JSON.stringify(body),
    }
  );
  const data: T = await res.json();

  return data;
}
