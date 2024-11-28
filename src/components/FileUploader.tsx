import React, { useCallback, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input } from './ui/input'
import Image from 'next/image'

interface FileUploaderProps {
    files: File[]
    onChange: (files: File[]) => void
    uploadedFiles: string[]
    setUploadedFiles: (files: string[]) => void
}

const FileUploader = ({ files, onChange, setUploadedFiles, uploadedFiles }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            // Combine new files with existing ones
            const newFiles = [...files, ...acceptedFiles];
            onChange(newFiles);
            
            // Create object URLs for new files and combine with existing ones
            const newObjectUrls = acceptedFiles.map(file => URL.createObjectURL(file));
            setUploadedFiles([...uploadedFiles, ...newObjectUrls]);
        }
    }, [onChange, setUploadedFiles, files, uploadedFiles]);

    const removeFile = (index: number) => {
        const newFiles = [...files];
        const newUploadedFiles = [...uploadedFiles];
        
        // Revoke the URL for the removed file
        URL.revokeObjectURL(newUploadedFiles[index]);
        
        // Remove the file from both arrays
        newFiles.splice(index, 1);
        newUploadedFiles.splice(index, 1);
        
        onChange(newFiles);
        setUploadedFiles(newUploadedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.gif'],
            'video/*': ['.mp4', '.webm', '.ogg']
        },
        multiple: true
    });

    useEffect(() => {
        return () => {
            uploadedFiles.forEach(url => {
                URL.revokeObjectURL(url);
            });
        };
    }, [uploadedFiles]);

    const renderPreview = (file: string, index: number) => {
        const isVideo = files[index]?.type.startsWith('video/');
        
        return (
            <div key={index} className="relative group">
                {isVideo ? (
                    <video
                        src={file}
                        controls
                        className='w-[200px] h-[200px] object-cover rounded-lg'
                    />
                ) : (
                    <Image
                        src={file}
                        alt={`Uploaded file ${index + 1}`}
                        width={200}
                        height={200}
                        className='object-cover rounded-lg w-[200px] h-[200px]'
                    />
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                    }}
                    className="absolute top-2 right-14 bg-red-500 text-white p-2 px-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
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
            <Input {...getInputProps()} multiple />
            <div>
                {files.length > 0 && (
                    <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
                        {uploadedFiles.map((file, index) => renderPreview(file, index))}
                    </div>
                )}
                
                <div className={`flex flex-col gap-2 p-8 items-center justify-center ${files.length > 0 ? 'h-32' : 'h-60'} bg-dark-3 rounded-lg border-2 border-dashed border-gray-500 cursor-pointer hover:bg-dark-4 transition mt-4`}>
                    <Image
                        src={'/icons/image.svg'}
                        alt="Upload"
                        width={files.length > 0 ? 48 : 96}
                        height={files.length > 0 ? 38 : 77}
                        className='object-contain mx-auto'
                    />
                    <p className='text-light-2 text-center'>
                        {isDragActive 
                            ? 'Drop files here...' 
                            : 'Drag and drop files here or click to browse'}
                    </p>
                    <p className='text-light-4 text-sm text-center'>Supports images and videos</p>
                </div>
            </div>
        </div>
    )
}

export default FileUploader