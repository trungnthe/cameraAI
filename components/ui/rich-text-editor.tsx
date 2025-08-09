"use client";

import React, { useRef, useCallback, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, Undo, Redo } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  height?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Enter content...",
  height = "400px"
}) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || '';
    }
  }, [value]);

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleInput = useCallback(() => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    // Handle Ctrl+Z (Undo) and Ctrl+Y (Redo)
    if (e.ctrlKey || e.metaKey) {
      if (e.key === 'z') {
        e.preventDefault();
        executeCommand('undo');
      } else if (e.key === 'y') {
        e.preventDefault();
        executeCommand('redo');
      }
    }
  }, [executeCommand]);

  const insertLink = useCallback(() => {
    const url = prompt('Enter URL:');
    if (url) {
      executeCommand('createLink', url);
    }
  }, [executeCommand]);

  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title,
    isActive = false 
  }: { 
    onClick: () => void; 
    icon: React.ComponentType<{ size?: number; className?: string }>; 
    title: string;
    isActive?: boolean;
  }) => (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded hover:bg-gray-100 transition-colors ${
        isActive ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
      }`}
    >
      <Icon size={16} />
    </button>
  );

  return (
    <div className="rich-text-editor border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-gray-200 bg-gray-50 flex-wrap">
        <ToolbarButton
          onClick={() => executeCommand('undo')}
          icon={Undo}
          title="Undo"
        />
        <ToolbarButton
          onClick={() => executeCommand('redo')}
          icon={Redo}
          title="Redo"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton
          onClick={() => executeCommand('bold')}
          icon={Bold}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => executeCommand('italic')}
          icon={Italic}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => executeCommand('underline')}
          icon={Underline}
          title="Underline"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <select
          onChange={(e) => executeCommand('formatBlock', e.target.value)}
          className="px-2 py-1 text-sm border border-gray-300 rounded"
          defaultValue=""
        >
          <option value="">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="p">Paragraph</option>
        </select>
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton
          onClick={() => executeCommand('justifyLeft')}
          icon={AlignLeft}
          title="Align Left"
        />
        <ToolbarButton
          onClick={() => executeCommand('justifyCenter')}
          icon={AlignCenter}
          title="Align Center"
        />
        <ToolbarButton
          onClick={() => executeCommand('justifyRight')}
          icon={AlignRight}
          title="Align Right"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton
          onClick={() => executeCommand('insertUnorderedList')}
          icon={List}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => executeCommand('insertOrderedList')}
          icon={ListOrdered}
          title="Numbered List"
        />
        
        <div className="w-px h-6 bg-gray-300 mx-1" />
        
        <ToolbarButton
          onClick={insertLink}
          icon={Link}
          title="Insert Link"
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        className="p-4 focus:outline-none editor-content"
        style={{ 
          minHeight: height,
          maxHeight: '600px',
          overflowY: 'auto'
        }}
        suppressContentEditableWarning={true}
        data-placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
