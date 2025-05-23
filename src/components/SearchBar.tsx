import React, { useState } from 'react';
import { Search as SearchIcon } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search artworks by title, category, or price..."
        className="w-full rounded-md border border-gray-300 py-2 pl-4 pr-10 focus:border-gold-500 focus:outline-none focus:ring-1 focus:ring-gold-500"
      />
      <button
        type="submit"
        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gold-600"
      >
        <SearchIcon size={20} />
      </button>
    </form>
  );
};

export default SearchBar;