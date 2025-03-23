import React, { useState, useEffect } from 'react';
import axios from 'axios';
const sampleData = [
    { id: 1, title: 'Note 1', description: 'This is the description for note 1' },
    { id: 2, title: 'Note 2', description: 'This is the description for note 2' },
    { id: 3, title: 'Note 3', description: 'This is the description for note 3' },
];

const checkAuthToken = () => {
    return !!localStorage.getItem('token');
};

const NoteCard = ({ note, onClick }) => (
    <div
        className="border p-4 rounded shadow cursor-pointer"
        onClick={() => onClick(note)}
    >
        <h2 className="text-xl font-semibold">{note.title}</h2>
    </div>
);

const NoteModal = ({ note, onClose }) => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-4 rounded shadow-lg max-w-lg w-full">
            <h2 className="text-xl font-semibold">{note.title}</h2>
            <p className="mt-2 max-h-60 overflow-y-auto">{note.description}</p>
            <button
                className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
                onClick={onClose}
            >
                Close
            </button>
        </div>
    </div>
);

const UnauthenticatedView = () => (
    <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Please log in to view the notes.</h1>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={() => window.location.href = '/login'}>
            Go to Login
        </button>
    </div>
);

export default function Codes() {
    const [notes, setNotes] = useState([]);
    const [selectedNote, setSelectedNote] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchNotes = () => {
            if (!checkAuthToken()) {
                setIsAuthenticated(false);
                return;
            }
            axios.get('http://localhost:5000/user/getmycodes', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then((response) => {
                    setNotes(response.data.notes);
                })
                .catch((error) => {
                    console.error('Error fetching notes: ', error);
                });
            
        };

        fetchNotes();
    }, []);

    const handleNoteClick = (note) => {
        setSelectedNote(note);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedNote(null);
    };

    if (!isAuthenticated) {
        return <UnauthenticatedView />;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Notes</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {notes.map((note) => (
                    <NoteCard key={note.id} note={note} onClick={handleNoteClick} />
                ))}
            </div>
            {isModalOpen && selectedNote && (
                <NoteModal note={selectedNote} onClose={closeModal} />
            )}
        </div>
    );
}