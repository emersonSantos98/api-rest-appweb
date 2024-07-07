const ProductService = require('../services/Product/Product.service');
const { AppError } = require('../../src/error/Errors');
const QRCode = require('qrcode');
const { PDFDocument } = require('pdf-lib');
const fs = require('fs');
const path = require('path');

class LabelService {
  constructor() {
    this.productService = new ProductService();
  }

  async generateQRCode(data) {
    try {
      const url = await QRCode.toDataURL(data, { errorCorrectionLevel: 'H' });
      return url.split(',')[1];
    } catch (err) {
      throw new Error('Error generating QR code');
    }
  }

  async generateLabel(productId, labelCountPerVariation = 1) {
    try {
      const { data } = await this.productService.findOneProduct(productId);
      if (!data) {
        throw new AppError(404, 'Product not found');
      }

      const pdfPath = await this.generateETickets(data, labelCountPerVariation);
      return pdfPath;
    } catch (error) {
      throw new AppError(400, error.message);
    }
  }

  async generateETickets(product, labelCountPerVariation) {
    const { name_product, variations } = product;
    const pdfDoc = await PDFDocument.create();

    const labelsPerRow = 7;
    const labelsPerColumn = 11;
    const labelWidth = 72;
    const labelHeight = 72;
    const pageWidth = 595;
    const pageHeight = 842;
    const margin = 10;
    const horizontalSpacing =
      (pageWidth - labelsPerRow * labelWidth - 2 * margin) / (labelsPerRow - 1);
    const verticalSpacing =
      (pageHeight - labelsPerColumn * labelHeight - 2 * margin) /
        (labelsPerColumn - 1) -
      2;

    for (const variation of variations) {
      let currentPage;
      let currentX;
      let currentY;

      for (let i = 0; i < labelCountPerVariation; i++) {
        const { color, size, barcode, id } = variation;
        const qrCodeData = `id-${id}-${name_product} - ${color} - ${size} - ${barcode}`;
        const qrCodeBase64 = await this.generateQRCode(qrCodeData);

        if (i % (labelsPerRow * labelsPerColumn) === 0) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          currentX = margin;
          currentY = pageHeight - margin - labelHeight;

          // Adicionar título da página
          const fontSize = 12;
          currentPage.drawText(`${name_product} - ${color} - ${size}`, {
            x: margin,
            y: pageHeight - margin - fontSize,
            size: fontSize,
          });

          currentY -= fontSize + 10;
        }

        const qrCodeImage = await pdfDoc.embedPng(
          Buffer.from(qrCodeBase64, 'base64'),
        );
        currentPage.drawImage(qrCodeImage, {
          x: currentX,
          y: currentY,
          width: labelWidth,
          height: labelHeight,
        });

        currentX += labelWidth + horizontalSpacing;

        if ((i + 1) % labelsPerRow === 0) {
          currentX = margin;
          currentY -= labelHeight + verticalSpacing;
        }

        if ((i + 1) % (labelsPerRow * labelsPerColumn) === 0) {
          currentPage = pdfDoc.addPage([pageWidth, pageHeight]);
          currentX = margin;
          currentY = pageHeight - margin - labelHeight;
        }
      }
    }

    const pdfBytes = await pdfDoc.save();
    const pdfPath = path.resolve(__dirname, '../../download/qr-code/qr-code.pdf');
    fs.writeFileSync(pdfPath, pdfBytes);

    return pdfPath;
  }
}

module.exports = LabelService;
