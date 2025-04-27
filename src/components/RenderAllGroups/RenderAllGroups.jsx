import styles from "./RenderAllGroups.module.css";
import useFetchGroupsURL from "../api/custom hooks/userFetchGroupsURL";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useRef } from "react";

function RenderAllGroups() {
  const { groups, error, loading } = useFetchGroupsURL();

  const [clickedGroup, setClickedGroup] = useState();

  const openAndClosingSvgRef = useRef(null);

  const [
    rotateSvgAndRenderDifferentAnchor,
    setRotateSvgAndRenderDifferentAnchor,
  ] = useState(false);

  function highlightTheCurrentSelectedGroup(group) {
    // console.log(group);

    setClickedGroup(group.id);
  }

  function rotateTheSvg() {
    setRotateSvgAndRenderDifferentAnchor(!rotateSvgAndRenderDifferentAnchor);

    if (openAndClosingSvgRef.current.style.transform === `rotate(45deg)`) {
      openAndClosingSvgRef.current.style.transform = `rotate(0deg)`;
    } else {
      openAndClosingSvgRef.current.style.transform = `rotate(45deg)`;
    }
  }

  if (loading) {
    // return <img src="/loading_spinner.svg" alt="Loading..." />;
    return (
      <svg
        version="1.1"
        id="L7"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 100 100"
        enableBackground="new 0 0 100 100"
        xmlSpace="preserve"
      >
        Loading...
        <path
          fill="#fff"
          d="M31.6,3.5C5.9,13.6-6.6,42.7,3.5,68.4c10.1,25.7,39.2,38.3,64.9,28.1l-3.1-7.9c-21.3,8.4-45.4-2-53.8-23.3
c-8.4-21.3,2-45.4,23.3-53.8L31.6,3.5z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="2s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
        <path
          fill="#fff"
          d="M42.3,39.6c5.7-4.3,13.9-3.1,18.1,2.7c4.3,5.7,3.1,13.9-2.7,18.1l4.1,5.5c8.8-6.5,10.6-19,4.1-27.7
c-6.5-8.8-19-10.6-27.7-4.1L42.3,39.6z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="1s"
            from="0 50 50"
            to="-360 50 50"
            repeatCount="indefinite"
          />
        </path>
        <path
          fill="#fff"
          d="M82,35.7C74.1,18,53.4,10.1,35.7,18S10.1,46.6,18,64.3l7.6-3.4c-6-13.5,0-29.3,13.5-35.3s29.3,0,35.3,13.5
L82,35.7z"
        >
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="rotate"
            dur="2s"
            from="0 50 50"
            to="360 50 50"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    );
  }

  if (error) {
    return <p className={styles.errorParagraph}>Failed to fetch groups!</p>;
  }

  return (
    <>
      <header className={styles.flexedGroupsHeader}>
        <h4 className={styles.flexedGroupsSubHeader}>Groups</h4>
        {!rotateSvgAndRenderDifferentAnchor ? (
          <Link data-testid="groupAnchor" to={"/groups/create"}>
            <img
              onClick={rotateTheSvg}
              ref={openAndClosingSvgRef}
              className={styles.flexedOpenGroupsSvg}
              src="/open.svg"
              alt="opens menu for creating a group"
            />
          </Link>
        ) : (
          <Link data-testid="groupAnchor" to={"/groups"}>
            <img
              onClick={rotateTheSvg}
              ref={openAndClosingSvgRef}
              className={styles.flexCloseGroupSvg}
              src="/open.svg"
              alt="closes menu for creating a group"
            />
          </Link>
        )}
      </header>
      <>
        {groups.length === 0 ? (
          <p className={styles.noGroupsPara}>
            {"You currently have no groups"}
          </p>
        ) : (
          <>
            <ul>
              {groups.map((group) => (
                <Link key={group.id} to={`/groups/${group.id}`}>
                  <div
                    onClick={() => highlightTheCurrentSelectedGroup(group)}
                    style={{
                      backgroundColor:
                        group.id === clickedGroup ? "#3a3b3c" : "",
                    }}
                    className={styles.flexedLiGroupContainer}
                  >
                    <div className={styles.groupImageContainer}>
                      <img
                        className={styles.groupImage}
                        src={group.group_image}
                        alt="group image"
                      />
                    </div>
                    <li className={styles.groupNameParagraph}>
                      {group.group_name}
                    </li>
                  </div>
                </Link>
              ))}
            </ul>
          </>
        )}
      </>
    </>
  );
}

export default RenderAllGroups;
