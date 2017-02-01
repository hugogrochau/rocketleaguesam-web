import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';
import SearchSVG from 'material-ui/svg-icons/action/search';
import styled from 'styled-components';

const FlexContainer = styled.div`
  display: flex
  align-items: flex-start
`;

const SearchIcon = styled(SearchSVG)`
  margin: 12px 5px
`;

const SearchBar = ({ onType, hintText, values }) =>
  <FlexContainer>
    <SearchIcon />
    <AutoComplete
      fullWidth
      maxSearchResults={5}
      dataSource={values}
      hintText={hintText}
      filter={AutoComplete.fuzzyFilter}
      type="search"
      onUpdateInput={(t) => onType(t)}
    />
  </FlexContainer>
;

SearchBar.propTypes = {
  onType: React.PropTypes.func.isRequired,
  values: React.PropTypes.array,
  hintText: React.PropTypes.string,
};

SearchBar.defaultProps = {
  hintText: 'Search',
  values: [],
};

export default SearchBar;
