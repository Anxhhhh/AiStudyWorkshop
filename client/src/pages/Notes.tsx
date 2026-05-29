import React, { useState } from 'react';
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

interface NoteItem {
  id: string;
  title: string;
  preview: string;
  date: string;
  content: string;
}

const sampleNotes: NoteItem[] = [
  {
    id: 'n1',
    title: 'Data Structures — Arrays & Linked Lists',
    preview: 'Arrays provide O(1) random access...',
    date: '2h ago',
    content: 'Arrays provide O(1) random access. Linked lists allow dynamic memory allocation at the cost of sequential access (O(n)). Use arrays when you need fast index-based access; use linked lists when you frequently insert/delete elements.\n\n**Key Points:**\n- Array: O(1) access, O(n) insertion/deletion\n- Linked List: O(n) access, O(1) insertion/deletion (at head)',
  },
  {
    id: 'n2',
    title: 'Algorithm Complexity — Big O Notation',
    preview: 'Big O describes the upper bound...',
    date: 'Yesterday',
    content: 'Big O notation describes the upper bound of time or space complexity as input size grows.\n\n**Common Complexities:**\n- O(1) — Constant\n- O(log n) — Logarithmic\n- O(n) — Linear\n- O(n log n) — Linearithmic\n- O(n²) — Quadratic',
  },
  {
    id: 'n3',
    title: 'System Design Fundamentals',
    preview: 'Scalability, reliability, and availability...',
    date: '3d ago',
    content: 'Scalability, reliability, and availability are the three core pillars of distributed system design.\n\n**Scalability:** The ability to handle increased load by scaling horizontally (more machines) or vertically (more powerful machine).\n\n**CAP Theorem:** A distributed system can only guarantee two of: Consistency, Availability, Partition tolerance.',
  },
  {
    id: 'n4',
    title: 'Meeting Notes — Sprint Planning',
    preview: 'Discussed frontend architecture...',
    date: '5d ago',
    content: 'Discussed frontend architecture and decided on React + Vite + TypeScript stack. Backend will use Spring Boot with PostgreSQL. Key milestones:\n\n1. UI scaffold — Week 1\n2. API integration — Week 2\n3. Testing — Week 3\n4. Deployment — Week 4',
  },
];

const Notes: React.FC = () => {
  const [activeNote, setActiveNote] = useState<NoteItem>(sampleNotes[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editTitle, setEditTitle] = useState(activeNote.title);
  const [editContent, setEditContent] = useState(activeNote.content);

  const filtered = sampleNotes.filter(
    (n) =>
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectNote = (note: NoteItem) => {
    setActiveNote(note);
    setEditTitle(note.title);
    setEditContent(note.content);
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
        >
          <Plus size={13} />
          New note
        </button>

        {/* Notes List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filtered.map((note) => (
            <motion.div
              key={note.id}
              className={`notes-list-item ${activeNote.id === note.id ? 'active' : ''}`}
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
                <div style={{ fontSize: 11, color: 'var(--text-tertiary)' }}>{note.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="notes-editor" style={{ flex: 1 }}>
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
            {activeNote.date}
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
          placeholder="Start writing... Press '/' for commands"
        />
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
