SPAcify package ReadMe
----------------------

This package added all the nuget references needed to compile the application.

It also enables code first migrations and adds an initial migration to create the sample database. But to complete 
the installation, please make sure you uncomment the lines specified in the comments in the file Data/BlogDbContext.cs, 
this will configure the application DbContext to use the MigrateDatabaseToLatestVersion strategy that will use the added 
migration, or any further migrations the developer adds at a later time. These migrations are of course optional and can 
be safely removed if wanted.

Although there is a dependency on breeze.d.ts typing file available from the DefinitelyTyped project nuget package, an 
altered version of this file is inclued here to add support for generics. These customizations will be removed in a 
future version once they are integrated on the main DefinitelyTyped project.

Depending on which version of Visual Studio and Web Essentials are installed a few aditional steps might be necessary 
to get going with Typescript:
If you are using Visual Studio 2012 and have the latest version of Web Essentials nothing else should be necessary.
If you dont't have WebEssentials installed you need to manually edit the web project file and add the following to 
the end of the file just before the closing </Project> tag:

  <PropertyGroup Condition="'$(Configuration)' == 'Debug'">
    <TypeScriptTarget>ES3</TypeScriptTarget>
    <TypeScriptIncludeComments>true</TypeScriptIncludeComments>
    <TypeScriptSourceMap>true</TypeScriptSourceMap>
    <TypeScriptModuleKind>AMD</TypeScriptModuleKind>
  </PropertyGroup>
  <PropertyGroup Condition="'$(Configuration)' == 'Release'">
    <TypeScriptTarget>ES3</TypeScriptTarget>
    <TypeScriptIncludeComments>false</TypeScriptIncludeComments>
    <TypeScriptSourceMap>false</TypeScriptSourceMap>
    <TypeScriptModuleKind>AMD</TypeScriptModuleKind>
  </PropertyGroup>
  <Import Project="$(VSToolsPath)\TypeScript\Microsoft.TypeScript.targets" />

After this has been done, you should check the build action specified on all .ts files (which will probably be content) 
and change it to TypeScriptCompile, if you don't see TypeScriptCompile as an option, all you have to do is to manually 
edit the project again and change any <Content include=... whatever ...> typescript node to 
<TypeScriptCompile include=... whatever ...>, reload the project and the option should be available.

If you are using Visual Studio 2013 Preview this won't work out of the box due to the different libraries referenced by default, 
but you can always create the project in VS2012 and then open it in VS2013. I'm working on a fix for this.

Connection strings:
Before trying to run the application two connection strings should be added to the connectionStrings configuration section 
in web.config:
    <add name="Security" connectionString="your connection string here" providerName="your provider here" />
    <add name="Blogs" connectionString="your connection string here" providerName="your provider here" />

The first connection will be used by the asp.net security providers and for that you must change the connection name specified 
in the several providers (membership, roles, profile, etc.).

Web Resources:
The following two configurations should be added to the system.web config section for authentication/authorization to work properly:
    <authentication mode="Forms">
      <forms loginUrl="~/#/login" timeout="2880" defaultUrl="~/" />
    </authentication>
    <authorization>
      <allow users="*" />
    </authorization>


Enjoy!
Vítor Castro