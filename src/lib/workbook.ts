import { crmHeaders, phases, type Business, type Prospect, type NextAction, localDate } from './assistant.ts';

export async function createWorkbook(business: Business, prospect?: Prospect, action?: NextAction, today = new Date()) {
  // Loaded only when the seller requests a spreadsheet.
  const ExcelJS = (await import('exceljs')).default;
  const book = new ExcelJS.Workbook();
  book.creator = 'VendeDOR'; book.created = today;
  const intro = book.addWorksheet('Empieza aquí');
  intro.columns = [{ width: 28 }, { width: 105 }];
  intro.addRows([
    ['Mi hoja de oportunidades', business.company], ['Qué vendo', business.product], ['A quién vendo', business.target],
    ['Moneda única', business.currency], ['Mi objetivo', business.objective],
    ['Cómo empezar', 'Abre Pipeline Principal y registra una oportunidad por fila. Los datos de ejemplo no se mezclan con tus clientes.'],
    ['Abrir en Google Sheets', 'En Google Sheets: Archivo → Importar → Subir → selecciona este archivo → Crear hoja de cálculo nueva.'],
    ['También puedes usar Excel', 'Abre este archivo y permite recalcular las fórmulas si tu aplicación lo solicita.'],
    ['Qué completar', 'Cliente, Valor si lo conoces, Fase, Probabilidad orientativa, Siguiente Acción y su fecha.'],
    ['ID de oportunidad', 'Usa D001, D002, D003… para relacionar cada cliente con su actividad. Mantén el ID cuando ordenes o cambies de fase.'],
    ['Probabilidad', 'Escribe 25 para 25%. Es una estimación; revísala al avanzar.'],
    ['Importes pendientes', 'Un valor vacío no entra en los totales; completa los importes pendientes antes de usar el forecast.'],
    ['Fecha Cambio Fase', 'Actualízala cuando cambies de fase para calcular Días en Fase.'],
    ['Dashboard', 'Resumen de hasta 500 oportunidades. Si superas esa cantidad, amplía fórmulas, filtros y validaciones.'],
    ['Datos y privacidad', 'Esta copia pertenece a tu cuenta. Comparte solo con personas autorizadas. No se sincroniza con la web.'],
    ['Seguimiento', 'Después de editar en Sheets, continúa allí: una nueva descarga desde la web no incluye cambios hechos en Google.'],
    ['Primera acción', 'Revisa el contenido de IA antes de contactar a nadie. El archivo no envía mensajes.'],
  ]);
  intro.getColumn(2).alignment = { wrapText: true, vertical: 'top' };
  intro.eachRow(row => { row.height = 36; });
  intro.getRow(1).font = { size: 18, bold: true, color: { argb: 'FF6D28D9' } };
  const sheet = book.addWorksheet('Pipeline Principal', { views: [{ state: 'frozen', ySplit: 1, xSplit: 3 }] });
  sheet.columns = crmHeaders.map((header, index) => ({ header, width: [1, 2, 13, 20].includes(index) ? 36 : 22 }));
  sheet.autoFilter = 'A1:X501';
  for (let row = 2; row <= 501; row++) {
    sheet.getCell(`M${row}`).value = { formula: `IF(OR(C${row}="",I${row}="Cerrado Ganado",I${row}="Cerrado Perdido",W${row}=""),"",TODAY()-W${row})` };
    sheet.getCell(`I${row}`).dataValidation = { type: 'list', allowBlank: true, formulae: [`"${phases.join(',')}"`], showErrorMessage: true, errorTitle: 'Elige una fase', error: 'Selecciona una fase de la lista.' };
    sheet.getCell(`R${row}`).dataValidation = { type: 'list', allowBlank: true, formulae: ['"Alta,Media,Baja"'], showErrorMessage: true, error: 'Elige Alta, Media o Baja.' };
    sheet.getCell(`J${row}`).dataValidation = { type: 'decimal', operator: 'between', allowBlank: true, formulae: [0, 100], showErrorMessage: true, error: 'Escribe un número entre 0 y 100.' };
    sheet.getCell(`Q${row}`).dataValidation = { type: 'whole', operator: 'between', allowBlank: true, formulae: [1, 10], showErrorMessage: true, error: 'Escribe un entero entre 1 y 10 o déjalo vacío.' };
    sheet.getCell(`H${row}`).dataValidation = { type: 'decimal', operator: 'greaterThanOrEqual', allowBlank: true, formulae: [0], showErrorMessage: true, error: 'Escribe un importe positivo o cero.' };
    sheet.getCell(`H${row}`).numFmt = '#,##0.00'; sheet.getCell(`J${row}`).numFmt = '0.##"%"';
    for (const col of ['K', 'L', 'O', 'W', 'X']) sheet.getCell(`${col}${row}`).numFmt = 'yyyy-mm-dd';
  }
  if (prospect?.company.trim()) {
    const day = new Date(`${localDate(today)}T00:00:00Z`);
    const cells: Record<string, string | number | Date> = {
      A2: 'D001', B2: `Oportunidad: ${prospect.company}`, C2: prospect.company, D2: business.sector,
      E2: prospect.contact, I2: prospect.phase, J2: Number(prospect.probability), K2: day, W2: day,
      N2: action?.description || '', P2: business.company, S2: 'Registro manual', U2: [prospect.need, action?.notes].filter(Boolean).join('\n'),
    };
    if (prospect.amount.trim() !== '') cells.H2 = Number(prospect.amount);
    if (action?.date) cells.O2 = new Date(`${action.date}T00:00:00Z`);
    if (prospect.phase.startsWith('Cerrado')) cells.X2 = day;
    for (const [address, value] of Object.entries(cells)) sheet.getCell(address).value = value;
  }
  const dashboard = book.addWorksheet('Dashboard');
  dashboard.columns = [{ header: `Resumen (${business.currency})`, width: 42 }, { header: 'Valor', width: 24 }];
  const range = (col: string) => `'Pipeline Principal'!${col}2:${col}501`;
  const open = (col: string) => `SUMIFS(${range(col)},${range('I')},"<>Cerrado Ganado",${range('I')},"<>Cerrado Perdido")`;
  const metrics = [
    ['Oportunidades abiertas', `COUNTIFS(${range('C')},"<>",${range('I')},"<>Cerrado Ganado",${range('I')},"<>Cerrado Perdido")`],
    ['Pipeline abierto', open('H')],
    ['Forecast ponderado abierto', `SUMPRODUCT((${range('I')}<>"Cerrado Ganado")*(${range('I')}<>"Cerrado Perdido")*${range('H')}*${range('J')})/100`],
    ['Ganado registrado', `SUMIF(${range('I')},"Cerrado Ganado",${range('H')})`],
    ['Tasa de cierre (%)', `IFERROR(COUNTIF(${range('I')},"Cerrado Ganado")/(COUNTIF(${range('I')},"Cerrado Ganado")+COUNTIF(${range('I')},"Cerrado Perdido"))*100,"Sin datos")`],
    ['Abiertas sin importe', `COUNTIFS(${range('C')},"<>",${range('I')},"<>Cerrado Ganado",${range('I')},"<>Cerrado Perdido",${range('H')},"=")`],
  ];
  metrics.forEach(([label, formula], i) => { dashboard.getCell(`A${i + 2}`).value = label; dashboard.getCell(`B${i + 2}`).value = { formula }; dashboard.getCell(`B${i + 2}`).numFmt = '0.##'; });
  dashboard.addRow(['Ámbito', 'Foto actual de hasta 500 oportunidades, no ventas exclusivas de la semana.']);
  dashboard.addRow(['Importes pendientes', 'Completa valores faltantes y revisa probabilidades antes de tomar decisiones.']);
  dashboard.getColumn(2).alignment = { wrapText: true };
  const activity = book.addWorksheet('Actividad');
  activity.columns = ['Fecha', 'Deal ID', 'Tipo', 'Resumen', 'Resultado', 'Siguiente Paso', 'Responsable'].map(header => ({ header, width: 26 }));
  for (const page of [sheet, dashboard, activity]) {
    page.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
    page.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF5B21B6' } };
    page.getRow(1).height = 32;
  }
  book.calcProperties.fullCalcOnLoad = true;
  return book.xlsx.writeBuffer();
}
