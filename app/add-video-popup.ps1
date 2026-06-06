# ============================================================
#  Cell World - Homepage : Add Video Promo Pop-up
#  Adds a single rotating modal with 2 video slides:
#    - ear-buds-promo.mp4   (earbuds)
#    - gaming-kit.mp4       (keyboard)
#  Each has a SHOP NOW button -> /Categories/tech-audio
#  Old banner is left dormant (already disabled).
#  Backup + idempotency guard + verification + AUTO-ROLLBACK.
#  Run:
#    powershell -ExecutionPolicy Bypass -File "C:\Users\ictcl\Projects\cell-world-web\app\add-video-popup.ps1"
# ============================================================

$ErrorActionPreference = 'Stop'
$file = 'C:\Users\ictcl\Projects\cell-world-web\app\page.tsx'

if (-not (Test-Path -LiteralPath $file)) {
    Write-Host "ERROR: File not found:`n  $file" -ForegroundColor Red
    exit 1
}

$stamp  = Get-Date -Format 'yyyyMMdd-HHmmss'
$backup = "$file.bak-$stamp"
Copy-Item -LiteralPath $file -Destination $backup -Force
Write-Host "Backup created:`n  $backup`n" -ForegroundColor Cyan

$content = [System.IO.File]::ReadAllText($file)

# ---------- Idempotency ----------
if ($content.Contains('showVideoPopup')) {
    Write-Host "ABORT: video pop-up already present. No changes made." -ForegroundColor Red
    Remove-Item -LiteralPath $backup -Force
    exit 1
}

# ---------- 1) State ----------
$stateAnchor = '  const [cellyMounted, setCellyMounted] = useState(false);'
$stateInsert = @'
  const [showVideoPopup, setShowVideoPopup] = useState(false);
  const [videoSlide, setVideoSlide] = useState(0);
'@
if (-not $content.Contains($stateAnchor)) { Write-Host "ABORT: state anchor not found." -ForegroundColor Red; Copy-Item $backup $file -Force; exit 1 }
$content = $content.Replace($stateAnchor, $stateAnchor + "`n" + $stateInsert)

