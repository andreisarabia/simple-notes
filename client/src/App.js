import React, { useState } from 'react';

import Notes from './components/Notes';
import Tags from './components/Tags';
import AddNoteModal from './components/AddNoteModal';

import './App.css';

const App = () => {
  const [focusedSection, setFocusedSection] = useState('notes');
  const [modalIsDisplayed, setModalIsDisplayed] = useState(false);
  const [tags, setTags] = useState([
    { id: 1, name: 'personal' },
    { id: 2, name: 'politics' },
  ]);
  const [notes, setNotes] = useState([
    {
      id: 3,
      title: 'example title',
      description: 'example description',
      creation_date: new Date(),
      tags: [
        { id: 2, name: 'first' },
        { id: 3, name: 'example' },
      ],
    },
    {
      id: 4,
      title: 'example title',
      description: 'example description',
      creation_date: new Date(),
      tags: [
        { id: 2, name: 'first' },
        { id: 3, name: 'example' },
      ],
    },
  ]);

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
          />
        </div>
      </div>
    </div>
  );
};

export default App;
