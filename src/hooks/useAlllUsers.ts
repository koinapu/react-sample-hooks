import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";
import axios from "axios";

// 全ユーザ一覧を取得するカスタムフック
export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
        //console.log(data);
      })
      .catch(() => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
        setClickCount(clickCount + 1);
      });
  };

  return { getUsers, userProfiles, loading, error, clickCount };
};
