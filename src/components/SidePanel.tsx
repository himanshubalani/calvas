import React, { useState } from 'react';

interface SidePanelProps {
  onExport: (options: ExportOptions) => void;
}

export interface ExportOptions {
  aspectRatio: string;
  fileType: 'png' | 'jpeg' | 'svg';
}

export default function SidePanel({ onExport }: SidePanelProps) {
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const aspectRatios = ['16:9', '4:3', '1:1', '3:2', 'A4 Landscape', 'A4 Portrait'];

  const handleExport = (fileType: 'png' | 'jpeg' | 'svg') => {
    onExport({ aspectRatio, fileType });
    console.log('Exporting with options:', { aspectRatio, fileType });
    setDropdownOpen(false);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Export Month</h2>

      {/* Aspect Ratio Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Aspect Ratio</label>
        <select
          value={aspectRatio}
          onChange={(e) => setAspectRatio(e.target.value)}
          className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
        >
          {aspectRatios.map((ratio) => (
            <option key={ratio} value={ratio}>
              {ratio}
            </option>
          ))}
        </select>
      </div>

      {/* Split Button */}
      <div className="relative inline-flex">
        <button
          onClick={() => handleExport('jpeg')}
          className="inline-flex items-center px-4 py-2 border border-gray-300 bg-blue-600 text-white text-sm font-medium rounded-l-md hover:bg-blue-700 focus:outline-none"
        >
          Export as JPEG
        </button>
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="px-5 border border-gray-300 border-l-0 bg-blue-600 text-white text-sm font-medium rounded-r-md hover:bg-blue-700 focus:outline-none gap-2"
        >
          ▼
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
            <div className="py-1">
              <button
                onClick={() => handleExport('png')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as PNG
              </button>
              <button
                onClick={() => handleExport('svg')}
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              >
                Export as SVG
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Future Features */}
      <div className="mt-6 text-sm text-gray-500">
        <p className="font-semibold">More Options (Soon)</p>
        <ul className="list-disc ml-5">
          <li>Theme (Light/Dark)</li>
          <li>Custom Fonts</li>
        </ul>
      </div>
    </div>
  );
}
