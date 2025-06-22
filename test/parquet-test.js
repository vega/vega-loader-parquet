import { default as tape } from 'tape';
import { readFileSync } from 'fs';
import parquet from '../src/index.js';

tape('Parquet reader should read Parquet data', async test => {
  const { asyncBufferFromFile } = await import('hyparquet');
  
  const file = await asyncBufferFromFile('test/test_data.parquet');
  const data = await parquet(file);

  test.equal(data.length, 10, 'should have 10 rows');
  
  // Check that we have the expected fields
  const firstRow = data[0];
  test.ok('precipitation' in firstRow, 'should have precipitation field');
  test.ok('date' in firstRow, 'should have date field');
  
  // Check data types
  test.ok(typeof firstRow.precipitation === 'number', 'precipitation should be number');
  test.ok(firstRow.date instanceof Date, 'date should be Date object');
  
  // Check that all rows have the expected structure
  for (let i = 0; i < data.length; i++) {
    const row = data[i];
    test.ok(typeof row.precipitation === 'number', `row ${i} precipitation should be number`);
    test.ok(row.date instanceof Date, `row ${i} date should be Date object`);
  }

  test.end();
});

tape('Parquet reader should handle ArrayBuffer input', async test => {
  // Load file as raw ArrayBuffer (similar to how Vega would load it)
  const buffer = readFileSync('test/test_data.parquet');
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  const data = await parquet(arrayBuffer);
  
  test.equal(data.length, 10, 'should handle raw ArrayBuffer input');
  test.end();
});

tape('Parquet reader should handle Uint8Array input', async test => {
  // Load file as Uint8Array
  const buffer = readFileSync('test/test_data.parquet');
  const uint8Array = new Uint8Array(buffer);
  const data = await parquet(uint8Array);
  
  test.equal(data.length, 10, 'should handle Uint8Array input');
  test.end();
});

tape('Parquet reader should handle empty buffer gracefully', async test => {
  try {
    const emptyBuffer = new ArrayBuffer(0);
    await parquet(emptyBuffer);
    test.fail('Should have thrown an error for empty buffer');
  } catch (error) {
    test.ok(error instanceof Error, 'Should throw an error for invalid parquet data');
  }
  
  test.end();
});

tape('Parquet reader should have correct responseType', test => {
  test.equal(parquet.responseType, 'arrayBuffer', 'responseType should be arrayBuffer');
  test.end();
});