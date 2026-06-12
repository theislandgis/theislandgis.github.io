$file = "i:\My Drive\2_IslandGIS\index.html"
$content = Get-Content $file -Raw -Encoding UTF8

$content = $content -replace [regex]::Escape("â€”"), "—"
$content = $content -replace [regex]::Escape("Â·"), "·"
$content = $content -replace [regex]::Escape("ðŸ—º"), "🗺"
$content = $content -replace [regex]::Escape("ðŸ§ "), "🧠"
$content = $content -replace [regex]::Escape("ðŸ”¬"), "🔬"
$content = $content -replace [regex]::Escape("ðŸ¤–"), "🤖"
$content = $content -replace [regex]::Escape("ðŸŽ“"), "🎓"
$content = $content -replace [regex]::Escape("ðŸŒ¿"), "🌿"
$content = $content -replace [regex]::Escape("ðŸ Ÿ"), "🏛"
$content = $content -replace [regex]::Escape("ðŸ”"), "🔭"
$content = $content -replace [regex]::Escape("ðŸ›°"), "🛰"
$content = $content -replace [regex]::Escape("ðŸ“Š"), "📊"
$content = $content -replace [regex]::Escape("ðŸ“ "), "📁"
$content = $content -replace [regex]::Escape("ðŸ‘¥"), "👥"
$content = $content -replace [regex]::Escape("ðŸ“…"), "📅"
$content = $content -replace [regex]::Escape("ðŸ’¼"), "💼"
$content = $content -replace [regex]::Escape("ðŸ“˜"), "📘"
$content = $content -replace [regex]::Escape("ðŸ ˆ"), "🏝"
$content = $content -replace [regex]::Escape("âœ‰"), "✉"
$content = $content -replace [regex]::Escape("ðŸ’¬"), "💬"

$content = $content -replace 'alt="KH">\s*[^<]+?</a>', "alt=`"KH`">`n      ខ្មែរ</a>"
$content = $content -replace '<div class="hero-eyebrow"([^>]*)>.*?Geospatial Education', '<div class="hero-eyebrow"$1>🇰🇭 Geospatial Education'

Set-Content $file -Value $content -Encoding UTF8 -NoNewline
Write-Host "Fixes applied."
