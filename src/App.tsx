import "./styles.css";

import { UserCard } from "./components/UserCard";
import { useAllUsers } from "./hooks/useAlllUsers";

export default function App() {
  const { getUsers, userProfiles, loading, error, clickCount } = useAllUsers();
  const onClickFetchUser = () => getUsers();

  return (
    <div className="App">
      <button onClick={onClickFetchUser}>データ取得</button>
      <br />
      {error ? (
        <p style={{ color: "red" }}>データの取得に失敗しました</p>
      ) : loading ? (
        <>
          <p>Loading...</p>
          <img
            src="http://wp-master.club/wp-content/uploads/2018/10/loading.gif"
            alt="loading"
            width="200px"
          />
        </>
      ) : (
        <></>
      )}
      <br />
      {clickCount}
      <br />
      {userProfiles.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </div>
  );
}
