import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Bold,
  Italic,
  Underline,
  Code,
  Heading1,
  Heading2,
  List,
  MoreHorizontal,
  Clock,
} from 'lucide-react';
import { useNoteStore } from '../store/useNoteStore';
import type { Note } from '../services/notesService';

const Notes: React.FC = () => {
  const { notes, fetchNotes, addNote, updateNote } = useNoteStore();
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  useEffect(() => {
    if (notes.length > 0 && !activeNoteId) {
      handleSelectNote(notes[0]);
    }
  }, [notes, activeNoteId]);

  const activeNote = notes.find((n) => n.id === activeNoteId);

  const filtered = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (n.preview && n.preview.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSelectNote = (note: Note) => {
    setActiveNoteId(note.id);
    setEditTitle(note.title);
    setEditContent(note.content || '');
  };

  const handleCreateNote = async () => {
    try {
      const newNote = await addNote({
        title: 'Untitled Note',
        content: '',
        preview: 'New note...',
      });
      handleSelectNote(newNote);
    } catch (error) {
      console.error('Failed to create note:', error);
    }
  };

  const handleSaveNote = async () => {
    if (activeNote && (activeNote.title !== editTitle || activeNote.content !== editContent)) {
      try {
        await updateNote(activeNote.id, {
          title: editTitle,
          content: editContent,
          preview: editContent.substring(0, 50) + '...',
        });
      } catch (error) {
        console.error('Failed to update note:', error);
      }
    }
  };

  return (
    <motion.div
      style={{ display: 'flex', height: '100%', margin: '-40px', overflow: 'hidden' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {/* Notes Sidebar */}
      <div className="notes-sidebar">
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            background: 'var(--bg-input)',
            border: '1px solid var(--border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: '7px 10px',
            marginBottom: 12,
          }}
        >
          <Search size={13} color="var(--text-tertiary)" />
          <input
            style={{
              background: 'none',
              border: 'none',
              outline: 'none',
              fontSize: 13,
              color: 'var(--text-primary)',
              width: '100%',
            }}
            placeholder="Search notes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Add Note Button */}
        <button
          className="btn-add"
          style={{ marginBottom: 12, borderRadius: 'var(--radius-md)' }}
          onClick={handleCreateNote}
        >
          <Plus size={13} />
          New note
        </button>

        {/* Notes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filtered.map((note) => (
            <motion.div
              key={note.id}
              className={`notes-list-item ${activeNote?.id === note.id ? 'active' : ''}`}
              onClick={() => handleSelectNote(note)}
              whileHover={{ x: 2 }}
              transition={{ duration: 0.12 }}
            >
              <FileText size={13} style={{ flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 500,
                    color: 'var(--text-primary)',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {note.title}
                </div>
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>
                  {note.createdAt ? new Date(note.createdAt).toLocaleDateString() : 'Just now'}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="notes-editor" style={{ flex: 1 }}>
        {activeNote ? (
          <>
            {/* Note meta */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 24,
              }}
            >
              <span className="chip chip-neutral" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <Clock size={9} />
                {activeNote.createdAt ? new Date(activeNote.createdAt).toLocaleDateString() : 'Just now'}
              </span>
              <button className="btn-icon">
                <MoreHorizontal size={14} />
              </button>
            </div>

            {/* Editable Title */}
            <textarea
              className="editor-title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSaveNote}
              placeholder="Untitled"
              rows={1}
              onInput={(e) => {
                const el = e.currentTarget;
                el.style.height = 'auto';
                el.style.height = el.scrollHeight + 'px';
              }}
            />

            {/* Editable Body */}
            <textarea
              className="editor-body"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              onBlur={handleSaveNote}
              placeholder="Start writing... Press '/' for commands"
            />
          </>
        ) : (
          <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', color: 'var(--text-tertiary)' }}>
            Select or create a note to start writing
          </div>
        )}
      </div>

      {/* Floating Formatting Toolbar */}
      <div className="floating-toolbar">
        {[
          { icon: <Bold size={14} />, label: 'Bold' },
          { icon: <Italic size={14} />, label: 'Italic' },
          { icon: <Underline size={14} />, label: 'Underline' },
          { icon: <Code size={14} />, label: 'Code' },
          { icon: <Heading1 size={14} />, label: 'H1' },
          { icon: <Heading2 size={14} />, label: 'H2' },
          { icon: <List size={14} />, label: 'List' },
        ].map((tool) => (
          <motion.button
            key={tool.label}
            className="btn-icon"
            title={tool.label}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {tool.icon}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default Notes;
