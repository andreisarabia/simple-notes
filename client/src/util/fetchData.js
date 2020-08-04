export const fetchAllNotes = async () => {
  const response = await fetch('http://localhost:3001/api/note/list');
  const data = await response.json();

  return data.notes;
};

export const fetchAllTags = async () => {
  const response = await fetch('http://localhost:3001/api/tag/list');
  const data = await response.json();

  return data.tags;
};
