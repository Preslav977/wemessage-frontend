//this function will filter the user first, last and username
//by taking the input making it lowercase then filter it by
//splitting the name into an array then checking the each word
//if matches either first or last or username if it does it returns a user
//when no longer is matching it would return an empty array

export function FilterGroupMembers(groupMembers, query) {
  query = query.toLowerCase();
  return groupMembers.filter(
    (groupMember) =>
      groupMember.first_name
        .split(" ")
        .some((word) => word.toLowerCase().startsWith(query)) ||
      groupMember.last_name
        .split(" ")
        .some((word) => word.toLowerCase().startsWith(query)) ||
      groupMember.username
        .split(" ")
        .some((word) => word.toLowerCase().startsWith(query)),
  );
}
