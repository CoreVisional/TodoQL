import { Note } from "../../models";

const resolvers = {
    Query: {
        ownNotes: async (root, args, { user }) => {
            if (!user) {
                throw new Error("User not authenticated");
            }

            try {
                const notes = await user.getNotes();
                return notes;
            } catch (error) {
                console.error(error);
                throw new Error("Error fetching notes");
            }
        },
        allNotes: async (root, args, context) => {
            try {
                const notes = await Note.findAll();
                return notes;
            } catch (error) {
                throw new Error("Error fetching notes");
            }
        },
        noteById: async (root, { id }) => {
            try {
                const note = await Note.findOne({ where: { id } });
                return note;
            } catch (error) {
                throw new Error("Error fetching note");
            }
        },
    },

    Mutation: {
        createNote: async (root, { input: { content } }, { user }) => {
            if (!user) {
                throw new Error("User not authenticated");
            }

            try {
                const newNote = await Note.create({ content });

                // Associate the new note with the authenticated user
                await user.addNotes(newNote);

                return {
                    status: "Note created successfully",
                    id: newNote.id,
                    content: newNote.content,
                    created_at: newNote.created_at,
                };
            } catch (error) {
                console.error(error);
                throw new Error("Error creating note");
            }
        },
        updateNote: async (root, { input: { id, content } }, { user }) => {
            if (!user) {
                throw new Error("User not authenticated");
            }

            try {
                // Retrieve the note
                const note = await Note.findOne({ where: { id } });

                if (!note) {
                    throw new Error("Note not found");
                }

                // Update the note content
                await note.update({ content });

                return {
                    status: "Note updated successfully",
                    id: note.id,
                    content: note.content,
                    created_at: note.created_at,
                };
            } catch (error) {
                throw new Error("Error updating note");
            }
        },
        deleteNote: async (root, { id }, { user }) => {
            if (!user) {
                throw new Error("User not authenticated");
            }

            try {
                // Retrieve the note
                const note = await Note.findOne({ where: { id } });

                if (!note) {
                    throw new Error("Note not found");
                }

                // Delete the note
                await note.destroy();

                return {
                    status: "Note deleted successfully",
                    id: note.id,
                    content: note.content,
                    created_at: note.created_at,
                };
            } catch (error) {
                throw new Error("Error deleting note");
            }
        },
    },

    Note: {
        user: async (note) => {
            const noteUser = await note.getUser();
            return noteUser[0];
        },
    },
};

export default resolvers;
