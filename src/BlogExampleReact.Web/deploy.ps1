Param (
   [Parameter(Mandatory=$true)][string] $SshHost,
   [Parameter(Mandatory=$true)][string] $UserName,
   [Parameter(Mandatory=$true)][string] $Password
)
#
# deploy.ps1
#
$workDir = get-location

### buid
&{npm run build:prod}
&{dotnet publish}
### pack
$publishDir = Join-Path $workDir "bin\Debug\netcoreapp1.0\publish"
$publishZip = Join-Path $workDir "bin\Debug\netcoreapp1.0\publish\package.zip"
if(Test-Path $publishZip){
    Remove-Item $publishZip
}
set-alias sz "$env:ProgramFiles\7-Zip\7z.exe"  
sz a $publishZip ($publishDir+"\*")
#Get-ChildItem $publishDir | Compress-Archive -DestinationPath $publishZip 

#exit 0

### upload
$remotePackagePath = "/tmp"
$passwordEnc = ConvertTo-SecureString -String $Password -AsPlainText -Force
$Crendtial = new-object -typename System.Management.Automation.PSCredential -argumentlist $UserName, $passwordEnc
$session = New-SFTPSession -ComputerName $SshHost -Credential $Crendtial -Force

Set-SFTPFile -SFTPSession $session -LocalFile $publishZip -RemotePath $remotePackagePath -Overwrite
$session.Disconnect()

$session = New-SSHSession -ComputerName $SshHost -Credential $Crendtial -Force

Invoke-SSHCommand -SSHSession $session -Command "sudo stop blogreact" -TimeOut 9999
Invoke-SSHCommand -SSHSession $session -Command "unzip -o /tmp/package.zip -d /var/www/BlogExampleReact/" -TimeOut 9999
Invoke-SSHCommand -SSHSession $session -Command "sudo start blogreact" -TimeOut 9999

$session.Disconnect()