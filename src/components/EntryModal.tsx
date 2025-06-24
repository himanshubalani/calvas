import React, { useState, useEffect, ChangeEvent, DragEvent, useRef } from 'react';

interface EntryModalProps {
  isOpen: boolean;
  onClose: () => void;
  date: Date | null;
  onSave: (date: Date, photoFile: File | null, photoUrl: string | null, note: string | null) => void;
  initialPhotoUrl?: string | null;
  initialNote?: string | null;
}

export default function EntryModal({
  isOpen,
  onClose,
  date,
  onSave,
  initialPhotoUrl = null,
  initialNote = null,
}: EntryModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(initialPhotoUrl);
  const [currentNote, setCurrentNote] = useState(initialNote);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreviewUrl(initialPhotoUrl);
    setCurrentNote(initialNote || ''); 
    setSelectedFile(null);
  }, [initialPhotoUrl, initialNote, date]);


  useEffect(() => {
    let objectUrl: string | null = null;
    if (selectedFile) {
      objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);
    }
    // No need to revoke here if we are passing the blob URL for display.
    // Revocation should happen if the component unmounts AND the URL is a blob.
    // Or if a new blob is created.
    // However, for simplicity in this step, we'll let the browser manage blob URLs.
    // They are typically revoked when the document that created them is unloaded.
    // For more robust revocation, you'd track specifically created blob URLs.
    // return () => {
    //   if (objectUrl && objectUrl.startsWith('blob:')) {
    //      URL.revokeObjectURL(objectUrl);
    //   }
    // };
  }, [selectedFile]);

  const handleSave = () => {
    if (date) {
      onSave(date, selectedFile, previewUrl, currentNote);
    }
    onClose();
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    setSelectedFile(file);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !date) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-xl relative max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Entry for: {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">Note</label>
              <textarea
                id="note"
                rows={3}
                value={currentNote || ''}
                onChange={(e) => setCurrentNote(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add a note..."
              />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tasks</label>
                <div className="text-sm text-gray-400 italic">(Task list coming soon)</div>
            </div>

            <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
               <div
                    className={`mt-1 flex justify-center px-6 pt-5 pb-6 border-2 ${
                    isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 border-dashed'
                    } rounded-md`}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={triggerFileInput} // Allow click to open file dialog
                >
                    <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                    id="file-upload"
                    />
                    <div className="space-y-1 w-full text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                    >
                        <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex text-sm text-gray-600 justify-center">
                        <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                        onClick={(e) => {
                            // Prevent this click from bubbling up to the parent div's onClick handler
                            e.stopPropagation();
                        }}
                        >
                        <span>Upload a file</span>
                        </label>
                        <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                    {selectedFile && (
                      <div className="w-full px-2">
                        <p className="text-xs text-green-600 mt-1 truncate">
                          Selected: {selectedFile.name}
                        </p>
                      </div>
                    )}
                    </div>
                </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Photo Preview</label>
            <div className="aspect-w-1 aspect-h-1 bg-gray-100 rounded-md overflow-hidden">
              {previewUrl ? ( // Check if previewUrl is not null/undefined
                <img src={previewUrl} alt="Preview" className="object-cover w-full h-full" />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <svg className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
              )}
            </div>
            {previewUrl && (
                 <button
                    onClick={() => {setSelectedFile(null); setPreviewUrl(null);}}
                    className="mt-2 text-xs text-red-600 hover:text-red-800"
                >
                    Remove Photo
                </button>
            )}
          </div>
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Save Entry
          </button>
        </div>
      </div>
    </div>
  );
}