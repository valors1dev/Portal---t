[Reflection.Assembly]::LoadWithPartialName("System.Drawing") | Out-Null
$img = New-Object System.Drawing.Bitmap("data\logo.png")

# Find the best split column between x = 400 and x = 600
$minColumn = 480
$minScore = [int]::MaxValue

for ($x = 400; $x -lt 600; $x++) {
    $score = 0
    for ($y = 0; $y -lt $img.Height; $y++) {
        $pixel = $img.GetPixel($x, $y)
        $score += $pixel.A
    }
    if ($score -lt $minScore) {
        $minScore = $score
        $minColumn = $x
    }
}

Write-Output "Best split column: $minColumn with score $minScore"
$img.Dispose()
