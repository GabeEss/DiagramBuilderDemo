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
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('download.pdf');
        })
    }

    return(
        <button onClick={handleClick} className='download'>Download as PDF</button>
    )
}

export default DownloadButton;