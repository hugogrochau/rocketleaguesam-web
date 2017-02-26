import React from 'react';
import TextField from 'material-ui/TextField';
import SearchSVG from 'material-ui/svg-icons/action/search';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex
  align-items: flex-start
`;

const SearchIcon = styled(SearchSVG)`
  margin: 12px 5px
`;

const SearchBar = ({ onChange, hintText }) =>
  <FlexContainer>
    <SearchIcon />
    <TextField
      fullWidth
      hintText={hintText}
      type="search"
      onChange={(e, v) => onChange(v)}
    />
  </FlexContainer>
;

SearchBar.propTypes = {
  onChange: React.PropTypes.func.isRequired,
  hintText: React.PropTypes.string,
};

SearchBar.defaultProps = {
  hintText: 'Search',
};

export default SearchBar;
