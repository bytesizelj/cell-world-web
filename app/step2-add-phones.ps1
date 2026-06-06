# ============================================================
#  Cell World - Phones Page : Step 2 (Add 3 New Phones)
#  Inserts itel A100C, Samsung A07, Samsung A42 5G as
#  In-Stock entries at the top of the products array.
#  Backup + idempotency guard + verification + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\step2-add-phones.ps1"
# ============================================================

$ErrorActionPreference = 'Stop'
$file = 'C:\Users\ictcl\Projects\cell-world-web\app\Categories\phones\page.tsx'

if (-not (Test-Path -LiteralPath $file)) {
    Write-Host "ERROR: File not found:`n  $file" -ForegroundColor Red
    exit 1
}

# ---------- Backup ----------
$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "$file.bak-$stamp"
Copy-Item -LiteralPath $file -Destination $backup -Force
Write-Host "Backup created:`n  $backup`n" -ForegroundColor Cyan

# ---------- Read ----------
$content = [System.IO.File]::ReadAllText($file)

# ---------- Idempotency guard ----------
$newIds = @('itel-a100c','samsung-a07','samsung-a42')
foreach ($id in $newIds) {
    if ($content -match "id:\s*'$id'") {
        Write-Host "ABORT: '$id' already exists in the file. No changes made." -ForegroundColor Red
        Remove-Item -LiteralPath $backup -Force
        exit 1
    }
}

$beforeIn = ([regex]::Matches($content, "availability:\s*'In Stock'")).Count

# ---------- New entries ----------
$newEntries = @'
    { 
      id: 'itel-a100c', 
      name: 'itel A100C', 
      image: '/images/Products/phones/itel-a100c.png',
      price: 440.00,
      category: 'budget',
      availability: 'In Stock',
      specs: {
        display: '6.6" 90Hz Super Clear Display',
        ram: '8GB RAM (3GB + 5GB Extended)',
        storage: '64GB ROM',
        audio: 'DTS Audio',
        durability: 'MIL-STD 810H Certified'
      }
    },
    { 
      id: 'samsung-a07', 
      name: 'Samsung A07', 
      image: '/images/Products/phones/samsung-a07.png',
      price: 499.00,
      category: 'budget',
      availability: 'In Stock',
      specs: {
        display: '6.7" HD+ 90Hz Display',
        mainCamera: '50MP Main Camera',
        selfieCamera: '8MP Front Camera',
        battery: '5000mAh Battery',
        charging: '25W Fast Charging',
        storage: '64GB ROM'
      }
    },
    { 
      id: 'samsung-a42', 
      name: 'Samsung A42 5G', 
      image: '/images/Products/phones/samsung-a42.png',
      price: 720.00,
      category: 'midrange',
      availability: 'In Stock',
      color: 'Black',
      specs: {
        display: '6.6" HD+ Super AMOLED',
        network: '5G',
        mainCamera: '48MP Quad Camera',
        selfieCamera: '20MP Front Camera',
        battery: '5000mAh Battery',
        charging: '15W Fast Charging',
        storage: '128GB ROM'
      }
    },
'@

# ---------- Insert at top of products array ----------
$anchor = 'const products = ['
if (-not $content.Contains($anchor)) {
    Write-Host "ABORT: could not find the products array anchor. No changes made." -ForegroundColor Red
    Copy-Item -LiteralPath $backup -Destination $file -Force
    exit 1
}
$content = $content.Replace($anchor, $anchor + "`n" + $newEntries)

# ---------- Verify ----------
$afterIn  = ([regex]::Matches($content, "availability:\s*'In Stock'")).Count
$problems = @()
if ($afterIn -ne ($beforeIn + 3)) { $problems += "In Stock should be $($beforeIn + 3), found $afterIn" }
foreach ($id in $newIds) {
    $c = ([regex]::Matches($content, "id:\s*'$id'")).Count
    if ($c -ne 1) { $problems += "$id appears $c time(s), expected 1" }
}
$open = ([regex]::Matches($newEntries, '\{')).Count
$close = ([regex]::Matches($newEntries, '\}')).Count
if ($open -ne $close) { $problems += "brace mismatch in new block ($open vs $close)" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

# ---------- Write (UTF-8, no BOM) ----------
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "SUCCESS - 3 phones added (In Stock):" -ForegroundColor Green
Write-Host "  itel A100C  `$440" -ForegroundColor Green
Write-Host "  Samsung A07 `$499" -ForegroundColor Green
Write-Host "  Samsung A42 5G `$720 (Black)" -ForegroundColor Green
Write-Host "  In Stock total now: $afterIn" -ForegroundColor Green
Write-Host "`nIf anything looks off, roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
