const { AppError } = require('../../../src/error/Errors');
const { PDFDocument, degrees } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

class generateShippingLabelsService {
  async creategenerateShippingLabels(file) {
    try {
      if (!file || !file.buffer) {
        throw new AppError(400, 'File buffer is required');
      }

      const existingPdfBytes = file.buffer;

      const pdfDoc = await PDFDocument.load(existingPdfBytes);
      const pages = pdfDoc.getPages();
      const newPdfDoc = await PDFDocument.create();

      const half = Math.ceil(pages.length / 2);

      for (let i = 0; i < half; i++) {
        const labelPage = pages[i];
        const declarationPage = pages[i + half];

        const [embeddedLabelPage] = await newPdfDoc.embedPages([labelPage]);
        const [embeddedDeclarationPage] = declarationPage
          ? await newPdfDoc.embedPages([declarationPage])
          : [null];

        // Create a new page with A4 dimensions (210mm x 297mm)
        const newPage = newPdfDoc.addPage([595.28, 841.89]); // A4 size in points

        // Get the dimensions of the original pages
        const { width: labelWidth, height: labelHeight } = labelPage.getSize();
        const { width: declarationWidth, height: declarationHeight } =
          declarationPage.getSize();
        // Draw the declaration page vertically on the new A4 page
        if (embeddedDeclarationPage) {
          newPage.drawPage(embeddedDeclarationPage, {
            x: 0,
            y: 841.89 - declarationHeight, // Position the declaration at the top
            rotate: degrees(0), // Keep the declaration vertical
          });
        }

        // Draw the label page rotated by 90 degrees on the new A4 page
        newPage.drawPage(embeddedLabelPage, {
          x: -400, // Adjust position to fit within A4 width
          y: 897.89 - labelWidth, // Adjust position to fit within A4 height
          rotate: degrees(-90), // Rotate counterclockwise
        });
      }

      const pdfBytes = await newPdfDoc.save();
      const outputFilePath = path.join(
        __dirname,
        '../../../download/ShippingLabels/output.pdf',
      );
      fs.writeFileSync(outputFilePath, pdfBytes);

      return outputFilePath;
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }
}

module.exports = generateShippingLabelsService;
