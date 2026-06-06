# ============================================================
#  Cell World - Phones Page : Step 1 (Availability Pass)
#  - Marks all phones "Back Soon" EXCEPT the in-stock set
#  - Restores Lenovo laptop to "In Stock"
#  Surgical (per-id), with timestamped backup, verification,
#  and AUTO-ROLLBACK if anything looks wrong.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\step1-phones-availability.ps1"
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
$opts    = [System.Text.RegularExpressions.RegexOptions]::Singleline

# ---------- Helper ----------
function Get-State([string]$id) {
    $m = [regex]::Match($content, "id:\s*'$id'.*?(availability:\s*'[^']+'|inStock:\s*'?true'?)", $opts)
    if ($m.Success) { return $m.Groups[1].Value } else { return 'NOT FOUND' }
}

# ---------- 1) availability 'In Stock' -> 'Back Soon' ----------
$flip = @('samsung-galaxy-a05','samsung-galaxy-a11','logic-z1l','nokia-110',
          'zteblade-a72s','samsung-a25','samsung-a05s','samsung-a26',
          'samsung-a05','samsung-a26-mint','samsung-a26-white')
foreach ($id in $flip) {
    $find = "(id:\s*'$id'.*?availability:\s*')In Stock(')"
    $content = [regex]::Replace($content, $find, '${1}Back Soon${2}', $opts)
}

# ---------- 2) inStock:true (no availability) -> availability 'Back Soon' ----------
$convert = @('blu-a140','iphone-12','iphone-13-pro-max','iphone-14',
             'samsung-galaxy-a36','samsung-galaxy-a56')
foreach ($id in $convert) {
    $find = "(id:\s*'$id'.*?)inStock:\s*'?true'?,"
    $content = [regex]::Replace($content, $find, '${1}availability: ''Back Soon'',', $opts)
}

# ---------- 3) Lenovo: 'Back Soon' -> 'In Stock' ----------
$content = [regex]::Replace($content,
    "(id:\s*'lenovo-laptop'.*?availability:\s*')Back Soon(')",
    '${1}In Stock${2}', $opts)

# ---------- Verify ----------
$backSoon = ([regex]::Matches($content, "availability:\s*'Back Soon'")).Count
$inStock  = ([regex]::Matches($content, "availability:\s*'In Stock'")).Count

$keepInStock = @('samsung-a06','samsung-a16','itel-a90','ipad-9th-gen','fangor-tablet','lenovo-laptop')
$problems = @()

if ($backSoon -ne 19) { $problems += "Expected 19 'Back Soon', found $backSoon" }
if ($inStock  -ne 6 ) { $problems += "Expected 6 'In Stock', found $inStock" }
foreach ($id in $keepInStock) {
    if ((Get-State $id) -ne "availability: 'In Stock'") { $problems += "$id should be In Stock but is: $(Get-State $id)" }
}
if ((Get-State 'samsung-galaxy-a17') -notmatch "inStock") { $problems += "samsung-galaxy-a17 changed unexpectedly: $(Get-State 'samsung-galaxy-a17')" }
foreach ($id in @('samsung-f05','samsung-a15')) {
    if ((Get-State $id) -ne "availability: 'Back Soon'") { $problems += "$id should stay Back Soon but is: $(Get-State $id)" }
}

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

# ---------- Write (UTF-8, no BOM; line endings preserved) ----------
$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

# ---------- Post-write confirmation ----------
$after     = [System.IO.File]::ReadAllText($file)
$afterBack = ([regex]::Matches($after, "availability:\s*'Back Soon'")).Count
$afterIn   = ([regex]::Matches($after, "availability:\s*'In Stock'")).Count

Write-Host "SUCCESS" -ForegroundColor Green
Write-Host "  Back Soon : $afterBack" -ForegroundColor Yellow
Write-Host "  In Stock  : $afterIn"  -ForegroundColor Green
Write-Host "  In stock kept: A06, A16, A17, iPad, FANGOR, itel-a90, Lenovo (restored)" -ForegroundColor Green
Write-Host "`nIf anything looks off, roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
