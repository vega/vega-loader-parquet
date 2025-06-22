import { parquetReadObjects } from 'hyparquet';

/**
 * Load a data set in Apache Parquet format for use in Vega.
 * @param {ArrayBuffer|Uint8Array} data Parquet binary data.
 * @returns {Promise<Record<string,any>[]>} A promise that resolves to an array of data objects representing
 *  rows of a data table.
 */
export default async function parquet(data) {
  const buffer = data instanceof Uint8Array ? data.buffer : data;
  return await parquetReadObjects({ file: buffer });
}

parquet.responseType = 'arrayBuffer';
