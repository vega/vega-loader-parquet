# vega-loader-parquet

Data loading for the [Apache Parquet](https://parquet.apache.org/) format.

This package extends Vega's set of data format parsers to support the type `"parquet"` in Vega version 5.0 and higher. It can load Parquet binary data using the [`hyparquet`](https://github.com/hyparam/hyparquet) library. Internally, this package uses hyparquet to parse Parquet files and provides the data in a format suitable for Vega visualizations.

You can try the Parquet loader in our Observable notebook examples on [Observable](https://observablehq.com/@vega/vega-lite-and-apache-parquet).

## Usage Instructions

### Browser Use

To use this package in a web application, include the compiled `vega-loader-parquet.min.js` JavaScript file as a script import on a web page.

Import the vega-loader-parquet package _after_ Vega has been imported. For example, loading all libraries from a CDN:

```html
  <script src="https://cdn.jsdelivr.net/npm/vega"></script>
  <script src="https://cdn.jsdelivr.net/npm/vega-loader-parquet"></script>
```

### Node.js or Bundle Use

In the web browser case above, the Parquet data reader is automatically added to the `vega.format` data format registry. If you are instead importing the `vega-loader-parquet` package in node.js or for use in an application bundle, you will need to explicitly register the package:

```js
import parquet from 'vega-loader-parquet';
import vega from 'vega';

// register parquet reader under type 'parquet'
formats('parquet', parquet);
```

### Vega Specifications

Once vega-loader-parquet has been imported and registered, Vega specs can reference and load Parquet data like so:

```json
{
  "data": [
    {
      "name": "data",
      "format": {"type": "parquet"},
      "url": "path/to/your/data.parquet"
    }
  ]
}
```

## API Reference

<a name="parquet" href="#parquet">#</a>
vega.format.<b>parquet</b>(<i>data</i>)
[<>](https://github.com/vega/vega-loader-parquet/blob/master/src/index.js "Source")

Returns an array of data objects for the input *data*. The *data* should be Parquet binary data as an `ArrayBuffer` or `Uint8Array`.

The returned data objects include properties for all named fields from the Parquet file, providing a JavaScript object representation suitable for use in Vega visualizations.

## Making a release

To make a release, tag a new version with `npm version XXX` and push the tag. GitHub actions will automatically make a release.
