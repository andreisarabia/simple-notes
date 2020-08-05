import React from 'react';

const Notes = ({ notes, addNote }) => {
  return (
    <>
      <div id='add-note-btn'>
        <button onClick={addNote}>Add Note</button>
      </div>

      <div id='note-list'>
        {notes.length > 0 ? (
          notes.map(note => (
            <div className='note-info' key={note.id}>
              <div className='note-meta'>
                <h3>{note.title}</h3>
                <span>
                  <i>
                    Created:{' '}
                    {new Date(note.creation_time)
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
          ))
        ) : (
          <p>Add a note to get started by clicking on the "Add Note" button!</p>
        )}
      </div>
    </>
  );
};

export default Notes;