# ---------- 2) Timers (show + rotate) ----------
$fxAnchor = '  // Auto-rotate hot deals banner every 5 seconds'
$fxInsert = @'
  // Video promo pop-up: show after 3s, then rotate the 2 promo videos
  useEffect(() => {
    const showTimer = setTimeout(() => setShowVideoPopup(true), 3000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (!showVideoPopup) return;
    const rot = setInterval(() => setVideoSlide((p) => (p + 1) % 2), 6000);
    return () => clearInterval(rot);
  }, [showVideoPopup]);
'@
if (-not $content.Contains($fxAnchor)) { Write-Host "ABORT: effects anchor not found." -ForegroundColor Red; Copy-Item $backup $file -Force; exit 1 }
$content = $content.Replace($fxAnchor, $fxInsert + "`n`n" + $fxAnchor)

# ---------- 3) Modal JSX ----------
$jsxAnchor = '{/* AUTO-ROTATING HOT DEALS BANNER - 3 SLIDES */}'
$jsxInsert = @'
        {/* ===== VIDEO PROMO POP-UP (earbuds + keyboard) ===== */}
        {showVideoPopup && (
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center animate-fade-in"
            onClick={() => setShowVideoPopup(false)}
            style={{
              background: 'radial-gradient(circle at center, rgba(0,0,0,0.85), rgba(0,0,0,0.95))',
              backdropFilter: 'blur(10px)'
            }}
          >
            <div className="max-w-3xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-black">
                <button
                  onClick={() => setShowVideoPopup(false)}
                  className="absolute top-4 right-4 bg-white hover:bg-gray-100 p-3 rounded-full transition-all z-30 shadow-xl hover:scale-110"
                >
                  <X className="w-6 h-6 text-gray-700" />
                </button>

                {videoSlide === 0 && (
                  <div className="relative">
                    <video autoPlay loop muted playsInline className="w-full h-auto block rounded-3xl" style={{ maxHeight: '75vh' }}>
                      <source src="/videos/ear-buds-promo.mp4" type="video/mp4" />
                    </video>
                    <a
                      href="/Categories/tech-audio"
                      onClick={() => setShowVideoPopup(false)}
                      className="absolute bottom-14 left-1/2 -translate-x-1/2 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-black text-lg shadow-2xl hover:scale-110 transition-all animate-pulse z-20"
                    >
                      SHOP NOW
                    </a>
                  </div>
                )}

                {videoSlide === 1 && (
                  <div className="relative">
                    <video autoPlay loop muted playsInline className="w-full h-auto block rounded-3xl" style={{ maxHeight: '75vh' }}>
                      <source src="/videos/gaming-kit.mp4" type="video/mp4" />
                    </video>
                    <a
                      href="/Categories/tech-audio"
                      onClick={() => setShowVideoPopup(false)}
                      className="absolute bottom-14 left-1/2 -translate-x-1/2 inline-block bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-black text-lg shadow-2xl hover:scale-110 transition-all animate-pulse z-20"
                    >
                      SHOP NOW
                    </a>
                  </div>
                )}

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                  <button
                    onClick={() => setVideoSlide(0)}
                    className={videoSlide === 0 ? 'h-3 w-8 rounded-full bg-yellow-400 transition-all' : 'h-3 w-3 rounded-full bg-white/70 transition-all'}
                  />
                  <button
                    onClick={() => setVideoSlide(1)}
                    className={videoSlide === 1 ? 'h-3 w-8 rounded-full bg-yellow-400 transition-all' : 'h-3 w-3 rounded-full bg-white/70 transition-all'}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

'@
if (-not $content.Contains($jsxAnchor)) { Write-Host "ABORT: JSX anchor not found." -ForegroundColor Red; Copy-Item $backup $file -Force; exit 1 }
$content = $content.Replace($jsxAnchor, $jsxInsert + "`n" + $jsxAnchor)

# ---------- Verify ----------
$problems = @()
if (-not $content.Contains('showVideoPopup')) { $problems += "state missing" }
if (-not $content.Contains('/videos/ear-buds-promo.mp4')) { $problems += "earbuds video missing" }
if (-not $content.Contains('/videos/gaming-kit.mp4')) { $problems += "keyboard video missing" }
$gate = ([regex]::Matches($content, [regex]::Escape('{showVideoPopup && ('))).Count
if ($gate -ne 1) { $problems += "popup gate count = $gate (expected 1)" }
$open  = ([regex]::Matches($content, '\{')).Count
$close = ([regex]::Matches($content, '\}')).Count
if ($open -ne $close) { $problems += "brace mismatch in file ($open vs $close)" }

if ($problems.Count -gt 0) {
    Write-Host "VERIFICATION FAILED - rolling back. Issues:" -ForegroundColor Red
    $problems | ForEach-Object { Write-Host "  - $_" -ForegroundColor Red }
    Copy-Item -LiteralPath $backup -Destination $file -Force
    Write-Host "`nFile restored from backup. No changes kept." -ForegroundColor Yellow
    exit 1
}

$utf8NoBom = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($file, $content, $utf8NoBom)

Write-Host "SUCCESS - video promo pop-up added" -ForegroundColor Green
Write-Host "  Rotating modal: earbuds + keyboard, SHOP NOW -> /Categories/tech-audio" -ForegroundColor Green
Write-Host "  Shows 3s after load, rotates every 6s, closeable" -ForegroundColor Green
Write-Host "`nIf anything looks off, roll back with:" -ForegroundColor Cyan
Write-Host "  Copy-Item -LiteralPath `"$backup`" -Destination `"$file`" -Force" -ForegroundColor White
