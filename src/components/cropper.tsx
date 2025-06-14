import React, { useState, useEffect, useRef } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import { Button } from '@/components/ui/button';
import { Crop } from 'lucide-react';

export default function CropOverlay({ previewUrl, onCrop }: { previewUrl: string, onCrop: (croppedBlob: Blob) => void }) {
  const cropperRef = useRef<HTMLImageElement>(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleCrop = () => {
    const cropper = (cropperRef.current as any)?.cropper;
    cropper.getCroppedCanvas().toBlob((blob: Blob) => {
      if (blob) onCrop(blob);
      setShowCropper(false);
    });
  };

  return (
    <div className="relative">
      {previewUrl && (
        <div className="absolute top-2 right-2 z-10">
          <Button variant="ghost" size="icon" onClick={() => setShowCropper(!showCropper)}>
            <Crop className="w-4 h-4" />
          </Button>
        </div>
      )}

      {showCropper ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-md shadow-md max-w-3xl w-full">
            <Cropper
              src={previewUrl}
              style={{ height: 400, width: '100%' }}
              initialAspectRatio={1}
              guides={false}
              ref={cropperRef}
              viewMode={1}
              dragMode="move"
              cropBoxResizable={true}
              cropBoxMovable={true}
            />
            <div className="mt-4 flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowCropper(false)}>Cancel</Button>
              <Button onClick={handleCrop}>Save Crop</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
