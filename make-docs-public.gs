/**
 * Sets each listed Google Doc to "Anyone with the link → Viewer".
 *
 * HOW TO RUN:
 *  1. Go to https://script.google.com  →  New project
 *  2. Delete the default code, paste this whole file in
 *  3. Click Run (▶). First run: authorize when prompted (it's your own account)
 *  4. Check the Execution log (View → Logs) for the ✓ / ✗ results
 *
 * Only the 18 docs that were still private are listed here.
 */

const DOCS = [
  { name: "Likutei Torah — Vayikra",                     id: "1S86-gOulzJL6zukOsgr1UIxtwj8XKALLk8mCYRVPDGI" },
  { name: "Likutei Torah — Bamidbar",                    id: "15KvTzZNY7g4zFbjKU1lyErW_zBwxegf2kVtSEUfVPZY" },
  { name: "Imrei Bina / Kuntreisim — Mittler Rebbe",     id: "1U_BzxBt6FI40BeshRO5nHOgCHU7vv-tYAiTsDKbsk3U" },
  { name: "Rav Mottel — Tanya 1–34",                     id: "1riagnadhd9wc12rhvsTD7d3vIOjV8Ymam3WuZCGmHR0" },
  { name: "Rav Mottel — Tanya 35–53",                    id: "1wTIR_zhtRmfZcaor74-leEhyLr7boowP4zCeL229Nns" },
  { name: "Shaarei Orah — Mittler Rebbe",                id: "1lgREcLjqjv7P4tDCFeWmwk6IK7ur4x7u8avjwucsWKU" },
  { name: "Shaarei Orah — Mittler Rebbe (Chanuka/Purim)",id: "1YJBmHDHxR4fUajiRoSWxDCNnMjQQ_PKZDMx7xiPCeP0" },
  { name: "Derech Mitzvosecha 1",                        id: "133oLfFYEwCCOI6oVuqu4EJkgRZTj3AEkz5dF8Rwp__Q" },
  { name: "Otzer HaMaggid — Introduction",               id: "13bBoxCCGF2cCl0bfyRkVyiER6v2lviXCTcMrMvG7x4M" },
  { name: "שער הקריאת שמע",                              id: "1zyi8rg7RFCWMJyFObJIIV1Lzb9GhMqHNaSQ1tT0l5A0" },
  { name: "Byam Darkecha — Purim (Sod)",                 id: "1p_n-DbcRtH8WNnbIxknX7Es_djszaDHu8DP33gvy7yI" },
  { name: "Byam Darkecha — Purim (Pshat)",               id: "1YGuZJbGeUCmUnc0_dipdmkZwpGvcGvfP5ytE_z2P2iM" },
  { name: "Byam Darkecha — Pesach (Sod)",                id: "12O5YvZ0BDk3dzZYnJ4OYQaBb5iiOrXrGO26kbPl-6s8" },
  { name: "Byam Darkecha — Chanuka (Shaar HaKavvanos)",  id: "1d8b4WpviOKVyfpdDwJdfZh6tIPiAydkmyNPtNcrkx80" },
  { name: "Byam Darkecha — Dveikus",                     id: "1sjg5cWW75zBNtoggDPu8OWqxKlGjvA5lT7l72eUuY1U" },
  { name: "Rav Mottel — Remazim Vayikra–Devarim",        id: "1ojzwplgprOxBYnCClK1YyFhJuEiMJJzSs1Ffbs8_RYY" },
  { name: "Alter Rebbe — Stories",                       id: "1rH693E3eUpH6ZdVVGDYrv6oprPIgstceyRmppAbIOTw" },
  { name: "The Path of Yichudim",                        id: "1OxyctCd91jLk66KtFwidolFqRmmjSptpypqGBFJDKIk" },
];

function makeDocsPublic() {
  let ok = 0, fail = 0;
  DOCS.forEach(function (doc) {
    try {
      DriveApp.getFileById(doc.id)
        .setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      Logger.log("✓ " + doc.name);
      ok++;
    } catch (e) {
      Logger.log("✗ " + doc.name + "  —  " + e.message);
      fail++;
    }
  });
  Logger.log("Done. " + ok + " updated, " + fail + " failed.");
}
