[Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null
$img = [System.Drawing.Image]::FromFile("data\logo.png")
Write-Output "Width: $($img.Width) Height: $($img.Height)"
$img.Dispose()
