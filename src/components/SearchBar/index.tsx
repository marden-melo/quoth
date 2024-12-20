import { ChangeEvent } from 'react';
import { SearchInput } from './styles';

interface SearchBarProps {
  placeholder: string;
  onSearch: (searchTerm: string) => void;
}

export const SearchBar = ({ placeholder, onSearch }: SearchBarProps) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div>
      <SearchInput
        type="text"
        placeholder={placeholder}
        onChange={handleSearch}
      />
    </div>
  );
};
