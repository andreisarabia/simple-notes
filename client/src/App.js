import React, { useState } from 'react';

import Notes from './components/Notes';
import Tags from './components/Tags';

import './App.css';

const App = () => {
  const [focusedSection, setFocusedSection] = useState('notes');

  return (
    <div className='App'>
      <div id='app-headers'>
        <h2
          className={focusedSection === 'notes' ? '' : 'unfocused-header'}
          onClick={() => setFocusedSection('notes')}
        >
          Notes
        </h2>
        <h2
          className={focusedSection === 'tags' ? '' : 'unfocused-header'}
          onClick={() => setFocusedSection('tags')}
        >
          Tags
        </h2>
      </div>

      <section
        className='app-grid'
        id='notes-section'
        style={{ display: focusedSection === 'notes' ? 'grid' : 'none' }}
      >
        <Notes />
      </section>

      <section
        className='app-grid'
        id='tags-section'
        style={{ display: focusedSection === 'tags' ? 'grid' : 'none' }}
      >
        <Tags />
      </section>
    </div>
  );
};

export default App;
