import React, { useState } from 'react';

const AddNoteModal = ({ onNewNote, tags }) => {
  const [chosenTags, setChosenTags] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');

  const reset = () => {
    setNewTitle('');
    setNewDescription('');
    setChosenTags([]);
  };

  const handleCancel = async e => {
    e.preventDefault();
    reset();
    onNewNote(null);
  };

  const handleChosenTag = (e, tag) => {
    if (e.target.checked && !chosenTags.some(({ id }) => id === tag.id)) {
      setChosenTags([tag, ...chosenTags]);
    } else {
      setChosenTags(chosenTags.filter(chosenTag => chosenTag.id !== tag.id));
    }
  };

  const submitNewNote = async e => {
    e.preventDefault();

    const title = newTitle.trim();

    if (!title) {
      reset();
      onNewNote(null);
      return;
    }

    const description = newDescription.trim();
    const tags = chosenTags.map(tag => tag.id);

    const response = await fetch('/api/note/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, description, tags }),
    });

    const { note } = await response.json();

    onNewNote(note);
  };

  return (
    <div className='modal'>
      <h3>Add Note</h3>

      <form id='add-note-form'>
        <div id='note-grid-columns'>
          <div id='add-note-labels'>
            <label htmlFor='new-title-input'>Title</label>

            <label id='add-description-label' htmlFor='new-description-input'>
              Description
            </label>

            <label id='add-tags-label'>Tags</label>
          </div>

          <div id='add-note-inputs'>
            <input
              id='new-title-input'
              type='text'
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              required
            />

            <textarea
              id='new-description-input'
              rows='7'
              cols='40'
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              required
            ></textarea>

            <div id='tag-checkboxes'>
              {tags.length > 0 ? (
                tags.map(tag => (
                  <div key={tag.id}>
                    <input
                      type='checkbox'
                      name={tag.name}
                      id={tag.name}
                      onChange={e => handleChosenTag(e, tag)}
                    />

                    <label htmlFor={tag.name}>{tag.name}</label>
                  </div>
                ))
              ) : (
                <i>No tags added yet...</i>
              )}
            </div>
          </div>
        </div>

        <div id='submit-new-note'>
          <button onClick={handleCancel}>Cancel</button>
          <button onClick={submitNewNote}>Add</button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteModal;
