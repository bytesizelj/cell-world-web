# add-keyboards.ps1
# Adds 2 new keyboard products to:
#  - app/Categories/accessories-power/page.tsx (customer-facing display)
#  - lib/cellyRules.ts (Celly's CATALOG)

$ErrorActionPreference = "Stop"

$pageFile  = "C:\Users\ictcl\Projects\cell-world-web\app\Categories\accessories-power\page.tsx"
$cellyFile = "C:\Users\ictcl\Projects\cell-world-web\lib\cellyRules.ts"

foreach ($f in @($pageFile, $cellyFile)) {
    if (-not (Test-Path $f)) {
        Write-Host "ERROR: File not found at $f" -ForegroundColor Red
        exit 1
    }
}

$timestamp = Get-Date -Format "yyyyMMdd-HHmmss"

# ---------- BACKUPS ----------
$pageBackup  = "$pageFile.bak-$timestamp"
$cellyBackup = "$cellyFile.bak-$timestamp"
Copy-Item $pageFile $pageBackup
Copy-Item $cellyFile $cellyBackup
Write-Host "Backups created:" -ForegroundColor Cyan
Write-Host "  $pageBackup"
Write-Host "  $cellyBackup"

# ============================================================
# 1) PAGE.TSX - insert 2 product cards after the last SENIMO keyboard entry
# ============================================================
$pageContent = Get-Content -Path $pageFile -Raw
$pageContent = $pageContent -replace "`r`n", "`n"

$pageAnchor = @'
  tags: ['senimo', 'wireless', 'keyboard', 'mouse', 'bluetooth', 'combo', 'green', 'white']
},
// SELFIE Sticks
'@

$pageNew = @'
  tags: ['senimo', 'wireless', 'keyboard', 'mouse', 'bluetooth', 'combo', 'green', 'white']
},
{
  id: 'usb-keyboard',
  name: 'USB Keyboard',
  image: '/images/Products/accessories-power/usb-keyboard.png',
  price: 40.00,
  category: 'keyboards',
  availability: 'In Stock',
  specs: {
    connectivity: 'USB Wired',
    type: 'Standard Keyboard'
  }
},
{
  id: 'nipponamerica-wireless-keyboard-mouse-combo',
  name: 'Nipponamerica Wireless Keyboard & Mouse Combo',
  image: '/images/Products/accessories-power/nipponamerica-wireless-keyboard-mouse-combo.png',
  price: 150.00,
  category: 'keyboards',
  availability: 'In Stock',
  specs: {
    connectivity: 'Wireless',
    combo: 'Keyboard + Mouse included'
  }
},
// SELFIE Sticks
'@

$pageAnchor = $pageAnchor -replace "`r`n", "`n"
$pageNew    = $pageNew -replace "`r`n", "`n"

$pageAnchorCount = ([regex]::Matches($pageContent, [regex]::Escape($pageAnchor))).Count
if ($pageAnchorCount -ne 1) {
    Write-Host "ERROR: page.tsx anchor matched $pageAnchorCount times (expected 1). No changes written to page.tsx." -ForegroundColor Red
    exit 1
}
$pageContent = $pageContent.Replace($pageAnchor, $pageNew)

# ============================================================
# 2) CELLYRULES.TS - insert matching CATALOG entries after the SENIMO line
# ============================================================
$cellyContent = Get-Content -Path $cellyFile -Raw
$cellyContent = $cellyContent -replace "`r`n", "`n"

$cellyAnchor = "{ n: 'SENIMO Wireless Keyboard & Mouse Combo (several colours)', p: 90, c: 'keyboards' },"
$cellyNew = @"
{ n: 'SENIMO Wireless Keyboard & Mouse Combo (several colours)', p: 90, c: 'keyboards' },
  { n: 'USB Keyboard', p: 40, c: 'keyboards' },
  { n: 'Nipponamerica Wireless Keyboard & Mouse Combo', p: 150, c: 'keyboards' },
"@
$cellyNew = $cellyNew -replace "`r`n", "`n"

$cellyAnchorCount = ([regex]::Matches($cellyContent, [regex]::Escape($cellyAnchor))).Count
if ($cellyAnchorCount -ne 1) {
    Write-Host "ERROR: cellyRules.ts anchor matched $cellyAnchorCount times (expected 1). No changes written to cellyRules.ts." -ForegroundColor Red
    exit 1
}
$cellyContent = $cellyContent.Replace($cellyAnchor, $cellyNew)

# ============================================================
# WRITE BOTH FILES - LF endings, UTF-8 no BOM
# ============================================================
$utf8NoBom = New-Object System.Text.UTF8Encoding $false

$pageContent = $pageContent -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($pageFile, $pageContent, $utf8NoBom)

$cellyContent = $cellyContent -replace "`r`n", "`n"
[System.IO.File]::WriteAllText($cellyFile, $cellyContent, $utf8NoBom)

# ============================================================
# VERIFICATION
# ============================================================
$verifyPage  = Get-Content -Path $pageFile -Raw
$verifyCelly = Get-Content -Path $cellyFile -Raw

Write-Host ""
Write-Host "=== VERIFICATION: page.tsx ===" -ForegroundColor Green
foreach ($id in @('usb-keyboard', 'nipponamerica-wireless-keyboard-mouse-combo')) {
    if ($verifyPage -match [regex]::Escape("id: '$id'")) { Write-Host "  OK       $id" -ForegroundColor Green }
    else { Write-Host "  MISSING  $id" -ForegroundColor Red }
}

Write-Host ""
Write-Host "=== VERIFICATION: cellyRules.ts ===" -ForegroundColor Green
foreach ($name in @('USB Keyboard', 'Nipponamerica Wireless Keyboard & Mouse Combo')) {
    if ($verifyCelly -match [regex]::Escape("n: '$name'")) { Write-Host "  OK       $name" -ForegroundColor Green }
    else { Write-Host "  MISSING  $name" -ForegroundColor Red }
}

Write-Host ""
Write-Host "Rollback commands if needed:" -ForegroundColor Cyan
Write-Host "Copy-Item `"$pageBackup`" `"$pageFile`" -Force"
Write-Host "Copy-Item `"$cellyBackup`" `"$cellyFile`" -Force"
