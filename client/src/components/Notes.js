import React, { useState, useEffect } from 'react';

import { fetchAllNotes } from '../util/fetchData';

const Modal = ({ onSubmit, className }) => {
  const [tags, setTags] = useState([
    { id: 1, name: 'personal' },
    { id: 2, name: 'politics' },
  ]);

  return (
    <div className={className}>
      <h3>Add Note</h3>

      <div id='add-note-grid'>
        <div id='add-title'>
          <h4>Title</h4>
          <input type='text' />
        </div>

        <div id='add-description'>
          <h4>Description</h4>

          <textarea></textarea>
        </div>

        <div id='add-tags'>
          <h4>Tags</h4>
          <select name='tags-list' id='tags-list'>
            {tags.map(tag => (
              <option key={tag.id} value={tag.name}>
                {tag.name}
              </option>
            ))}
          </select>
        </div>

        <div id='submit-new-note'>
          <button>Cancel</button>
          <button>Add</button>
        </div>
      </div>
    </div>
  );
};

const Notes = () => {
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

  const [shouldDisplayModal, setShouldDisplayModal] = useState(false);

  // useEffect(() => {
  //   fetchAllNotes().then(setNotes);
  // }, []);

  return (
    <>
      <Modal
        className={shouldDisplayModal ? 'modal-wrapper' : 'display-none'}
        onSubmit={newNote => {
          setNotes([newNote, ...notes]);
          setShouldDisplayModal(false);
        }}
      />

      <div id='add-note-btn'>
        <button onClick={() => setShouldDisplayModal(true)}>Add Note</button>
      </div>

      {notes.map(note => (
        <div className='note-info' key={note.id}>
          <div className='note-meta'>
            <h3>{note.title}</h3>
            <span>
              <i>
                Created:{' '}
                {note.creation_date
                  .toLocaleString()
                  .split(',')
                  .reverse()
                  .join(' ')}
              </i>
            </span>
          </div>
          <p>{note.description}</p>
          <div className='note-tags'>
            {note.tags.map(tag => (
              <div className='tag-name' key={tag.id}>
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default Notes;
