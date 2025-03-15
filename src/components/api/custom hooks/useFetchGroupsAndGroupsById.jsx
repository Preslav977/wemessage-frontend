import { useContext } from "react";
import {
  GroupsContext,
  GroupDetailsContext,
} from "../../../contexts/GroupsContext";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const useFetchGroupsAndGroupsById = () => {
  const { id } = useParams();

  const [groups, setGroups] = useContext(GroupsContext);

  // console.log(groups);

  const [groupDetails, setGroupDetails] = useContext(GroupDetailsContext);

  // console.log(groups, groupDetails);

  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGroupsAndById = async () => {
      await Promise.all([
        fetch("http://localhost:5000/groups", {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }),
        fetch(`http://localhost:5000/groups/${id}`, {
          mode: "cors",
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }),
      ]).then((res) => {
        console.log(res[0]);
        // if (res[0].status >= 400) {
        //   throw new Error("Server error");
        // }
        // return res[0].json;
      });
      // .then((res) => setGroups(res))
      // .catch((error) => setError(error))
      // .finally(() => setLoading(false));

      // console.log(response);

      // .then((response) => setGroups(response[0]))
      // .then((response) => setGroupDetails(response[1]));

      // .then((response) => setGroupDetails(response));

      // const result = response.map((response) => response.json());

      // // console.log(result);

      // const [groupsResult, groupDetailsResult] = await Promise.all(result);

      // console.log(groupsResult, groupDetailsResult);

      // setGroups(groupsResult, groupDetailsResult);

      // // setGroups(groupsResult);

      // setGroupDetails(groupDetailsResult);
    };

    fetchGroupsAndById();
  }, [id, setGroups, setGroupDetails]);

  return { groups, groupDetails };
};

export default useFetchGroupsAndGroupsById;
