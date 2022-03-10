import 'dotenv/config';
import { InfluxDB, Point } from "@influxdata/influxdb-client";

const { INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET, } = process.env;

if (!INFLUX_URL || !INFLUX_TOKEN || !INFLUX_ORG || !INFLUX_BUCKET) {
  process.stderr.write("Missing one or more environment values: INFLUX_URL, INFLUX_TOKEN, INFLUX_ORG, INFLUX_BUCKET\n")
  process.exit(1);
}

const db = new InfluxDB({ token: INFLUX_TOKEN, url: INFLUX_URL });

const writeApi = db.getWriteApi(INFLUX_ORG, INFLUX_BUCKET, 'ns');

const point1 = new Point('temperature')
  .tag('sensor', 'example temp sensor tag')
  .floatField('value', 20 + Math.round(100 * Math.random()) / 10)
  .timestamp(new Date()) 

console.log(`writing point: ${point1.toLineProtocol()}`);

writeApi.writePoint(point1);

writeApi.close();
