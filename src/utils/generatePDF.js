import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';

export function generatePDFLabels(patients, selectedMeal) {
  const doc = new jsPDF({
    orientation: 'landscape',
    unit: 'mm',
    format: [90, 35],
  });

  const canvas = document.createElement('canvas');
  document.body.appendChild(canvas);
  canvas.style.display = 'none';

  patients.forEach((patient, index) => {
    if (index > 0) {
      doc.addPage([90, 35]);
    }

    const nome = patient.nome.substring(0, 30);
    const prontuario = patient.prontuario.substring(0, 20);
    const enfermaria = patient.enfermaria.substring(0, 20);
    const mealDesc = patient.refeicoes?.[selectedMeal] || 'Não registrada';
    const mealLabel = `${selectedMeal}: ${mealDesc}`.substring(0, 30);

    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(15);
    doc.text(2, 6, nome);
    doc.text(2, 12, `Pront: ${prontuario}`);
    doc.text(2, 18, enfermaria);
    doc.text(2, 24, mealLabel);

    canvas.width = 100;
    canvas.height = 60;
    JsBarcode(canvas, prontuario, {
      format: 'CODE128',
      displayValue: false,
      height: 60,
      width: 1.5,
    });
    const barcodeData = canvas.toDataURL('image/png');

    doc.addImage(barcodeData, 'PNG', 64, 10, 25, 15);

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });

  document.body.removeChild(canvas);
  doc.save(`etiquetas_${selectedMeal}.pdf`);
}