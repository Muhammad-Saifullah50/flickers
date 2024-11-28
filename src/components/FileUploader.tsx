import React, { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'
import { Input } from './ui/input'
import Image from 'next/image'

interface FileUploaderProps {
    files: File | undefined
    onChange: (files: File) => void
    uploadedImage?: string
    setUploadedImage: (file: any) => void
}

const FileUploader = ({ files, onChange, setUploadedImage, uploadedImage }: FileUploaderProps) => {
    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles.length > 0) {
            const file = acceptedFiles[0]
            onChange(file);
            const objectUrl = URL.createObjectURL(file);
            setUploadedImage(objectUrl);
        }
    }, [onChange, setUploadedImage]);

    const { getRootProps, getInputProps } = useDropzone({ onDrop });
    useEffect(() => {
        return () => {
            if (uploadedImage) {
                URL.revokeObjectURL(uploadedImage);
            }
        };
    }, [uploadedImage]);
    return (
        <div {...getRootProps()} className=''>
            <Input {...getInputProps()} />
            {
                files ? (
                    <Image
                        src={uploadedImage ? uploadedImage : ''}
                        alt="Uploaded file"
                        width={200}
                        height={200}
                        className='object-contain mx-auto'
                    />
                ) : (
                    <div className='flex flex-col gap-2 p-8 items-center justify-center h-60 bg-dark-3'>
                        <Image
                            src={'/icons/image.svg'}
                            alt="Upload"
                            width={96}
                            height={77}
                        />
                        <p className='text-light-secondary text-sm font-normal'>
                            <span className='text-light-2 font-semibold text-lg'>Drag photos and videos here
                            </span>
                        </p>
                        <p className='text-purple-tertiary text-xs font-normal text-center'>SVG, PNG, JPG or GIF (max. 800x400px)</p>
                    </div>
                )
            }
        </div>
    )
}

export default FileUploader