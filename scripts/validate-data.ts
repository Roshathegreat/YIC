import { COUNTRY_IDS, getCountry } from "../lib/db";

let failed = 0;
for (const id of COUNTRY_IDS) {
  try {
    const c = getCountry(id);
    console.log(
      `ok  data/countries/${id}.json  (${c.lobsterBriefs.length} lobster briefs cross-checked)`,
    );
  } catch (err) {
    failed += 1;
    console.error(`FAIL data/countries/${id}.json`);
    console.error(err instanceof Error ? err.message : err);
  }
}

if (failed > 0) {
  console.error(`\n${failed} file(s) failed validation`);
  process.exit(1);
}
console.log("\nAll country data valid.");
