param($installPath, $toolsPath, $package, $project)

write-host
write-host "Enabling migrations..."

Enable-Migrations

write-host
write-host "Migrations enabled."

write-host
write-host "Adding initial migration..."

Add-Migration InitialCreate

write-host
write-host "Initial migration added."
