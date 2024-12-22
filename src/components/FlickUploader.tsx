import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';

interface FileUploaderProps {
  onChange: (file: File) => void;
  uploadedFile?: string;
  setUploadedFile: (fileUrl: string) => void;
  existingFile?: string;
  onRemoveExisting?: (fileUrl: string) => void;
}

const FlickUploader = ({
  onChange,
  setUploadedFile,
  uploadedFile,
  existingFile,
  onRemoveExisting,
}: FileUploaderProps) => {

  const validateVideoDuration = (file: File) => {
    return new Promise<boolean>((resolve) => {
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.onloadedmetadata = () => {
        URL.revokeObjectURL(video.src); // Clean up the object URL
        resolve(video.duration <= 15); // Validate video duration
      };
      video.src = URL.createObjectURL(file);
    });
  };

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];

        const isValid = validateVideoDuration(newFile);

        if (!isValid) {
          toast({
            variant: 'destructive',
            description: 'Video duration should be less than or equal to 15 seconds',
          });
          return;
        }

        onChange(newFile);
        const newObjectUrl = URL.createObjectURL(newFile);
        setUploadedFile(newObjectUrl);

      }
    },
    [onChange, setUploadedFile]
  );

  const removeFile = () => {
    if (uploadedFile) {
      URL.revokeObjectURL(uploadedFile);
      setUploadedFile('');
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.webm', '.ogg'],
    },
    multiple: false,
  });

  useEffect(() => {
    return () => {
      if (uploadedFile) {
        URL.revokeObjectURL(uploadedFile);
      }
    };
  }, [uploadedFile]);

  const renderPreview = (fileUrl: string, isExisting: boolean = false) => {
    return (
      <div key={fileUrl} className="relative group">

        <div className="w-[200px] h-[200px] relative">
          <video
            src={fileUrl}
            controls
            preload="metadata"
            className="absolute inset-0 w-full h-full object-cover rounded-lg"
          />
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isExisting) {
              onRemoveExisting?.(fileUrl);
            } else {
              removeFile();
            }
          }}
          className="absolute top-2 right-6 bg-red-500 text-white p-2 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          ✕
        </button>
      </div>
    );
  };

  return (
    <div
      {...getRootProps()}
      className={`transition-colors ${isDragActive ? 'bg-dark-4' : ''}`}
    >
      <Input {...getInputProps()} />
      <div>
        {/* Show existing file */}
        {existingFile && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
            {renderPreview(existingFile, true)}
          </div>
        )}

        {/* Show newly uploaded file */}
        {uploadedFile && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {renderPreview(uploadedFile, false)}
          </div>
        )}

        <div
          className={`flex flex-col gap-2 p-8 items-center justify-center ${uploadedFile || existingFile ? 'h-32' : 'h-60'
            } bg-dark-3 rounded-lg border-2 border-dashed border-gray-500 cursor-pointer hover:bg-dark-4 transition mt-4`}
        >
          <Image
            src={'/icons/image.svg'}
            alt="Upload"
            width={uploadedFile || existingFile ? 48 : 96}
            height={uploadedFile || existingFile ? 38 : 77}
            className="object-contain mx-auto"
          />
          <p className="text-light-2 text-center">
            {isDragActive
              ? 'Drop files here...'
              : 'Drag and drop files here or click to browse'}
          </p>
          <p className="text-light-4 text-sm text-center">Supports only videos</p>
        </div>
      </div>
    </div>
  );
};

export default FlickUploader;
