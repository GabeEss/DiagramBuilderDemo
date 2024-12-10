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
            // const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = pdfWidth - 20; // Adjust for margins
            const imgHeight = (imgProps.height * imgWidth) / imgProps.width;
            const margin = 10; // Margin in mm

            pdf.addImage(imgData, 'PNG', margin, margin, imgWidth, imgHeight);
            pdf.save('download.pdf');
        })
    }

    return(
        <button onClick={handleClick} className='download'>Download as PDF</button>
    )
}

export default DownloadButton;