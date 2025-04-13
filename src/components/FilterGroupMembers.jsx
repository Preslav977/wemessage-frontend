export function FilterGroupMembers(groupMembers, query) {
  query = query.toLowerCase();
  return groupMembers.filter(
    (groupMember) =>
      groupMember.first_name
        .split("")
        .some((word) => word.toLowerCase().startsWith(query)) ||
      groupMember.last_name
        .split("")
        .some((word) => word.toLowerCase().startsWith(query)) ||
      groupMember.username
        .split("")
        .some((word) => word.toLowerCase().startsWith(query)),
  );
}
