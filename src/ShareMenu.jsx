import React, { useState } from 'react';

function ShareMenu() {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 2' },
    { id: 2, name: 'Item 2' },
    { id: 3, name: 'Item 2' }
  ]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editInput, setEditInput] = useState('');
  const [copyStatus, setCopyStatus] = useState('');

  // Add item
  const handleAdd = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setItems([...items, { id: Date.now(), name: input }]);
    setInput('');
  };

  // Delete item
  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  // Start editing
  const handleEdit = (item) => {
    setEditingId(item.id);
    setEditInput(item.name);
  };

  // Save edit
  const handleEditSave = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, name: editInput } : item
    ));
    setEditingId(null);
    setEditInput('');
  };

  // Copy URL to clipboard
  const handleCopyUrl = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(window.location.href);
      } else {
        const el = document.createElement('input');
        el.value = window.location.href;
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
      }
      setCopyStatus('Copied!');
      setTimeout(() => setCopyStatus(''), 1500);
    } catch{
      setCopyStatus('Failed to copy');
      setTimeout(() => setCopyStatus(''), 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 p-8 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center tracking-wide">Share Menu</h2>
      {/* Add Item Form */}
      <form onSubmit={handleAdd} className="flex gap-2 mb-6">
        <input 
        
          className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Add new item"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-green-500 text-white font-semibold rounded-md shadow hover:from-blue-700 hover:to-green-600 transition"
        >
          Add
        </button>
      </form>

      {/* Items List */}
      <ul className="space-y-3">
        {items.map(item => (
          <li key={item.id} className="flex items-center bg-gray-50 rounded-lg px-4 py-2 shadow-sm">
            {editingId === item.id ? (
              <>
                <input
                  className="flex-1 px-3 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                  type="text"
                  value={editInput}
                  onChange={e => setEditInput(e.target.value)}
                  autoFocus
                />
                <button
                  className="ml-2 text-green-600 hover:text-green-800 transition"
                  onClick={() => handleEditSave(item.id)}
                  title="Save"
                >💾</button>
                <button
                  className="ml-1 text-gray-400 hover:text-gray-600 transition"
                  onClick={() => setEditingId(null)}
                  title="Cancel"
                >❌</button>
              </>
            ) : (
              <>
                <span className="flex-1 text-gray-800">{item.name}</span>
                <button
                  className="ml-2 text-blue-500 hover:text-blue-700 transition"
                  onClick={() => handleEdit(item)}
                  title="Edit"
                >✏️</button>
                <button
                  className="ml-1 text-red-500 hover:text-red-700 transition"
                  onClick={() => handleDelete(item.id)}
                  title="Delete"
                >🗑️</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {/* Copy URL Button */}
      <button
        onClick={handleCopyUrl}
        className="w-full mt-8 py-3 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg shadow transition relative"
      >
        <span>🔗</span>
        {copyStatus ? copyStatus : 'Copy & Share URL'}
      </button>
    </div>
  );
}

export default ShareMenu;
