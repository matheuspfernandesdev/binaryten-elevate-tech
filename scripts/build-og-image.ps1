# Gera public/og-image.jpg (1200x630) a partir da logo limpa embutida em public/logo.svg.
# Uso: powershell -ExecutionPolicy Bypass -File scripts/build-og-image.ps1

$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$root   = Split-Path -Parent $PSScriptRoot
$svg    = Join-Path $root 'public\logo.svg'
$outJpg = Join-Path $root 'public\og-image.jpg'

# Dimensoes recomendadas para Open Graph / WhatsApp / Twitter summary_large_image
$targetW = 1200
$targetH = 630

# Cor de fundo do tema (--background: 220 40% 5%) usada como base opaca
$bgColor = [System.Drawing.Color]::FromArgb(255, 8, 11, 18)

# 1. Extrai o raster embutido no SVG
$svgText = [IO.File]::ReadAllText($svg)
$match = [regex]::Match($svgText, 'base64,([A-Za-z0-9+/=\s]+)"')
if (-not $match.Success) { throw "Nenhuma imagem base64 encontrada em $svg" }

$bytes = [Convert]::FromBase64String(($match.Groups[1].Value -replace '\s', ''))
$ms = New-Object System.IO.MemoryStream($bytes, 0, $bytes.Length)
$src = [System.Drawing.Image]::FromStream($ms)

try {
    # 2. Escala "cover" + crop centralizado, preservando a proporcao da logo
    $scale = [Math]::Max($targetW / $src.Width, $targetH / $src.Height)
    $drawW = [int][Math]::Round($src.Width * $scale)
    $drawH = [int][Math]::Round($src.Height * $scale)
    $offsetX = [int][Math]::Round(($targetW - $drawW) / 2)
    $offsetY = [int][Math]::Round(($targetH - $drawH) / 2)

    $canvas = New-Object System.Drawing.Bitmap($targetW, $targetH, [System.Drawing.Imaging.PixelFormat]::Format24bppRgb)
    $g = [System.Drawing.Graphics]::FromImage($canvas)
    try {
        $g.Clear($bgColor)
        $g.InterpolationMode  = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $g.PixelOffsetMode    = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $g.SmoothingMode      = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $g.DrawImage($src, $offsetX, $offsetY, $drawW, $drawH)
    }
    finally { $g.Dispose() }

    # 3. Exporta JPEG (sem canal alfa -> nenhum xadrez de transparencia possivel)
    $encoder = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
        Where-Object { $_.MimeType -eq 'image/jpeg' }
    $params = New-Object System.Drawing.Imaging.EncoderParameters(1)
    $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter(
        [System.Drawing.Imaging.Encoder]::Quality, [int64]90)

    if (Test-Path $outJpg) { Remove-Item $outJpg -Force }
    $canvas.Save($outJpg, $encoder, $params)
    $canvas.Dispose()

    $size = [Math]::Round((Get-Item $outJpg).Length / 1KB, 1)
    Write-Host "OK: public/og-image.jpg ${targetW}x${targetH} (${size} KB)"
}
finally {
    $src.Dispose()
    $ms.Dispose()
}
