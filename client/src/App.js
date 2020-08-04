import React, { useState, useEffect } from 'react';

import Notes from './components/Notes';
import Tags from './components/Tags';
import AddNoteModal from './components/AddNoteModal';

import { fetchAllNotes, fetchAllTags } from './util/fetchData';

import './App.css';

async function fetchInitialData() {
  const [notes, tags] = await Promise.all([fetchAllNotes(), fetchAllTags()]);

  return { notes, tags };
}

const App = () => {
  const [focusedSection, setFocusedSection] = useState('notes');
  const [modalIsDisplayed, setModalIsDisplayed] = useState(false);
  const [tags, setTags] = useState([]);
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchInitialData().then(({ notes, tags }) => {
      setNotes(notes);
      setTags(tags);
    });
  }, []);

  return (
    <div id='app-wrapper' className={modalIsDisplayed ? 'grayed-out' : ''}>
      <div className='app'>
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
          <Notes notes={notes} addNote={() => setModalIsDisplayed(true)} />
        </section>

        <section
          className='app-grid'
          id='tags-section'
          style={{ display: focusedSection === 'tags' ? 'grid' : 'none' }}
        >
          <Tags tags={tags} />
        </section>
      </div>

      <div className='modal-wrapper'>
        <div className={modalIsDisplayed ? 'modal-center' : 'display-none'}>
          <AddNoteModal
            onSubmit={newNote => {
              if (newNote) setNotes([newNote, ...notes]);
              setModalIsDisplayed(false);
            }}
            tags={tags}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
