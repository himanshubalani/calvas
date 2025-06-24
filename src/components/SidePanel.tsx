import React, { useState } from 'react';

interface SidePanelProps {
  onExport: (options: ExportOptions) => void;
  currentAspectRatioValue: number | null; // The actual numerical aspect ratio from parent
  onRatioChange: (newRatioValue: number | null) => void; // Parent's function to update the ratio
}

export interface ExportOptions {
  aspectRatioKey: string; // The key/label like "16:9"
  fileType: 'png' | 'jpeg' | 'svg';
}

// This map is useful here for displaying labels and can also be used in the parent
export const ratioMap: Record<string, number> = {
  'Landscape (16:9)': 16 / 9,
  'Square (1:1)': 1,
  'Portrait (4:3)': 4 / 3,
  'Photo (3:2)': 3 / 2,
  'Story (9:16)': 9 / 15,
};
export const ratioLabels = Object.keys(ratioMap);


export default function SidePanel({ onExport, currentAspectRatioValue, onRatioChange }: SidePanelProps) {
  // Find the key that matches the currentAspectRatioValue for the select dropdown
  const selectedKey = ratioLabels.find(key => ratioMap[key] === currentAspectRatioValue) || (currentAspectRatioValue === null ? 'Freeform' : '');
  
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleExport = (fileType: 'png' | 'jpeg' | 'svg') => {
    const aspectRatioKeyToExport = selectedKey || 'Landscape (16:9)'; // Use the current key for export options
    onExport({ aspectRatioKey: aspectRatioKeyToExport, fileType });
    setDropdownOpen(false);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLabel = event.target.value;
    const newRatio = ratioMap[selectedLabel];
     if (newRatio !== undefined) {
        onRatioChange(newRatio);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md h-[calc(100vh-3rem)] overflow-y-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">Calvas</h1>
      <h2 className="text-lg font-semibold mb-1 text-gray-700">Aspect Ratio</h2>
      <p className="text-xs text-gray-500 mb-3">Adjust the view of your calendar.</p>

      <div className="mb-6">
        <select
          value={selectedKey} // Controlled by the prop from parent
          onChange={handleSelectChange}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {/* Add a default/reset option if desired */}
          {ratioLabels.filter(label => label !== 'Freeform').map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <h2 className="text-lg font-semibold mb-1 text-gray-700">Export Month</h2>
      <p className="text-xs text-gray-500 mb-3">Save a snapshot of your calendar.</p>
      <div className="relative inline-flex w-full">
        <button
          onClick={() => handleExport('jpeg')}
          className="flex-1 inline-flex items-center justify-center px-4 py-2 border border-gray-300 bg-blue-600 text-white text-sm font-medium rounded-l-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          Export as JPEG
        </button>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="px-3 py-2 border border-gray-300 border-l-0 bg-blue-600 text-white text-sm font-medium rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
          aria-expanded={dropdownOpen}
          aria-haspopup="true"
        >
          ▼
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 z-20 mt-10 w-full origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
              <button
                onClick={() => handleExport('png')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Export as PNG
              </button>
              <button
                onClick={() => handleExport('svg')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                role="menuitem"
              >
                Export as SVG (Experimental)
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p className="font-semibold">More Options (Soon)</p>
        <ul className="list-disc ml-5 mt-1 space-y-1">
          <li>Theme (Light/Dark)</li>
          <li>Custom Fonts</li>
        </ul>
      </div>
    </div>
  );
}