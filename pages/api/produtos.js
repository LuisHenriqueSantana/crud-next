import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data.json');

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      res.status(200).json(data);
      break;
    
    case 'POST':
      const newData = req.body;
      const currentData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      currentData.push(newData);
      fs.writeFileSync(filePath, JSON.stringify(currentData, null, 2));
      res.status(201).json(newData);
      break;

    case 'PUT':
      const { id, updatedData } = req.body;
      const updatedProducts = JSON.parse(fs.readFileSync(filePath, 'utf-8')).map(product => 
        product.id === id ? { ...product, ...updatedData } : product
      );
      fs.writeFileSync(filePath, JSON.stringify(updatedProducts, null, 2));
      res.status(200).json(updatedData);
      break;

    case 'DELETE':
      const { deleteId } = req.body;
      const filteredProducts = JSON.parse(fs.readFileSync(filePath, 'utf-8')).filter(product => product.id !== deleteId);
      fs.writeFileSync(filePath, JSON.stringify(filteredProducts, null, 2));
      res.status(204).end();
      break;

    default:
      res.status(405).end();
      break;
  }
}
