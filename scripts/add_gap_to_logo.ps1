[Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null

$originalPath = "data\logo.png"
$backupPath = "data\logo-original.png"

# Create a backup of the original logo if it doesn't already exist
if (-not (Test-Path $backupPath)) {
    Copy-Item $originalPath $backupPath -Force
    Write-Output "Created backup of original logo."
}

# Load the backup image as source to avoid locking problems
$srcImg = New-Object System.Drawing.Bitmap($backupPath)

$splitX = 486
$gapWidth = 40  # 40 pixels gap

$newWidth = $srcImg.Width + $gapWidth
$newHeight = $srcImg.Height

$destImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
$g = [System.Drawing.Graphics]::FromImage($destImg)

# Enable high quality rendering
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality

# Draw the PORTAL part (left)
$srcRectLeft = New-Object System.Drawing.Rectangle(0, 0, $splitX, $newHeight)
$destRectLeft = New-Object System.Drawing.Rectangle(0, 0, $splitX, $newHeight)
$g.DrawImage($srcImg, $destRectLeft, $srcRectLeft, [System.Drawing.GraphicsUnit]::Pixel)

# Draw the NETWORK part (right)
$srcRectRight = New-Object System.Drawing.Rectangle($splitX, 0, ($srcImg.Width - $splitX), $newHeight)
$destRectRight = New-Object System.Drawing.Rectangle(($splitX + $gapWidth), 0, ($srcImg.Width - $splitX), $newHeight)
$g.DrawImage($srcImg, $destRectRight, $srcRectRight, [System.Drawing.GraphicsUnit]::Pixel)

# Clean up source image and graphics context before saving
$g.Dispose()
$srcImg.Dispose()

# Save the new logo image
$destImg.Save($originalPath, [System.Drawing.Imaging.ImageFormat]::Png)
$destImg.Dispose()

Write-Output "Successfully split the logo image with a $gapWidth px gap!"
