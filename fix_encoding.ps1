Copy-Item "i:\My Drive\2_IslandGIS\index.html" "i:\My Drive\2_IslandGIS\index.html.bak"
$bytes = [System.IO.File]::ReadAllBytes("i:\My Drive\2_IslandGIS\index.html")
$string = [System.Text.Encoding]::UTF8.GetString($bytes)
$fixedBytes = [System.Text.Encoding]::GetEncoding(1252).GetBytes($string)
[System.IO.File]::WriteAllBytes("i:\My Drive\2_IslandGIS\index.html", $fixedBytes)
Write-Host "Encoding Reversed"
