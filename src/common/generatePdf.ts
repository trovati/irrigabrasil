import puppeteer from 'puppeteer';
import * as fs from 'fs';
import * as path from 'path';
import { TemplateData } from './interface/pdfData.interface';
import Handlebars from 'handlebars';

// Função que carrega o HTML e substitui os placeholders {{chave}}
function renderTemplateWithHandlebars(templatePath: string, data: any) {
  const html = fs.readFileSync(templatePath, 'utf-8');
  const template = Handlebars.compile(html);
  return template(data);
}

// ✅ Função que recebe os dados e gera o PDF
export async function generatePDF(data: TemplateData) {
  const templatePath = path.join(__dirname, '../../src/common/template.html');
  const htmlContent = renderTemplateWithHandlebars(templatePath, {
    ClientName: data.client.name,
    Address: data.client.endereco,
    City: data.client.cidade,
    CEP: data.client.cep,
    IE: data.client.ie,
    CNPJ: data.client.cnpj,
    requestProtocol: data.requestProtocol,
    Products: data.produtos,
    dateRequest: data.dateRequest,
    Bairro: data.client.bairro,
    Total: data.totalRequest,
    payment: data.payment,
  });

  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '20mm', bottom: '20mm' },
  });

  await browser.close();

  // Cria a pasta 'output' se não existir
  const outputDir = path.resolve(process.cwd(), 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  // Define o nome do arquivo, ex: pedido-123.pdf
  const filename = `pedido-${data.requestProtocol || Date.now()}.pdf`;
  const outputPath = path.join(outputDir, filename);

  // Salva o PDF
  fs.writeFileSync(outputPath, pdfBuffer);

  console.log(`✅ PDF salvo em: ${outputPath}`);
  return pdfBuffer; // ainda retorna se quiser enviar por e-mail ou baixar via HTTP
}
