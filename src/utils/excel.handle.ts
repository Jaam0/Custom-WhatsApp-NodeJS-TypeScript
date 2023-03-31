import excelJS from 'exceljs';
import Path from 'path';
import { DropStrEnd } from './others.handle';
import { Extensions } from '../enums/extension.enum';

export const createExcel = async (
  from: string,
  name: string,
  msj: string,
  date: string,
  status: string
) => {
  const { ext } = DropStrEnd(from);

  if (ext !== Extensions.contact) {
    return false;
  }
  const path = Path.join(__dirname, '../', `records/${from}.xlsx`);
  const dateAndTime: Date = new Date();
  let sheet;
  const columsSheet = [
    { header: 'Phone', key: 'phone', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Message', key: 'message', width: 60 },
    { header: 'Date', key: 'date', width: 12 },
  ];

  const workbook = new excelJS.Workbook();
  workbook.creator = 'Me';
  sheet = workbook.addWorksheet('Chat', {
    properties: { tabColor: { argb: '25D366' } },
  });
  sheet.columns = columsSheet;
  sheet.addRow([from, name, msj, dateAndTime]);
  await workbook.xlsx
    .writeFile(path)
    .then(() => {
      console.log('Chat record saved');
    })
    .catch((e) => {
      console.log(`Error saving chat:${e}`);
    });
};
