import { useContext } from "react";

function RenderGroupDetailsMessagesParent({ children }) {
  return <>{children}</>;
}

export const fetchSingleGroupLoader = async (params) => {
  const response = await fetch(`http://localhost:5000/groups/${params}`, {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  });
  const groupDetails = await response.json();
  return groupDetails;
};

export default RenderGroupDetailsMessagesParent;
