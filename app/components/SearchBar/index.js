import React from 'react';
import TextField from 'material-ui/TextField';
import SearchIcon from 'material-ui/svg-icons/action/search';
import styled from 'styled-components';

const MarginedSearchIcon = styled(SearchIcon)`
  margin: 10px
`;

export const AlmostFullWidthTextField = styled(TextField)`
  width: calc(100% - 44px) !important
`;

const SearchBar = ({ onType }) => (
  <div>
    <MarginedSearchIcon />
    <AlmostFullWidthTextField
      type="search"
      hintText="Search"
      onChange={(e, v) => onType(v)}
    />
  </div>
);

SearchBar.propTypes = {
  onType: React.PropTypes.func.isRequired,
};

export default SearchBar;
