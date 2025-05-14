import React from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
interface SearchHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}
const SearchHeader: React.FC<SearchHeaderProps> = ({
  searchQuery,
  setSearchQuery
}) => {
  return <section className="bg-gradient-to-r from-primary/20 to-primary/10 py-16 bg-primary-dark">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
            Know Your Consumer Rights in India
          </h1>
          <p className="text-xl mb-8 text-muted-foreground">
            Comprehensive guide to the rights guaranteed to every Indian consumer by law
          </p>
          <div className="relative max-w-xl mx-auto">
            <Input type="text" placeholder="Search for specific rights or topics..." className="pl-10 py-6 bg-background text-foreground w-full rounded-full" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>
        </div>
      </div>
    </section>;
};
export default SearchHeader;