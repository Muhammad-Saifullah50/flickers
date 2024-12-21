import React, { useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Input } from "./ui/input";
import Image from "next/image";

interface FileUploaderProps {
    files: File[] | null;
    onChange: (files: File[]) => void;
    uploadedFiles: string[];
    setUploadedFiles: (files: string[]) => void;
    existingFiles: string[] | string;
    onRemoveExisting?: (fileUrl: string) => void;
    isReel?: boolean;
}

const FileUploader = ({
    files = [],
    onChange,
    setUploadedFiles,
    uploadedFiles,
    existingFiles,
    onRemoveExisting,
    isReel,
}: FileUploaderProps) => {
    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (isReel && acceptedFiles.length > 1) return; // Prevent multiple files for reels
            const newFiles = isReel ? acceptedFiles : [...(files || []), ...acceptedFiles];
            onChange(newFiles);

            const newObjectUrls = acceptedFiles.map((file) => URL.createObjectURL(file));
            setUploadedFiles(isReel ? newObjectUrls : [...uploadedFiles, ...newObjectUrls]);
        },
        [files, isReel, onChange, setUploadedFiles, uploadedFiles]
    );

    const removeFile = (index: number) => {
        if (!files) return;
        const newFiles = [...files];
        const newUploadedFiles = [...uploadedFiles];

        URL.revokeObjectURL(newUploadedFiles[index]);

        newFiles.splice(index, 1);
        newUploadedFiles.splice(index, 1);

        onChange(newFiles);
        setUploadedFiles(newUploadedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: isReel
            ? { "video/*": [".mp4", ".webm", ".ogg"] }
            : {
                "image/*": [".png", ".jpg", ".jpeg", ".gif"],
                "video/*": [".mp4", ".webm", ".ogg"],
            },
        multiple: !isReel,
    });

    useEffect(() => {
        return () => {
            uploadedFiles.forEach((url) => URL.revokeObjectURL(url));
        };
    }, [uploadedFiles]);

    const renderPreview = (
        file: string,
        index: number,
        isExisting: boolean = false
    ) => {
        const isVideo = isExisting
            ? file.match(/\.(mp4|webm|ogg)$/i)
            : files instanceof Array && files[index]?.type.startsWith("video/");

        return (
            <div key={file} className="relative group ">
                {isVideo ? (
                    <video
                        src={file}
                        controls
                        preload="metadata"
                        className="w-[200px] h-[200px] object-cover rounded-lg"
                    />
                ) : (
                   null
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        isExisting ? onRemoveExisting?.(file) : removeFile(index);
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white p-1 px-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    ✕
                </button>
            </div>
        );
    };

    const existingFilesArray = Array.isArray(existingFiles) ? existingFiles : [existingFiles];

    return (
        <div {...getRootProps()} className={`transition-colors ${isDragActive ? "bg-dark-4" : ""}`}>
            <Input {...getInputProps()} multiple={!isReel} />
            <div>
                {/* Existing files */}
                {existingFilesArray.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                        {existingFilesArray.map((file, index) => renderPreview(file, index, true))}
                    </div>
                )}

                {/* Uploaded files */}
                {uploadedFiles.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {uploadedFiles.map((file, index) => renderPreview(file, index, false))}
                    </div>
                )}

                {/* Dropzone prompt */}
                <div
                    className={`flex flex-col gap-2 p-8 items-center justify-center ${uploadedFiles.length > 0 || existingFilesArray.length > 0 ? "h-32" : "h-60"
                        } bg-dark-3 rounded-lg border-2 border-dashed border-gray-500 cursor-pointer hover:bg-dark-4 transition mt-4`}
                >
                    <Image
                        src="/icons/image.svg"
                        alt="Upload"
                        width={48}
                        height={48}
                        className="object-contain mx-auto"
                    />
                    <p className="text-light-2 text-center">
                        {isDragActive ? "Drop files here..." : "Drag and drop files here or click to browse"}
                    </p>
                    <p className="text-light-4 text-sm text-center">Supports &nbsp;
                        {isReel ? 'only videos' : 'images and videos'}</p>
                </div>
            </div>
        </div>
    );
};

export default FileUploader;
