export const fileService = {
    validateVideoFile(file: File): string | null {
        const validTypes = ['video/mp4', 'video/webm', 'video/quicktime'];
        const maxSize = 300 * 1024 * 1024; // 300MB

        if (!validTypes.includes(file.type)) {
            return 'Invalid file type. Please upload MP4, WebM, or MOV.';
        }

        if (file.size > maxSize) {
            return 'File size too large. Maximum size is 300MB.';
        }

        return null;
    },

    readFileUrl(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.onerror = (e) => reject(e);
            reader.readAsDataURL(file);
        });
    },

    // Helper to create object URL for video preview
    createObjectUrl(file: File): string {
        return URL.createObjectURL(file);
    },

    revokeObjectUrl(url: string) {
        URL.revokeObjectURL(url);
    }
};
