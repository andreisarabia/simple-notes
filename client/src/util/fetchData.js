export const fetchAllNotes = async () => {
  const response = await fetch('/api/note/list');
  const data = await response.json();

  return data.notes;
};

export const fetchAllTags = async () => {
  const response = await fetch('/api/tag/list');
  const data = await response.json();

  return data.tags;
};
