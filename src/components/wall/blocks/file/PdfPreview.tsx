import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import nextIcon from '@/assets/icons/next.svg';
import previousIcon from '@/assets/icons/previous.svg';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { FileBlockType } from './FileUpload';
import Icon from '@/components/common/Icon';

type PdfPreviewProps = {
  targetFileBlock: FileBlockType;
};

export default function PdfPreview({ targetFileBlock }: PdfPreviewProps) {
  const windowWidth = useWindowWidth();

  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) =>
    setNumPages(numPages);

  const handleClickPrevious = () => {
    if (pageNumber === 1) {
      return;
    } else {
      setPageNumber(pageNumber - 1);
    }
  };
  const handleClickNext = () => {
    if (pageNumber === numPages) {
      return;
    } else {
      setPageNumber(pageNumber + 1);
    }
  };

  const handleDownload = () => {
    const byteCharacters = atob(
      (targetFileBlock.subData[0].file as string).split(',')[1],
    );
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const blobUrl = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = blobUrl;
    anchor.download = targetFileBlock.subData[0].fileName || 'file.pdf';
    anchor.click();
    URL.revokeObjectURL(blobUrl);
  };

  const isFileExist = targetFileBlock.subData[0].file;

  return (
    <div className="select-none">
      {isFileExist && (
        <section className="flex justify-between py-2 truncate">
          <p className="dm-16 text-blue hover" onClick={handleDownload}>
            {targetFileBlock.subData[0].fileName}
          </p>
          <p>
            {pageNumber} / {numPages}
          </p>
        </section>
      )}

      <Document
        className="overflow-hidden w-full mx-auto relative border-2 border-blue border-solid"
        file={targetFileBlock.subData[0].file}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page
          pageNumber={pageNumber}
          width={windowWidth < 640 ? windowWidth - 104 : 810}
        />
        <Icon
          src={previousIcon}
          onClick={handleClickPrevious}
          className={`z-20 absolute left-3 top-[calc(50%-10px)] hover ${
            pageNumber === 1 && 'hidden'
          }`}
        />
        <Icon
          src={nextIcon}
          onClick={handleClickNext}
          className={`z-20 absolute right-3 top-[calc(50%-10px)] hover ${
            pageNumber === numPages && 'hidden'
          }`}
        />
      </Document>
    </div>
  );
}
