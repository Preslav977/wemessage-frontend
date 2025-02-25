import useUsersURL from "./custom hooks/useUsersURL";

function FetchUsers() {
  const { users, error, loading } = useUsersURL();

  if (loading) {
    return <img src="" alt="Loading..." />;
  }

  if (error) {
    return <p>A network error was encountered</p>;
  }

  return (
    <>
      <img src="/close.svg" alt="" />
    </>
  );
}
