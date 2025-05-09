import PropTypes from "prop-types";

function SearchBarGroupMembers({ query, onChange }) {
  return (
    <>
      <label htmlFor="group_member">Select Members:</label>
      <input
        data-testid="group_member"
        type="text"
        name="group_member"
        id="group_member"
        placeholder="Note: if the members are not appearing refetch the component!"
        value={query}
        onChange={onChange}
      />
    </>
  );
}

SearchBarGroupMembers.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func,
};
export default SearchBarGroupMembers;
