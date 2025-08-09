"use client";

import React, { useRef, useCallback, useEffect } from 'react';
import { Bold, Italic, Underline, List, ListOrdered, AlignLeft, AlignCenter, AlignRight, Link, Undo, Redo, Image, Upload } from 'lucide-react';

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

  const insertImage = useCallback(() => {
    const url = prompt('Enter image URL:');
    if (url) {
      executeCommand('insertImage', url);
    }
  }, [executeCommand]);

  const triggerFileUpload = useCallback(() => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          if (result) {
            executeCommand('insertImage', result);
          }
        };
        reader.readAsDataURL(file);
      }
    };
    fileInput.click();
  }, [executeCommand]);

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Check if the item is an image
      if (item.type.indexOf('image') !== -1) {
        e.preventDefault();
        
        const file = item.getAsFile();
        if (file) {
          const reader = new FileReader();
          reader.onload = (event) => {
            const result = event.target?.result as string;
            if (result) {
              // Insert the image at the current cursor position
              executeCommand('insertImage', result);
            }
          };
          reader.readAsDataURL(file);
        }
        break;
      }
    }
  }, [executeCommand]);

  const addResizeControls = useCallback((img: HTMLImageElement) => {
    // Don't add controls if they already exist
    if (img.parentElement?.classList.contains('image-resize-container')) {
      return;
    }

    const container = document.createElement('div');
    container.className = 'image-resize-container';
    container.style.cssText = `
      position: relative;
      display: inline-block;
    `;

    // Wrap the image
    img.parentNode?.insertBefore(container, img);
    container.appendChild(img);

    // Add resize handles
    const handles = ['nw', 'ne', 'sw', 'se'];
    handles.forEach(position => {
      const handle = document.createElement('div');
      handle.className = `resize-handle resize-${position}`;
      handle.style.cssText = `
        position: absolute;
        width: 10px;
        height: 10px;
        background: #3b82f6;
        border: 2px solid white;
        border-radius: 50%;
        cursor: ${position.includes('n') ? (position.includes('w') ? 'nw' : 'ne') : (position.includes('w') ? 'sw' : 'se')}-resize;
        ${position.includes('n') ? 'top: -5px;' : 'bottom: -5px;'}
        ${position.includes('w') ? 'left: -5px;' : 'right: -5px;'}
      `;

      let isResizing = false;
      let startX = 0;
      let startY = 0;
      let startWidth = 0;
      let startHeight = 0;

      handle.addEventListener('mousedown', (e) => {
        e.preventDefault();
        e.stopPropagation();
        isResizing = true;
        startX = e.clientX;
        startY = e.clientY;
        startWidth = img.offsetWidth;
        startHeight = img.offsetHeight;

        const handleMouseMove = (e: MouseEvent) => {
          if (!isResizing) return;

          const deltaX = e.clientX - startX;
          const deltaY = e.clientY - startY;

          let newWidth = startWidth;
          let newHeight = startHeight;

          if (position.includes('e')) {
            newWidth = startWidth + deltaX;
          } else if (position.includes('w')) {
            newWidth = startWidth - deltaX;
          }

          if (position.includes('s')) {
            newHeight = startHeight + deltaY;
          } else if (position.includes('n')) {
            newHeight = startHeight - deltaY;
          }

          // Maintain aspect ratio
          const aspectRatio = startWidth / startHeight;
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            newHeight = newWidth / aspectRatio;
          } else {
            newWidth = newHeight * aspectRatio;
          }

          // Set minimum size
          newWidth = Math.max(50, newWidth);
          newHeight = Math.max(50, newHeight);

          img.style.width = newWidth + 'px';
          img.style.height = newHeight + 'px';
          
          // Update the content
          if (editorRef.current) {
            onChange(editorRef.current.innerHTML);
          }
        };

        const handleMouseUp = () => {
          isResizing = false;
          document.removeEventListener('mousemove', handleMouseMove);
          document.removeEventListener('mouseup', handleMouseUp);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);
      });

      container.appendChild(handle);
    });

    // Add size display
    const sizeDisplay = document.createElement('div');
    sizeDisplay.className = 'size-display';
    sizeDisplay.style.cssText = `
      position: absolute;
      top: -25px;
      left: 0;
      background: #3b82f6;
      color: white;
      padding: 2px 6px;
      border-radius: 4px;
      font-size: 11px;
      font-family: monospace;
    `;
    sizeDisplay.textContent = `${img.offsetWidth} × ${img.offsetHeight}`;
    container.appendChild(sizeDisplay);

    // Remove controls when clicking elsewhere
    const removeControls = (e: MouseEvent) => {
      if (!container.contains(e.target as Node) && 
          !(e.target as HTMLElement).closest('.image-resize-container')) {
        const img = container.querySelector('img');
        if (img && container.parentNode) {
          container.parentNode.insertBefore(img, container);
          container.parentNode.removeChild(container);
        }
        document.removeEventListener('click', removeControls);
        
        // Update the content after removing controls
        if (editorRef.current) {
          onChange(editorRef.current.innerHTML);
        }
      }
    };
    
    setTimeout(() => {
      document.addEventListener('click', removeControls);
    }, 100);
  }, [onChange]);

  const handleImageClick = useCallback((e: React.MouseEvent) => {
    const target = e.target as HTMLElement;
    
    // Check if we clicked on an image or inside an image container
    let imageElement: HTMLImageElement | null = null;
    
    if (target.tagName === 'IMG') {
      imageElement = target as HTMLImageElement;
    } else if (target.closest('.image-resize-container')) {
      const container = target.closest('.image-resize-container');
      imageElement = container?.querySelector('img') as HTMLImageElement | null;
    }
    
    if (imageElement) {
      e.preventDefault();
      e.stopPropagation();
      
      // Remove any existing resize controls
      const existingControls = editorRef.current?.querySelectorAll('.image-resize-container');
      existingControls?.forEach(control => {
        const img = control.querySelector('img');
        if (img && img !== imageElement) {
          const parent = control.parentNode;
          if (parent) {
            parent.insertBefore(img, control);
            parent.removeChild(control);
          }
        }
      });

      // Add resize controls to the clicked image (only if it doesn't already have them)
      if (!imageElement.closest('.image-resize-container')) {
        addResizeControls(imageElement);
      }
    } else {
      // Clicked elsewhere, remove all controls
      const existingControls = editorRef.current?.querySelectorAll('.image-resize-container');
      existingControls?.forEach(control => {
        const img = control.querySelector('img');
        if (img) {
          const parent = control.parentNode;
          if (parent) {
            parent.insertBefore(img, control);
            parent.removeChild(control);
          }
        }
      });
    }
  }, [addResizeControls]);

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
        <ToolbarButton
          onClick={insertImage}
          icon={Image}
          title="Insert Image URL"
        />
        <ToolbarButton
          onClick={triggerFileUpload}
          icon={Upload}
          title="Upload Image File"
        />
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onClick={handleImageClick}
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
