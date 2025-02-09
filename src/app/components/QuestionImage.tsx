"use client";

import React, {useState, useEffect, JSX} from 'react';

function QuestionImage({text}: { text: string }): JSX.Element {
    const [dataUrl, setDataUrl] = useState<string>('');

    useEffect(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 100;
        const context = canvas.getContext('2d');
        if (context) {
            context.fillStyle = '#ffffff';
            context.fillRect(0, 0, canvas.width, canvas.height);
            context.strokeStyle = '#e5e7eb';
            context.strokeRect(0, 0, canvas.width, canvas.height);
            context.font = '16px sans-serif';
            context.fillStyle = '#111827';
            context.textBaseline = 'top';
            const maxWidth = canvas.width - 20;
            const words = text.split(' ');
            let line = '';
            let y = 10;
            const lineHeight = 20;
            for (let n = 0; n < words.length; n++) {
                const testLine = line + words[n] + ' ';
                const metrics = context.measureText(testLine);
                const testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, 10, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                } else {
                    line = testLine;
                }
            }
            context.fillText(line, 10, y);
            setDataUrl(canvas.toDataURL());
        }
    }, [text]);

    return dataUrl ? <img src={dataUrl} alt={text} className="rounded shadow-md"/> :
        <div className="bg-gray-100 p-4 text-center">Generating image...</div>;
}

export default QuestionImage;