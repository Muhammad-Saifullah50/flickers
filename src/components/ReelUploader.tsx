import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Input } from './ui/input';
import Image from 'next/image';

interface FileUploaderProps {
  file?: File; // File can be undefined initially
  onChange: (file: File) => void;
  uploadedFile?: string; // Optional string for uploaded file
  setUploadedFile: (fileUrl: string) => void;
  existingFile?: string; // Optional existing file URL
  onRemoveExisting?: (fileUrl: string) => void;
}

const ReelUploader = ({
  file,
  onChange,
  setUploadedFile,
  uploadedFile,
  existingFile,
  onRemoveExisting,
}: FileUploaderProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles && acceptedFiles.length > 0) {
        const newFile = acceptedFiles[0];
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
    const isVideo = fileUrl.match(/\.(mp4|webm|ogg)$/i);

    return (
      <div key={fileUrl} className="relative group">
        {isVideo ? (
          <div className="w-[200px] h-[200px] relative">
            <video
              src={fileUrl}
              controls
              preload="metadata"
              className="absolute inset-0 w-full h-full object-cover rounded-lg"
            />
          </div>
        ) : (
          <Image
            src={fileUrl}
            alt={`${isExisting ? 'Existing' : 'Uploaded'} file`}
            width={200}
            height={200}
            className="object-cover rounded-lg w-[200px] h-[200px]"
          />
        )}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (isExisting) {
              onRemoveExisting?.(fileUrl);
            } else {
              removeFile();
            }
          }}
          className="absolute top-2 right-5 bg-red-500 text-white p-2 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
          className={`flex flex-col gap-2 p-8 items-center justify-center ${
            uploadedFile || existingFile ? 'h-32' : 'h-60'
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
          <p className="text-light-4 text-sm text-center">Supports images and videos</p>
        </div>
      </div>
    </div>
  );
};

export default ReelUploader;
