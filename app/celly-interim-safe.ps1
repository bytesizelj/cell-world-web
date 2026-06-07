# ============================================================
#  Cell World - Celly INTERIM safe-mode patch (no API key needed)
#  Keeps only the known-correct deterministic answers (hours,
#  services, contact, greetings) and routes everything about
#  products / prices / stock to an honest store handoff, so
#  Celly can't quote stale or wrong info. Also fixes the
#  "yes" -> product-search bug.
#  Fully reversible; the AI hybrid rewire will supersede this.
#  Backup + idempotency + verify + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\celly-interim-safe.ps1"
# ============================================================

$ErrorActionPreference = 'Stop'
$file = 'C:\Users\ictcl\Projects\cell-world-web\components\CellyAssistant.tsx'

if (-not (Test-Path -LiteralPath $file)) {
    Write-Host "ERROR: File not found:`n  $file" -ForegroundColor Red
    exit 1
}

$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "$file.bak-$stamp"
Copy-Item -LiteralPath $file -Destination $backup -Force
Write-Host "Backup created:`n  $backup`n" -ForegroundColor Cyan

$content = [System.IO.File]::ReadAllText($file)

if ($content.Contains('SAFE_INTENTS')) {
    Write-Host "Interim safe-mode already applied - nothing to do." -ForegroundColor DarkYellow
    Remove-Item -LiteralPath $backup -Force
    exit 0
}

$anchor = 'const lowerInput = input.toLowerCase();'
if (([regex]::Matches($content, [regex]::Escape($anchor))).Count -ne 1) {
    Write-Host "ABORT: anchor not found exactly once. No changes made." -ForegroundColor Red
    Copy-Item -LiteralPath $backup -Destination $file -Force
    exit 1
}

$guard = @'

  // INTERIM (until the AI hybrid is live): only return the deterministic answers
  // that are known-correct. Hand everything product/price/stock-related off to the
  // store so Celly never quotes stale or wrong info.
  const SAFE_INTENTS = ['STORE_HOURS','SUNDAY_HOURS','OPENING_TIME','CLOSING_TIME','SERVICES','CONTACT','GREETING','THANKS','UNLOCKED_INFO','DELIVERY_INFO'];
  if (!SAFE_INTENTS.includes(intent)) {
    if (/^(yes|yeah|yep|ok|okay|sure|no|nope)\b/i.test(input.trim())) {
      return "Got it! I can help with our store hours, services or location \u2014 or connect you with the store about a product. What would you like?";
    }
    return "For current products, prices and stock it's best to check with the store directly \u2014 stock moves fast.\n\n\ud83d\udcf1 WhatsApp: 1-784-431-0777\n\ud83d\udcde Call: 1-784-451-2261\n\ud83d\udccd Visit us in Kingstown\n\nI can also tell you our opening hours, services or location anytime!";
  }
'@

$content = $content.Replace($anchor, $anchor + $guard)

# ---------- Verify ----------
$problems = @()
if (-not $content.Contains('SAFE_INTENTS')) { $problems += "guard not inserted" }
if (-not $content.Contains('WhatsApp: 1-784-431-0777')) { $problems += "handoff message missing" }
if (-not $content.Contains('switch (intent)')) { $problems += "switch block unexpectedly missing" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "SUCCESS - Celly is now in honest safe-mode" -ForegroundColor Green
Write-Host "  Keeps: hours, services, contact, location, greetings." -ForegroundColor Green
Write-Host "  Products/prices/stock + stray inputs -> store handoff." -ForegroundColor Green
Write-Host "`nTo undo (e.g. once the hybrid is in), roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
