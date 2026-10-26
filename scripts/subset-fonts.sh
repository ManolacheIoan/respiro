#!/bin/sh
# Reduce fișierele „latin-ext” la diacriticele românești (+ câteva litere europene uzuale),
# ca să fie mici și să poată fi preîncărcate. Necesită fonttools: pip install fonttools brotli
# Sursa: pachetele @fontsource-variable din node_modules.
set -e
RANGES="U+0102-0103,U+0218-021B,U+015E-015F,U+0162-0163,U+0100-0101,U+0106-010D,U+0118-011B,U+0141-0144,U+0150-0153,U+0158-0161,U+0170-0171,U+0179-017E"
CG=node_modules/@fontsource-variable/cormorant-garamond/files
SS=node_modules/@fontsource-variable/source-sans-3/files
sub() {
  pyftsubset "$1" --unicodes="$RANGES" --flavor=woff2 --layout-features='*' --output-file="$2"
}
sub "$CG/cormorant-garamond-latin-ext-wght-normal.woff2" app/fonts/cormorant-garamond-ro-wght-normal.woff2
sub "$CG/cormorant-garamond-latin-ext-wght-italic.woff2" app/fonts/cormorant-garamond-ro-wght-italic.woff2
sub "$SS/source-sans-3-latin-ext-wght-normal.woff2" app/fonts/source-sans-3-ro-wght-normal.woff2
ls -l app/fonts/*-ro-*.woff2
