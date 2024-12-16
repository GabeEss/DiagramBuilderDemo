import React from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

// This button will allow the user to download their diagram as a pdf
const DownloadButton = ({ pdfContainerRef }) => {
    const handleClick = () => {
        const input = pdfContainerRef.current;
        html2canvas(input, {
            useCORS: true,
            allowTaint: true,
            logging: true,
            onclone: (document) => {
                const svgs = document.querySelectorAll('svg');
                svgs.forEach((svg) => {
                    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
                });
            }
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();
            const imgProps = pdf.getImageProperties(imgData);
            const imgWidth = imgProps.width;
            const imgHeight = imgProps.height;
            const aspectRatio = imgWidth / imgHeight;

            let finalImgWidth, finalImgHeight;

            // This adjusts the scaling for the image on the pdf
            if (aspectRatio > 1) {
                finalImgWidth = pdfWidth - 60;
                finalImgHeight = finalImgWidth / aspectRatio;
            } else {
                finalImgHeight = pdfHeight - 60;
                finalImgWidth = finalImgHeight * aspectRatio;
            }

            const marginX = (pdfWidth - finalImgWidth) / 2;
            const marginY = (pdfHeight - finalImgHeight) / 2;

            pdf.addImage(imgData, 'PNG', marginX, marginY, finalImgWidth, finalImgHeight);
            pdf.save('diagram.pdf');
        }).catch((error) => {
            console.error('Error generating PDF:', error);
        });
    };

    return(
        <button onClick={handleClick} className='download'>Download as PDF</button>
    )
}

export default DownloadButton;