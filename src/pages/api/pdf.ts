import type { NextApiRequest, NextApiResponse } from "next";
import { mdToPdf } from "md-to-pdf";
import * as fs from "fs/promises";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;

  if (method === "POST") {
    const fileName = req.body.fileName;
    const content = req.body.data;
    console.log(content)
    if (content) {
      const pdf = await mdToPdf({ content: content });
      const pdfBuffer = pdf.content;
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader("Content-Disposition", `attachment; filename=${fileName}.pdf`);
      res.status(200).send(pdfBuffer);
    } else {
      res.status(401);
    }
  }
}
