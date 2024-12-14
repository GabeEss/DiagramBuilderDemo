import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// This button will allow the user to download their diagram as a pdf
const DownloadButton = ({ pdfContainerRef }) => {
    const handleClick = () => {
        const input = pdfContainerRef.current;
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;
            const aspectRatio = imgWidth / imgHeight;

            let finalImgWidth, finalImgHeight;

            if (imgWidth > imgHeight) {
                finalImgWidth = pdfWidth - 20; // Adjust for margins
                finalImgHeight = finalImgWidth / aspectRatio;
            } else {
                finalImgHeight = pdfHeight - 20; // Adjust for margins
                finalImgWidth = finalImgHeight * aspectRatio;
            }

            const marginX = (pdfWidth - finalImgWidth) / 2;
            const marginY = (pdfHeight - finalImgHeight) / 2;

            pdf.addImage(imgData, 'PNG', marginX, marginY, finalImgWidth, finalImgHeight);
            pdf.save('download.pdf');
        });
    };

    return(
        <button onClick={handleClick} className='download'>Download as PDF</button>
    )
}

export default DownloadButton;