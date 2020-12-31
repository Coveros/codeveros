import * as fs from 'fs';
import { safeLoad } from 'js-yaml';
import * as path from 'path';

const defaultPaths = [path.resolve('swagger.yaml'), path.resolve('swagger.json')];

async function readFile(specPath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    fs.readFile(specPath, 'utf8', (err, data) => {
      return err ? reject(err) : resolve(data);
    });
  });
}

export async function getApiSpec(definedPath: string | null = null): Promise<string | object | undefined> {
  const specPaths = definedPath ? [definedPath, ...defaultPaths] : defaultPaths;
  for (const specPath of specPaths) {
    try {
      const specFile = await readFile(specPath);
      return safeLoad(specFile);
    } catch (e) {
      // swallow error, attempt next file
    }
  }
  throw new Error('Failed to load api specification');
}
