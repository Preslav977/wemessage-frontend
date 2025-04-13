function SearchBarGroupMembers({ query, onChange }) {
  return (
    <>
      <label htmlFor="group_member">Select members:</label>
      <input
        data-testid="group_member"
        type="text"
        name="group_member"
        id="group_member"
        value={query}
        onChange={onChange}
      />
    </>
  );
}

export default SearchBarGroupMembers;
