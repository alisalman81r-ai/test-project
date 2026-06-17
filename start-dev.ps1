$env:NODE_OPTIONS = '--use-system-ca'
$env:PATH = 'C:\Program Files\nodejs;' + $env:PATH
Set-Location 'C:\Users\92302\OneDrive\Documents\contruction-weapp'
& 'C:\Program Files\nodejs\node.exe' 'C:\Program Files\nodejs\node_modules\npm\bin\npm-cli.js' run dev -- -H 127.0.0.1
