import Note from '../models/note.js';

const getAllNotes = async (req,res) => {
  try{
    const notes = await Note.find().sort({createdAt: -1});
    res.status(200).json(notes);
  }
  catch(error){
    res.status(500).json({message : error.message});
    console.log('Error fetching notes:', error);
  }

}

const createNote = async (req,res) => {
     try{
        const {title,content} = req.body
        const newNote = new Note({title,content})
         await newNote.save();
        res.status(201).json({message: 'Note created successfully'});  

     }
      catch(error){
    res.status(500).json({message : error.message});
    console.log('Error adding notes:', error);
  }
}

const updateNote = async (req,res) => {
     try{
        const {title,content} = req.body;
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,
            {title, content},
            {new: true} 
        )
        if(!updatedNote) return res.status(404).json(
            {message: 'Note not found'}
        )
        res.status(200).json(updatedNote);
     }
    catch(error){
    res.status().json({message : error.message});
    console.log('Error updating notes:', error);
  }
}

const deleteNote = async (req,res) => {
     try{
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if(!deletedNote) return res.status(404).json(
            {message: 'Note not found'}
        )
        res.status(200).json({message: 'Note deleted successfully'});
     }
    catch(error){
    res.status().json({message : error.message});
    console.log('Error deleting notes:', error);
  }
}

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });
    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log('Error fetching note:', error);
  }
};

export { getAllNotes, createNote, updateNote, deleteNote, getNoteById };