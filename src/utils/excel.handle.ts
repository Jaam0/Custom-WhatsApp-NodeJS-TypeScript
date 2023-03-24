import excelJS from 'exceljs';
import moment from 'moment';
import fs from 'fs';
import Path from 'path';
import { DropStrEnd } from './others.handle';
import { Extensions } from '../enums/extension.enum';

export const createExcel = async (from: string, name: string, msj: string) => {
  const { ext } = DropStrEnd(from);

  if (ext !== Extensions.contact) {
    return false;
  }
  const path = Path.join(__dirname, '../', `records/${from}.xlsx`);
  const dateAndTime: string = moment().format('DD-MM-YYYY hh:mm');
  let sheet;
  const columsSheet = [
    { header: 'Phone', key: 'phone', width: 10 },
    { header: 'Name', key: 'name', width: 32 },
    { header: 'Message', key: 'message', width: 60 },
    { header: 'Date', key: 'date', width: 12 },
  ];

  const workbook = new excelJS.Workbook();
  workbook.creator = 'Me';

  if (fs.existsSync(path)) {
    workbook.xlsx.readFile(path).then(() => {
      const worksheet = workbook.getWorksheet(1);
      const lastRow: any = worksheet.lastRow;
      let getRowInsert = worksheet.getRow(++lastRow._number);
      getRowInsert.getCell('A').value = from;
      getRowInsert.getCell('B').value = name;
      getRowInsert.getCell('C').value = msj;
      getRowInsert.getCell('D').value = dateAndTime;
      getRowInsert.commit();

      workbook.xlsx
        .writeFile(path)
        .then(() => {
          console.log(`Row added into the records of ${from}`);
        })
        .catch((err) =>
          console.log(`Something happened saving into the records of ${from} - Error: ${err}`)
        );
    });
  } else {
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
  }
};
