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

  const appWrapperClass = modalIsDisplayed ? 'grayed-out' : '';
  const notesHeaderClass = focusedSection === 'notes' ? '' : 'unfocused-header';
  const tagsHeaderClass = focusedSection === 'tags' ? '' : 'unfocused-header';
  const modalClassName = modalIsDisplayed ? 'modal-center' : 'display-none';
  const notesSectionStyle = {
    display: focusedSection === 'notes' ? 'grid' : 'none',
  };
  const tagsSectionStyle = {
    display: focusedSection === 'tags' ? 'grid' : 'none',
  };

  const handleModalAction = newNote => {
    if (newNote) setNotes([newNote, ...notes]);
    setModalIsDisplayed(false);
  };

  const handleDeleteTag = tagId => {
    setTags(tags.filter(tag => tag.id !== tagId));

    setNotes(
      notes.map(note => ({
        ...note,
        tags: note.tags.filter(tag => tag.id !== tagId),
      }))
    );
  };

  useEffect(() => {
    fetchInitialData().then(({ notes, tags }) => {
      setNotes(notes);
      setTags(tags);
    });
  }, []);

  return (
    <div id='app-wrapper' className={appWrapperClass}>
      <div className='app'>
        <div id='app-headers'>
          <h2
            className={notesHeaderClass}
            onClick={() => setFocusedSection('notes')}
          >
            Notes
          </h2>
          <h2
            className={tagsHeaderClass}
            onClick={() => setFocusedSection('tags')}
          >
            Tags
          </h2>
        </div>

        <section
          className='app-grid'
          id='notes-section'
          style={notesSectionStyle}
        >
          <Notes notes={notes} addNote={() => setModalIsDisplayed(true)} />
        </section>

        <section
          className='app-grid'
          id='tags-section'
          style={tagsSectionStyle}
        >
          <Tags
            tags={tags}
            onAddTag={tag => setTags([tag, ...tags])}
            onDeleteTag={handleDeleteTag}
          />
        </section>
      </div>

      {modalIsDisplayed ? (
        <div className='modal-wrapper'>
          <div className={modalClassName}>
            <AddNoteModal onNewNote={handleModalAction} tags={tags} />
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default App;
