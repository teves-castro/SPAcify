SPAcify package ReadMe
----------------------

This package added all the nuget references needed to compile the application.

It also enables code first migrations and adds an initial migration to create the sample database. But to complete the installation, 
please make sure you uncomment the lines specified in the comments in the file Data/BlogDbContext.cs, this will configure the application DbContext to
use the MigrateDatabaseToLatestVersion strategy that will use the added migration, or any further migrations the developer adds at a later time.

These migrations are of course optional and can be safely removed if wanted.

Enjoy!
Vítor Castro