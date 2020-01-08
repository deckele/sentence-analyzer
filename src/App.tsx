import React, { useState } from 'react';
import { Search } from "./components/search/search";
import { SentencesList } from "./components/sentences-list/sentences-list";
import './app.scss';

const App: React.FC = () => {
  const [search, setSearch] = useState("");

  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">Sentence Analyzer</h1>
      </header>
      <main>
        <Search value={search} onChange={setSearch} />
        <SentencesList search={search} />
      </main>
    </div>
  );
}

export default App;
